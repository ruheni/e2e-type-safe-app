import { createClient } from "../graphql/generated/genql"

export const client = createClient({
  url: '/api/graphql'
})