import { replaceView } from "../utils/replaceView.js";

//新規登録画面
export const signUpView = (app) => {
    //DOMの生成
    const parentElm = document.createElement("div");
    const html = `
        <h1>Create Account</h1>
        <div class="login">
            <form action="">
                <div class="name">
                    <label class="name-label">Name</label>
                    <input type="name" class="name-input"/>
                    <div class="name-error error-message"></div>
                </div>
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
                <button class="successBtn">Sign Up</button>
            </form>
        </div>
        <button class="backBtn">Back</button>
    `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const nameInputElm = parentElm.querySelector(".name-input");
    const emailInputElm = parentElm.querySelector(".email-input");
    const passwordInputElm = parentElm.querySelector(".password-input");
    const successBtnElm = parentElm.querySelector(".successBtn");
    const backBtnElm = parentElm.querySelector(".backBtn");
    //戻るボタン
    backBtnElm.addEventListener("click", () => app.loginView());
    //新規登録ボタン
    successBtnElm.addEventListener("click", (e) => {
        e.preventDefault();
        //入力データ
        const inputData = {
            name: nameInputElm.value,
            email: emailInputElm.value,
            password: passwordInputElm.value
        };
        //新規登録のリクエストを出す
        app.signUp(inputData);
    });
    //画面作成
    replaceView(parentElm, app);
};