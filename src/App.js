import React, { useEffect, useState } from "react"
import { Container } from "@mui/system"
import { Button } from "@mui/material"
import axios from "axios"
import ArtistCart from "./components/ArtistCart"

const client_id = "80811485dc73429aa0f0f3d36c8f2bf4"
const secret_id = "abf3c707bf194c848793be00945597b7"

const App = () => {
  const [accessToken, setAccessToken] = useState({})
  const [artist, setArtist] = useState({})
  const [albums, setAlbums] = useState([])
  const [response, setResponse] = useState({})
  const [errorMessage, setErrorMessage] = useState()

  const artistParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }
  useEffect(() => {
    const authParameters = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "grant_type=client_credentials&client_id=" +
        client_id +
        "&client_secret=" +
        secret_id,
    }

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data?.access_token)
      })
  }, [])

  useEffect(() => {
    searchArtist()
  }, [accessToken])

  const searchArtist = async () => {
    await fetch(
      "https://api.spotify.com/v1/search?q=Beyonce&type=artist",
      artistParameters
    )
      .then((res) => res.json())
      .then((data) => setArtist(data?.artists?.items[0]))

    await fetch(
      "https://api.spotify.com/v1/artists/" + artist?.id + "/albums",
      artistParameters
    )
      .then((res) => res.json())
      .then((data) => setAlbums(data?.items))
  }

  return (
    <Container>
      <h1>Hello Welcome</h1>
      <Button variant="text">Beyonce</Button>
      <ArtistCart artist={artist} albums={albums} />
    </Container>
  )
}

export default App
