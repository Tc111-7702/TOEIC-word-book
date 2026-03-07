import { quizFinishView } from "../components/quizFinishView.js";

//スコアの更新とresultDataの作成
export const scoreCounter = (result, selected, app) => {
    const index = app.quizState.index;
    if (app.quizState.type === "Short") {
        //短文問題の場合
        //結果画面で表示する正誤判定の演出
        let checked;
        let checkedColorClass;
        if (result) {
            //正解の場合
            app.quizState.score++;
            checked = "✔";
            checkedColorClass = "green";
            if (app.quizState.gameMode === "Review") {
                //Reviewモードで正解の場合
                //正解した問題のデータ
                const data = {
                    userId: app.userId,
                    level: app.quizState.level,
                    englishSentence: app.quizState.quizs[index].question.englishSentence,
                    japaneseSentence: app.quizState.quizs[index].question.japaneseSentence,
                    answer: app.quizState.quizs[index].question.answer,
                    explanation: app.quizState.quizs[index].question.explanation
                };
                //短文の復習問題の更新のリクエストを出す
                app.fetchShortIncorrectQ(data, "Review");
            }
        } else {
            //不正解の場合
            checked = "✖";
            checkedColorClass = "red";
            if (app.quizState.gameMode === "Practice") {
                //Practiceモードで不正解だった場合
                //不正解だった問題のデータ
                const data = {
                    userId: app.userId,
                    level: app.quizState.level,
                    englishSentence: app.quizState.quizs[index].question.englishSentence,
                    japaneseSentence: app.quizState.quizs[index].question.japaneseSentence,
                    answer: app.quizState.quizs[index].question.answer,
                    explanation: app.quizState.quizs[index].question.explanation
                };
                //短文の復習問題の更新のリクエストを出す
                app.fetchShortIncorrectQ(data, "Practice");
            }
        }

        //resultDataの更新
        app.quizState.resultData.push(
            {
                index,
                options: app.quizState.quizs[index].options,
                selected,
                result,
                checked,
                checkedColorClass 
            }
        );

        //クイズのインデックスを増やす
        app.quizState.index++;
        //インデックスに応じて次の問題か結果画面に遷移する
        if (app.quizState.index < app.quizState.quizLength) {
            app.shortQuizView();
        } else {
            quizFinishView(true, app);
        }
    } else {
        //長文問題の場合
        //問題のデータ
        const data = {
            userId: app.userId,
            level: app.quizState.level,
            englishText: app.quizState.quizs[index].question.englishText,
            japaneseText: app.quizState.quizs[index].question.japaneseText,
            answers: app.quizState.quizs[index].question.answers,
            explanation: app.quizState.quizs[index].question.explanation
        };
        //長文の復習問題の更新のリクエストを出す
        if (app.quizState.gameMode === "Practice" && result.includes(false)) {
            //Practiceモードで不正解な問が含まれていた場合
            app.fetchLongIncorrectQ(data, "Practice");
        }
        if (app.quizState.gameMode === "Review" && !result.includes(false)) {
            //Practiceモードですべて正解だった場合
            app.fetchLongIncorrectQ(data, "Review");
        }
        
        //結果画面で表示する正誤判定の演出
        const checkedForLong = [];
        const checkedColorClassForLong = [];
        for (let i = 0; i < app.quizState.quizs[index].correctsAndOptionsArr.length; i++) {
            if (result[i]) {
                app.quizState.score++;
                checkedForLong.push("✔");
                checkedColorClassForLong.push("green");
            } else {
                checkedForLong.push("✖");
                checkedColorClassForLong.push("red");
            }
        }
        //resultDataの更新
        app.quizState.resultData.push(
            {
                index,
                correctsAndOptionsArr: app.quizState.quizs[index].correctsAndOptionsArr,
                selected,
                result,
                checkedForLong,
                checkedColorClassForLong
            }
        );

        //クイズのインデックスを増やす
        app.quizState.index++;
        //インデックスに応じて次の問題か結果画面に遷移する
        if (app.quizState.index < app.quizState.quizLength) {
            app.longQuizView();
        } else {
            quizFinishView(true, app);
        }
    }
};