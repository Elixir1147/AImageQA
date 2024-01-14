'use server'
import {userSchema} from '@/lib/zodSchema'
import {auth} from '@/auth/lucia'
import * as context from 'next/headers'
import { LuciaError } from 'lucia'
import { ZodError } from 'zod'
import { revalidatePath } from 'next/cache'
import {redirect} from 'next/headers'

export default async function login (formData:FormData) {
  try{
    const {mailAddress,password} = userSchema.parse({
      mailAddress: formData.get('mail-address'),
      password: formData.get("password"),
    })
  } catch(e){
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