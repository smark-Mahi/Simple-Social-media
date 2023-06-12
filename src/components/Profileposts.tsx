import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import flowerimg from '../assets/amy-shamblen-qdPnQuGeuwU-unsplash.jpg'

const Profileposts = () => {
  return (
    <Card sx={{ maxWidth: 250 }}>
    <CardMedia
      component="img"
    //   width="30%"
      height="20%"
      image={flowerimg}
      alt="Paella dish"
    />
  </Card>
  )
}

export default Profileposts
