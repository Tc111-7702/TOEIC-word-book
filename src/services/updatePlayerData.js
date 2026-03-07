//ユーザーデータの更新
export const updatePlayerData = async (data) => {
    //ユーザーデータの更新をリクエスト
    const { userId, type, level, difficulty } = data;
    const res = await fetch(`/updatePlayerData`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                userId,
                type,
                level,
                difficulty
            }
        )
    });
    const result = await res.json();
    console.log(
        {
            statusCode: res.status,
            result
        }
    );
};