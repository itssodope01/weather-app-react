import React from 'react';
import '../styles/components/Header.scss';
import Search from './Search';
import Settings from './Settings';
import Place from './Place';
import useIsMobile from './useIsMobile';

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
