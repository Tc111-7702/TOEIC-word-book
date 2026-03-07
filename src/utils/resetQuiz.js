//quizStateのリセット
export const resetQuizState = (app) => {
    app.quizState = {
        gameMode: "",
        type: "",
        level: 1,
        quizs: [],
            quizLength: "",
            index: 0,
            timeLeft: {
                minutes: 0,
                seconds: 0,
            },
            intervalKey: null,
            resultData: [],
            score: 0
    }        
}