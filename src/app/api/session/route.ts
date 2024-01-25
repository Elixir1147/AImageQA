import {auth} from "@/auth/lucia"
import * as context from "next/headers"
import { NextResponse } from "next/server"
import { Session } from "lucia"


export async function GET():Promise<NextResponse<{session:Session|null}>>{
  const authRequest = auth.handleRequest("GET",context)
  const session = await authRequest.validate()
  console.log(session)
  return NextResponse.json({session:session}) 
}