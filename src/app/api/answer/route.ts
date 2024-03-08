import { NextRequest } from "next/server";
import { validateRequest } from "@/lib/auth/validateRequest";
import { z } from "zod";
import { db } from "@/lib/db";
import { answer, evaluation } from "db/schema.mjs";
import { answerSchema } from "@/lib/zodSchema";
import { NextResponse } from "next/server";
import handleSubmitError from "@/lib/handleSubmitError";
import { asc, desc } from "drizzle-orm";
import { SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function GET(
  req: NextRequest
): Promise<NextResponse<{ userName: string; content: any }[]>> {
  try {
    const queryParam = req.nextUrl.searchParams;
    let queryOrder: SQL<unknown>;
    if (queryParam.get("order") === "asc") {
      queryOrder = asc(answer.postDate);
    } else if (queryParam.get("order") === "desc") {
      queryOrder = desc(answer.postDate);
    } else {
      return NextResponse.json([], { status: 400 });
    }

    let condition: SQL<unknown>;
    if (queryParam.get("questionId") !== null) {
      condition = sql`${queryParam.get("questionId")} = ${answer.questionId}`;
    } else {
      condition = sql`true`;
    }
    const questions = await db
      .select({
        userName: answer.userName,
        content: answer.content,
        answerId: answer.answerId,
      })
      .from(answer)
      .where(condition)
      .orderBy(queryOrder);
    return NextResponse.json(questions, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.log("unknown database Error");
    }
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<string>> {
  try {
    const formData = await req.formData();
    const validateResult = await validateRequest();

    const { userName, questionId } = answerSchema.parse({
      userName: validateResult.user?.userName,
      questionId: formData.get("questionId"),
    });

    const editorStateSchema = z.string();
    const editorStateString = editorStateSchema.parse(
      formData.get("editorState")
    );
    await db
      .insert(answer)
      .values({
        questionId: questionId,
        userName: userName,
        content: JSON.parse(editorStateString),
      })
      .returning({ answerId: answer.answerId });

    return new NextResponse("", {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return handleSubmitError(e);
  }
}
