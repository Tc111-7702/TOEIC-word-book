import { replaceView } from "../utils/replaceView.js";

//パスワード再設定画面
export const resetPasswordView = (app) => {
    //DOMの生成
    const parentElm = document.createElement("div");
    const html = `
        <h1>Reset Password</h1>
        <div class="login">
            <form action="">
                <div class="email">
                    <label class="email-label">Email</label>
                    <input type="email" class="email-input"/>
                    <div class="email-error error-message"></div>
                </div>
                <div class="password">
                    <label class="password-label">Password</label>
                    <input type="password" class="password-input firstPsInput"/>
                    <div class="password-error error-message firstPsErrMg"></div>
                </div>
                <div class="password">
                    <label class="password-label">Re-enter Password</label>
                    <input type="password" class="password-input confirmPsInput"/>
                    <div class="password-error error-message confirmPsErrMg"></div>
                </div>
                <button class="successBtn">Log in</button>
            </form>
        </div>
        <button class="backBtn">Back</button>
    `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const emailInput = parentElm.querySelector(".email-input");
    const firstPsInput = parentElm.querySelector(".firstPsInput");
    const confirmPsInput = parentElm.querySelector(".confirmPsInput");
    const successBtnElm = parentElm.querySelector(".successBtn");
    const backBtnElm = parentElm.querySelector(".backBtn");
    //戻るボタン
    backBtnElm.addEventListener("click", () => app.loginView());
    //パスワード再設定ボタン
    successBtnElm.addEventListener("click", (e) => {
        e.preventDefault();
        //入力データ
        const inputData = {
            email: emailInput.value,
            password: firstPsInput.value,
            confirmPassword: confirmPsInput.value
        };
        //パスワード再設定のリクエストを出す
        app.resetPassword(inputData);
    });
    //画面作成
    replaceView(parentElm, app);
};