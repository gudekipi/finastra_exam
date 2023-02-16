import React from 'react';
import { TextField } from '@mui/material';

function SearchBar({setSearchTerm, searchTerm}) {
  return <TextField style={{ width: "40%" }} label='Search' value={searchTerm} onChange={setSearchTerm}/>;
}

export default SearchBar;