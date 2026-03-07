import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";

//アカウントの削除
export const deleteAccount = async (req, res) => {
    try {
        const { userId, email, password } = req.body;

        //入力されたメールアドレスのユーザーが存在するかDBを検索
        const user = await prisma.user.findFirst({
            where: { email: email }
        });
        let emailErr = null;
        let passwordErr = null;
        
        //入力されたメールアドレスとパスワードのバリデーション
        if (!user || user.id !== Number(userId)) {
            emailErr = "メールアドレスが間違っています";
        } else {
            const isMatch = await bcrypt.compare(password, user.hashedPassword);
            if (!isMatch) {
                passwordErr = "パスワードが間違っています";
            }
        }        
        if (emailErr || passwordErr) {
            return res.status(400).json({ emailErr, passwordErr, message: "アカウント削除失敗" });
        }

        //プレイヤーデータをDBから削除
        await prisma.playerData.deleteMany({
            where: { userId: user.id }
        });

        //短文の復習問題をDBから削除
        await prisma.shortQuestionsReview.deleteMany({
            where: { userId: user.id }
        });

        //長文の復習問題をDBから削除
        await prisma.longQuestionsReview.deleteMany({
            where: { userId: user.id }
        });

        //ユーザデータをDBから削除
        await prisma.user.delete({
            where: { id: user.id }
        });

        //Cookieの削除
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, 
            sameSite: "lax",
            path: "/"
        });
        //アカウント削除成功    
        res.status(200).json({ emailErr: null, passwordErr: null, message: "アカウントを削除しました" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
};