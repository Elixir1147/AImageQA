-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('Question', 'Answer');

-- CreateTable
CREATE TABLE "Users" (
    "userName" TEXT NOT NULL,
    "mailAddress" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile" TEXT NOT NULL DEFAULT '',
    "alive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userName")
);

-- CreateTable
CREATE TABLE "Questions" (
    "questionId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "viewNumber" INTEGER NOT NULL DEFAULT 0,
    "restricted" BOOLEAN NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "Articles" (
    "articleId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "articleType" "ArticleType" NOT NULL,
    "atricle" TEXT NOT NULL,
    "postDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("articleId")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "userName" TEXT NOT NULL,
    "articleId" UUID NOT NULL,
    "evaluation" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("userName","articleId")
);

-- CreateTable
CREATE TABLE "Comments" (
    "commentId" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "articleId" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "commentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "BookMarks" (
    "userName" TEXT NOT NULL,
    "questionId" UUID NOT NULL,

    CONSTRAINT "BookMarks_pkey" PRIMARY KEY ("userName","questionId")
);

-- CreateTable
CREATE TABLE "Tags" (
    "tagId" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "QuestionToTags" (
    "questionId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "QuestionToTags_pkey" PRIMARY KEY ("questionId","tagId")
);

-- CreateTable
CREATE TABLE "Images" (
    "imageId" UUID NOT NULL,
    "articleId" UUID NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("imageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_mailAddress_key" ON "Users"("mailAddress");

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_userName_fkey" FOREIGN KEY ("userName") REFERENCES "Users"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_userName_fkey" FOREIGN KEY ("userName") REFERENCES "Users"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("articleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userName_fkey" FOREIGN KEY ("userName") REFERENCES "Users"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("articleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookMarks" ADD CONSTRAINT "BookMarks_userName_fkey" FOREIGN KEY ("userName") REFERENCES "Users"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookMarks" ADD CONSTRAINT "BookMarks_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionToTags" ADD CONSTRAINT "QuestionToTags_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionToTags" ADD CONSTRAINT "QuestionToTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("tagId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("articleId") ON DELETE RESTRICT ON UPDATE CASCADE;
