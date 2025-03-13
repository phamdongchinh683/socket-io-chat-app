import { Avatar, Grid } from "@mui/material";
import { default as PropTypes } from 'prop-types';
import { React } from "react";


const ImageProfile = ({ image }) => {

 return (
  <Grid container direction="column" alignItems="center" spacing={1}>
   <Grid item>
    <Avatar src={image} sx={{ width: 100, height: 100 }} />
   </Grid>
  </Grid>
 );
};

ImageProfile.propTypes = {
 image: PropTypes.string,
};

export default ImageProfile;