import { Lucia } from "lucia";
import { adapter } from "./drixxleAdapter";
import "dotenv/config";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      user_name: attributes.user_name,
      mail_address: attributes.mail_address,
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
  user_name: string;
  mail_address: string;
}
