import { replaceView } from "../utils/replaceView.js";

//設定画面
export const settingView = (app) => {
    const type = app.quizState.type;
    //typeによる各難易度の制限時間を変える
    const settingObj = {
        normal: "",
        hard: "",
        extreme: ""
    };
    if (type === "Short") {
        settingObj.normal = 6;
        settingObj.hard = 4;
        settingObj.extreme = 3;
    } else {
        settingObj.normal = 20;
        settingObj.hard = 15;
        settingObj.extreme = 10;
    }
    //DOMの生成  
    const parentElm = document.createElement("div");
    const html = `
        <div class="setting">
            <h1>Time Limit Setting</h1>
            <div class="setting-item">
                <p class="time">Normal</p>
                <button class="settingOptionBtn" data-option="0">
                    ${settingObj.normal}Minutes
                </button>
            </div>                
            <div class="setting-item">
                <p class="time">Hard</p>
                <button class="settingOptionBtn" data-option="1">
                    ${settingObj.hard}Minutes
                </button>
            </div>
            <div class="setting-item">
                <p class="time">Extreme</p>
                <button class="settingOptionBtn" data-option="2">
                    ${settingObj.extreme}Minutes
                </button>
            </div>
            <button class="setBtn">Set</button>
        </div>
    `;
    parentElm.innerHTML = html;
    //DOM要素取得
    const optionBtnsElm = parentElm.querySelectorAll("[data-option]");
    const optionLen = optionBtnsElm.length;
    const settingBtnElm = parentElm.querySelector(".setBtn");

    //設定ボタンのCSSを初期化
    for (let i = 0; i < optionLen; i++) {
        optionBtnsElm[i].classList.remove("onClicked");
    }
    //クラス変数の初期状態によって設定ボタンのCSSを変える
    if (type === "Short") {
        switch (app.quizState.timeLeft.minutes) {
            case 6:
                optionBtnsElm[0].classList.add("onClicked");
                break;
            case 4:
                optionBtnsElm[1].classList.add("onClicked");
                break;
            case 3:
                optionBtnsElm[2].classList.add("onClicked");
                break;
            default:
                app.quizState.timeLeft.minutes = 6;
                optionBtnsElm[0].classList.add("onClicked");
                break;
        }
    } else {
        switch (app.quizState.timeLeft.minutes) {
            case 20:
                optionBtnsElm[0].classList.add("onClicked");
                break;
            case 15:
                optionBtnsElm[1].classList.add("onClicked");
                break;
            case 10:
                optionBtnsElm[2].classList.add("onClicked");
                break;
            default:
                app.quizState.timeLeft.minutes = 20;
                optionBtnsElm[0].classList.add("onClicked");
                break;
        }
    }
    
    //選択された制限時間のボタンのデータ属性を取得し、CSSを付加
    let clickedBtnVal;
    for (let i = 0; i < optionLen; i++) {
        optionBtnsElm[i].addEventListener("click", (e) => {
            for (let i = 0; i < optionLen; i++) {
                optionBtnsElm[i].classList.remove("onClicked");
            }
            clickedBtnVal = e.target.dataset.option;
            e.target.classList.add("onClicked");
        });
    }
    
    //設定ボタン
    settingBtnElm.addEventListener("click", () => {
        //選ばれたボタンに応じて、クラス変数を更新
        if (type === "Short") {
            switch (clickedBtnVal) {
                case "0":
                    app.quizState.timeLeft.minutes = 6;
                    app.quizState.difficulty = "normal";
                    break;
                case "1":
                    app.quizState.timeLeft.minutes = 4;
                    app.quizState.difficulty = "hard";
                    break;
                case "2":
                    app.quizState.timeLeft.minutes = 3;
                    app.quizState.difficulty = "extreme";
                    break;
            }
        } else {
            switch (clickedBtnVal) {
                case "0":
                    app.quizState.timeLeft.minutes = 20;
                    app.quizState.difficulty = "normal";
                    break;
                case "1":
                    app.quizState.timeLeft.minutes = 15;
                    app.quizState.difficulty = "hard";
                    break;
                case "2":
                    app.quizState.timeLeft.minutes = 10;
                    app.quizState.difficulty = "extreme";
                    break;
            }
        }
        //クイズスタート画面に戻る
        app.quizStartView();
    });
    //画面作成
    replaceView(parentElm, app);
};