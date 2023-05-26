import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import ImageListItem from "@mui/material/ImageListItem"
import ImageList from "@mui/material/ImageList"
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
)

const ArtistCart = ({ artist, albums }) => {
  // const [albumImages, setAlbumImages] = useState([])
  // if (albums) {
  //   setAlbumImages(albums.images)
  // }
  console.log(albums)
  console.log(typeof albums)
  if (artist || albums) {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Artist: {artist?.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>

          {albums?.map((i) => (
            <img src={i?.images[0].url} />
          ))}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
  }
  return <Typography>error</Typography>
}
export default ArtistCart
