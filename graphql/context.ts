import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export interface Context {
  db: PrismaClient
}

export const context = (): Context => {
  return {
    db
  }
}