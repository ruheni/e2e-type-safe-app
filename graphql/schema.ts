import { arg, asNexusMethod, enumType, idArg, list, makeSchema, mutationField, mutationType, nonNull, objectType, queryType, stringArg } from "nexus";
import path from 'path'
import { DateTimeResolver, } from 'graphql-scalars'

/**
 * DateTime Scalar
 */
const DateTime = asNexusMethod(DateTimeResolver, 'DateTime')

const Note = objectType({
  name: 'Note',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.string('description')
    t.string('details')

    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })

    t.list.field('tags', {
      type: 'Tag',
      resolve: (parent, _args, ctx) => {
        return ctx.db.note.findUnique({
          where: { id: parent.id }
        }).tags()
      }
    })
  }
})

const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')

    t.list.field('notes', {
      type: 'Note',
      resolve: (parent, _args, ctx) => {
        return ctx.db.tag.findUnique({
          where: { id: parent.id }
        }).notes()
      }
    })
  }
})

/**
 * getNotes (orderBy?), getOneNote
 */
const Query = queryType({
  definition(t) {
    t.list.field('getNotes', {
      type: 'Note',
      args: {
        sortBy: arg({ type: 'SortOrder' }),
        filter: stringArg()
      },
      resolve: async (_, args, ctx) => {
        try {
          return ctx.db.note.findMany({
            orderBy: { createdAt: args.sortBy || undefined }
            // TODO: filter
          })
        } catch (error) {
          throw new Error(`${error}`)
        }

      }
    })

    t.field('getOneNote', {
      type: 'Note',
      args: {
        id: nonNull(stringArg())
      },
      resolve: async (_, args, ctx) => {
        try {
          return ctx.db.note.findUnique({ where: { id: args.id } })
        } catch (error) {
          throw new Error(`${error}`)
        }
      }
    })
  }
})

/**
 * CUD Note, create tags, add tag 
 */
const Mutation = mutationType({
  definition(t) {
    t.field('createNote', {
      type: 'Note',
      args: {
        title: nonNull(stringArg()),
        description: stringArg(),
        details: stringArg(),
        // tags: arg({
        //   type: list('String')
        // })
      },
      resolve: (_, args, ctx) => {

        // const tag = args?.tags.map((tag) => tag)
        try {
          return ctx.db.note.create({
            data: {
              title: args.title,
              description: args.description || undefined,
              details: args.details || undefined,
              // tags: {
              //   connectOrCreate: {
              //     create: { name: tag || undefined },
              //     where: { name: tag || undefined }
              //   }
              // }
            }
          })
        } catch (error) {
          throw Error(`${error}`)
        }
      }
    })

    t.field('updateNote', {
      type: 'Note',
      args: {
        id: nonNull(idArg()),
        title: stringArg(),
        description: stringArg(),
        details: stringArg(),
      },
      resolve: (_, args, ctx) => {
        try {
          return ctx.db.note.update({
            where: { id: args.id },
            data: {
              title: args.title || undefined,
              description: args.description || undefined,
              details: args.details || undefined,
            }
          })
        } catch (error) {
          throw Error(`${error}`)
        }
      }
    })

    t.field('deleteNote', {
      type: 'Note',
      args: {
        id: nonNull(idArg())
      },
      resolve: (_, args, ctx) => {
        try {
          return ctx.db.note.delete({
            where: { id: args.id }
          })
        } catch (error) {
          throw Error(`${error}`)
        }
      }
    })

    t.field('createTag', {
      type: 'Tag',
      args: {
        name: nonNull(stringArg())
      },
      resolve: (_, args, ctx) => {
        try {
          return ctx.db.tag.create({
            data: { name: args.name }
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
  types: [Note, Tag, Query, DateTime, SortOrder, Mutation],
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