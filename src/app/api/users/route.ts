import {prisma} from '@/lib/exportPrismaClient'
import bcrypt from 'bcrypt'
import {z} from 'zod'
import { userSchema } from '@/lib/zodSchema'


export async function POST(req: Request){ 
  const reqJson = await req.json()

  console.log(req.body)
  // const userName = formData.get('user-name')
  // const mailAddress = formData.get('mail-address')
  // const password = formData.get('password')

  // if(userName === null){
  //   return 'TO DO'
  // }else if(mailAddress === null){
  //   return 'TO DO'
  // }else if(password === null){
  //   return 'TO DO'
  // }else if(typeof userName === "string" && typeof mailAddress === "string" && typeof password === "string"){
  //   const hashedPassword = await bcrypt.hash(password,10)
  //   const user = await prisma.user.create({
  //     data:{
  //       userName: userName,
  //       mailAddress: mailAddress,
  //       password: hashedPassword 
  //     }
  //   })


  // }
  return Response.json(null,{status:203})
}
