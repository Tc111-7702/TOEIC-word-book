//clearedDataを更新
export const makeClearedData = (data, app) => {
    //各レベルのクリア状況を格納する配列
    const shortDataArr = [];
    const longDataArr = [];
    //データを短文、長文で分離
    const shortData = data.filter(d => d.type === "short");
    const longData = data.filter(d => d.type === "long");
    //定数
    const maxLevel = 4;
    const maxDifficulty = 3;
    //各レベルで難易度にかかわらず、
    //クリアしてるものが一つでもあればtrue、一つもなければfalseとして配列に格納
    for (let i = 1; i <= maxLevel; i++) {
        let shortCleared = 0;
        let longCleared = 0;
        const thisLevelShortData = shortData.filter(data => data.level === i);
        const thisLevelLongData = longData.filter(data => data.level === i);
        for (let j = 0; j < maxDifficulty; j++) {
            if (thisLevelShortData[j].cleared) {
                shortCleared++;
            }
            if (thisLevelLongData[j].cleared) {
                longCleared++;
            }
        }
        //クリアが一つもない
        if (shortCleared === 0) {
            shortDataArr.push(
                {
                    level: i,
                    type: "Short",
                    challenge: false
                }
            );
        } else {
            //少なくとも一つはクリア
            shortDataArr.push(
                {
                    level: i,
                    type: "Short",
                    challenge: true
                }
            );
        }
        //クリアが一つもない
        if (longCleared === 0) {
            longDataArr.push(
                {
                    level: i,
                    type: "Long",
                    challenge: false
                }
            );
        } else {
            //少なくとも一つはクリア
            longDataArr.push(
                {
                    level: i,
                    type: "Long",
                    challenge: true
                }
            );
        }
    }
    //クラス変数を更新
    app.clearData = {
        shortQuizData: shortDataArr,
        longQuizData: longDataArr
    };
};