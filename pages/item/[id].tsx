import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'

import { client } from '../../util/genqlClient'

export default function Note() {
  const router = useRouter()

  const { id } = router.query

  const fetcher = (id: string) =>
    client.query({
      getOneItem: [
        { id },
        {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          tags: {
            name: true
          }
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