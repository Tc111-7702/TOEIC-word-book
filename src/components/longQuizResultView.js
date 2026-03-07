import { replaceView } from "../utils/replaceView.js";

//長文問題の結果画面
export const longQuizResultView = (app) => {
    //クラス変数
    const quizs = app.quizState.quizs;
    const level = app.quizState.level;
    const resultData = app.quizState.resultData;
    const quizLen = app.quizState.quizLength;
    //正答率の計算
    const questionLen = quizLen * app.quizState.quizs[0].correctsAndOptionsArr.length;
    const accuracyRate = Math.floor(app.quizState.score / questionLen  * 100);
    //合否で変わるDOMとCSS
    let passOrFailElm = "";
    let passOrFailClass;
    if (accuracyRate >= 80) {
        //合格の場合
        passOrFailElm = "Congratulations! You passed.";
        passOrFailClass = "green";
        //Practiceモードで合格の場合
        if (app.quizState.gameMode === "Practice") {
            //合格したクイズのデータ
            const data = {
                userId: app.userId,
                type: "long",
                level,
                difficulty: app.quizState.difficulty
            };
            //プレイヤーデータ更新のリクエストを出す
            app.updatePlayerData(data);
        }
    } else {
        //不合格の場合
        passOrFailElm = "Unfortunately, you did not pass.";
        passOrFailClass = "blue";
    }
    //１問当たりの(オプション+正解)を表すDOMを格納する配列 - [1]
    const allQOptAndAnsArr = [];
    //１問あたりの正解の単語のLibraryを表すDOMを格納する配列 - [2]
    const allLibraryArr = [];
    //[1]、[2]の作成
    for (let i = 0; i < quizLen; i++) {
        //空欄１つ当たりの(オプション+正解)を表すDOMを格納する配列 - [1']
        const eachTextQOptandAnsArr = [];
        //空欄１つ当たりの正解の単語のLibraryを表すDOMを格納する配列 - [2'] 
        const eachLibraryArr = [];
        //[1']、[2']の作成
        for (let j = 0; j < quizs[i].correctsAndOptionsArr.length; j++) {
            const correctsAndOptionsArr = quizs[i].correctsAndOptionsArr[j];
            //１問あたりのオプションのDOMを配列に格納
            const eachQOptArr = [];
            for (let k = 0; k < correctsAndOptionsArr.options.length; k++) {
                eachQOptArr.push(`
                        <p class="options-for-long">
                            ${k + 1}. ${correctsAndOptionsArr.options[k].english}
                        </p>
                    `);
            }
            //解答履歴を変数に保存
            let yourAnswer;
            if (resultData[i].selected[j]) {
                yourAnswer = resultData[i].selected[j];
            } else {
                yourAnswer = "";
            }
            //空欄１つ当たりのDOMを[1']に格納
            eachTextQOptandAnsArr.push(`
                    <div class="long-optionsAndAnswer">
                        <div class="options">
                            <p class="options-label"><span class="blankIndex">${j + 1}</span> options</p>
                            ${eachQOptArr.join("")}
                        </div>               
                        <div class="check-box">
                            <p class="${resultData[i].checkedColorClassForLong[j]}">
                                Your Answer ${yourAnswer} ${resultData[i].checkedForLong[j]}
                            </p>
                            <p>Correct ${correctsAndOptionsArr.correct}</p>
                        </div>                     
                    </div>
                `);
            //空欄１つ当たりのDOMを[2']に格納
            eachLibraryArr.push(`
                    <div class="long-libraryList">
                        <div class="long-match">
                            <p class="long-english">${correctsAndOptionsArr.correct}</p>
                            <p class="long-japanese">${correctsAndOptionsArr.japanese.join(", ")}  <span class="partOfSpeech">${correctsAndOptionsArr.partOfSpeech}</span></p>
                        </div>
                        <div class="long-exampleSentence">
                            <p class="englishES">
                                ${correctsAndOptionsArr.englishExampleSentence
                                    .replace(/\*\*(.*?)\*\*/g, '<span class="vermilion">$1</span>')}
                            </p>
                            <p class="long-japaneseES">
                                ${correctsAndOptionsArr.japaneseExampleSentence
                                    .replace(/\*\*(.*?)\*\*/g, '<span class="vermilion">$1</span>')}
                            </p>
                        </div>
                    </div>
                `);
        }
        //[1']、[2']をつなげ合わせてできた１問あたりのDOMをそれぞれ[1]、[2]に格納
        allQOptAndAnsArr.push(eachTextQOptandAnsArr.join(""));
        allLibraryArr.push(eachLibraryArr.join(""));
    }
    //１問あたりの結果を表すDOMを格納する配列 - [3]
    const eachResultArr = [];
    //[3]の作成
    for (let i = 0; i < quizLen; i++) {
        eachResultArr.push(`
                <div class="result">
                    <div class="long-question-text">
                        No.${i + 1} ${quizs[i].question.englishText}
                    </div>
                    <div class="optionsAndAnswersPart">
                        ${allQOptAndAnsArr[i]}
                    </div>
                    <p class="note">和訳</p>
                    <div class="translation">
                        ${quizs[i].question.japaneseText
                                .replace(/\*\*(.*?)\*\*/g, '<span class="vermilion">$1</span>')}                   
                    </div>
                    <p class="note">解説</p>
                    <div class="explanation-highlight">
                        ${quizs[i].question.explanation
                            .replace(/\*\*(.*?)\*\*/g, '<span class="vermilion">$1</span>')}
                    </div>
                    <div class="long-library">
                        ${allLibraryArr[i]}
                    </div>
                </div>
            `);
    }

    //表示画面全体のDOMの作成
    const parentElm = document.createElement("div");
    const html = `
        <div class="type-quizs">
            Long Sentences Level ${level}
        </div>
        <h1>Result</h1>
        <p class="score ${passOrFailClass}">
            You got <strong>${app.quizState.score}</strong> / ${questionLen} correct.</br>
            Your accuracy is <strong>${accuracyRate}%</strong>
            ${passOrFailElm}
        </p>
        <div class="brank"></div>
        <div class="results">
            ${eachResultArr.join("")}
        </div>
        <button class="backBtn">Back Main Screen</button>
    `;
    parentElm.innerHTML = html;
    //DOM要素の取得
    const backBtnElm = parentElm.querySelector(".backBtn");
    const typeQuizsElm = parentElm.querySelector(".type-quizs");
    const scoreElm = parentElm.querySelector(".score");
    //スコア部分の表示を初期化
    scoreElm.style.display = "block";
    //Reviewモードのときはスコア部分を表示しない
    if (app.quizState.gameMode === "Review") {
        typeQuizsElm.textContent = "Long Sentences Review";
        scoreElm.style.display = "none";
    }
    //戻るボタン(スタート画面に遷移)
    backBtnElm.addEventListener("click", () => app.backStartView());
    //画面作成
    replaceView(parentElm, app);
};