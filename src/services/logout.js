//ログアウト
export const logout = async (app) => {
    try {
        //ログアウトをリクエスト
        const res = await fetch("http://localhost:3000/logout", {
            method: "POST", 
            credentials: "include" 
        });

        //ページを強制リロード
        if (res.ok) {
            window.location.href = "index.html"; 
        }
        //ログイン画面に遷移
        app.loginView();
    } catch (err) {
        console.error("ログアウト失敗:", err);
    }
};