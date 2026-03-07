import { renderTimeLimit } from "./renderTimeLimit.js";
import { quizFinishView } from "../components/quizFinishView.js";

//クラス変数にタイマーを設定
export const setTimer = (app) => {
    if (app.quizState.intervalKey !== null) {
        throw new Error("まだタイマーが動いています");
    }
    //セットタイマー
    app.quizState.intervalKey = setInterval(() => {
        //残り時間の秒換算し、これを更新する
        let convertSeconds = app.quizState.timeLeft.minutes * 60 + app.quizState.timeLeft.seconds;
        convertSeconds--;
        if (convertSeconds > 0) {
            //残り時間がある場合
            app.quizState.timeLeft.minutes = Math.floor(convertSeconds / 60);
            app.quizState.timeLeft.seconds = convertSeconds % 60;
            //クイズ画面に残り時間を描画
            renderTimeLimit(convertSeconds, app);
        } else {
            if (app.quizState.gameMode === "Practice") {
                //残り時間がない場合
                //クイズ終了画面に遷移
                quizFinishView(false, app);
            }           
        }     
    }, 1000);
};