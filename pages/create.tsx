import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import { client } from "../util/genqlClient"

export default function Create() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [details, setDetails] = useState("")

  const [error, setError] = useState()

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    await client.mutation({
      createNote: [{
        title,
        description,
        details,

      }, {
        title: true,
      }]
    }).then(response => {
      console.log(response)
      router.push('/')
    }).catch(error => setError(error))
  }
  return (
    <>
      {error && <div>{error}</div>}
      <Link href="/">
        <a>&#8592; Back</a>
      </Link>
      <form onSubmit={handleSubmit}>

        <h2>Create Note</h2>

        <label htmlFor="title">Title</label>
        <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label htmlFor="description">Description</label>
        <input name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <label htmlFor="details">Details</label>

        <textarea
          name="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button type="submit">Create Note</button>
      </form>
    </>
  )
}