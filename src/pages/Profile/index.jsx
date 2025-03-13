import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputFileUpload from "../../components/InputFileUpload";
import { AuthService } from "../../services";
import ImageProfile from "./Components/ImageProfile";
import InfoField from "./Components/InfoField";


const Profile = () => {
 const [email, setEmail] = useState("");
 const [phoneNumber, setPhoneNumber] = useState("");
 const [image, setImage] = useState(null);
 const [editField, setEditField] = useState(false);
 const { myProfile } = AuthService();

 useEffect(() => {
  getProfile();
 }, [])

 const getProfile = async () => {
  try {
   const response = await myProfile();
   if (response.data.statusCode === 200) {
    let user = response.data.data;
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    toast.success(`Hello ${user.email}!`);
   }
   return
  } catch (e) {
   let errors = e.response?.data?.message;
   console.log(errors);
  }
 };

 const handleImageChange = (event) => {
  const file = event.target.files[0];
  console.log(file);
 };

 return (
  <Container maxWidth="sm">
   <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
    <Typography variant="h5" gutterBottom>
     Profile Page
    </Typography>
    <Grid container direction="column"
     alignItems="center"
     spacing={1}
     gap={3}>
     <Grid item>
      <ImageProfile image={image} />
     </Grid>
     {editField ? (
      <Grid container justifyContent="center">
       <InputFileUpload onChange={handleImageChange} />
      </Grid>
     ) :
      <></>
     }
    </Grid>
    <InfoField value={email} label='Email'
     onChange={editField ? (e) => setEmail(e.target.value) : undefined}
    />
    <InfoField value={phoneNumber} label='Mobile Number'
     onChange={editField ? (e) => setPhoneNumber(e.target.value) : undefined}
    />
    <Button variant="contained" fullWidth
     sx={{ marginTop: 2, background: 'black' }}
     onClick={() => setEditField(!editField)}
    >
     {editField ? "Save Profile" : "Edit Profile"}
    </Button>
   </Paper>
  </Container>
 );
};

export default Profile;
