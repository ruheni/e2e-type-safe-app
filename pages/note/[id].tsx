import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'

import { client } from '../../util/genqlClient'

export default function Note() {
  const router = useRouter()

  const { id } = router.query

  const fetcher = (id: string) =>
    client.query({
      getOneNote: [
        { id },
        {
          id: true,
          title: true,
          description: true,
          details: true,
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

      {data?.getOneNote && (
        <>
          <p>Title: {data.getOneNote.title}</p>
          <p>Description: {data.getOneNote.description}</p>
          <p>Details: {data.getOneNote.details}</p>
        </>
      )}
    </div>
  )
}