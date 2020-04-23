import React from 'react';
import Gallereact from '../../../node_modules/gallereact';
import intro1 from '../../images/intro1.png';
import intro2 from '../../images/intro2.png';
import intro3 from '../../images/intro3.png';
import intro4 from '../../images/intro4.png';
import './Header.css';

function Header() {
  const images = [{ image: intro1 }, { image: intro2 }, { image: intro3 }, { image: intro4 }];

  return (
    <div className="header">
      <div style={{ width: '452px', height: '283px' }}>
        <Gallereact
          images={images}
          autoPlay
          duration={5000}
          displayDot
          loop={false}
          arrowOnHover
        />
      </div>
    </div>
  );
}

export default Header;
