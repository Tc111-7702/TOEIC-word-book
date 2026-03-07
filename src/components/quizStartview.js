import { replaceView } from "../utils/replaceView.js";

//クイズスタート画面
export const quizStartView = (app) => {
    //クラス変数
    const type = app.quizState.type;
    const level = app.quizState.level;
    const minutes = app.quizState.timeLeft.minutes;
    //制限時間の補正
    if (type === "Short") {
        if (minutes !== 4 && minutes !== 3) { 
            app.quizState.timeLeft.minutes = 6;
            app.quizState.difficulty = "normal";
        }
    } else {
        if (minutes !== 15 && minutes !== 10) { 
            app.quizState.timeLeft.minutes = 20;
            app.quizState.difficulty = "normal";
        }
    }
    //DOMの生成 
    const parentElm = document.createElement("div");
    const html = `
        <h1 class="start-title">
            <span class="type-text">${type} Sentences</span>
            <span class="level-text">Level ${level}</span>
        </h1>
        <button class="startBtn">Start</button>
        <button class="settingViewBtn">Setting</button>
        <button class="backBtn">Back</button>
    `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const startBtnElm = parentElm.querySelector(".startBtn");
    const settingBtnElm = parentElm.querySelector(".settingViewBtn");
    const backBtnElm = parentElm.querySelector(".backBtn");
    //イベントリスナ
    backBtnElm.addEventListener("click", () => app.levelSelectView());
    startBtnElm.addEventListener("click", () => {
        app.quizState.index = 0;
        app.setTimer();
        if (type === "Short") {
            app.shortQuizView();
        } else {
            app.longQuizView();
        }            
    });
    settingBtnElm.addEventListener("click", () => app.settingView());
    //画面作成
    replaceView(parentElm, app);
};