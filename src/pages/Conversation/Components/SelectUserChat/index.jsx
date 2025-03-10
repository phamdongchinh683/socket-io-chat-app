import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import { default as PropTypes } from 'prop-types';
import * as React from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const SelectUserChat = ({ users, value, handleChange, email }) => {
  const theme = useTheme();
  const userCurrent = jwtDecode(sessionStorage.getItem('token'))

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Users</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label="User" />}
          MenuProps={MenuProps}
        >
          {users.map((user) =>
            userCurrent.email !== user.email ? (
              <MenuItem
                key={user.id}
                value={user.id}
                style={getStyles(user.email, email, theme)}
              >
                {user.email}
              </MenuItem>
            ) : []
          )}
        </Select>
      </FormControl>
    </div >
  );
}

SelectUserChat.propTypes = {
  users: PropTypes.array,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  email: PropTypes.string,
};

export default SelectUserChat;