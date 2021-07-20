import { makeSchema, mutationField, mutationType, objectType, queryType } from "nexus";
import path from 'path'

const User = objectType({
  name: 'User',
  description: '',
  definition(t) { }
})

const Post = objectType({
  name: 'Post',
  description: '',
  definition(t) { }
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('hello', {
      type: 'String',
      resolve: () => {
        return 'world'
      }
    })
  }
})

// const Mutation = mutationType({
//   definition(t) { }
// })

export const schema = makeSchema({
  types: [Query,],
  outputs: {
    schema: __dirname + './schema.graphql',
    typegen: __dirname + 'generated/nexus.ts',
  },
  sourceTypes: {
    modules: []
  }
})