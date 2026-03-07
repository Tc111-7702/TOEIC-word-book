import { replaceView } from "../utils/replaceView.js";

//タイプ選択画面
export const typeSelectView = (app) => {
    //タイプをリセット
    app.quizState.type = "";
    //DOMの生成
    const parentElm = document.createElement("div");
    const html = `
        <h1>${app.quizState.gameMode}</h1>
        <button class="shortStcBtn">Short Sentences</button>
        <button class="longStcBtn">Long Sentences</button>
        <button class="backBtn">Back</button>
    `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const shortStcBtnElm = parentElm.querySelector(".shortStcBtn");
    const longStcBtnElm = parentElm.querySelector(".longStcBtn");
    const backBtnElm = parentElm.querySelector(".backBtn");
    //戻るボタン
    backBtnElm.addEventListener("click", () => app.startView());
    if (app.quizState.gameMode === "Practice") {
        //Pracitceモードの場合
        //ShortSentencesボタン
        shortStcBtnElm.addEventListener("click", () => {
            app.quizState.type = "Short";
            //制限時間の初期化
            if (app.quizState.timeLeft.minutes === 0) {
                app.quizState.timeLeft.minutes = 6;
            }
            //レベル選択画面に遷移
            app.levelSelectView();    
        });
        //LongSentencesボタン
        longStcBtnElm.addEventListener("click", () => {
            app.quizState.type = "Long";
            //制限時間の初期化
            if (app.quizState.timeLeft.minutes === 0) {
                app.quizState.timeLeft.minutes = 20;
            }
            //レベル選択画面に遷移
            app.levelSelectView()
        });
    } else {
        //Reviewモードの場合
        //ShortSentencesボタン
        shortStcBtnElm.addEventListener("click", () => {
            app.quizState.type = "Short";
            //問題取得のリクエスト
            app.fetchQuiz();
        });
        //LongSentecesボタン
        longStcBtnElm.addEventListener("click", () => {
            app.quizState.type = "Long";
            //問題取得のリクエスト
            app.fetchQuiz();
        });
    }
    //画面作成    
    replaceView(parentElm, app);
};