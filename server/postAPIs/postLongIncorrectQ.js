import { prisma } from "../prisma.js";

//長文の復習用問題の登録
export const postLongIncorrectQ = async (req, res) => {
    try {
        const { userId, level, englishText, japaneseText, answers, explanation }
            = req.body;

        //同じ問題がすでにDBに登録されていないか確認
        const existingQuestion = await prisma.longQuestionsReview.findFirst({
            where: {
                userId: Number(userId),
                englishText: englishText
            }
        });
        //すでに登録されていた場合
        if (existingQuestion) {
            return res.status(200).json({ 
                message: "この問題は既に復習リストに登録されています",
                data: existingQuestion 
            });
        }

        //登録されていなかった場合、DBに登録
        const newReviewItem = await prisma.longQuestionsReview.create({
            data: {
                userId: Number(userId),
                level: Number(level),
                englishText,
                japaneseText,
                answers,
                explanation
            }
        });

        //登録成功
        res.status(201).json(
            {
                message: "復習リストに登録しました",
                data: newReviewItem
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
};