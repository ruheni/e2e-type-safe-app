import Link from 'next/link'
import useSWR from 'swr'
import { client } from '../util/genqlClient'

export default function Home() {

  const fetcher = () =>
    client.query({
      getNotes: {
        id: true,
        title: true,
        description: true,
        details: true,
        createdAt: true,
        tags: {
          name: true
        }
      }
    })

  const { data, error } = useSWR('getNotes', fetcher)

  return (
    <div>
      {error && <p>Oops, something went wrong!</p>}
      <Link href="/create">
        <a> Create Note &#8594;</a>
      </Link>
      <ul>
        {data?.getNotes && data.getNotes.map((note) => (
          <li key={note.id}>
            <Link href={`/note/${note.id}`}>
              <a>
                {note.title} - {note?.description}
                <br />
                {note?.details}
                <br />
                {note?.createdAt}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
