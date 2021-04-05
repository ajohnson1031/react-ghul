import React, { useState } from "react";

const SearchForm = ({ appState, onFormSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setErr(null);
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.length) {
      setErr("Please enter a GitHub handle.");
      return;
    }
    onFormSubmit({ ...appState, username: searchTerm });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='searchTerm'
        placeholder='Enter GitHub handle to search...'
        value={searchTerm}
        onChange={handleChange}
      />
      <button type='submit'>Search</button>
      {err && <div className='err'>{err}</div>}
    </form>
  );
};

export default SearchForm;
