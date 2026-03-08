//復習用の短文問題の追加、削除
export const fetchShortIncorrectQ = async (data, mode) => {
    //ゲームモードに応じてリクエストメソッドを変更
    let changeEndpoint;
    let reqMethod;
    if (mode === "Practice") {
        changeEndpoint = "post";
        reqMethod = "POST";
    } else {
        changeEndpoint = "delete";
        reqMethod = "DELETE";
    }
    //復習用の短文問題の追加、削除のリクエスト
    const { userId, level, englishSentence, japaneseSentence, answer, explanation }
        = data;
    const res = await fetch(`/${changeEndpoint}IncorrectShort`, {
        method: reqMethod,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                userId,
                level,
                englishSentence,
                japaneseSentence,
                answer,
                explanation
            }
        )
    });
    const result = await res.json();
};