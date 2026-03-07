import { scoreCounter } from "../utils/scoreCounter.js";
import { replaceView } from "../utils/replaceView.js";

//長文問題画面
export const longQuizView = (app) => {
    //クラス変数
    const index = app.quizState.index;
    const mode = app.quizState.gameMode;
    const quizs = app.quizState.quizs[index];
    const question = quizs.question.englishText;
    const correctsAndOptionsArr = quizs.correctsAndOptionsArr;
    //空欄１つ当たりのオプションのDOMの配列を格納する配列 - [1]
    const allOptionsStrs = [];
    for (let i = 0; i < correctsAndOptionsArr.length; i++) {
        const options = correctsAndOptionsArr[i].options;
        //空欄１つ当たりのオプションのDOMを格納する配列 - [1']
        const optionsStrs = [];
        //[1']の作成
        for (let j = 0; j < options.length; j++) {
            //[1']にDOMを格納(同じ空欄のオプションのボタンを共通化させるデータ属性を振っている)
            optionsStrs.push(`
                    <button class="long-options-row" data-longop="${i}">
                        ${options[j].english}
                    </button>
                `);
        }
        //[1]の作成
        allOptionsStrs.push(`
                <div class="AllOptions">
                    ${i + 1}. ${optionsStrs.join("")}
                </div>
            `);
    }
    //タイマーの秒部分の表示を初期化
    let secondsElm;
    if (app.quizState.timeLeft.seconds < 10) {
        secondsElm = `0${app.quizState.timeLeft.seconds}`;
    } else {
        secondsElm = app.quizState.timeLeft.seconds;
    }
    //表示画面全体のDOMの作成
    const parentElm = document.createElement("div");
    const html = `
        <div class="quiz">
            <div class="timer">
                TimeLeft: ${app.quizState.timeLeft.minutes}m${secondsElm}s
            </div>
            <div class="instruction">
                Choose the appropriate English word for each blank.
            </div>
            <div class="long-question-text">
                No.${index + 1}  ${question}
            </div>
            <div class="allOptionsElm">
                ${allOptionsStrs.join("")}
            </div>
            <button class="answerBtn">Answer</button>
        </div>
    `;
    parentElm.innerHTML = html;

    //DOM要素の取得
    const timerElm = parentElm.querySelector(".timer");
    const instructionElm = parentElm.querySelector(".instruction");
    const allOptionsBtnsElm = parentElm.querySelectorAll("[data-longop]");
    const answerBtnElm = parentElm.querySelector(".answerBtn");

    //残時間の警告演出
    let convertSeconds = app.quizState.timeLeft.minutes * 60 + app.quizState.timeLeft.seconds;
    if (convertSeconds > 30) {
        timerElm.classList.remove("alert");
    }

    //警告変数の初期化
    let alert = false;
    //全ボタンのイベントリスナ
    for (let i = 0; i < correctsAndOptionsArr.length; i++) {
        //データ属性で同じの空欄のオプションボタンを一気に取得する
        const I = String(i);
        const optionsBtnsElm = [...allOptionsBtnsElm].filter(btn => btn.dataset.longop === I);

        //空欄を共有するオプションボタンにイベントリスナを発火
        for (let j = 0; j < optionsBtnsElm.length; j++) {    
            optionsBtnsElm[j].addEventListener("click", (e) => {
                //警告選出の初期化
                alert = false;
                instructionElm.innerText = "Choose the appropriate English word for each blank.";
                answerBtnElm.innerHTML = "Answer";
                //押されたボタンを取得
                const thisBtn = e.target;

                if (!thisBtn.classList.contains("onClicked")) {
                    //ボタンが選択されていなかった場合
                    //同じ空欄のボタンをすべて初期化
                    for (let k = 0; k < optionsBtnsElm.length; k++) {
                        optionsBtnsElm[k].classList.remove("onClicked");
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
    }

    //タイマーのスタイルの初期化
    timerElm.style.display = "block";
    //Reviewモードのときはタイマーを非表示にする
    if (mode === "Review") {
        timerElm.style.display = "none";
    }

    //解答された問の数
    let selectedTotalCounter = 0;
    //選ばれたオプションを格納する配列
    let selected = [];
    //正誤を格納する配列
    let result = [];
    //アンサーボタンのイベントリスナ(警告変数の状態で場合分け)
    answerBtnElm.addEventListener("click", (e) => {
        if (alert === false) {
            //警告されていない場合
            selectedTotalCounter = 0;
            selected = [];
            result = [];
            //各空欄に対して処理を実行
            for (let i = 0; i < correctsAndOptionsArr.length; i++) {
                //データ属性で同じの空欄のオプションボタンを一気に取得する
                const I = String(i);
                const optionsBtnsElm = [...allOptionsBtnsElm].filter(btn => btn.dataset.longop === I);
                //選択されたオプションボタンがあるかどうか表す変数
                let selectedCounter = 0;
                //オプションボタンの選択状況と選択されていた場合の正誤を調べる
                for (let j = 0; j < optionsBtnsElm.length; j++) {
                    if (optionsBtnsElm[j].classList.contains("onClicked")) {
                        selectedCounter++;
                        selected.push(optionsBtnsElm[j].innerText);
                        //正解の場合
                        if (optionsBtnsElm[j].innerText === quizs.correctsAndOptionsArr[i].correct) {
                            result.push(true);
                        } else {
                            //不正解の場合
                            result.push(false);
                        }
                    }
                }
                //一つも選択されていなかった場合
                if (selectedCounter === 0) {
                    selected.push(false);
                    result.push(false);                        
                }
                //解答された問の数
                selectedTotalCounter += selectedCounter;
            }
            if (selectedTotalCounter === correctsAndOptionsArr.length) {
                //すべての問いが解答されていたら、結果のデータを更新する
                scoreCounter(result, selected, app);
                return;
            } else {
                //未回答の問いがあった場合、警告演出を出す
                instructionElm.innerText = "未回答の問題がありますが、よろしいですか？";
                e.target.innerText = "Yes";
                alert = true;
            } 
        } else {
            //すでに警告されていた場合は、そのまま結果のデータを更新する
            scoreCounter(result, selected, app);
            return;
        }
    });
    //画面作成
    replaceView(parentElm, app);
};