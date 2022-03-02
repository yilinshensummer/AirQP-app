import React,{useEffect, useRef, useState} from 'react';
//Global Context
import{useMainContext} from '../Context/Context'

function Search(props) {

    const {eventData, setSelectedEvent, setReMarkers } = useMainContext();
    //Match the data
    const [matchEvent, setMatchEvent] = useState(eventData);
    //Deal with dropdown
    const [storeSelection, setStoreSelection] = useState("All");

    const searchBox = useRef();
    const optionBox = useRef();

    // Filter eventData
    const filterEventData = eventData => {
        // clone a new data
        let filteredEventData = [...eventData];
        if(storeSelection !== "All"){
            filteredEventData = filteredEventData.filter(event => event.entity === storeSelection);
        }
        return filteredEventData;
    }

    const userSearch = (searchQuery, eventData) => {
        let eventMatch = [];
        let filterdEventData = filterEventData(eventData);

        if (searchQuery.length > 0 && filterdEventData) {
            for (const event in eventData) {
                let eventTitle = filterdEventData[event].name.toLowerCase();
                
                if (eventTitle.includes(searchQuery)) {
                    eventMatch.push(filterdEventData[event]);
                }
            
            }

            //If user type in somthing but it doesn't match
            if (eventMatch.length === 0) {
                eventMatch = [{name: "No Results!",sensorType: "", entity: "", parameters: [{lastValue:""},{},{},{},{}]}]
            }
            setMatchEvent(eventMatch);
        }else{
            setMatchEvent(filterdEventData);
        }
    }
     
    // If user has changed the filter option, need to match marker
     useEffect(() => {
         //First sort out the Markers
         let filterdEventData = filterEventData(eventData);
         setReMarkers(filterdEventData);
         //Second sort out the search results
         userSearch(searchBox.current.value.toLowerCase(), filterdEventData);
     },[storeSelection])

    return (
        <>
            <section className="option-container" >
            <p>Type:</p>
            <select ref={optionBox} onChange={() => {setStoreSelection(optionBox.current.value)}}>
                <option value="All">All</option>
                <option value="community">community</option>
                <option value="government">government</option>
                <option value="research">research</option>
            </select>
            </section>
            <section className='search-container'>
                <p>Search:</p>
                <input type="text" onKeyUp={() => {
                    let searchQuery = searchBox.current.value.toLowerCase();
                    // Wait for the user to finish typing before sending method
                    setTimeout(() => {
                        if (searchQuery ===  searchBox.current.value.toLowerCase()){
                            userSearch(searchQuery, eventData);
                        }
                    }, 240)
                }}
                ref={searchBox} />

                

            </section>
            <table className="search-table">
                <tr>
                    <th style={{width: "60%"}}>Place Name</th>
                    <th>Measure Type</th>
                    <th>Entity</th>
                    <th>PM2.5</th>
                    <th>Location</th>
                </tr>
                {matchEvent.map(ev => {
                    return(<tr key={ev.entity}>
                        <td>{ev.name}</td>
                        <td>{ev.sensorType}</td>
                        <td>{ev.entity}</td>
                        <td>{ev.parameters[0].lastValue}</td>
                        {ev.parameters[0].lastValue ? <td><a href="#"
                        onClick={() => {setSelectedEvent(ev)}}>Click Here</a></td> : <td></td>}
                        </tr>
                    )
                })}
                
            </table>
            
        </>
    );
}

export default Search;