import { replaceView } from "../utils/replaceView.js";

//Library画面
export const libraryView = (level, app) => {
    //このレベルの単語集
    const thisLevelWords = app.wordData.filter(data => data.level === level);
    //１ページ当たり表示する単語数
    const listIndexPerPage = 5;
    //左右それぞれのページに表示するDOMを格納する配列
    const allLeftPageLibraryArr = [];
    const allRightPageLibraryArr = [];
    //見開きのDOMを生成する関数
    const makeLibraryList = (i) => {
        return `
            <div class="libraryList">
                <div class="match">
                    <p class="english">${thisLevelWords[i].english}</p>
                    <p class="japanese">${thisLevelWords[i].japanese.join(", ")}  <span class="partOfSpeech">${thisLevelWords[i].partOfSpeech}</span></p>
                </div>
                <div class="exampleSentence">
                    <p class="englishES">
                        ${thisLevelWords[i].englishExampleSentence
                            .replace(/\*\*(.*?)\*\*/g, '<span class="vermilion">$1</span>')}
                    </p>
                    <p class="japaneseES">
                        ${thisLevelWords[i].japaneseExampleSentence
                            .replace(/\*\*(.*?)\*\*/g, '<span class="vermilion">$1</span>')}
                    </p>
                </div>
            </div>
        `;
    };
    //左右それぞれのページに表示するDOMを配列に格納
    //左右両面すべての単語が埋まる単語の処理
    for (let i = 0; i < Math.floor(thisLevelWords.length / listIndexPerPage); i++) {
        //単語一つのDOMを配列に格納
        const eachLeftPageLibraryArr = [];
        const eachRightPageLibraryArr = [];
        for (let j = 0; j < listIndexPerPage; j++) {
            const libararyList = makeLibraryList(j + i * listIndexPerPage);
            if (i % 2 === 0) {
                eachLeftPageLibraryArr.push(libararyList);
            } else {
                eachRightPageLibraryArr.push(libararyList);
            }
        }
        //１ページ当たりのDOMを配列に格納
        if (i % 2 === 0) {
            allLeftPageLibraryArr.push(eachLeftPageLibraryArr.join(""));
        } else {
            allRightPageLibraryArr.push(eachRightPageLibraryArr.join(""));
        }            
    }

    //左右両面すべての単語が埋まらない単語の処理
    const remainder = thisLevelWords.length % (listIndexPerPage * 2);
    if (remainder >= 1 && remainder <= 5) {
        //右ページが余る場合
        const eachLeftPageLibraryArr = [];
        for (let i = 1; i < remainder; i++) {
            const libararyList = makeLibraryList(thisLevelWords.length - remainder + i);
            eachLeftPageLibraryArr.push(libararyList);
        }
        allLeftPageLibraryArr.push(eachLeftPageLibraryArr.join(""));
    } else if (remainder >= 6) {
        //右ページが余らない場合
        const eachRightPageLibraryArr = [];
        for (let i = 0; i < remainder - listIndexPerPage; i++) {
            const libararyList = makeLibraryList(thisLevelWords.length - remainder + listIndexPerPage + i);
            eachRightPageLibraryArr.push(libararyList);
        }
        allRightPageLibraryArr.push(eachRightPageLibraryArr.join(""));
    }

    //DOMの生成
    const parentElm = document.createElement("div");
    const html = `
        <h1 class="libraryLevel">Level${level}</h1>
        <div class="pageLibrary">
            <div class="leftPage">
                <div class="leftPageElm"></div>
                <p class="leftpageIndex"></p>
            </div>
            <div class="rightPage">
                <div class="rightPageElm"></div>
                <p class="rightPageIndex"></p>
            </div>
        </div>
        <div class="changePageBtns">
            <button class="prevPageBtn">☚ PrevPage</button>
            <button class="nextPageBtn">☛ NextPage</button>
        </div>
        <button class="libraryBackBtn">Back to LevelSelect</button>
    `;
    parentElm.innerHTML = html;

    //DOM要素取得
    const leftPageElm = parentElm.querySelector(".leftPageElm");
    const rightPageElm = parentElm.querySelector(".rightPageElm");
    const leftpageIndex = parentElm.querySelector(".leftpageIndex");
    const rightPageIndex = parentElm.querySelector(".rightPageIndex");
    const prevPageBtnElm = parentElm.querySelector(".prevPageBtn");
    const nextPageBtnElm = parentElm.querySelector(".nextPageBtn");
    const libraryBackBtnElm = parentElm.querySelector(".libraryBackBtn");

    //ページのインデックスの初期化(1,2ページ目)
    let index = 0;
    //初期状態ではPrevボタンは隠す
    prevPageBtnElm.style.display = "none";

    //ページ遷移
    const updateLibrary = (i) => {
        leftPageElm.innerHTML = allLeftPageLibraryArr[i];
        leftpageIndex.innerText = i * 2 + 1;
        rightPageElm.innerHTML = allRightPageLibraryArr[i];
        rightPageIndex.innerText = i * 2 + 2;
    };
    
    //前のページに遷移した時のボタン要素、ページのインデックスの、UIの更新
    const makePrevPagesLibrary = () => {
        index--;
        nextPageBtnElm.style.display = "flex";
        rightPageElm.style.display = "block";
        rightPageIndex.style.display = "block";
        updateLibrary(index);
        if (index === 0) {
            prevPageBtnElm.style.display = "none";
        }
    };
    
    //次のページに遷移した時のボタン要素、ページのインデックスの、UIの更新
    const makeNextPagesLibrary = () => {
        index++;
        prevPageBtnElm.style.display = "flex";
        updateLibrary(index);
        if ((thisLevelWords.length - listIndexPerPage * (index + 1) * 2) <= 0) {
            nextPageBtnElm.style.display = "none";
        }
        
        if (thisLevelWords.length - listIndexPerPage * (index + 1) * 2 <= -5) {
            rightPageElm.style.display = "none";
            rightPageIndex.style.display = "none";
        }
    };

    //イベントリスナ
    libraryBackBtnElm.addEventListener("click", () => app.levelSelectView());
    prevPageBtnElm.addEventListener("click", () => makePrevPagesLibrary());
    nextPageBtnElm.addEventListener("click", () => makeNextPagesLibrary());

    //1,2ページ目の画面作成
    updateLibrary(index);
    replaceView(parentElm, app); 
};