import React from 'react';
import MenuFooter from '../Components/MenuFooter';
import '../routes.css';
import { economicCalendar } from '../constants';

function Notices() {
  const handleButtonClick = () => {
    window.open(economicCalendar, '_blank');
  };

  return (
    <div>
      <h1>Noticias</h1>
      <div className="centered-container">
        <button className="custom-button custom-centered-button" onClick={handleButtonClick}>
          Calendario Económico
        </button>
        <MenuFooter />
      </div>
    </div>
  );
}

export default Notices;
