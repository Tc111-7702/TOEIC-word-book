import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//ログイン
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //入力されたメールアドレスのユーザーがDBに存在するか検索
        const user = await prisma.user.findFirst({
            where: { email: email }
        });
        let emailErr = null;
        let passwordErr = null;

        //入力されたメールアドレスとパスワードのバリデーション
        if (!user) {
            emailErr = "そのユーザーは存在しません";
        } else {
            const isMatch = await bcrypt.compare(password, user.hashedPassword);
            if (!isMatch) {
                passwordErr = "パスワードが間違っています";
            }
        }        
        if (emailErr || passwordErr) {
            return res.status(400).json({ emailErr, passwordErr, message: "ログイン失敗", userId: null });
        }

        //JWTトークンの発行
        const token = await jwt.sign(
            {
                email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        //ログイン状態をCookieに登録
        res.cookie("token", token, {
            httpOnly: true,     
            secure: false,       
            sameSite: "lax",    
            maxAge: 3600000,    
            path: "/"           
        });
        //ログイン成功
        res.json({ emailErr, passwordErr, message: "ログイン成功", userId: user.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }    
};