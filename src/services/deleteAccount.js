//アカウント削除
export const deleteAccount = async (data, app) => {
    //エラーメッセージのDOMを取得
    const emailErrElm = app.rootElm.querySelector(".email-error");
    const passwordErrElm = app.rootElm.querySelector(".password-error");
    //アカウント削除のリクエスト
    const { userId, email, password } = data;
    const res = await fetch("http://localhost:3000/deleteAccount", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            userId,
            email,
            password
        }),
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
    //アカウント削除成功
    if (result.message === "アカウントを削除しました") {
        app.init();
    }
}; 