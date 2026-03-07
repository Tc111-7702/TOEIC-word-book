import { prisma } from "../prisma.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { initPlayerData } from "../utils.js";

//サインアップ時のユーザーデータの登録とバリデーション
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //入力されたメールアドレス、パスワードのバリデーション
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorArray = errors.array();
            const emailErr = errorArray.find(err => err.path === "email")?.msg || null;
            const passwordErr = errorArray.find(err => err.path === "password")?.msg || null;
            return res.status(400).json({ emailErr, passwordErr, message: "新規登録失敗" });
        }

        //すでに同じメールアドレスのユーザーがいないかDBを検索
        const existingUser = await prisma.user.findFirst({
            where: { email: email }
        });
        //すでに同じメールアドレスのユーザーがいた場合
        if (existingUser) {
            return res.status(400).json(
                { 
                    emailErr: "このメールアドレスは既に登録されています", 
                    passwordErr: null,
                    message: "新規登録失敗" 
                }
            );
        }

        //入力されたパスワードのハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);
        //新規プレイヤーデータの生成
        const playerDataArr = initPlayerData();

        //新規ユーザデータをDBに登録
        const newUser = await prisma.user.create({
            data: { 
                name, 
                email, 
                hashedPassword,
                playerData: {
                    create: playerDataArr
                } 
            }
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
        //新規登録成功
        res.status(201).json(
            { 
                emailErr: null, 
                passwordErr: null, 
                message: "新規登録成功",
                userId: newUser.id 
            });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

