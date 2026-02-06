import React from 'react';
import logo from "../assets/logo.svg";
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header style={styles.header} className='w-100 position-fixed'>
      <Link to={`/`}>
        <div style={styles.section}>      
          <img src={logo} alt="Vido" style={styles.logo} />
        </div>
      </Link>

      <div style={styles.searchSection}>
        <SearchBar />
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
    padding: '0 16px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e5e5',
    top: "0",
    left:"0",
    zIndex: "12",
    
    gap: '10px' 
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  logo: {
    maxWidth: '120px', 
    objectFit: 'contain'
  },
  searchSection: {
    display: 'flex', 
    flex: 1, 
    justifyContent: 'center',
  }
};