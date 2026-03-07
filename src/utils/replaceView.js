//画面の作成、遷移
export const replaceView = (elm, app) => {
    //画面のリセット
    app.rootElm.innerHTML = "";
    //画面の遷移
    app.rootElm.appendChild(elm);
}