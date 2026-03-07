//ログアウト
export const logout = (req, res) => {
    //Cookieの削除
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        path: "/"
    });    
    res.json({ message: "ログアウトしました" });
};