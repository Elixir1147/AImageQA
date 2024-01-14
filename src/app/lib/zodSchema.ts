import {z} from 'zod'

export const userSchema = z.object({
  userName: z.string(),
  mailAddress: z.string(),
  password: z.string(),
})

export const loginSchema = z.object({
  mailAddress: z.string(),
  password: z.string(),
})