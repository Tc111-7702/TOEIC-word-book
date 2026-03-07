import { replaceView } from "../utils/replaceView.js";

//成績画面
export const achievementView = (app) => {
    //定数
    const maxlevel = 4;
    const maxDifficulty = 3;
    const difficulties = ["Normal", "Hard", "Extreme"];
    //短文問題、長文問題のプレイヤーデータを分離
    const shortQuestionsData = app.playerData.filter(data => data.type === "short");
    const longQuestionsData = app.playerData.filter(data => data.type === "long");
    const allShortQAchElmArr = [];
    const allLongQAchElmArr = [];
    //クリア状況に応じてクリア状況を表すHTMLを変化させる
    const achievementStatus = (cleared) => {
        if (cleared) {
            return '<p class="achStatus green">cleared! ✔</p>';
        } else {
            return '<p class="achStatus blue">Not Acieved</p>';
        }
    }
    //全レベルにおいて処理
    for (let i = 0; i < maxlevel; i++) {
        //クリア状況を判定し、クリア状況を表すHTMLを配列に格納する
        const shortQAchElmArr = [];
        const longQAchElmArr = [];
        const shortNormalCleared = shortQuestionsData.find(data => 
            data.level === i + 1 && data.difficulty === "normal"
        ).cleared;
        shortQAchElmArr.push(achievementStatus(shortNormalCleared));
        const shortHardCleared = shortQuestionsData.find(data => 
            data.level === i + 1 && data.difficulty === "hard"
        ).cleared;
        shortQAchElmArr.push(achievementStatus(shortHardCleared));
        const shortExtremeCleared = shortQuestionsData.find(data => 
            data.level === i + 1 && data.difficulty === "extreme"
        ).cleared;
        shortQAchElmArr.push(achievementStatus(shortExtremeCleared));
        const longNormalCleared = longQuestionsData.find(data => 
            data.level === i + 1 && data.difficulty === "normal"
        ).cleared;
        longQAchElmArr.push(achievementStatus(longNormalCleared));
        const longHardCleared = longQuestionsData.find(data => 
            data.level === i + 1 && data.difficulty === "hard"
        ).cleared;
        longQAchElmArr.push(achievementStatus(longHardCleared));
        const longExtremeCleared = longQuestionsData.find(data => 
            data.level === i + 1 && data.difficulty === "extreme"
        ).cleared;
        longQAchElmArr.push(achievementStatus(longExtremeCleared));
        for (let j = 0; j < maxDifficulty; j++) {
            //各セクションのHTMLを配列に格納
            allShortQAchElmArr.push(`
                    <div class="acievement">
                        <p class="typeElm">Short Sentences</p>
                        <p class="levelElm">Level${i + 1}</p>
                        <p class="difficultyElm">${difficulties[j]}</p>
                        ${shortQAchElmArr[j]} 
                    </div>                                   
                `);
            allLongQAchElmArr.push(`
                    <div class="acievement">
                        <p class="typeElm">Long Sentences</p>
                        <p class="levelElm">Level${i + 1}</p>
                        <p class="difficultyElm">${difficulties[j]}</p>
                        ${longQAchElmArr[j]} 
                    </div>                                   
                `);
        }
    }

    //DOMの生成
    const parentElm = document.createElement("div");
    parentElm.classList.add("pageAchievement");
    const html = `
        <div class="achievement-page">
            <h1>Achievement</h1>
            <div class="allAcievement">
                <div class="acievements">
                    <h2>Short Sentences</h2>
                    ${allShortQAchElmArr.join("")}
                </div>
                <div class="acievements">
                    <h2>Long Sentences</h2>
                    ${allLongQAchElmArr.join("")}
                </div>
            </div>
            <button class="backBtn">Back</button>
        </div>
    `;
    parentElm.innerHTML = html;
    //戻るボタン
    const backBtnElm = parentElm.querySelector(".backBtn");
    backBtnElm.addEventListener("click", () => app.extra());
    //画面作成
    replaceView(parentElm, app);
};