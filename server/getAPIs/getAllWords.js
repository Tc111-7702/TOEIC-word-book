import { prisma } from "../prisma.js";

//全単語を取得
export const getAllWords = async (req, res) => {

    try {
    //DBから取得
    const allWords = await prisma.words.findMany({});
    //取得成功
    res.status(200).json(allWords);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }

};