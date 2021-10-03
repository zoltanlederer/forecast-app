import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Output from './components/Output';


interface ICoord {
  lat: number,
  long: number
}

function App() {

  // API
  const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&';
  let language = 'hu';

  const [apiKey, setapiKey] = useState('');
  const [isApiKeyExist, setApiKeyExist] = useState(false);
  const [coordinates, setCoordinates] = useState<ICoord>({lat: 0, long: 0});
  // Store weather information after fetch
  const [weather, setWeather] = useState<any>([]);
  const [isLocationAllowed, setIsLocationAllowed] = useState(true)
  const [isApiKeyCorrect, setIsApiKeyCorrect] = useState(true)
  const [searchError, setSearchError] = useState(false)

 
  // useEffect for API key request
  useEffect(() => {
    if (apiKey === '') {
      setApiKeyExist(false)
    } else {
      setApiKeyExist(true)
    }
    console.log(apiKey)  
    console.log(isApiKeyExist)  
  }, [apiKey, isApiKeyExist])


  // useEffect for API fetch
  useEffect(() => {
    if (coordinates.lat === 0) {
      geolocation();  
    }
    
    // Only runs if geolocation isn't default
    if (isApiKeyExist && coordinates.lat !== 0) {
      fetchWeather();
    }
    console.log(`${baseURL}lat=${coordinates.lat}&lon=${coordinates.long}&appid${apiKey}`);
    
  },[coordinates.lat]);

  // API Fetch
  const fetchWeather = () => {
    axios.get(`${baseURL}lat=${coordinates.lat}&lon=${coordinates.long}&lang=${language}&appid=${apiKey}`).then((response) => {
      console.log(response.data)
      setWeather([response.data]);
    }).catch(error => {
      console.log(error)
      setIsApiKeyCorrect(false)
    })
  }

  // Geolocation
  const geolocation = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  // Geolocation success
  function success(position: any) {
    const crd = position.coords;
    console.log(crd.latitude, crd.longitude);
    setCoordinates({lat: crd.latitude, long: crd.longitude})
  }

  // Geolocation error
  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    // prompt('Please Allow your location and Enter API Key');
    setIsLocationAllowed(false);
  }


  // API popup request
  const getApiKey = () => {
    const prompValue = prompt('Enter API Key');
    
    if(prompValue !== null) {
      console.log(prompValue);
      setapiKey(prompValue);
      setApiKeyExist(true);
    } 
  }


  // Search by location name
  const searchByName = async (locationName: string) => {
    
    await axios.get(`${baseURL}q=${locationName}&appid=${apiKey}`).then((response) => {
      const data: any = response.data;
      console.log(data);
      console.log(data.coord);
      setCoordinates({lat: data.coord.lat, long: data.coord.lon})
      setSearchError(false)
    }).catch(error => {
      console.log(error)
      setSearchError(true)
    })
  }
 
  return (
    <>
    { !isApiKeyExist && getApiKey() }
    { !isLocationAllowed && <div className="alert alert-warning text-center" role="alert">Please allow access to your location</div>}
    { !isApiKeyCorrect && <div className="alert alert-danger text-center" role="alert">Your API Key is incorrect</div>}
    { isLocationAllowed && isApiKeyCorrect &&
      <div className="d-flex flex-column justify-content-center align-items-center wrap-custom">
        <div className="card col-sm-12 col-md-8 col-lg-6 text-center text-dark bg-light">
          <Search onSearch={searchByName} />
          <Output data={weather} searchError={searchError}/>
        </div>
      </div>
    }
    </>
  );
}

export default App;
