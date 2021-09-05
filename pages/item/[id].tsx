import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'

import { client } from '../../util/genqlClient'

export default function Item() {
  const router = useRouter()

  const { id } = router.query

  const deleteItem = async (id: string) => {
    await client.mutation({
      deleteItem: [{ id }, { id: true }],
    }).then(_res => router.push('/'))
  }

  const fetcher = async (id: string) =>
    client.query({
      getOneItem: [
        { id },
        {
          id: true,
          title: true,
          description: true,
          createdAt: true,
        }]
    })

  const { data, error } = useSWR([id], fetcher)

  return (
    <div>
      <Link href="/">
        <a>&#8592; Back</a>
      </Link>

      {data?.getOneItem && (
        <>
          <p>Title: {data.getOneItem.title}</p>
          <p>Description: {data.getOneItem.description}</p>
        </>
      )}
    </div>
  )
}