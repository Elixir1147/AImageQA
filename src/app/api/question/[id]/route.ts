import { db } from "@/lib/db";
import { question } from "db/schema.mjs";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { SerializedEditorState } from "lexical/LexicalEditorState";
import { SerializedLexicalNode } from "lexical";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<
  NextResponse<{
    title: string;
    userName: string;
    content: unknown;
    viewNumber: number;
  } | null>
> {
  try {
    const questions = await db
      .select({
        title: question.title,
        userName: question.userName,
        content: question.content,
        viewNumber: question.viewNumber,
      })
      .from(question)
      .where(sql`${question.questionId} = ${params.id}`);

    if (questions.length === 0) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(questions[0], { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.log("unknown database Error");
    }
    return NextResponse.json(null, { status: 500 });
  }
}
