import express from "express";
import * as verify from "../user/authController.js";
import * as signUp from "../user/signUp.js";
import * as login from "../user/login.js";
import * as logout from "../user/logout.js";
import * as forgotPassword from "../user/forgotPassword.js";
import * as resetPassword from "../user/resetPassword.js";
import * as getPlayerData from "../user/getPlayerData.js";
import * as validation from "../user/validation.js";
import * as getAllWords from "../getAPIs/getAllWords.js";
import * as getShortQuiz from "../getAPIs/getShortQuiz.js";
import * as getLongQuiz from "../getAPIs/getLongQuiz.js";
import * as updatePlayerData from "../user/updatePlayerData.js";
import * as postShortIncorrectQ from "../postAPIs/postShortIncorrectQ.js";
import * as postLongIncorrectQ from "../postAPIs/postLongIncorrectQ.js";
import * as deleteShortIncorrectQ from "../deleteAPIs/deleteShortIncorrectQ.js";
import * as deleteLongIncorrectQ from "../deleteAPIs/deleteLongIncorrectQ.js";
import * as deleteAccont from "../user/deleteAccount.js";

//ルーティング設定
const router = express.Router();

//ユーザー情報の取得、登録 (user)
router.get("/verify", verify.verify);
router.post(
    "/sign-up", 
    validation.signUpValidation.email, 
    validation.signUpValidation.password,
    signUp.signUp
);
router.post(
    "/reset-password",
    validation.signUpValidation.password,
    resetPassword.resetPassword
);
router.get("forgot-password", forgotPassword.forgotPassword);
router.post("/login", login.login);
router.get("/playerData/:id", getPlayerData.getPlayerData);
router.post("/logout", logout.logout);
router.post("/updatePlayerData", updatePlayerData.updatePlayerData);
router.delete("/deleteAccount", deleteAccont.deleteAccount);

//単語、クイズ問題の取得 (getAPIs)
router.get("/allWords", getAllWords.getAllWords);
router.get("/Short/:id", getShortQuiz.getShortQuiz);
router.get("/Long/:id", getLongQuiz.getLongQuiz);

//不正解問題の登録 (postAPIs)
router.post("/postIncorrectShort", postShortIncorrectQ.postShortIncorrectQ);
router.post("/postIncorrectLong", postLongIncorrectQ.postLongIncorrectQ);

//不正解問題の削除 (deleteAPIs)
router.delete("/deleteIncorrectShort", deleteShortIncorrectQ.deleteShortIncorrectQ);
router.delete("/deleteIncorrectLong", deleteLongIncorrectQ.deleteLongIncorrectQ);

export default router;