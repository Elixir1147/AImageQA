import { Lucia } from "lucia";
import { adapter } from "./drizzleAdapter.mjs";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      userName: attributes.userName,
      mailAddress: attributes.mailAddress,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  userName: string;
  mailAddress: string;
}
