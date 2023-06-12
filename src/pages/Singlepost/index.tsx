import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import flowerimg from "../../assets/amy-shamblen-qdPnQuGeuwU-unsplash.jpg";
import { Checkbox, IconButton } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MapsUgcRounded from "@mui/icons-material/MapsUgcRounded";
import React from "react";
import CommentSectionModal from "../../Modals/CommentSectionModal";
const Singlepost = () => {
  const [showCommentsPage, setShowCommentsPage] =
    React.useState<boolean>(false);
  return (
    <Card sx={{ maxWidth: 550 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        // width="30%"
        height="20%"
        image={flowerimg}
        alt="Paella dish"
      />
      <CardContent>
        <IconButton>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            className="hover:opacity-70"
          />
        </IconButton>
        <MapsUgcRounded
          className="text-slate-600 cursor-pointer hover:opacity-70 hover:text-md"
          onClick={() => setShowCommentsPage(true)}
        />
        <Typography component="p">3 likes</Typography>
        <Typography variant="body2">
          <b>smark_x</b> &nbsp; This impressive paella is a perfect party...
          <Typography component="h6" className="text-sm">
            more
          </Typography>
        </Typography>
        <p
          className="text-sm text-gray-400 cursor-pointer"
          onClick={() => setShowCommentsPage(true)}
        >
          view all 4 comments
        </p>
      </CardContent>
      {showCommentsPage && (
        <CommentSectionModal
          open={showCommentsPage}
          setShowModal={setShowCommentsPage}
        />
      )}
    </Card>
  );
};

export default Singlepost;
