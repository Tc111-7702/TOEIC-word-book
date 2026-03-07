import { prisma } from "../prisma.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//パスワードの再設定
export const resetPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        let emailErr = null;
        let passwordErr = null;
        let confirmPasswordErr = null
        //入力されたメールアドレスのユーザーが存在するかDBを検索
        const user = await prisma.user.findFirst({
            where: { email: email }
        });
        //入力されたメールアドレスのユーザーが存在するかDBに存在しない場合
        if (!user) {
            emailErr = "そのユーザーは存在しません";
            return res.status(400).json({ emailErr, passwordErr, confirmPasswordErr, message: "パスワード再設定失敗", userId: null });
        }
        //新規入力されたパスワードのバリデーション
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorArray = errors.array();
            passwordErr = errorArray.find(err => err.path === "password")?.msg || null;
            return res.status(400).json({ emailErr, passwordErr, confirmPasswordErr, message: "パスワード再設定失敗", userId: null });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ emailErr, passwordErr, confirmPasswordErr: "パスワードが一致しません", message: "パスワード再設定失敗", userId: null });
        }

        //入力されたパスワードのハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);
        //DBに新規パスワードを登録
        await prisma.user.update({
            where: { email: email },
            data: { hashedPassword: hashedPassword }
        });

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
        //パスワード再設定成功
        res.status(201).json({ emailErr, passwordErr, confirmPasswordErr, message: "パスワードの再設定完了", userId: user.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }    
};