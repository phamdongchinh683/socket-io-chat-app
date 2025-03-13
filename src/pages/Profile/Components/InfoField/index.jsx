import TextField from '@mui/material/TextField';
import { default as PropTypes } from 'prop-types';
import * as React from 'react';

const InfoField = ({ label, value, onChange }) => (

 <TextField
  id="outlined"
  label={label}
  value={value}
  onChange={onChange}
  disabled={!onChange}
  fullWidth
  variant="outlined"
  margin="normal"
 />
);

InfoField.propTypes = {
 label: PropTypes.string,
 value: PropTypes.string.isRequired,
 onChange: PropTypes.bool.isRequired,
};

export default InfoField;