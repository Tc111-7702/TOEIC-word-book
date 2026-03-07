import { prisma } from "../prisma.js";

//プレイヤーデータの取得、更新
export const getPlayerData = async (req, res) => {
    try {
        //エンドポイントからユーザーIDを取得
        const userId = Number(req.params.id);
        //リクエストのユーザーIDのプレイヤーデータをDBから検索
        const playerData = await prisma.playerData.findMany({
            where: {
                userId: userId
            }
        });
        //プレイヤーデータがDBに存在しない場合
        if (!playerData) {
            return res.status(404).json({ error: "ユーザーデータが見つかりません" });
        }

        //プレイヤーデータの取得、更新成功
        res.status(200).json(playerData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};