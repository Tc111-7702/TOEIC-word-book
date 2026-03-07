import { replaceView } from "../utils/replaceView.js";

//エキストラ画面
export const extra = (app) => {
    //DOMの生成
    const parentElm = document.createElement("div");
    const html = `
        <h1>Extra</h1>
        <button class="explanationBtn">Explanation</button>
        <button class="achievementBtn">Achievement</button>
        <button class="deleteAccountBtn">Delete Account</button>
        <button class="backBtn">Back</button>
    `;
    parentElm.innerHTML = html;

    //DOM要素取得
    const explanationBtnElm = parentElm.querySelector(".explanationBtn");
    const achievementBtnElm = parentElm.querySelector(".achievementBtn");
    const deleteAccountBtnElm = parentElm.querySelector(".deleteAccountBtn");
    const backBtnElm = parentElm.querySelector(".backBtn");

    //次の画面に遷移する各ボタン
    backBtnElm.addEventListener("click", () => app.topView());
    explanationBtnElm.addEventListener("click", () => app.explanationView());
    achievementBtnElm.addEventListener("click", () => app.achievementView());
    deleteAccountBtnElm.addEventListener("click", () => app.deleteAccountView());
    //画面作成
    replaceView(parentElm, app);
};