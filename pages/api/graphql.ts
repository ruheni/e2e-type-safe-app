import { ApolloServer } from 'apollo-server-micro'
import { context } from '../../graphql/context'
import { schema } from '../../graphql/schema'

export const config = {
  api: {
    bodyParser: false,
  },
}

const server = new ApolloServer({ schema, context }).createHandler({
  path: '/api/graphql'
})

export default server