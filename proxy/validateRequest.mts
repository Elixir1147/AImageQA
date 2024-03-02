import type { Session, User } from "lucia";
import { lucia } from "./auth/auth.mjs";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function validateRequest(
  req: FastifyRequest,
  rep: FastifyReply
): Promise<{ user: User; session: Session } | { user: null; session: null }> {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  if (result.session && result.session.fresh) {
    rep.header("set-cookie", lucia.createSessionCookie(result.session.id));
  }
  if (!result.session) {
    rep.header("set-cookie", lucia.createBlankSessionCookie());
  }
  return result;
}
