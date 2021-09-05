import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    DateTime: any,
    String: string,
    ID: string,
    Boolean: boolean,
}

export interface Item {
    createdAt?: Scalars['DateTime']
    description?: Scalars['String']
    id: Scalars['ID']
    imageUrl?: Scalars['String']
    title: Scalars['String']
    updatedAt?: Scalars['DateTime']
    url?: Scalars['String']
    __typename: 'Item'
}

export interface Mutation {
    createItem?: Item
    deleteItem?: Item
    updateItem?: Item
    __typename: 'Mutation'
}

export interface Query {
    getItems?: (Item | undefined)[]
    getOneItem?: Item
    __typename: 'Query'
}

export type SortOrder = 'asc' | 'desc'

export interface ItemRequest{
    createdAt?: boolean | number
    description?: boolean | number
    id?: boolean | number
    imageUrl?: boolean | number
    title?: boolean | number
    updatedAt?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    createItem?: [{description?: (Scalars['String'] | null),imageUrl?: (Scalars['String'] | null),title: Scalars['String'],url?: (Scalars['String'] | null)},ItemRequest]
    deleteItem?: [{id: Scalars['ID']},ItemRequest]
    updateItem?: [{description?: (Scalars['String'] | null),id: Scalars['ID'],imageUrl?: (Scalars['String'] | null),title?: (Scalars['String'] | null),url?: (Scalars['String'] | null)},ItemRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    getItems?: [{sortBy?: (SortOrder | null)},ItemRequest] | ItemRequest
    getOneItem?: [{id: Scalars['String']},ItemRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Item_possibleTypes = ['Item']
export const isItem = (obj?: { __typename?: any } | null): obj is Item => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isItem"')
  return Item_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}


export interface ItemPromiseChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    imageUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    url: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>})
}

export interface ItemObservableChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    description: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    imageUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    url: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>})
}

export interface MutationPromiseChain{
    createItem: ((args: {description?: (Scalars['String'] | null),imageUrl?: (Scalars['String'] | null),title: Scalars['String'],url?: (Scalars['String'] | null)}) => ItemPromiseChain & {get: <R extends ItemRequest>(request: R, defaultValue?: (FieldsSelection<Item, R> | undefined)) => Promise<(FieldsSelection<Item, R> | undefined)>}),
    deleteItem: ((args: {id: Scalars['ID']}) => ItemPromiseChain & {get: <R extends ItemRequest>(request: R, defaultValue?: (FieldsSelection<Item, R> | undefined)) => Promise<(FieldsSelection<Item, R> | undefined)>}),
    updateItem: ((args: {description?: (Scalars['String'] | null),id: Scalars['ID'],imageUrl?: (Scalars['String'] | null),title?: (Scalars['String'] | null),url?: (Scalars['String'] | null)}) => ItemPromiseChain & {get: <R extends ItemRequest>(request: R, defaultValue?: (FieldsSelection<Item, R> | undefined)) => Promise<(FieldsSelection<Item, R> | undefined)>})
}

export interface MutationObservableChain{
    createItem: ((args: {description?: (Scalars['String'] | null),imageUrl?: (Scalars['String'] | null),title: Scalars['String'],url?: (Scalars['String'] | null)}) => ItemObservableChain & {get: <R extends ItemRequest>(request: R, defaultValue?: (FieldsSelection<Item, R> | undefined)) => Observable<(FieldsSelection<Item, R> | undefined)>}),
    deleteItem: ((args: {id: Scalars['ID']}) => ItemObservableChain & {get: <R extends ItemRequest>(request: R, defaultValue?: (FieldsSelection<Item, R> | undefined)) => Observable<(FieldsSelection<Item, R> | undefined)>}),
    updateItem: ((args: {description?: (Scalars['String'] | null),id: Scalars['ID'],imageUrl?: (Scalars['String'] | null),title?: (Scalars['String'] | null),url?: (Scalars['String'] | null)}) => ItemObservableChain & {get: <R extends ItemRequest>(request: R, defaultValue?: (FieldsSelection<Item, R> | undefined)) => Observable<(FieldsSelection<Item, R> | undefined)>})
}

export interface QueryPromiseChain{
    getItems: ((args?: {sortBy?: (SortOrder | null)}) => {get: <R extends ItemRequest>(request: R, defaultValue?: ((FieldsSelection<Item, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Item, R> | undefined)[] | undefined)>})&({get: <R extends ItemRequest>(request: R, defaultValue?: ((FieldsSelection<Item, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Item, R> | undefined)[] | undefined)>}),
    getOneItem: ((args: {id: Scalars['String']}) => ItemPromiseChain & {get: <R extends ItemRequest>(request: R, defaultValue?: (FieldsSelection<Item, R> | undefined)) => Promise<(FieldsSelection<Item, R> | undefined)>})
}

export interface QueryObservableChain{
    getItems: ((args?: {sortBy?: (SortOrder | null)}) => {get: <R extends ItemRequest>(request: R, defaultValue?: ((FieldsSelection<Item, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Item, R> | undefined)[] | undefined)>})&({get: <R extends ItemRequest>(request: R, defaultValue?: ((FieldsSelection<Item, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Item, R> | undefined)[] | undefined)>}),
    getOneItem: ((args: {id: Scalars['String']}) => ItemObservableChain & {get: <R extends ItemRequest>(request: R, defaultValue?: (FieldsSelection<Item, R> | undefined)) => Observable<(FieldsSelection<Item, R> | undefined)>})
}