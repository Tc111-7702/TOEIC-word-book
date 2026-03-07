//クイズ問題の取得
export const fetchQuiz = async (app) => {
    //クラス変数
    const mode = app.quizState.gameMode;
    const type = app.quizState.type;
    const level = app.quizState.level
    try {
        if (mode === "Practice") {
            //Practiceの場合
            if (type === "Short") {
                //クイズ問題の取得のリクエスト
                const res = await fetch(`/Short/${level}`);
                //クラス変数を更新
                app.quizState.quizs = await res.json();
                app.quizState.quizLength = app.quizState.quizs.length;
                //クイズスタート画面に遷移
                app.quizStartView();
            } else {
                //クイズ問題の取得のリクエスト
                const res = await fetch(`/Long/${level}`);
                //クラス変数を更新
                app.quizState.quizs = await res.json();
                app.quizState.quizLength = app.quizState.quizs.length;
                //クイズスタート画面に遷移
                app.quizStartView();
            }
        } else {
            //Reviewの場合
            if (type === "Short") {
                //クイズ問題の取得のリクエスト
                const res = await fetch(`/Short/0`);
                if (!res.ok) {
                    //レスポンスがエラーの場合
                    alert("復習用の問題数が足りません");
                } else {
                    //クラス変数を更新
                    app.quizState.quizs = await res.json();
                    app.quizState.quizLength = app.quizState.quizs.length;
                    //短文クイズ画面に遷移
                    app.shortQuizView();
                }
            } else {
                //クイズ問題の取得のリクエスト
                const res = await fetch(`/Long/0`);
                if (!res.ok) {
                    //レスポンスがエラーの場合
                    alert("復習用の問題数が足りません");
                } else {
                    //クラス変数を更新
                    app.quizState.quizs = await res.json();
                    app.quizState.quizLength = app.quizState.quizs.length;
                    //長文クイズ画面に遷移
                    app.longQuizView();
                }
            }
        }       
    } catch (err) {
        app.rootElm.innerText = "問題の読み込みに失敗しました";
        console.log(err.message);
    }  
};