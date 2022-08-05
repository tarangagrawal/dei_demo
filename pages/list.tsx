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

interface Venue {
  _id: string;
  title: string;
  description:string;

}

const Index: NextPage<{ venues: Array<Venue> }> = ({ venues }) => 
  {
    console.log("list venues ",venues);
  return(
    <Container>
      <Typography children="Venue List" variant="h6" />
      <List>
        {venues.map((venue, index) => {
          return (
            <Link key={index} href="/list/[id]" as={`/list/${venue?._id}`}>
              <ListItem button>
                <ListItemIcon children={<CheckIcon />} />
                <ListItemText primary={venue?.title} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Container>
  )
  }


Index.getInitialProps = async () => {
 // const res = await fetch("https://api.tvmaze.com/sear\ch/shows?q=batman");
  const res = await fetch("https://venue-service-example.herokuapp.com/api/venues");
  const data: Array<{ venue: Venue }> = await res.json();
  console.log("getInitialProps",data);
  return {
    venues: data.map(entry => {
      console.log("entry",entry);
      return entry as unknown as Venue;
    })
  };
};

export default Index;
