import { replaceView } from "../utils/replaceView.js";

//クイズ終了画面
export const quizFinishView = (finished, app) => {
    //タイマーをリセット
    clearInterval(app.quizState.intervalKey);
    app.quizState.intervalKey = null;
    //終了時のメッセージ(制限時間に間に合ったかどうかで変化)
    let finishMessage;
    //制限時間に間に合わなかった場合
    if (!finished) {
        //未回答の分のresultDataを処理
        const IncompletedQLen = app.quizState.quizLength - app.quizState.index;
        if (app.quizState.type === "Short") {
            //短文問題の場合
            for (let i = 0; i < IncompletedQLen; i++) {
                app.quizState.resultData.push(
                    {
                        index: app.quizState.index + i,
                        options: app.quizState.quizs[app.quizState.index + i].options,
                        selected: "",
                        result: false,
                        checked: "✖",
                        checkedColorClass: "red" 
                    }
                );
            } 
        } else {
            for (let i = 0; i < IncompletedQLen; i++) {
                //長文問題の場合
                const selected = [];
                const result = [];
                const checkedForLong = [];
                const checkedColorClassForLong = [];
                for (let j = 0; j < app.quizState.quizs[i].correctsAndOptionsArr.length; j++) {
                    selected.push(false);
                    result.push(false);
                    checkedForLong.push("✖");
                    checkedColorClassForLong.push("red");
                }
                app.quizState.resultData.push(
                    {
                        index: app.quizState.index + i,
                        correctsAndOptionsArr: app.quizState.quizs[app.quizState.index + i].correctsAndOptionsArr,
                        selected,
                        result,
                        checkedForLong,
                        checkedColorClassForLong
                    }
                );
            }
        }    
        finishMessage = "Time's up!";
    } else {
        finishMessage = "Finish!";
    }
    //Reviewモードの時は演出を変化
    let Review = "";
    if (app.quizState.gameMode === "Review") {
        Review = " Review";
    }
    //DOMの生成 
    const parentElm = document.createElement("div");
    const html = `
            <div class="finshedDisp">
                <h1>${app.quizState.type} Sentences${Review}</h1>
                <h1 class="finishMg">${finishMessage}</h1>
                <div class="finishMessage">
                    Thanks for your hard work!
                </div>
                <div class="toResultMessage">
                    Let’s see the results
                </div>
                <button class="toResultBtn">
                    See The Result
                </button>
            </div>                    
        `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const finishMgElm = parentElm.querySelector(".finishMg");
    const ToResBtnElm = parentElm.querySelector(".toResultBtn");
    //Reviewモードの時は演出を変化
    if (app.quizState.gameMode === "Review") {
        finishMgElm.textContent = "Finish!";
    }
    //結果ボタン(結果画面に遷移)
    ToResBtnElm.addEventListener("click", () => {
        if (app.quizState.type === "Short") {
            app.shortQuizResultView();
        } else {
            app.longQuizResultView();
        }
    });
    //画面作成
    replaceView(parentElm, app);
};