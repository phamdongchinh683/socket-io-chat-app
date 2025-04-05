import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputFileUpload from "../../components/InputFileUpload";
import { AuthService } from "../../services";
import * as validation from '../../util';
import ImageProfile from "./Components/ImageProfile";
import InfoField from "./Components/InfoField";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [editField, setEditField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { myProfile, updateProfile, uploadImage } = AuthService();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await myProfile();
      if (response.data.statusCode === 200) {
        let result = response.data.data;
        setUser(result);
        setEmail(result.email);
        setPhoneNumber(result.phoneNumber);
        setImage(result.image);
      }

    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  const handleImage = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    try {
      const response = await uploadImage(file);
      if (response.data?.Location) {
        setImage(response.data.Location);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const updateInfo = async () => {
    if (!email || !phoneNumber) {
      toast.warn('Please not empty fields')
      return;
    }

    if (!validation.validateEmail(email)) {
      toast.warn('Please provide a valid email')
      return
    }

    if (!validation.validatePhoneNumber(phoneNumber)) {
      toast.warn('Mobile number must be between 10 and 15 characters')
      return
    }

    let data = {
      image: image || user?.image,
      email: email || user?.email,
      phoneNumber: phoneNumber || user?.phoneNumber,
    };

    try {
      const result = await updateProfile(data);
      if (result.data.data === "Updated") {
        toast.success("Profile updated");
        return true;
      } else {
        let exitData = result.data.data;
        let phoneNumberExists = exitData.includes("phone_number");
        let emailExists = exitData.includes("email");

        if (phoneNumberExists) {
          toast.error(`${phoneNumber} is already used for another account`);
        }
        if (emailExists) {
          toast.error(`${email} is already used for another account`);
        }
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Profile Page
        </Typography>
        <Grid container direction="column" alignItems="center" spacing={1} gap={3}>
          <Grid item>
            <ImageProfile image={image} />
          </Grid>
          {editField && (
            <Grid container justifyContent="center">
              <InputFileUpload name={loading ? 'Uploading' : 'Upload file'}
                onChange={handleImage} />
            </Grid>
          )}
        </Grid>
        <InfoField
          value={email}
          label="Email"
          onChange={editField ? (e) => setEmail(e.target.value) : undefined}
        />
        <InfoField
          value={phoneNumber}
          label="Mobile Number"
          onChange={editField ? (e) => setPhoneNumber(e.target.value) : undefined}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2, background: "black" }}
          onClick={async () => {
            if (editField) {
              const result = await updateInfo();
              if (result) {
                setEditField(false);
              }
            } else {
              setEditField(true);
            }
          }}
        >
          {editField ? "Save Profile" : "Edit Profile"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
