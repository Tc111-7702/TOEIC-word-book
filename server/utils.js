//サーバーAPIにエクスポートするメソッド

import { prisma } from "./prisma.js";

//引数の配列から指定された数だけ取得し、シャッフルする
const scrambleObjs = (objs, count) => {
    return objs.sort(() => 0.5 - Math.random()).slice(0, count);
};

//指定された単語集の取得
export const takeAllWords = async (level) => {
    if (level !== 0) {
        //Practiceモードで使用
        return await prisma.words.findMany({ where: { level } });
    } else {
        //Reviewモードで使用
        return await prisma.words.findMany({});
    }    
};

//出題する問題集を生成
export const selectQuestions = (allQuestions, QUESTION_COUNT) => {
  return scrambleObjs(allQuestions, QUESTION_COUNT);
};

//クイズ問題で正解以外の選択肢の単語情報配列を生成
const makeOtherOptions = (allWords, id, OPTION_COUNT) => {
    let options = [];
    //正解単語の取得とその品詞を検索
    const thisWordObj = allWords.find(word => word.id === id);
    const partOfSpeech = thisWordObj ? thisWordObj.partOfSpeech : null;

    //正解以外の選択肢の単語情報配列を生成
    if (thisWordObj && ["動", "名", "形"].includes(partOfSpeech)) {
        //正解単語が動詞、名詞、形容詞の場合はその他の選択肢の品詞も合わせる
        const mainPOSWords = allWords.filter(word => word.partOfSpeech === partOfSpeech && word.id !== id);
        const shuffled = scrambleObjs(mainPOSWords, OPTION_COUNT - 1);
        //各選択肢の単語情報を配列に格納
        shuffled.map(word => options.push(
            {
                id: word.id,
                english: word.english,
                japanese: word.japanese,
                englishExampleSentence: word.englishExampleSentence,
                japaneseExampleSentence: word.japaneseExampleSentence,
                partOfSpeech: word.partOfSpeech
            }
        ));
    } else {
        //正解単語が前置詞、副詞の場合はその他の選択肢は全単語集から完全ランダムで取得する
        const allPOSWords = allWords.filter(word => word.id !== id);
        const shuffled = scrambleObjs(allPOSWords, OPTION_COUNT - 1);
        shuffled.map(word => options.push(
            //各選択肢の単語情報を配列に格納
            {
                id: word.id,
                english: word.english,
                japanese: word.japanese,
                englishExampleSentence: word.englishExampleSentence,
                japaneseExampleSentence: word.japaneseExampleSentence,
                partOfSpeech: word.partOfSpeech
            }
        ));
    }
    //正解以外の選択肢の単語情報配列を返す
    return options;
};

//クイズ問題で全選択肢集の単語情報配列生成
export const makeOptions = (arr, allWords, OPTION_COUNT) => {
    //全選択肢集の単語情報配列
    const allOptionsArr = [];
    //すべての問題に対して処理する
    for (let i = 0; i < arr.length; i++) {
        //短文問題と長文問題で処理を分岐
        const correct = arr[i].answer ? arr[i].answer : arr[i];
        //正解の単語を取得
        const foundWord = allWords.find(word => word.english === correct);
        //正解の単語情報の各プロパティ
        const id = foundWord ? foundWord.id : null;
        const japanese = foundWord ? foundWord.japanese : ["単語の意味を取得できませんでした"];
        const englishExampleSentence = foundWord ? foundWord.englishExampleSentence : "例文を取得できませんでした";
        const japaneseExampleSentence = foundWord ? foundWord.japaneseExampleSentence : "例文の和訳を取得できませんでした";
        const partOfSpeech = foundWord ? foundWord.partOfSpeech : "品詞を取得できませんでした";
        //正解以外の選択肢の単語情報配列を生成
        const options = makeOtherOptions(allWords, id, OPTION_COUNT);
        //正解の選択肢の単語情報配列を添加
        options.push(
            {
                id,
                english: correct,
                japanese,
                englishExampleSentence,
                japaneseExampleSentence,
                partOfSpeech 
            }
        );
        //選択肢をシャッフル
        options.sort(() => 0.5 - Math.random());
        //全選択肢集の単語情報配列に格納
        allOptionsArr.push(options);
    }
    //全選択肢集の単語情報配列を返す
    return allOptionsArr;
};

//初期のプレイヤーデータの生成
export const initPlayerData = () => {
    const types = ["short", "long"];
    const levels = [1, 2, 3, 4];
    const difficulties = ["normal", "hard", "extreme"];
    const playerDataArr = [];

    types.forEach(type => {
        levels.forEach(level => {
            difficulties.forEach(difficulty => {
                playerDataArr.push({
                    type: type,
                    level: level,
                    difficulty: difficulty,
                    cleared: false
                });
            });
        });
    });
    return playerDataArr;
};
