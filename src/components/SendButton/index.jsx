import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { default as PropTypes } from 'prop-types';
import * as React from 'react';

const SendButton = ({ func }) => {
 return (
  <Button variant="contained" endIcon={<SendIcon />} onClick={func}>
   Send
  </Button >
 )
}

SendButton.propTypes = {
 func: PropTypes.func,
};

export default SendButton