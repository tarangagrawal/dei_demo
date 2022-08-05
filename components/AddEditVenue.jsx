import React from 'react';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Container,
  TextField,
  Typography,
  Grid,
  Button
} from '@mui/material';
import { useForm } from "react-hook-form";
// import { createVenue, updateVenue } from '../../../pages/api/venues';

// type AddEditVenueProps = {
//   preloadedValues: any;
//   heading: string;
// }

const url = 'https://venue-service-example.herokuapp.com/api/venues';

// const createVenue = (venue) => axios.post(`${url}/create`, venue);

const createVenue = async (venue) => {
  const response = await fetch(url + "/create", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(venue)
  });
  return response.json();
}

const updateVenue = async (venue) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(venue)
  });
  return response.json();
}

// const updateVenue = (venue) => axios.put(`${url}/${venue.id}`, venue);


export const AddEditVenue = ({preloadedValues, heading}) => {

  const router = useRouter();

  const isEditMode = preloadedValues?._id;

  // form validation rules 
  const venueSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(5, 'Description must be at least 5 characters'),
    address: Yup.string()
      .required('Address is required')
      .min(5, 'Address must be at least 5 characters'),
  });

  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: preloadedValues,
    resolver: yupResolver(venueSchema)
  });

  const onSubmit = async (venue, e) => {
    e.preventDefault();
    try {
      isEditMode ? await updateVenue(venue) : await createVenue(venue);
      // router.push('/list');
    }catch(err) {
      console.log("err", JSON.stringify(err, null, 2));
    }
  };

  return (
    <Container id="contact">
      <Typography variant='h2' component="div" textTransform="initial" textAlign="center" marginY={5}>
        { heading }
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} px={10}>
          <Grid item xs={12}>
            <TextField
              {...register("title")}
              label="Title*"
              autoComplete="new-password"
              variant="standard"
              fullWidth={true}
              error={errors?.title?.type}
              helperText={errors?.title?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("description")}
              label="Description*"
              variant="standard"
              autoComplete='off'
              fullWidth
              multiline
              minRows={2}
              error={errors?.description?.type}
              helperText={errors?.description?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("address")}
              label="Address*"
              variant="standard"
              autoComplete='off'
              fullWidth
              multiline
              minRows={2}
              error={errors?.address?.type}
              helperText={errors?.address?.message}
            />
          </Grid>
          <Grid item xs={12} textAlign="right"
              marginTop={5}>
            <Button
              variant="contained"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
