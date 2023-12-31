import React from 'react';
import { Link } from 'react-router-dom'; 
import { Assessment, ShowChart, PendingActions, Settings, ListAlt } from '@mui/icons-material'; 
import '../footer.css';

function MenuFooter() {
  return (
    <nav className="footer">
      <ul className="tab-menu">
        <li>
          <Link to="/accounts">
            <Assessment /> 
          </Link>
        </li>
        <li>
          <Link to="/indicator">
            <ShowChart /> 
          </Link>
        </li>
        <li>
          <Link to="/notices">
            <PendingActions /> 
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <Settings /> 
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <ListAlt /> 
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MenuFooter;
