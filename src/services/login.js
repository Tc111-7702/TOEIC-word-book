//ログイン
export const login = async (data, app) => {
    //エラーメッセージのDOMを取得
    const emailErrElm = app.rootElm.querySelector(".email-error");
    const passwordErrElm = app.rootElm.querySelector(".password-error"); 
    //ログインのリクエスト
    const res = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                email: data.email,
                password: data.password
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
    passwordErrElm.textContent = result.passwordErr || "";
    //ログイン成功
    if (result.message === "ログイン成功") {
        await app.fetchPlayerData(result.userId);
        app.makeClearedData(app.playerData);
        app.topView();
    }
};