import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";

//ログイン状態の判定
export const verify = async (req, res) => {
    //Cookiesに登録されたJWTトークン
    const token = req.cookies.token;

    //トークンが向こうの場合
    if (!token) {
        return res.status(401).json({ loggedIn: false, message: "未ログインです" });
    }

    try {
        //トークンの照合
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //ユーザーが存在するかDBを検索
        const user = await prisma.user.findUnique({
            where: { email: decoded.email }
        });
        //ユーザーが存在しない場合
        if (!user) {
            return res.status(401).json({ loggedIn: false });
        }
        
        //レスポンス
        res.json({ 
            loggedIn: true, 
            user: {
                id: user.id,
                email: decoded.email
            } 
        });
    } catch (err) {
        res.status(401).json({ loggedIn: false, message: "セッションが切れました" });
    }
};