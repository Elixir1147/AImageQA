CREATE TABLE IF NOT EXISTS "answer" (
	"answer_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" uuid,
	"user_name" text,
	"content" jsonb NOT NULL,
	"post_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookMark" (
	"user_name" text,
	"questionId" uuid,
	CONSTRAINT "bookMark_user_name_questionId_pk" PRIMARY KEY("user_name","questionId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"comment_id" uuid DEFAULT gen_random_uuid(),
	"user_name" text,
	"answer_id" uuid DEFAULT gen_random_uuid(),
	"comment" text NOT NULL,
	"comment_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone DEFAULT now(),
	CONSTRAINT "comment_user_name_answer_id_pk" PRIMARY KEY("user_name","answer_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "evaluation" (
	"user_name" text,
	"answer_id" uuid DEFAULT gen_random_uuid(),
	"evaluation" integer DEFAULT 0,
	CONSTRAINT "evaluation_user_name_answer_id_pk" PRIMARY KEY("user_name","answer_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"question_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"user_name" text,
	"content" jsonb NOT NULL,
	"view_number" integer DEFAULT 0,
	"restricted" boolean NOT NULL,
	"post_date" timestamp with time zone DEFAULT now(),
	"updated_date" timestamp with time zone DEFAULT now(),
	CONSTRAINT "question_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionToTag" (
	"questionId" uuid,
	"tag_id" uuid,
	CONSTRAINT "questionToTag_questionId_tag_id_pk" PRIMARY KEY("questionId","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"tag_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"mail_address" text NOT NULL,
	"hashed_password" text NOT NULL,
	"profile" text DEFAULT '',
	"alive" boolean DEFAULT true,
	CONSTRAINT "user_user_name_unique" UNIQUE("user_name"),
	CONSTRAINT "user_mail_address_unique" UNIQUE("mail_address")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_question_id_question_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "question"("question_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_user_name_user_user_name_fk" FOREIGN KEY ("user_name") REFERENCES "user"("user_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookMark" ADD CONSTRAINT "bookMark_user_name_user_user_name_fk" FOREIGN KEY ("user_name") REFERENCES "user"("user_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookMark" ADD CONSTRAINT "bookMark_questionId_question_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "question"("question_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_user_name_user_user_name_fk" FOREIGN KEY ("user_name") REFERENCES "user"("user_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "evaluation" ADD CONSTRAINT "evaluation_user_name_user_user_name_fk" FOREIGN KEY ("user_name") REFERENCES "user"("user_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question" ADD CONSTRAINT "question_user_name_user_user_name_fk" FOREIGN KEY ("user_name") REFERENCES "user"("user_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionToTag" ADD CONSTRAINT "questionToTag_questionId_question_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "question"("question_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionToTag" ADD CONSTRAINT "questionToTag_tag_id_tag_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tag"("tag_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
