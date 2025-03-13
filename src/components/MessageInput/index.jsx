import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { default as PropTypes } from 'prop-types';
import * as React from 'react';

const MessageInput = ({ label, value, onChange, handleKeyDown }) => {

  return (
    <Box sx={{ width: '100%', '& > :not(style)': { m: 1 } }}>
      <Input placeholder={label} value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        sx={{ width: "100%" }} />
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