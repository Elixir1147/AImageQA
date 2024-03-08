import { z } from "zod";
import {
  SerializedEditorState,
  SerializedLexicalNode,
  SerializedRootNode,
} from "lexical";

export const userSchema = z.object({
  userName: z.string(),
  mailAddress: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  mailAddress: z.string(),
  password: z.string(),
});

export const questionSchema = z.object({
  title: z.string(),
  userName: z.string(),
  restricted: z.boolean(),
});

export const answerSchema = z.object({
  userName: z.string(),
  questionId: z.string(),
});
