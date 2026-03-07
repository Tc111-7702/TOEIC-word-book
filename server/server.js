import express from "express";
import cookieParser from "cookie-parser"; 
import cors from "cors";
import router from "./routes/router.js";
import path from "path";
import { fileURLToPath } from "url";

// ESモジュールでパスを扱うための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 静的ファイルの読み込み設定（srcフォルダを指定）
app.use(express.static(path.join(__dirname, "src")));
// 2. ルート（/）にアクセスしたときに index.html を強制的に表示する
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

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
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});