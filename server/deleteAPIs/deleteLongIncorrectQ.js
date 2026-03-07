import { prisma } from "../prisma.js";

//正解した長文問題を復習リストから削除
export const deleteLongIncorrectQ = async (req, res) => {
    try {
        const { userId, level, englishText, japaneseText, answers, explanation }
            = req.body;
        //DBから削除
        const deleteReviewItem = await prisma.longQuestionsReview.deleteMany({
            where: {
                userId: Number(userId),
                englishText,
            }
        });

        if (deleteReviewItem.count === 0) {
            return res.status(404).json({ message: "削除対象が見つかりませんでした" });
        }

        //削除成功
        res.status(201).json(
            {
                message: "復習リストから削除しました",
                data: deleteReviewItem
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
};