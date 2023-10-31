import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 20px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s;
  flex: 1;

  &:focus {
    border-color: #007bff;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  margin-right: 10px;
  margin-top: 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
`;
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const url = '/search/'+query;
  const handleSearch = () => {
    router.push(url);
    setQuery('');
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <SearchButton onClick={handleSearch}>
        <Icon>&#128269;</Icon> Search
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
