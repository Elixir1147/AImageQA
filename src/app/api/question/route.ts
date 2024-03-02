import { questionSchema } from "@/lib/zodSchema";
import { validateRequest } from "@/lib/auth/validateRequest";
import { db } from "@/lib/db";
import { question, tag, questionToTag } from "db/schema.mjs";
import { NextResponse } from "next/server";
import handleSubmitError from "@/lib/handleSubmitError";
import postgres from "postgres";
import { POSTGRES_ERRORCODE_UNIQUE_VIOLATION } from "@/lib/postgresErrorCode";
import { z } from "zod";

export async function POST(req: Request): Promise<NextResponse<string>> {
  try {
    const formData = await req.formData();
    const validateResult = await validateRequest();
    const { title, userName, restricted } = questionSchema.parse({
      title: formData.get("title"),
      userName: validateResult.user?.userName,
      restricted: formData.get("restricted") ? true : false,
    });

    const tagsSchema = z.string();
    const tagsString = tagsSchema.parse(formData.get("tags"));
    const tagsList = tagsString.split(/\s/).filter((tag) => tag !== "");
    console.log(tagsList.length);
    if (!tagsList.length) {
      return new NextResponse("タグを指定してください．", {
        status: 400,
      });
    }

    const editorStateSchema = z.string();
    const editorStateString = editorStateSchema.parse(
      formData.get("editorState")
    );
    const [insertedQuestion] = await db
      .insert(question)
      .values({
        title: title,
        userName: userName,
        restricted: restricted,
        content: JSON.parse(editorStateString),
      })
      .returning({ questionId: question.questionId });

    for (const tagString of tagsList) {
      const [insertTag] = await db
        .insert(tag)
        .values({
          name: tagString,
        })
        .onConflictDoNothing()
        .returning();

      if (insertTag?.tagId) {
        await db
          .insert(questionToTag)
          .values({
            questionId: insertedQuestion.questionId,
            tagId: insertTag.tagId,
          })
          .onConflictDoNothing();
      }
    }

    return new NextResponse("", {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    if (e instanceof postgres.PostgresError) {
      if (e.code === POSTGRES_ERRORCODE_UNIQUE_VIOLATION) {
        switch (e.constraint_name) {
          case "question_title_unique":
            return new NextResponse("同じタイトルの質問が存在します．", {
              status: 400,
            });
        }
      }
    }
    return handleSubmitError(e);
  }
}
