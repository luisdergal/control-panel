import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const { name, email } = await request.json()
  const newUser = await prisma.user.create({
    data: { name, email }
  })
  return NextResponse.json({ status: 'User created', user: newUser })
}