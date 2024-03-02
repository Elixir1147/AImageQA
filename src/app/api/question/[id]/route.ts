import { db } from "@/lib/db";
import { question } from "db/schema.mjs";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export default async function GET({
  params,
}: {
  params: { id: string };
}): Promise<
  NextResponse<
    {
      title: string;
      userName: string;
      content: unknown;
      viewNumber: number;
    }[]
  >
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
