import { Container } from "../../components/Container";
import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import { Typography, Button } from "@material-ui/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Post = ({ show }: any) => (
    
  <Container>
    <Typography children={show?.title ? show.title: "Item not found"} variant="h6" />
    {/* <img src={show.image.medium} /> */}
    <Typography variant="h5" color="primary">
      {show?.description ? (show?.description.substring(0,150)).replace(/<[/]?[pb]>/g, "") :null}
    </Typography>
      <Button href="/list" variant="outlined" startIcon={<ArrowBackIcon />}>
        Back
      </Button>
  </Container>
);

Post.getInitialProps = async (context: NextPageContext) => {
  const { _id } = context.query;
  //const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const res = await fetch(`https://venue-service-example.herokuapp.com/api/venues/${_id}`);
  const show = await res.json();
  return { show };
};

export default Post;
