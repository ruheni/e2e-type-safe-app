import Link from 'next/link'
import useSWR from 'swr'
import Image from 'next/image'
import { client } from '../util/genqlClient'

export default function Home() {

  const fetcher = () =>
    client.query({
      getItems: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
      }
    })

  const { data, error } = useSWR('getItems', fetcher)

  return (
    <div>
      <div className="right">
        <Link href="/create">
          <a className="btn"> Create Item &#8594;</a>
        </Link>

      </div>
      {error && <p>Oops, something went wrong!</p>}
      <ul>
        {data?.getItems && data.getItems.map((item) => (
          <li key={item.id}>
            <Link href={`/item/${item.id}`}>
              <a>
                {item.imageUrl ?
                  <img src={item.imageUrl} height="640" width="480" /> :
                  <img src="https://user-images.githubusercontent.com/33921841/132140321-01c18680-e304-4069-a0f0-b81a9f6d5cc9.png" height="640" width="480" />
                }
                <h2>{item.title}</h2>
                <p>{item.description ? item?.description : "No description available"}</p>

                {/* {item?.imageUrl} */}

                <p>Created At: {new Date(item?.createdAt).toDateString()}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
