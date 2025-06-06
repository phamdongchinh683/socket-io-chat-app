import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { default as PropTypes } from 'prop-types';
import * as React from 'react';

const VisuallyHiddenInput = styled('input')({
 clip: 'rect(0 0 0 0)',
 clipPath: 'inset(50%)',
 height: 1,
 overflow: 'hidden',
 position: 'absolute',
 bottom: 0,
 left: 0,
 whiteSpace: 'nowrap',
 width: 1,
});

const InputFileUpload = ({ onChange, name }) => {

 return (
  <Button
   component="label"
   variant="contained"
   tabIndex={-1}
   sx={{
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
   }}
   startIcon={<CloudUploadIcon />
   }
  >
   {name}
   <VisuallyHiddenInput
    type="file"
    onChange={onChange}
    multiple
   />
  </Button>
 );
}

InputFileUpload.propTypes = {
 onChange: PropTypes.func,
 name: PropTypes.string,
};

export default InputFileUpload;