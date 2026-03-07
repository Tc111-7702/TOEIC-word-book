import { scoreCounter } from "../utils/scoreCounter.js";
import { replaceView } from "../utils/replaceView.js";

//短文問題画面
export const shortQuizView = (app) => {
    //クラス変数
    const index = app.quizState.index;
    const parentElm = document.createElement("div");
    const mode = app.quizState.gameMode;
    const quizs = app.quizState.quizs[index];
    const question = quizs.question.englishSentence;
    const options = quizs.options;
    const optionsLen = options.length;
    //オプションのDOMを格納する配列
    const optionStrs = [];
    options.map(option => {
        optionStrs.push(`
            <button class="optionBtn">
                ${option.english}
            </button>
        `)});
    //タイマーの秒部分の表示を初期化
    let secondsElm;
    if (app.quizState.timeLeft.seconds < 10) {
        secondsElm = `0${app.quizState.timeLeft.seconds}`;
    } else {
        secondsElm = app.quizState.timeLeft.seconds;
    }
    //表示画面全体のDOMの作成    
    const html = `
        <div class="quiz">
            <div class="timer">
                TimeLeft: ${app.quizState.timeLeft.minutes}m${secondsElm}s
            </div>
            <div class="instruction">
                Choose the correct word to fill in the blank.
            </div>
            <div class="question-text">
                No.${index + 1}  ${question}
            </div>                
            <div class="options">
                ${optionStrs.join("")}
            </div>                
            <button class="answerBtn">Answer</button>
        </div>
    `;
    parentElm.innerHTML = html;
    //DOM要素の取得
    const timerElm = parentElm.querySelector(".timer");
    const instructionElm = parentElm.querySelector(".instruction");
    const optionBtnsElm = parentElm.querySelectorAll(".optionBtn");
    const answerBtnElm = parentElm.querySelector(".answerBtn");

    //残時間の警告演出
    let convertSeconds = app.quizState.timeLeft.minutes * 60 + app.quizState.timeLeft.seconds;
    if (convertSeconds > 30) {
        timerElm.classList.remove("alert");
    }

    //警告変数の初期化
    let alert = false;
    //全ボタンのイベントリスナ
    for (let i = 0; i < optionsLen; i++) {
        optionBtnsElm[i].addEventListener("click", (e) => {
            //警告選出の初期化
            alert = false;
            instructionElm.innerText = "Choose the correct word to fill in the blank.";
            answerBtnElm.innerText = "Answer";
            //押されたボタンを取得
            const thisBtn = e.target;

            if (!thisBtn.classList.contains("onClicked")) {
                for (let i = 0; i < optionsLen; i++) {
                    //ボタンが選択されていなかった場合
                    //すべてのオプションボタンをすべて初期化
                    optionBtnsElm[i].classList.remove("onClicked");
                }
                //押されたボタンにCSSを当てる
                thisBtn.classList.add("onClicked");
            } else {
                //ボタンがすでに選択されていた場合
                //押されたボタンにCSSを外す
                thisBtn.classList.remove("onClicked");
            }                  
        });
    }

    //タイマーのスタイルの初期化
    timerElm.style.display = "block";
    //Reviewモードのときはタイマーを非表示にする
    if (mode === "Review") {
        timerElm.style.display = "none";
    }

    //アンサーボタンのイベントリスナ(警告変数の状態で場合分け)
    answerBtnElm.addEventListener("click", () => {
        if (!alert) {
            //警告されていない場合
            //解答された問の数
            let selectedCounter = 0;
            //オプションボタンの選択状況と選択されていた場合の正誤を調べる
            for (let i = 0; i < optionsLen; i++) {
                const btn = optionBtnsElm[i];
                if (btn.classList.contains("onClicked")) {
                    selectedCounter++;
                    const selected = btn.innerText;
                    //選ばれたオプションがあったら、結果のデータを更新する
                    if (btn.innerText === quizs.correct) {
                        //正解の場合
                        scoreCounter(true, selected, app);
                        return;
                    } else {
                        //不正解の場合
                        scoreCounter(false, selected, app);
                        return;
                    }
                }
            }

            if (selectedCounter === 0) {
                //選ばれたオプションがなかったら、警告演出を出す
                alert = true;
                instructionElm.innerText = "未回答でよろしいですか？";
                answerBtnElm.innerText = "Yes";
            }
        } else {
            //すでに警告されていた場合は、そのまま結果のデータを更新する
            scoreCounter(false, "", app);
            return;
        }
    });
    //画面作成
    replaceView(parentElm, app);
};