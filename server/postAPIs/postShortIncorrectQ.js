import { prisma } from "../prisma.js";

//短文の復習用問題の登録
export const postShortIncorrectQ = async (req, res) => {
    try {
        const { userId, level, englishSentence, japaneseSentence, answer, explanation }
            = req.body;

        //同じ問題がすでにDBに登録されていないか確認
        const existingQuestion = await prisma.shortQuestionsReview.findFirst({
            where: {
                userId: Number(userId),
                englishSentence: englishSentence
            }
        });
        //すでに登録されていた場合
        if (existingQuestion) {
            return res.status(200).json({ 
                message: "この問題は既に復習リストに登録されています",
                data: existingQuestion 
            });
        }

        //DBに登録
        const newReviewItem = await prisma.shortQuestionsReview.create({
            data: {
                userId: Number(userId),
                level: Number(level),
                englishSentence,
                japaneseSentence,
                answer,
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