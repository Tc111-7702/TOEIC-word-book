//プレイヤーデータの取得
export const fetchPlayerData = async (userId, app) => {
    try {
        //プレイヤーデータの取得をリクエスト
        const res = await fetch(`/playerData/${userId}`);
        //クラス変数を更新
        app.playerData = await res.json();
    } catch (err) {
        app.rootElm.innerText = "問題の読み込みに失敗しました";
        console.log(err.message);
    }    
};