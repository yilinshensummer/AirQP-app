import React, {useContext, useState} from 'react'

const mainContext = React.createContext();
export function useMainContext() {
    return  useContext(mainContext);
}

export function ContextProvider({children}){
    //All of the data from openaq.org
    const [eventData, setEventData] = useState([]);
    //To save the type of event that user selects
    const[selectedEvent, setSelectedEvent] = useState(null);
    //re-render the icons because user has changed the selection
    const[reRenderMarkers, setReMarkers] =  useState(null);

    const value = {
        eventData,
        setEventData,
        selectedEvent,
        setSelectedEvent,
        reRenderMarkers,
        setReMarkers
    }

    return(
        <mainContext.Provider value={value}>
            {children}
        </mainContext.Provider>
    )

}