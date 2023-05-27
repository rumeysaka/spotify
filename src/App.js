import React, { useEffect, useState } from "react"
import { Container } from "@mui/system"
import { Box, Typography } from "@mui/material"
import ArtistCard from "./components/ArtistCard"
import { TextField } from "@mui/material"

const client_id = "80811485dc73429aa0f0f3d36c8f2bf4"
const secret_id = "abf3c707bf194c848793be00945597b7"

const App = () => {
  const [accessToken, setAccessToken] = useState({})
  const [artist, setArtist] = useState({})
  const [albums, setAlbums] = useState([])
  const [artistName, setArtistName] = useState()
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
  }, [accessToken, artistName])

  useEffect(() => {
    searchAlbums()
  }, [artist])

  const searchArtist = async () => {
    if (artist === undefined) return

    await fetch(
      "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist",
      artistParameters
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === undefined) return

        setArtist(data?.artists?.items[0])
      })
      .catch((e) => console.log(e))
  }

  const searchAlbums = async () => {
    if (artist === undefined) return
    await fetch(
      "https://api.spotify.com/v1/artists/" + artist.id + "/albums",
      artistParameters
    )
      .then((res) => res.json())
      .then((data) => setAlbums(data?.items))
  }

  const handleInput = (e) => {
    if (e.key === "Enter") setArtistName(e.target.value)
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: 8,
        }}
      >
        <Typography color="light">Hello Welcome</Typography>
        <TextField
          id="standard-basic"
          label="Enter an artist"
          variant="filled"
          color="secondary"
          size="large"
          onKeyDown={(e) => {
            handleInput(e)
          }}
        />
      </Box>

      <ArtistCard artist={artist} albums={albums} />
    </Container>
  )
}

export default App
