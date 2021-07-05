import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotFound from '../../components/notFound/NotFound';
import './Search.scss';

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const tabs = ['Auctions', 'NFTs', 'Users', 'Collections', 'Communities', 'Galleries'];

  useEffect(() => {
    if (location.state) {
      setQuery(location.state.query);
    }
  }, []);

  return query ? (
    <div className="search--page">
      <div className="container">
        <h1 className="title">
          Search results for <span>{query}</span>
        </h1>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Search;
