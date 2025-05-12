import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { default as PropTypes } from 'prop-types';
import { React } from "react";

const ImageProfile = ({ image }) => {
 const styleImage = {
  borderRadius: '50%',
  width: '175px',
  height: '175px',
  objectFit: 'cover',
 }
 const cld = new Cloudinary({
  cloud: { cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME },
 });
 const img = cld
  .image(image)
  .format("auto")
  .quality("auto")
  .resize(auto().gravity(autoGravity()).width(175).height(175));

 return (
  <AdvancedImage style={{ ...styleImage }} cldImg={img} />
 );
};

ImageProfile.propTypes = {
 image: PropTypes.string,
};

export default ImageProfile;