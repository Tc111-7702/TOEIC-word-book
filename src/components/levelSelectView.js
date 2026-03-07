import { replaceView } from "../utils/replaceView.js";

//レベル選択画面
export const levelSelectView = (app) => {
    //クラス変数
    app.quizState.level = 1;
    app.quizState.quizs = [];
    const type = app.quizState.type;
    //DOMの生成         
    const parentElm = document.createElement("div"); 
    const html = `
        <h1>${type} Sentences</h1>
        <button class="levelBtn" data-level="1">Level1</button>
        <button class="levelBtn" data-level="2">Level2</button>
        <button class="levelBtn" data-level="3">Level3</button>
        <button class="levelBtn" data-level="4">Level4</button>
        <button class="backBtn">Back</button>
    `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const levelBtns = parentElm.querySelectorAll("[data-level]");
    const backBtnElm = parentElm.querySelector(".backBtn");
    //イベントリスナ
    if (app.quizState.gameMode === "Practice") {
        //Practiceモード
        //戻るボタン(Pracitceモードの場合タイプ選択画面に遷移)
        backBtnElm.addEventListener("click", () => app.typeSelectView());
        //レベル１のみデフォルトで挑戦可能
        levelBtns[0].addEventListener("click", () => {
            //レベル設定
            app.quizState.level = 1;
            app.fetchQuiz();
        });
        if (type === "Short") {
            //短文問題
            for (let i = 0; i < app.clearData.shortQuizData.length - 1; i++) {
                if (app.clearData.shortQuizData[i].challenge) {
                    //ひとつ前のレベルをクリアしていた場合
                    levelBtns[i + 1].addEventListener("click", () => {
                        //レベル設定
                        app.quizState.level = i + 2;
                        //クイズ問題をリクエスト
                        app.fetchQuiz();
                    });
                } else {
                    //ひとつ前のレベルをクリアしていなかった場合
                    levelBtns[i + 1].addEventListener("click", () => {
                        alert(`Level${i + 2}に挑戦するには, Level${i + 1}に合格する必要があります`);
                    });
                }
            }
        } else {
            //長文問題
            for (let i = 0; i < app.clearData.longQuizData.length - 1; i++) {
                if (app.clearData.longQuizData[i].challenge) {
                    //ひとつ前のレベルをクリアしていた場合
                    levelBtns[i + 1].addEventListener("click", () => {
                    //レベル設定
                    app.quizState.level = i + 2;
                    //クイズ問題をリクエスト
                    app.fetchQuiz();
                    });
                } else {
                    //ひとつ前のレベルをクリアしていなかった場合
                    levelBtns[i + 1].addEventListener("click", () => {
                        alert(`Level${i + 2}に挑戦するには, Level${i + 1}に合格する必要があります`);
                    });
                }
            }
        } 
    } else {
        //Libraryモード
        //見出しの変更
        parentElm.querySelector("h1").innerText = "Library";
        //戻るボタン(Libraryモードの場合スタート画面に遷移)
        backBtnElm.addEventListener("click", () => app.startView());
        //レベル選択
        for (let i = 0; i < levelBtns.length; i++) {
            levelBtns[i].addEventListener("click", () => app.libraryView(i + 1));
        };
    } 
    //画面作成       
    replaceView(parentElm, app);
};