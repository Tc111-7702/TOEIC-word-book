//認証確認
export const checkAuthStatus = async (app) => {
    try {
        //認証確認のリクエスト
        const res = await fetch("/verify", {
            method: "GET",
            credentials: "include" 
        });

        const data = await res.json();
        //ログイン状態の判定
        if (data.loggedIn) {
            //ログイン状態の場合
            //クラス変数の更新
            app.userId = data.user.id;
            await app.fetchPlayerData(data.user.id);
            app.makeClearedData(app.playerData);
            //トップ画面に遷移
            app.topView();
        } else {
            //ログイン画面に遷移
            app.loginView();
        }
    } catch (err) {
        console.log({ error: err.message });
    }
}; 