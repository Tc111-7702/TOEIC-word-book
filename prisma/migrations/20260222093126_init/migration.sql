-- CreateTable
CREATE TABLE "Words" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "english" TEXT NOT NULL,
    "japanese" TEXT[],
    "partOfSpeech" TEXT NOT NULL,
    "englishExampleSentence" TEXT NOT NULL,
    "japaneseExampleSentence" TEXT NOT NULL,

    CONSTRAINT "Words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShortQuestions" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "englishSentence" TEXT NOT NULL,
    "japaneseSentence" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,

    CONSTRAINT "ShortQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LongQuestions" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "englishText" TEXT NOT NULL,
    "japaneseText" TEXT NOT NULL,
    "answers" TEXT[],
    "explanation" TEXT NOT NULL,

    CONSTRAINT "LongQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShortQuestionsReview" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "englishSentence" TEXT NOT NULL,
    "japaneseSentence" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,

    CONSTRAINT "ShortQuestionsReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LongQuestionsReview" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "englishText" TEXT NOT NULL,
    "japaneseText" TEXT NOT NULL,
    "answers" TEXT[],
    "explanation" TEXT NOT NULL,

    CONSTRAINT "LongQuestionsReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShortQuestionsReview" ADD CONSTRAINT "ShortQuestionsReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LongQuestionsReview" ADD CONSTRAINT "LongQuestionsReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
