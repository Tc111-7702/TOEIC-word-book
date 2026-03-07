//全単語の取得
export const fetchWord = async (app) => {
    try {
        //全単語の取得のリクエスト
        const res = await fetch("http://localhost:3000/allWords");
        //クラス変数を更新
        app.wordData = await res.json();
    } catch (err) {
        app.rootElm.innerText = "単語の読み込みに失敗しました";
        console.log(err.message);
    }
};