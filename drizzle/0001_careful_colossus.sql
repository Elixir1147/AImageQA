ALTER TABLE "answer" ALTER COLUMN "question_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "answer" ALTER COLUMN "user_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "answer" ALTER COLUMN "post_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "answer" ALTER COLUMN "updated_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bookMark" ALTER COLUMN "user_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bookMark" ALTER COLUMN "questionId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "comment_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "user_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "answer_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "comment_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "updated_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "evaluation" ALTER COLUMN "user_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "evaluation" ALTER COLUMN "answer_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "evaluation" ALTER COLUMN "evaluation" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "user_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "view_number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "post_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "updated_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questionToTag" ALTER COLUMN "questionId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questionToTag" ALTER COLUMN "tag_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "profile" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "alive" SET NOT NULL;