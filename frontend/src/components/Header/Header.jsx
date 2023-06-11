import './Header.scss'

import React from 'react'

const Header = () => {
  return (
      <div className={'main-header'}>
          <div className='header-content'>
              <div className="logo">
                  Farmers Haat
              </div>
              <ul className="center">
                  <li>Product</li>
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>Cart</li>
              </ul>
              <ul className="right">
                  <button className='button'>Sign In</button>
              </ul>
          </div>
      </div>
  )
}

export default Header
