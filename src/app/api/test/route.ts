import { db } from "@/lib/db";
import { answer } from "db/schema.mjs";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const questions = await db
    .select({ userName: answer.userName, content: answer.content })
    .from(answer)
    .where(sql``);
  console.log(questions);
  return NextResponse.json(questions, {
    status: 200,
  });
}
