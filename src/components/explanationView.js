import { replaceView } from "../utils/replaceView.js";

//説明画面
export const explanationView = (app) => {
    //DOMの生成
    const parentElm = document.createElement("div");
    parentElm.classList.add("pageExplanation");     
    const html = `
        <div class="explanation-container">
            <h1 class="explanation-title">Explanation</h1>
            
            <section class="explanation-section">
                <div class="section-header">
                    <span class="icon">🚀</span>
                    <h2 class="heading">概要</h2>
                </div>
                <div class="explanationContent">
                    <p>このたびは私が作成した、<b>TOEIC Word Book</b>を利用していただきありがとうございます。</p>
                    <p>このアプリケーションは、ITエンジニアのインターンに参加するための<b>ポートフォリオ</b>として作成しました。フロントエンド・サーバーサイドのすべてをJavaScriptで構築した、シングルページアプリケーション（SPA）です。</p>
                    <p>大学3年生になるにあたり、自身の学習効率も考慮して「手軽で効率的な英単語学習」をテーマに選びました。問題文は生成AIを活用して作成しています。初めての作品ですが、細部まで拘って作り上げました。</p>
                </div>
            </section>

            <section class="explanation-section">
                <div class="section-header">
                    <span class="icon">💡</span>
                    <h2 class="heading">簡単な仕様説明</h2>
                </div>
                <div class="explanationContent">
                    <div class="feature-grid">
                        <div class="feature-item">
                            <b>📝 Practiceモード</b>
                            <p>Short / Long Sentencesの2形式。80%以上の正解率で次レベルが解放されるやり込み要素を搭載。</p>
                        </div>
                        <div class="feature-item">
                            <b>⏱️ 制限時間設定</b>
                            <p>Normal / Hard / Extremeの3段階。負荷を調整して、瞬発的なアウトプット力を鍛えます。</p>
                        </div>
                        <div class="feature-item">
                            <b>🔄 Review / Library</b>
                            <p>間違えた問題の復習や、単語リストの閲覧が可能。着実な語彙定着をサポートします。</p>
                        </div>
                    </div>
                </div>
            </section>

            <div class="button-area">
                <button class="backBtn">Back</button>
            </div>
        </div>
    `;   
    parentElm.innerHTML = html;
    //戻るボタン
    const backBtnElm = parentElm.querySelector(".backBtn");
    backBtnElm.addEventListener("click", () => app.extra());
    //画面作成
    replaceView(parentElm, app);
};