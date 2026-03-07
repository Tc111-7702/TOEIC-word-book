//復習用の長文問題の追加、削除
export const fetchLongIncorrectQ = async (data, mode) => {
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
    //復習用の長文問題の追加、削除のリクエスト
    const { userId, level, englishText, japaneseText, answers, explanation }
        = data;
    const res = await fetch(`/${changeEndpoint}IncorrectLong`, {
        method: reqMethod,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                userId,
                level,
                englishText,
                japaneseText,
                answers,
                explanation
            }
        )
    });
    const result = await res.json();
};