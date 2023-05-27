import React, { useState } from "react"
import Box from "@mui/material/Box"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import ImageListItem from "@mui/material/ImageListItem"
import { CardStyled } from "./styled"
import { ImageListStyled } from "./styled"

interface ArtistType {
  external_urls: Object
  followers: Object
  genres: Array<any>
  href: string
  id: string
  images: Array<any>
  name: string
  popularity: number
  type: string
  uri: string
}

const ArtistCart = (props: any) => {
  const { artist, albums } = props
  const [albumItem, setAlbumItem] = useState("")

  const handleAlbumClick = (item: any) => {
    if (item === undefined) return
    setAlbumItem(item.name)
    console.log(albumItem)
  }

  if (artist || albums) {
    return (
      <CardStyled sx={{ justifyContent: "center" }}>
        <CardContent>
          <Typography textAlign="center" variant="h3" color="black">
            {artist?.name}
          </Typography>

          <Typography
            textAlign="center"
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            Album name: {albumItem} deded
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ImageListStyled
              sx={{ width: 500, height: 450, justifyContent: "center" }}
              cols={3}
              rowHeight={164}
            >
              {albums?.map((item: any) => (
                <>
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item?.images[0].url}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item?.images[0].url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                      onClick={() => handleAlbumClick({ item })}
                    />
                  </ImageListItem>
                </>
              ))}
            </ImageListStyled>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </CardStyled>
    )
  }
  return <Typography>error</Typography>
}
export default ArtistCart
