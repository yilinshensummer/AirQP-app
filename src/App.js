import Map from './Components/Map';
import Header from './Components/Header';
import {useState,useEffect} from 'react';
import Loader from './Components/Loader';
import Search from './Components/Search';
import axios from 'axios';
//Main Context
import {useMainContext} from './Context/Context';

function App() {
  const{setEventData, reRenderMarkers} = useMainContext();
  const [loading, setLoading] = useState(false);
  //Event to render
  const [renderEvent, setRenderEvent] = useState([]);
  const [limitNumber, setLimitNumber] = useState("");
 
  /*const onType = (e) => {
    if (e.key === 'Enter')
    const search = e.target.value
    APIstring = "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=200&page=1&offset=0&radius=1000&country_id=US&order_by=location&dumpRaw=false&&limit=" + search

  }*/

  useEffect(()=> {
    const fetchEvents = async (e) => {
      
      
      setLoading(true);
      let APIstring = 'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=200&page=1&offset=0&radius=1000&country_id=US&order_by=location&dumpRaw=false'
      const res = await fetch(APIstring)
      const { results } = await res.json()
      
      setEventData(results);
      setRenderEvent(results);
      setLoading(false);
      
      
        
      
      //const res = await fetch(APIstring);
      //Extract the Array contained in the "results" field
      //const { results } = await res.json();
      //Event data is globally accessible but 'renderEvent' is just to render our Map with the markers
      //setEventData(results);
      //setRenderEvent(results);
      //setLoading(false);
  
    }
    fetchEvents();

  },[])

    //let cancelToken;
    const userLimit = async(e) => {
      if (e.key === 'Enter'){
        const limit = e.target.value
        /*if (typeof cancelToken != typeof underfined) {
          cancelToken.cancel("Canceling the previous req")
        }*/
        const res = await fetch(`https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=${limit}&page=1&offset=0&radius=1000&country_id=US&order_by=location&dumpRaw=false`)
        const { results } = await res.json()
        console.log(limitNumber.length)
        setEventData(results);
        setRenderEvent(results);
        setLoading(false);
      }
      

    }
  
  /*if (limitNumber.length > 0){
    //APIstring = 'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=200&page=1&offset=0&radius=1000&country_id=US&order_by=location&dumpRaw=false&&limit=' + limitNumber;
    res = await fetch(`https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?limit=${limitNumber}&page=1&offset=0&radius=1000&country_id=US&order_by=location&dumpRaw=false`)
    const { results } = await res.json()
    console.log(limitNumber.length)
    setEventData(results);
    setRenderEvent(results);
    setLoading(false);
  }*/

  useEffect(() => {
    if (reRenderMarkers !== null){
      setRenderEvent(reRenderMarkers);
    }
  },[reRenderMarkers])
  
  return (
    <div>
    <Header />
    <div className="limitNumber"> 
      <input
      type="text"
      placeholder="enter limit number"
      onKeyDown={userLimit}>
      </input>

      </div>
      {!loading ? <Map eventData={renderEvent}/> : <Loader />}
      

      {!loading && <Search/>}
     
    </div>
    
  );
}

export default App;
