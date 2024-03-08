import {
  pgTable,
  pgEnum,
  text,
  boolean,
  uuid,
  integer,
  timestamp,
  primaryKey,
  jsonb,
  customType,
} from "drizzle-orm/pg-core";
import { SerializedEditorState } from "lexical";
import { SerializedLexicalNode } from "lexical";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  userName: text("user_name").unique().notNull(),
  mailAddress: text("mail_address").unique().notNull(),
  hashedPassword: text("hashed_password").notNull(),
  profile: text("profile").default("").notNull(),
  alive: boolean("alive").default(true).notNull(),
});

export const question = pgTable("question", {
  questionId: uuid("question_id").defaultRandom().primaryKey(),
  title: text("title").unique().notNull(),
  userName: text("user_name")
    .references(() => user.userName)
    .notNull(),
  content: jsonb("content").notNull(),
  viewNumber: integer("view_number").default(0).notNull(),
  restricted: boolean("restricted").notNull(),
  postDate: timestamp("post_date", {
    mode: "date",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedDate: timestamp("updated_date", {
    mode: "date",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(), //update_atを手動で実装する．
});
export const answer = pgTable("answer", {
  answerId: uuid("answer_id").defaultRandom().primaryKey(),
  questionId: uuid("question_id")
    .references(() => question.questionId)
    .notNull(),
  userName: text("user_name")
    .references(() => user.userName)
    .notNull(),
  content: jsonb("content").notNull(),
  postDate: timestamp("post_date", {
    mode: "date",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedDate: timestamp("updated_date", {
    mode: "date",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(), //update_atを手動で実装する．
});

export const evaluation = pgTable(
  "evaluation",
  {
    userName: text("user_name")
      .references(() => user.userName)
      .notNull(),
    answerId: uuid("answer_id").defaultRandom().notNull(),
    evaluation: integer("evaluation").default(0).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userName, table.answerId] }),
      pkWithCustomName: primaryKey({
        name: "evaluation_pk_table",
        columns: [table.userName, table.answerId],
      }),
    };
  }
);

export const comment = pgTable(
  "comment",
  {
    commentId: uuid("comment_id").defaultRandom().notNull(),
    userName: text("user_name")
      .references(() => user.userName)
      .notNull(),
    answerId: uuid("answer_id").defaultRandom().notNull(),
    comment: text("comment").notNull(),
    commentDate: timestamp("comment_date", {
      mode: "date",
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    updatedDate: timestamp("updated_date", {
      mode: "date",
      withTimezone: true,
    })
      .defaultNow()
      .notNull(), //update_atを手動で実装する．
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userName, table.answerId] }),
      pkWithCustomName: primaryKey({
        name: "comment_pk_table",
        columns: [table.userName, table.answerId],
      }),
    };
  }
);

export const bookMark = pgTable(
  "bookMark",
  {
    userName: text("user_name")
      .references(() => user.userName)
      .notNull(),
    questionId: uuid("questionId")
      .references(() => question.questionId)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userName, table.questionId] }),
      pkWithCustomName: primaryKey({
        name: "bookMark_pk_table",
        columns: [table.userName, table.questionId],
      }),
    };
  }
);

export const tag = pgTable("tag", {
  tagId: uuid("tag_id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
});

export const questionToTag = pgTable(
  "questionToTag",
  {
    questionId: uuid("questionId")
      .references(() => question.questionId)
      .notNull(),
    tagId: uuid("tag_id")
      .references(() => tag.tagId)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.questionId, table.tagId] }),
      pkWithCustomName: primaryKey({
        name: "question_to_tag_pk_table",
        columns: [table.questionId, table.tagId],
      }),
    };
  }
);

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
