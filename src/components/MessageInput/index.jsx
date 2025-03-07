import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { default as PropTypes } from 'prop-types';
import * as React from 'react';
const MessageInput = ({ label, value, onChange, handleKeyDown }) => {
 return (
  <Box sx={{ width: 290, maxWidth: '100%' }}>
   <TextField fullWidth label={label} id="fullWidth"
    value={value}
    onChange={onChange}
    onKeyDown={handleKeyDown}
    InputProps={{
     sx: {
      '&.MuiOutlinedInput-root': {
       '& fieldset': { border: 'none' },
      },
     },
    }}
   />
  </Box>
 )
}
MessageInput.propTypes = {
 label: PropTypes.string,
 value: PropTypes.string,
 onChange: PropTypes.func,
 handleKeyDown: PropTypes.func,
};

export default MessageInput;