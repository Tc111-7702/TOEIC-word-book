import { replaceView } from "../utils/replaceView.js";

//短文問題の結果画面
export const shortQuizResultView = (app) => {
    //クラス変数
    const quizs = app.quizState.quizs;
    const level = app.quizState.level;
    const resultData = app.quizState.resultData;
    const quizLen = app.quizState.quizLength;
    //正答率の計算
    const accuracyRate = Math.floor(app.quizState.score / quizLen * 100);
    //合否で変わるDOMとCSS
    let passOrFailElm = "";
    let passOrFailClass = "";
    if (accuracyRate >= 80) {
        //合格の場合
        passOrFailElm = "Congratulations! You passed.";
        passOrFailClass = "green";
        //Practiceモードで合格の場合
        if (app.quizState.gameMode === "Practice") {
            //合格したクイズのデータ
            const data = {
                userId: app.userId,
                type: "short",
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
    //１問当たりのオプションを表すDOMを格納する配列 - [1]
    const allQOptArr = [];
    //１問あたりのオプションの単語のLibraryを表すDOMを格納する配列 - [2]
    const allLibraryArr = [];
    //[1]、[2]の作成
    for (let i = 0; i < quizLen; i++) {
        //１問あたりのオプションを表すDOMを格納する配列 - [1']
        const eachQOptArr = [];
        //１問あたりの正解の単語のLibraryを表すDOMを格納する配列 - [2']
        const eachLibraryArr = [];
        //[1']、[2']の作成
        for (let j = 0; j < quizs[i].options.length; j++) {
            const options = quizs[i].options;
            //オプション一つ当たりのDOMを[1']に格納
            eachQOptArr.push(`
                    <p class="options">${j + 1}. ${options[j].english}</p>
                `);
            //オプション一つ当たりのDOMを[2']に格納
            eachLibraryArr.push(`
                    <div class="libraryList">
                        <div class="match">
                            <p class="english">${options[j].english}</p>
                            <p class="japanese">${options[j].japanese.join(", ")}  <span class="partOfSpeech">${options[j].partOfSpeech}</span></p>
                        </div>
                        <div class="exampleSentence">
                            <p class="englishES">
                                ${options[j].englishExampleSentence
                                    .replace(/\*\*(.*?)\*\*/g, '<span class="vermilion">$1</span>')}
                            </p>
                            <p class="japaneseES">
                                ${options[j].japaneseExampleSentence
                                    .replace(/\*\*(.*?)\*\*/g, '<span class="vermilion">$1</span>')}
                            </p>
                        </div>
                    </div>
                `);
        }
        //[1']、[2']をつなげ合わせてできた１問あたりのDOMをそれぞれ[1]、[2]に格納
        allQOptArr.push(eachQOptArr.join(""));
        allLibraryArr.push(eachLibraryArr.join(""));
    }
    //１問あたりの結果を表すDOMを格納する配列 - [3]
    const eachResultArr = [];
    //[3]の作成
    for (let i = 0; i < quizLen; i++) {
        eachResultArr.push(`
                <div class = "result">
                    <div class="question-text">
                        No.${i + 1} ${quizs[i].question.englishSentence}
                    </div>
                    <div class="optionsPart">
                        <p class="options-label">options</p>
                        <div class="options">
                            ${allQOptArr[i]}
                        </div>
                    </div>
                    <div class="check-box">
                        <p class="${resultData[i].checkedColorClass}">
                            Your Answer ${resultData[i].selected} ${resultData[i].checked}
                        </p>
                        <p>Correct ${quizs[i].correct}</p>
                    </div>
                    <p class="note">和訳</p>
                    <div class="translation">
                        ${quizs[i].question.japaneseSentence
                                .replace(/\*\*(.*?)\*\*/g, '<span class="vermilion">$1</span>')}                   
                    </div>
                    <p class="note">解説</p>
                    <p class="explanation-highlight">   
                        ${quizs[i].question.explanation
                            .replace(/\*\*(.*?)\*\*/g, '<span class="vermilion">$1</span>')}
                    </p>
                </div>
                <div class="library">
                    ${allLibraryArr[i]}
                </div>                                        
            `);
    }

    //表示画面全体のDOMの作成
    const parentElm = document.createElement("div");
    const html = `
        <div class="type-quizs">
            Short Sentences Level ${level}
        </div>
        <h1>Result</h1>
        <p class="score ${passOrFailClass}">
            You got <strong>${app.quizState.score}</strong> / ${quizLen} correct.<br>
            Your accuracy is <strong>${accuracyRate}%</strong>.
            ${passOrFailElm}
        </p>
        <div class="results">
            ${eachResultArr.join("")}
        </div>
        <button class="backBtn">Back Main Screen</button>
    `;
    parentElm.innerHTML = html;
    //DOM要素の取得
    const typeQuizsElm = parentElm.querySelector(".type-quizs");
    const scoreElm = parentElm.querySelector(".score");
    const backBtnElm = parentElm.querySelector(".backBtn");
    //スコア部分の表示を初期化
    scoreElm.style.display = "block";
    //Reviewモードのときはスコア部分を表示しない
    if (app.quizState.gameMode === "Review") {
        typeQuizsElm.textContent = "Short Sentences Review";
        scoreElm.style.display = "none";
    }
    //戻るボタン(スタート画面に遷移)
    backBtnElm.addEventListener("click", () => app.backStartView());
    //画面作成
    replaceView(parentElm, app);
};