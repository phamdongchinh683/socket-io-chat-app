import { default as PropTypes } from 'prop-types';
import React from "react";
import AuthInput from "../../../../components/AuthInput";

const SearchMessage = ({
 type,
 field,
 hint,
 handleSearchChange }) => {
 return (
  <>
   <AuthInput type={type} field={field} hint={hint} onChange={handleSearchChange} />
  </>
 );
}

SearchMessage.propTypes = {
 field: PropTypes.string,
 type: PropTypes.string,
 hint: PropTypes.string,
 handleSearchChange: PropTypes.func,
};

export default SearchMessage;