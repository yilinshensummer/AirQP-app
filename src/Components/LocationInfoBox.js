import React from 'react';

function LocationInfoBox({info}) {
    return (
        <div className="location-info">
            <h2>Location AirQuality Info</h2>
            <ul>
                <li><strong>Country: </strong>US</li>
                <li><strong>Entity: </strong>{info.id}</li>
                <li><strong>Location Name: </strong>{info.title}</li>
                <li><strong>Parameter(</strong><strong>{info.unit}</strong><strong>):  </strong>{info.para}</li>
            </ul>
        </div>
    );
}

export default LocationInfoBox;