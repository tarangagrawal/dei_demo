import { Container } from "../../components/Container";
import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import { Typography, Button } from "@material-ui/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

const Post = ({ show }: any) => (
    
  <Container>
    <Typography children={show?.title || "Item not found"} variant="h6" />
    {/* <img src={show.image.medium} /> */}
    <Typography variant="h5" color="primary">
      {(show?.description?.substring(0,150)).replace(/<[/]?[pb]>/g, "") || null}
    </Typography>
      <Link href="/list"  >
        <a><Button variant="outlined" startIcon={<ArrowBackIcon />}>
          Back
        </Button></a>
      </Link>
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
