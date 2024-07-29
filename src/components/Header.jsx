import React from 'react';
import '../styles/components/Header.scss';
import Search from './Search.jsx';
import Settings from './Settings.jsx';
import Place from './Place.jsx';
import useIsMobile from './useIsMobile.jsx';

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <div className='Header'>
      {!isMobile && <Place />}
      <Search />
      <Settings />
    </div>
  );
};

export default Header;
