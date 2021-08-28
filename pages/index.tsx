import Link from 'next/link'
import useSWR from 'swr'
import { client } from '../util/genqlClient'

export default function Home() {

  const fetcher = () =>
    client.query({
      getItems: {
        id: true,
        title: true,
        description: true,
        url: true,
        imageUrl: true,
        createdAt: true,
        tags: {
          name: true
        }
      }
    })

  const { data, error } = useSWR('getItems', fetcher)

  return (
    <div>
      {error && <p>Oops, something went wrong!</p>}
      <Link href="/create">
        <a> Create Item &#8594;</a>
      </Link>
      <ul>
        {data?.getItems && data.getItems.map((item) => (
          <li key={item.id}>
            <Link href={`/item/${item.id}`}>
              <a>
                {item.title} - {item?.description}
                <br />
                {item?.imageUrl}
                <br />
                {item?.createdAt}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
