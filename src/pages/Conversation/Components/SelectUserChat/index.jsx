import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
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
  const userCurrent = jwtDecode(localStorage.getItem('token'))

  return (
    <>
      <FormControl sx={{ m: 1, width: 400 }}>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          displayEmpty
          value={value}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select here...</em>;
            }
            return users
              .filter((user) => selected.includes(user.id))
              .map((user) => user.email.substring(0, user.email.indexOf("@")))
              .join(', ');
          }}
          MenuProps={MenuProps}
          sx={{
            color: 'white',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white !important' },
          }}
        >
          {users.map((user) =>
            userCurrent.email !== user.email ? (
              <MenuItem
                key={user.id}
                value={user.id}
                style={getStyles(user.email, email, theme)}
              >
                {user.email.substring(0, user.email.indexOf("@"))}
              </MenuItem>
            ) : null
          )}
        </Select>
      </FormControl >

    </>
  );
}

SelectUserChat.propTypes = {
  users: PropTypes.array,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  email: PropTypes.string,
};

export default SelectUserChat;