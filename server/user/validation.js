import { body } from "express-validator";

//ユーザーのメールアドレス、パスワードのバリデーション
export const signUpValidation = {
    email: [
        body("email")
            .isEmail()
            .withMessage("有効なメールアドレスを入力してください")
    ],
    password: [
        body("password")
            .isLength({ min: 8 }).withMessage('8文字以上で入力してください')
            .matches(/^[a-zA-Z0-9!@#$%^&*]+$/).withMessage('パスワードは半角英数字で入力してください')
            .matches(/[a-z]/).withMessage('アルファベット、数字の両方を使って入力してください。')
            .matches(/\d/).withMessage('アルファベット、数字の両方を使って入力してください。')       
    ]
};