import React from 'react'
import {Icon} from '@iconify/react'
import pmIcon from '@iconify/icons-emojione/fog'
import locationIcon from '@iconify/icons-mdi/location-star'
//import goverIcon from '@iconify/icons-mdi/building'
import rearchlIcon from '@iconify/icons-mdi/school'
import commuIcon from '@iconify/icons-mdi/house-city'




function LocationMarker({lat,lng, onMouseOver, onClick, entity}) {
let renderIcon = null;
if(entity =="community"){
    renderIcon = commuIcon
}else if (entity == "government"){
    renderIcon = locationIcon
}else if (entity == "research"){
    renderIcon = rearchlIcon
}


  return (
    <div onMouseOver={onMouseOver} onClick={onClick}>
        <Icon icon={renderIcon} className="location-icon" />
    </div>
  );
}

export default LocationMarker;
