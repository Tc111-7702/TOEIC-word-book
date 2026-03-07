//新規登録
export const signUp = async (data, app) => {
    //エラーメッセージのDOMを取得
    const nameErrElm = app.rootElm.querySelector(".name-error");
    const emailErrElm = app.rootElm.querySelector(".email-error");
    const passwordErrElm = app.rootElm.querySelector(".password-error"); 
    nameErrElm.textContent = "";
    //新規登録をリクエスト
    const res = await fetch("/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                name: data.name,
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
    //名前が入力されていない場合
    if (!data.name) {
        nameErrElm.textContent = "ユーザー名を入力してください。"
    }
    //エラーメッセージを画面に反映
    emailErrElm.textContent = result.emailErr || "";
    passwordErrElm.textContent = result.passwordErr || "";
    //新規登録成功
    if (result.message === "新規登録成功") {
        //クラス変数の更新
        await app.fetchPlayerData(result.userId);
        app.makeClearedData(app.playerData);
        //トップ画面に遷移
        app.topView();
    }
};