import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const users = await prisma.region.findMany()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const { name } = await request.json()
  const newRegion = await prisma.region.create({
    data: { name }
  })
  return NextResponse.json({ status: 'Region Created', region: newRegion })
}