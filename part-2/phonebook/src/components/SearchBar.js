import React from 'react'

const SearchBar = ({ handleSearchFieldChange }) => {
  return (
    <div>
        search: <input onChange={handleSearchFieldChange} />
    </div>
  )
}

export default SearchBar