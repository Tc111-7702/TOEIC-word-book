import { checkAuthStatus } from "./services/app.js";
import { login } from "./services/login.js";
import { signUp } from "./services/sighUp.js";
import { resetQuizState } from "./utils/resetQuiz.js";
import { fetchWord } from "./services/fetchWord.js";
import { loginView } from "./components/loginView.js";
import { signUpView } from "./components/signUpView.js";
import { logout } from "./services/logout.js";
import { resetPasswordView } from "./components/resetPasswordView.js";
import { resetPassword } from "./services/resetPassword.js";
import { fetchPlayerData } from "./services/fetchPlayerData.js";
import { makeClearedData } from "./utils/makeClearedData.js";
import { topView } from "./components/topView.js";
import { startView } from "./components/startView.js";
import { typeSelectView } from "./components/typeSelectView.js";
import { levelSelectView } from "./components/levelSelectView.js";
import { fetchQuiz } from "./services/fetchQuiz.js";
import { quizStartView } from "./components/quizStartview.js";
import { settingView } from "./components/settingView.js";
import { shortQuizView } from "./components/shortQuizView.js";
import { longQuizView } from "./components/longQuizView.js";
import { setTimer } from "./utils/setTimer.js";
import { shortQuizResultView } from "./components/shortQuizResultView.js";
import { longQuizResultView } from "./components/longQuizResultView.js";
import { updatePlayerData } from "./services/updatePlayerData.js";
import { fetchShortIncorrectQ } from "./services/fetchShortIncorrectQ.js";
import { fetchLongIncorrectQ } from "./services/fetchLongIncorrectQ.js";
import { libraryView } from "./components/libraryView.js";
import { extra } from "./components/extra.js";
import { explanationView } from "./components/explanationView.js";
import { achievementView } from "./components/achievementView.js";
import { deleteAccount } from "./services/deleteAccount.js";
import { deleteAccountView } from "./components/deleteAccountView.js";

//TOEICWordBookクラス
class TOEICWordBook {

        //全単語のデータ
        wordData =  [];
        //クイズの状態を管理
        quizState = {
            gameMode: "",
            type: "",
            level: 1,
            difficulty: "normal",
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
        //ユーザーID
        userId;
        //プレイヤーデータ
        playerData = [];
        //各レベルのクリア状況を管理
        clearData = [];
    constructor(rootElm) {
        this.rootElm = document.getElementById(rootElm);
    }


    //fetch通信用のメソッド(services)
    async checkAuthStatus() {
        await checkAuthStatus(this);
    }

    async login(data) {
        await login(data, this);
    }

    async signUp(data) {
        await signUp(data, this);
    }

    async logout() {
        await logout(this);
    }

    async resetPassword(data) {
        await resetPassword(data, this);
    }

    async fetchWord() {
        await fetchWord(this);
    }

    async fetchPlayerData(userId) {
        await fetchPlayerData(userId, this);
    }

    async fetchQuiz() {
        await fetchQuiz(this);
    }

    async updatePlayerData(data) {
        await updatePlayerData(data);
    }
    
    async fetchShortIncorrectQ(data, mode) {
        await fetchShortIncorrectQ(data, mode);
    }

    async fetchLongIncorrectQ(data, mode) {
        await fetchLongIncorrectQ(data, mode);
    }

    async deleteAccount(data) {
        await deleteAccount(data, this);
    }


    //初期化用のメソッド
    async init() {
        clearInterval(this.quizState.intervalKey);
        await this.fetchWord();
        this.resetQuizState();
        await this.checkAuthStatus();
    }

    async backStartView() {
        clearInterval(this.quizState.intervalKey);
        await this.fetchWord();
        this.resetQuizState();
        await this.fetchPlayerData(this.userId);
        this.makeClearedData(this.playerData);
        this.startView();
    }


    //画面作成用のメソッド(components)
    loginView() {
        loginView(this);
    }

    signUpView() {
        signUpView(this);
    }

    resetPasswordView() {
        resetPasswordView(this);
    }

    topView() {
        topView(this);
    }

    startView() {
        startView(this);
    }

    typeSelectView() {
        typeSelectView(this);
    }

    levelSelectView() {
        levelSelectView(this);
    }

    quizStartView() {
        quizStartView(this);
    }

    settingView() {
        settingView(this);
    }

    shortQuizView() {
        shortQuizView(this);
    }

    longQuizView() {
        longQuizView(this);
    }

    shortQuizResultView() {
        shortQuizResultView(this);
    }

    longQuizResultView() {
        longQuizResultView(this);
    }

    
    libraryView(level) {
        libraryView(level, this);
    }

    extra() {
        extra(this);
    }

    explanationView() {
        explanationView(this);
    }

    achievementView() {
        achievementView(this);
    }

    deleteAccountView() {
        deleteAccountView(this);
    }


    //その他のメソッド(utils)
    resetQuizState() {
        resetQuizState(this);
    }

    makeClearedData(data) {
        makeClearedData(data, this);
    }

    setTimer() {
        setTimer(this);
    }
    
}

//インスタンス生成、初期化(ログイン状態の判定)
new TOEICWordBook("toeic-word-book").init();