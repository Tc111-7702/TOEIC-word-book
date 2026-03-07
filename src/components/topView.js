import { replaceView } from "../utils/replaceView.js";

//トップ画面
export const topView = (app) => {
    //DOMの生成
    const parentElm = document.createElement("div");
    const html = `
        <p class="instruction">本当にログアウトしてもよろしいですか？</p>
        <h1>TOEIC Word Book</h1>
        <button class="playBtn">Let's Play !</button>
        <button class="extraBtn">Extra</button>
        <button class="logoutBtn">Log out</button>
        <div class="finalDecisions">
            <button class="yesBtn">Yes</button>
            <button class="noBtn">No</button>
        </div>   
    `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const instructionElm = parentElm.querySelector(".instruction");
    const playBtnElm = parentElm.querySelector(".playBtn");
    const extraBtnElm = parentElm.querySelector(".extraBtn");
    const logoutBtnElm = parentElm.querySelector(".logoutBtn");
    const finalDecisionsElm = parentElm.querySelector(".finalDecisions");
    const yesBtnElm = parentElm.querySelector(".yesBtn");
    const noBtnElm = parentElm.querySelector(".noBtn");

    //警告の演出を初期化
    instructionElm.style.display = "none";
    finalDecisionsElm.style.display = "none";
    logoutBtnElm.style.display = "inline-block";
    //プレイボタン(スタート画面に遷移)
    playBtnElm.addEventListener("click", () => app.startView());
    //エクストラボタン(エクストラ画面に遷移)
    extraBtnElm.addEventListener("click", () => app.extra());
    //ログアウトボタン
    logoutBtnElm.addEventListener("click", () => {
        //警告の演出
        instructionElm.style.display = "block";
        finalDecisionsElm.style.display = "block";
        logoutBtnElm.style.display = "none";
    });
    //Noボタン
    noBtnElm.addEventListener("click", () => {
        //警告の演出の削除
        instructionElm.style.display = "none";
        finalDecisionsElm.style.display = "none";
        logoutBtnElm.style.display = "inline-block";
    });
    //Yesボタン
    yesBtnElm.addEventListener("click", () => {
        //ログアウトのリクエストを出す
        app.logout();
    });

    //画面作成
    replaceView(parentElm, app);
};