//パスワードの再設定
export const resetPassword = async (data, app) => {
    //エラーメッセージのDOMを取得
    const emailErrElm = app.rootElm.querySelector(".email-error"); 
    const firstPsErrElm = app.rootElm.querySelector(".firstPsErrMg");
    const confirmPsErrElm = app.rootElm.querySelector(".confirmPsErrMg");

    //パスワードの再設定をリクエスト
    const res = await fetch("/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword
            }
        ),
        credentials: "include"
    });
    const result = await res.json();
    console.log(
        {
            statusCode: res.status,
            result
        }
    );
    //エラーメッセージを画面に反映
    emailErrElm.textContent = result.emailErr || "";
    firstPsErrElm.textContent = result.passwordErr || "";
    confirmPsErrElm.textContent = result.confirmPasswordErr || "";
    //パスワード再設定成功
    if (result.message === "パスワードの再設定完了") {
        //クラス変数の更新
        app.userId = result.userId;
        await app.fetchPlayerData(result.userId);
        app.makeClearedData(app.playerData);
        //トップ画面に遷移
        app.topView();
    }
};