import { lucia } from "../../lib/auth/auth";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { userSchema } from "@/lib/zodSchema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import handleAuthUserError from "@/lib/handleSubmitError";
import bcrypt from "bcrypt";
import { user } from "db/schema.mjs";
import { generateId } from "lucia";
import { HALF_ALPHANUMERIC_SYMBOLS_REGEX } from "@/lib/macro";
import postgres from "postgres";
import { POSTGRES_ERRORCODE_UNIQUE_VIOLATION } from "@/lib/postgresErrorCode";

export async function POST(req: Request): Promise<NextResponse<string>> {
  try {
    const formData = await req.formData();
    const { userName, mailAddress, password } = userSchema.parse({
      userName: formData.get("user-name"),
      mailAddress: formData.get("mail-address"),
      password: formData.get("password"),
    });
    if (password.match(HALF_ALPHANUMERIC_SYMBOLS_REGEX) !== null) {
      return new NextResponse(
        "パスワードは，半角英数字と記号以外入力できません．",
        {
          status: 400,
        }
      );
    } else if (password.length > 64) {
      return new NextResponse("パスワードは，64文字以内にしてください．", {
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateId(15);
    await db.insert(user).values({
      id: userId,
      userName: userName,
      mailAddress: mailAddress,
      hashedPassword: hashedPassword,
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new NextResponse("", {
      status: 201,
    });
  } catch (e) {
    if (e instanceof postgres.PostgresError) {
      if (e.code === POSTGRES_ERRORCODE_UNIQUE_VIOLATION) {
        switch (e.constraint_name) {
          case "user_user_name_unique":
            return new NextResponse("同じユーザ名が使用されています．", {
              status: 400,
            });
          case "user_mail_address_unique":
            return new NextResponse("同じメールアドレスが使用されています．", {
              status: 400,
            });
        }
      }
    }
    return handleAuthUserError(e);
  }
}
