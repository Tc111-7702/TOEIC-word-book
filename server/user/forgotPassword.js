import { prisma } from "../prisma.js";

//パスワードの再設定
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        //入力されたメールアドレスのユーザーが存在するかDBを検索
        const user = await prisma.user.findFirst({
            where: { email: email }
        });

        //入力されたメールアドレスのユーザーがDBに存在しない場合
        if (!user) {
            return res.status(400).json({ message: "そのユーザーは存在しません" });
        }
        //パスワードの再設定成功
        res.status(200).json({ message: "パスワードを設定しなおします" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};