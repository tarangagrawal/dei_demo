import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { Container } from "../components/Container";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import Link from "next/link";

interface Show {
  _id: string;
  title: string;
  description:string;

}

const Index: NextPage<{ shows: Array<Show> }> = ({ shows }) => 
  {
    console.log("testshghghgh",shows);
  return(
    <Container>
      <Typography children="Venue List" variant="h6" />
      <List>
        {shows.map((data, index) => (
          <Link key={index} href="/list/[_id]" as={`/list/${data?._id}`}>
            <ListItem button>
              <ListItemIcon children={<CheckIcon />} />
              <ListItemText primary={data?.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Container>
  )
  }


Index.getInitialProps = async () => {
 // const res = await fetch("https://api.tvmaze.com/sear\ch/shows?q=batman");
  const res = await fetch("https://venue-service-example.herokuapp.com/api/venues");
  const data: Array<{ show: Show }> = await res.json();
  console.log("testshgdatadatadatadatahghgh",data);
  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;
