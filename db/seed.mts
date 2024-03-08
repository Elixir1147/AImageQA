import { db } from "../src/app/lib/db";
import { user } from "./schema.mjs";
import { generateId } from "lucia";
import bcrypt from "bcrypt";

const userList: {
  id: string;
  userName: string;
  mailAddress: string;
  hashedPassword: string;
}[] = [
  {
    id: generateId(15),
    userName: "a",
    mailAddress: "a@a.com",
    hashedPassword: await bcrypt.hash("a", 10),
  },
];
