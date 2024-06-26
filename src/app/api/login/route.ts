import { lucia } from "../../lib/auth/auth";
import { userSchema } from "@/lib/zodSchema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import handleAuthUserError from "@/lib/handleSubmitError";
import { db } from "@/lib/db";
import { HALF_ALPHANUMERIC_SYMBOLS_REGEX } from "@/lib/macro";
import { user } from "db/schema.mjs";
import { sql } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function POST(req: Request): Promise<NextResponse<string>> {
  try {
    const formData = await req.formData();
    const { mailAddress, password } = userSchema
      .omit({ userName: true })
      .parse({
        mailAddress: formData.get("mail-address"),
        password: formData.get("password"),
      });
    if (password.match(HALF_ALPHANUMERIC_SYMBOLS_REGEX) !== null) {
      return new NextResponse("メールアドレスまたはパスワードが違います．", {
        status: 400,
      });
    } else if (password.length > 64) {
      return new NextResponse("メールアドレスまたはパスワードが違います．", {
        status: 400,
      });
    }
    const existingUser = await db
      .select()
      .from(user)
      .where(sql`${user.mailAddress} = ${mailAddress}`);
    if (existingUser.length === 0) {
      return new NextResponse("メールアドレスまたはパスワードが違います．", {
        status: 400,
      });
    }
    const result = await bcrypt.compare(
      password,
      existingUser[0].hashedPassword
    );
    if (!result) {
      return new NextResponse("メールアドレスまたはパスワードが違います．", {
        status: 400,
      });
    }
    const session = await lucia.createSession(existingUser[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new NextResponse("", {
      status: 200,
    });
  } catch (e) {
    return handleAuthUserError(e);
  }
}
