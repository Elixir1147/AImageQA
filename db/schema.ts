import {
  pgTable,
  pgEnum,
  text,
  boolean,
  uuid,
  integer,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const articleTypeEnum = pgEnum("articleType", ["question", "answer"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  userName: text("user_name").unique().notNull(),
  mailAddress: text("mail_address").unique().notNull(),
  hashedPassword: text("hashed_password").notNull(),
});

export const userData = pgTable("userData", {
  userName: text("user_name")
    .references(() => user.userName)
    .primaryKey(),
  profile: text("profile").default(""),
  alive: boolean("alive").default(true),
});

export const question = pgTable("question", {
  questionId: uuid("question_id").defaultRandom().primaryKey(),
  title: text("title").unique().notNull(),
  viewNumber: integer("view_number").default(0),
  restricted: boolean("restricted").notNull(),
});

export const article = pgTable("article", {
  articleId: uuid("article_id").defaultRandom().primaryKey(),
  questionId: uuid("question_id").references(() => question.questionId),
  userName: text("user_name").references(() => user.userName),
  articleType: articleTypeEnum("question").notNull(),
  atricle: text("article").notNull(),
  postDate: timestamp("post_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  updatedDate: timestamp("updated_date", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(), //update_atを手動で実装する．
});

export const evaluation = pgTable(
  "evaluation",
  {
    userName: text("user_name").references(() => user.userName),
    articleId: uuid("article_id").defaultRandom(),
    evaluation: integer("evaluation").default(0),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userName, table.articleId] }),
      pkWithCustomName: primaryKey({
        name: "evaluation_pk_table",
        columns: [table.userName, table.articleId],
      }),
    };
  }
);

export const comment = pgTable(
  "comment",
  {
    commentId: uuid("comment_id").defaultRandom(),
    userName: text("user_name").references(() => user.userName),
    articleId: uuid("article_id").defaultRandom(),
    comment: text("comment").notNull(),
    commentDate: timestamp("comment_date", {
      mode: "date",
      withTimezone: true,
    }).defaultNow(),
    updatedDate: timestamp("updated_date", {
      mode: "date",
      withTimezone: true,
    }).defaultNow(), //update_atを手動で実装する．
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userName, table.articleId] }),
      pkWithCustomName: primaryKey({
        name: "comment_pk_table",
        columns: [table.userName, table.articleId],
      }),
    };
  }
);

export const bookMark = pgTable(
  "bookMark",
  {
    userName: text("user_name").references(() => user.userName),
    questionId: uuid("questionId").references(() => question.questionId),
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
  name: text("name").notNull(),
});

export const questionToTag = pgTable(
  "questionToTag",
  {
    questionId: uuid("questionId").references(() => question.questionId),
    tagId: uuid("tag_id").references(() => tag.tagId),
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

export const image = pgTable("image", {
  imageId: uuid("image_id").defaultRandom(),
  articleId: uuid("article_id").references(() => article.articleId),
  place: text("place").notNull(),
});

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
