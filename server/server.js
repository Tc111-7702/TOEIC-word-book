import express from "express";
import cookieParser from "cookie-parser"; 
import cors from "cors";
import router from "./routes/router.js";

const app = express();
//Cookieの解析
app.use(cookieParser());
//CORSの設定
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5500",
    credentials: true
}));
//srcの読み込み
app.use(express.static("src"));
//JSONデータの解析
app.use(express.json()); 
//ルーティング設定
app.use("/", router);

//サーバー起動
app.listen(3000, () => console.log("server is running"));