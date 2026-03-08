import { prisma } from "../prisma.js";
import { takeAllWords } from "../utils.js";
import { selectQuestions } from "../utils.js";
import { makeOptions } from "../utils.js";

//短文問題集の配列を取得
export const getShortQuiz = async (req, res) => {

  try {
    const quizs = [];
    //問題数
    const QUESTION_COUNT = 20;
    //選択肢数
    const OPTION_COUNT = 4;
    const level = Number(req.params.id);
    let allQuestions;
    if (Number.isNaN(level)) {
      return res.status(400).json({ error: "levelは数字で指定してください" });
    }
    //DBからすべての問題情報を取得
    if (level !== 0) {
      //Practiceモードの場合
      allQuestions = await prisma.shortQuestions.findMany({
        where: {
          level: level
        }
      });
    } else {
      //Reviewモードの場合
      allQuestions = await prisma.shortQuestionsReview.findMany({});
      //復習用問題が足りない場合
      if (!allQuestions || allQuestions.length < QUESTION_COUNT) {
        return res.status(400).json({ error: "復習用の問題数が足りません"});
      }
    }
    
    if (allQuestions.length === 0) {
      return res.status(404).json({ error: `level${level}のquestionは存在しません`});
    }

    //指定されたレベルの単語集を取得
    const allWords = await takeAllWords(level);
    //出題する問題を選出
    const selectedQuestions = selectQuestions(allQuestions, QUESTION_COUNT);
    //各問題の選択を生成
    const allOptionsArr = makeOptions(selectedQuestions, allWords, OPTION_COUNT);
    //全問題のオブジェクトを生成し、配列に格納
    for (let i = 0; i < selectedQuestions.length; i++) {
      const question = selectedQuestions[i];
      const options = allOptionsArr[i];
      const correct = selectedQuestions[i].answer;
      const quiz = { question, options, correct };
      quizs.push(quiz); 
    }
    //全問題の配列を返す
    res.status(200).json(quizs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }

};