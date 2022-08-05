import { Container } from "../components/Container";
import { AddEditVenue } from "../components/AddEditVenue";

export default () => (
  <Container>
     <AddEditVenue preloadedValues={null} heading="Create a new Venue" />
  </Container>
);
