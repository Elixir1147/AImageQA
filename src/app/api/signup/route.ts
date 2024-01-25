import {auth} from "@/auth/lucia"
import prisma from '@/lib/exportPrismaClient'
import { userSchema } from '@/lib/zodSchema'
import * as context from 'next/headers'
import { ZodError } from "zod"
import { LuciaError } from "lucia"
import {NextResponse} from 'next/server'

export async function POST (req : Request):Promise<NextResponse<{body:string, options:{status:number}}>>{
  
  try {
    const formData = await req.formData()
    const {userName,mailAddress,password} = userSchema.parse({
      userName : formData.get('user-name'),
      mailAddress : formData.get('mail-address'),
      password : formData.get('password'),
    })
    const sameUserName = await prisma.user.findUnique({
      where:{
        userName:userName
      }
    })
    if(sameUserName !== null){
      return new NextResponse(
          "同じユーザ名が使用されています．",
          {
            status:400
          }
      )
    }
    const sameMailAddress = await prisma.user.findUnique({
      where:{
        mailAddress:mailAddress
      }
    })
    if(sameMailAddress !== null){
      return new NextResponse(
        "同じメールアドレスが使用されています．",
        {
          status:400
        }
      )
    }
    const user = await auth.createUser({
      key:{
        providerId: "mailAddress",
        providerUserId: mailAddress.toLowerCase(),
        password,
      },
      attributes:{
        userName,
        mailAddress
      }
    })
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    })
    const authRequest = auth.handleRequest("POST", context)
    authRequest.setSession(session)
    return new NextResponse ("", {
      status: 201  
    })
  }catch(e){
    if (e instanceof ZodError){
      return new NextResponse(
        'unexpected data is submited.',
        {
          status: 400
        }
      )
    }else if(e instanceof LuciaError){
      return new NextResponse(
        e.message,
        {
          status: 500
        }
      )
    }else if (e instanceof Error){
      return new NextResponse(
        e.message,
        {
          status:500
        }
      )
    }else{
      return new NextResponse(
        'unknown error is occured',
        {
          status:500
        }
      )
    }
  }
}