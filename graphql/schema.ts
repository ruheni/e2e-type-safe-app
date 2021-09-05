import { arg, asNexusMethod, enumType, idArg, makeSchema, mutationType, nonNull, objectType, queryType, stringArg } from "nexus";
import path from 'path'
import { DateTimeResolver, } from 'graphql-scalars'

/**
 * DateTime Scalar
 */
const DateTime = asNexusMethod(DateTimeResolver, 'DateTime')

const Item = objectType({
  name: 'Item',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.string('description')
    t.string('url')
    t.string('imageUrl')

    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})

/**
 * getWishList (orderBy?), getWishListItem
 */
const Query = queryType({
  definition(t) {
    t.list.field('getItems', {
      type: 'Item',
      args: {
        sortBy: arg({ type: 'SortOrder' }),
      },
      resolve: async (_, args, ctx) => {
        return ctx.db.item.findMany({
          orderBy: { createdAt: args.sortBy || undefined }
        })
      }
    })

    t.field('getOneItem', {
      type: 'Item',
      args: {
        id: nonNull(stringArg())
      },
      resolve: async (_, args, ctx) => {
        try {
          return ctx.db.item.findUnique({ where: { id: args.id } })
        } catch (error) {
          throw new Error(`${error}`)
        }
      }
    })
  }
})

/**
 * CUD 
 */
const Mutation = mutationType({
  definition(t) {
t.field('createItem', {
  type: 'Item',
  args: {
    title: nonNull(stringArg()),
    description: stringArg(),
    url: stringArg(),
    imageUrl: stringArg(),
  },
  resolve: (_, args, ctx) => {
    try {
      return ctx.db.item.create({
        data: {
          title: args.title,
          description: args.description || undefined,
          url: args.url || undefined,
          imageUrl: args.imageUrl || undefined,
        }
      })
    } catch (error) {
      throw Error(`${error}`)
    }
  }
})

t.field('updateItem', {
  type: 'Item',
  args: {
    id: nonNull(idArg()),
    title: stringArg(),
    description: stringArg(),
    url: stringArg(),
    imageUrl: stringArg(),
  },
  resolve: (_, args, ctx) => {
    try {
      return ctx.db.item.update({
        where: { id: args.id },
        data: {
          title: args.title || undefined,
          description: args.description || undefined,
          url: args.url || undefined,
          imageUrl: args.imageUrl || undefined,
        }
      })
    } catch (error) {
      throw Error(`${error}`)
    }
  }
})

t.field('deleteItem', {
  type: 'Item',
  args: {
    id: nonNull(idArg())
  },
  resolve: (_, args, ctx) => {
    try {
      return ctx.db.item.delete({
        where: { id: args.id }
      })
    } catch (error) {
      throw Error(`${error}`)
    }
  }
})
  }
})


const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc']
})

export const schema = makeSchema({
  types: [Item, Query, DateTime, SortOrder, Mutation],
  outputs: {
    schema: path.join(process.cwd(), 'graphql/schema.graphql'),
    typegen: path.join(process.cwd(), 'graphql/generated/nexus.d.ts'),
  },
  contextType: {
    module: path.join(process.cwd(), 'graphql/context.ts'),
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'db'
      }
    ]
  }
})