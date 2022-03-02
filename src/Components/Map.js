import React, {useState, useRef, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import useSuperCluster from 'use-supercluster';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';
import BarChart from './BarChart'
import PieChart from "./PieChart";
//Main Context
import {useMainContext}from '../Context/Context'


function Map({center, eventData}) {
    const {selectedEvent} = useMainContext();
    const mapRef = useRef();
    const [zoom, setZoom] = useState(1);
    const [bounds, setBounds] = useState(null);
    //Info Box
    const [locationInfo, setLocationInfo] = useState(null);
    const [measureInfo, setMeasureInfo] = useState(null)
    const labelArray = ['pm1', 'pm10','pm10','pm2.5','pm1','pm2.5'];

  const eventDataString = ["community", "government","research"];

  
  const points = eventData.map(event => ({
    
    
      "type": "Feature",
      "properties": {
        "cluster": false,
        "parameters": [ event.parameters],
        "eventTitle": event.name,
        "eventType": event.entity
      },
      "geometry": { "sensorType": "low-cost", "coordinates": [event.coordinates.longitude, event.coordinates.latitude] }

    
      
    }));
    console.log(measureInfo)
    

    const {clusters, supercluster} = useSuperCluster({
      points,
      bounds,
      zoom,
      options: {radius: 75, maxZoom: 20}
  });

  //User has clicked on searched link. They want to go to it
  useEffect(() => {
    if(selectedEvent !== null){
      let longitude = selectedEvent.coordinates.longitude;
      let latitude = selectedEvent.coordinates.latitude;
      mapRef.current.panTo({lat: latitude, lng: longitude});
      mapRef.current.setZoom(10);
    }

  }, [selectedEvent])

  const locaCluster = eventData.map(event => {

    if (event.coordinates.latitude != null && event.coordinates.longitude != null){
      if (event.entity !== "government" ){
    
      return <LocationMarker 
      lat={event.coordinates.latitude} 
      lng={event.coordinates.longitude} 
      entity={event.entity}
      key={event.id}
      onMouseOver={() => {
        setLocationInfo({id: event.entity, title: event.name,
        unit:event.parameters[0].parameter, 
        para: event.parameters[0].lastValue})
      }}
      
      onClick={() => setMeasureInfo({
        name: event.name,
        
          labels: [event.parameters[0].parameter,
          event.parameters[1].parameter,
          event.parameters[2].parameter,
          event.parameters[3].parameter,
          event.parameters[4].parameter,
          event.parameters[5].parameter],

          datasets: [{
          label: 'Last update Value',
          data: [event.parameters[0].lastValue,
          event.parameters[1].lastValue,
          event.parameters[2].lastValue,
          event.parameters[3].lastValue,
          event.parameters[4].lastValue,
          event.parameters[5].lastValue],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
      }]
           
      
        
      })}
      />
  }else{
    return <LocationMarker 
      lat={event.coordinates.latitude} 
      lng={event.coordinates.longitude} 
      entity={event.entity}
      key={event.id}
      onMouseOver={() => {
        setLocationInfo({id: event.entity, title: event.name, 
        unit:event.parameters[0].parameter,
        para: event.parameters[0].lastValue})
      }}
    
      onClick={() => setMeasureInfo({
        name: event.name,
        labels: [event.parameters[0].parameter,
        event.parameters[1].parameter],
        
        datasets: 
        [{ 
            
            label: 'Last Value',
            data: [event.parameters[0].parameter,
            event.parameters[1].lastValue],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(75, 192, 192, 0.2)'],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)'],
            borderWidth: 1
            },
          
        ]
        
      })}
      />
    }
  }

  })

  return (
    <div className="map-container">
        <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyDNFTSVFQ-dDSScJkcUzp5qhqcjT47RYcM'}}// should be hid in root somewhere
        center={center}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map}) =>{
          mapRef.current = map;
        }}
        onChange={({zoom,bounds}) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat
          ]);

        } }
        onChildMouseLeave={() => {setLocationInfo(null); setMeasureInfo(null)}}
        
        onDrag={() => {setLocationInfo(null)}}
        >
        
        {locaCluster}
              
        </GoogleMapReact>
        {locationInfo && <LocationInfoBox info={locationInfo} />}

        <div className="barChart">
        {measureInfo && <BarChart chartData={measureInfo} />}
        </div>
        <div className="pieChart">
        {measureInfo && <PieChart chartData={measureInfo} />}
        </div>

    </div>
  );
}

Map.defaultProps = {
    center: {
      lat: 45.904404,
      lng: -122.74946
    }
}
export default Map;