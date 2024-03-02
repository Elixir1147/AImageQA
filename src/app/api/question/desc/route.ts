import { db } from "@/lib/db";
import { question } from "db/schema.mjs";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(): Promise<
  NextResponse<{ title: string; id: string }[]>
> {
  try {
    const questions = await db
      .select({ title: question.title, id: question.questionId })
      .from(question)
      .orderBy(desc(question.postDate));
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
