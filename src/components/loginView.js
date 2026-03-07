import { replaceView } from "../utils/replaceView.js";

//ログイン画面
export const loginView = (app) => {
    //DOMの生成 
    const parentElm = document.createElement("div");
    const html = `
        <h1>TOEIC Word Book</h1>
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
                <button class="successBtn">Log in</button>
                <a href="" class="forgotPassword">Forgot your password?</a>
                <button class="signUpBtn">Create Account</button>
            </form>
        </div>
    `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const emailInput = parentElm.querySelector(".email-input");
    const passwordInput = parentElm.querySelector(".password-input");
    const successBtnElm = parentElm.querySelector(".successBtn");
    const forgotPasswordElm = parentElm.querySelector(".forgotPassword");
    const signUpBtnElm = parentElm.querySelector(".signUpBtn");

    //ログインボタン
    successBtnElm.addEventListener("click", (e) => {
        e.preventDefault();
        //入力情報
        const inputData = {
            email: emailInput.value,
            password: passwordInput.value
        };
        //ログインのリクエストを出す
        app.login(inputData);
    });
    //パスワードを忘れた場合
    forgotPasswordElm.addEventListener("click", (e) => {
        e.preventDefault();
        app.resetPasswordView();
    });
    //新規登録ボタン
    signUpBtnElm.addEventListener("click", (e) => app.signUpView());
    //画面作成
    replaceView(parentElm, app);
};