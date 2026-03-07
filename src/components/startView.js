import { replaceView } from "../utils/replaceView.js";

//スタート画面
export const startView = (app) => {
    //ゲームモードリセット
    app.quizState.gameMode = "";
    //DOMの生成
    const parentElm = document.createElement("div");
    const html = `
        <h1>TOEIC Word Book</h1>
        <button class="practiceBtn">Practice</button>
        <button class="reviewBtn">Review</button>
        <button class="libraryBtn">Library</button>
        <button class="backBtn">Back</button>
    `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const practiceBtnElm = parentElm.querySelector(".practiceBtn");
    const reviewBtnElm = parentElm.querySelector(".reviewBtn");
    const libraryBtnElm = parentElm.querySelector(".libraryBtn");
    const backBtnElm = parentElm.querySelector(".backBtn");
    //イベントリスナ(各画面に遷移)
    backBtnElm.addEventListener("click", () => app.topView());
    practiceBtnElm.addEventListener("click", () => {
        app.quizState.gameMode = "Practice";
        app.typeSelectView();
    });
    reviewBtnElm.addEventListener("click", () => {
        app.quizState.gameMode = "Review";
        app.typeSelectView();
    })
    libraryBtnElm.addEventListener("click", () => {
        app.quizState.gameMode = "Library";
        app.levelSelectView();
    });
    //画面作成
    replaceView(parentElm, app);
};