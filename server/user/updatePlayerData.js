import { prisma } from "../prisma.js";

//クイズ終了時のプレイヤーデータの更新
export const updatePlayerData = async (req, res) => {
    try {
        const { userId, type, level, difficulty } = req.body;

        //DBの更新
        const result = await prisma.playerData.updateMany({
            where: {
                userId: Number(userId),      
                type,                  
                level: Number(level),        
                difficulty       
            },
            data: {
                cleared: true                
            }
        });

        //DBでユーザーデータが見つからなかった場合
        if (result.count === 0) {
            return res.status(404).json({ 
                message: "該当するデータが見つかりませんでした。条件を確認してください。" 
            });
        }
        
        //更新成功
        res.status(200).json({ 
            message: "進捗を正常に更新しました", 
            count: result.count 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    

};