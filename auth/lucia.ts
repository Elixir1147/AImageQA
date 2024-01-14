import {lucia} from 'lucia'
import {nextjs_future} from 'lucia/middleware'
import {prisma} from '@lucia-auth/adapter-prisma'
import {prisma as client} from '@/lib/exportPrismaClient'

const auth = lucia({
  adapter: prisma(client,{
    user: "user",
    key: "key",
    session: "session",
  }),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie:{
    expires: false
  },
  getUserAttributes:(data)=>{
    return {
      userName: data.userName
    }
  }
})

export type Auth = typeof auth;