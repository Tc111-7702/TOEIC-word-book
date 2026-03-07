import { replaceView } from "../utils/replaceView.js";

//アカウント削除画面
export const deleteAccountView = (app) => {
    //DOMの生成
    const parentElm = document.createElement("div");
    const html = `
        <p class="instruction">本当にログアウトしてもよろしいですか？</p>
        <h1>Delete Account</h1>
        <div class="login">
            <form action="">
                <div class="email">
                    <label class="email-label">Email</label>
                    <input type="email" class="email-input"/>
                    <div class="email-error error-message"></div>
                </div>
                <div class="password">
                    <label class="password-label">Password</label>
                    <input type="password" class="password-input"/>
                    <div class="password-error error-message"></div>
                </div>
                <button class="successBtn">Delete</button>
            </form>
        </div>
        <div class="finalDecisions">
            <button class="yesBtn">Yes</button>
            <button class="noBtn">No</button>
        </div>
        <button class="backBtn">Back</button>
    `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const instructionElm = parentElm.querySelector(".instruction");
    const emailInputElm = parentElm.querySelector(".email-input");
    const passwordInputElm = parentElm.querySelector(".password-input");
    const successBtnElm = parentElm.querySelector(".successBtn");
    const backBtnElm = parentElm.querySelector(".backBtn");
    const finalDecisionsElm = parentElm.querySelector(".finalDecisions")
    const yesBtnElm = parentElm.querySelector(".yesBtn");
    const noBtnElm = parentElm.querySelector(".noBtn");

    //警告の演出を初期化
    instructionElm.style.display = "none";
    finalDecisionsElm.style.display = "none";
    successBtnElm.style.display = "inline-block";
    //戻るボタン
    backBtnElm.addEventListener("click", () => app.extra());
    //アカウント削除ボタン
    successBtnElm.addEventListener("click", (e) => {
        e.preventDefault();
        //警告の演出
        instructionElm.style.display = "block";
        finalDecisionsElm.style.display = "block";
        successBtnElm.style.display = "none";    
    });
    //Noボタン
    noBtnElm.addEventListener("click", () => {
        //警告の演出の削除
        instructionElm.style.display = "none";
        finalDecisionsElm.style.display = "none";
        successBtnElm.style.display = "inline-block";
    });
    //Yesボタン
    yesBtnElm.addEventListener("click", () => {
        //入力データ
        const inputData = {
            userId: app.userId,
            email: emailInputElm.value,
            password: passwordInputElm.value
        };
        //アカウント削除のリクエストを出す
        app.deleteAccount(inputData);
    });
    //画面作成
    replaceView(parentElm, app);
};