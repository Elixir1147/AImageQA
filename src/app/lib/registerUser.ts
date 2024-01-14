'use server';
import {auth} from "@/auth/lucia"
import {prisma} from '@/lib/exportPrismaClient'
import { userSchema } from './zodSchema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as context from 'next/headers'
import { ZodError } from 'zod';
import { LuciaError } from 'lucia';


export async function registerUser(formData: FormData):Promise<{message:string}|void>{
  console.log(formData)
  
  try {
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
      return {
        message:"同じユーザ名が使用されています．"
      }
    }
    const sameMailAddress = await prisma.user.findUnique({
      where:{
        mailAddress:mailAddress
      }
    })
    if(sameMailAddress !== null){
      return {
        message:"同じメールアドレスが使用されています．"
      }
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

  }catch(e){
    if (e instanceof ZodError){
      return {
        message: 'unexpected data is submited.'
      }
    }else if(e instanceof LuciaError){
      return {
        message: ''
      }
    }else if (e instanceof Error){
      return {
        message: ''
      }
    }else{
      return {
        message: 'unknown error is occured'
      }
    }
  }
  revalidatePath('/')
  redirect('/')
}