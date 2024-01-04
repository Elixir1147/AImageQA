'use server';
import {prisma} from '@/lib/exportPrismaClient'
import bcrypt from 'bcrypt'
import { userSchema } from './zodSchema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
    const hashedPassword = await bcrypt.hash(password,10)
    await prisma.user.create({
      data:{
        userName: userName,
        mailAddress: mailAddress,
        password: hashedPassword 
      }
    })
  }catch(err){
    if(err instanceof Error){
      console.log(err.message)
    }
    return {
      message: "unknown error is occured."
    }
  }
  revalidatePath('/')
  redirect('/')
}