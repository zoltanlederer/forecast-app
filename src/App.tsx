import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=london&appid=';

function App() {

  // API
  const [apiKey, setapiKey] = useState('');
  const [isApiKeyExist, setApiKeyExist] = useState(false)
  const [coordinates, setCoordinates] = useState({lat: 0, long: 0})

  // API Fetch
  useEffect(() => {
    if (isApiKeyExist) {
      axios.get(baseURL + apiKey).then((response) => {
        console.log(response)
      }).catch(error => {
        console.log(error)
        // getApiKey()
      })  
    }
    geolocation();
  },[]);

  // Geolocation
  const geolocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }

  // handle success case
  function onSuccess(position: any) {
    const crd = position.coords;
    console.log(crd.latitude, crd.longitude);
    setCoordinates({lat: crd.latitude, long: crd.longitude})
  }

 
  useEffect(() => {
    if (apiKey === '') {
      setApiKeyExist(false)
    } else {
      setApiKeyExist(true)
    }
    console.log(apiKey)  
    console.log(isApiKeyExist)  
  }, [apiKey, isApiKeyExist])
  

  const getApiKey = () => {
    const prompValue = prompt('Enter API Key');
    
    if(prompValue !== null) {
      console.log(prompValue);
      setapiKey(prompValue);
      setApiKeyExist(true);
    } 
  }


  return (
    <div className="App">
      <h1>App</h1>
      <p>{apiKey}</p>
      <p>Coordinates: Latitude {coordinates.lat}, Longitude: {coordinates.long}</p>
      { !isApiKeyExist && getApiKey() }
      <Search />
    </div>
  );
}

export default App;
