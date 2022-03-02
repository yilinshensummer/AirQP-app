import React from 'react'
import {Icon} from '@iconify/react'
import pmIcon from '@iconify/icons-emojione/fog'

function Header () {
  return (
    <div className="header-bar">
        <Icon icon ={pmIcon} /> OpenAQ Air Tracker
    </div>
  );
}

export default Header;
