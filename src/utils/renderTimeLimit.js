//制限時間の経過を描画
export const renderTimeLimit = (convertSeconds, app) => {
    //クイズ画面のDOM
    const quizElm = app.rootElm.querySelector(".quiz");
    const timerElm = quizElm.querySelector(".timer");
    //秒の表示
    if (app.quizState.timeLeft.seconds < 10) {
        timerElm.innerText = `TimeLeft: ${app.quizState.timeLeft.minutes}m0${app.quizState.timeLeft.seconds}s`;
    } else {
        timerElm.innerText = `TimeLeft: ${app.quizState.timeLeft.minutes}m${app.quizState.timeLeft.seconds}s`;
    }
    //残り30秒になったら演出を変化
    if (convertSeconds <= 30) {
        timerElm.classList.add("alert");
    }
};