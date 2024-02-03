import { lucia } from "@/lib/auth/auth";
import { userSchema } from "@/lib/zodSchema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import handleAuthUserError from "@/lib/handleAuthUserError";
import { db } from "@/lib/db";
import { HALF_ALPHANUMERIC_SYMBOLS_REGEX } from "@/lib/macro";
import { user } from "db/schema";
import { sql } from "drizzle-orm";
import bcrypt from "bcrypt";

const missingLoginResponse: NextResponse<{
  body: string;
  options: { status: number };
}> = new NextResponse("メールアドレスまたはパスワードが違います．", {
  status: 400,
});

export async function POST(
  req: Request
): Promise<NextResponse<{ body: string; options: { status: number } }>> {
  try {
    const formData = await req.formData();
    const { mailAddress, password } = userSchema
      .omit({ userName: true })
      .parse({
        mailAddress: formData.get("mail-address"),
        password: formData.get("password"),
      });
    if (password.match(HALF_ALPHANUMERIC_SYMBOLS_REGEX) !== null) {
      return missingLoginResponse;
    } else if (password.length > 64) {
      return missingLoginResponse;
    }
    const existingUser = await db
      .select()
      .from(user)
      .where(sql`${user.mailAddress} = ${mailAddress}`);
    if (existingUser.length === 0) {
      return missingLoginResponse;
    }
    const result = await bcrypt.compare(
      password,
      existingUser[0].hashedPassword
    );
    if (!result) {
      return missingLoginResponse;
    }
    console.log(`${existingUser[0].id}`);
    const session = await lucia.createSession(existingUser[0].id, {});
    console.log("begin sessionCookie");
    const sessionCookie = lucia.createSessionCookie(session.id);
    console.log("begin cookies");
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    console.log("end session");
    return new NextResponse("", {
      status: 200,
    });
  } catch (e) {
    return handleAuthUserError(e);
  }
}
