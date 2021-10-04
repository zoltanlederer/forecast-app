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
  const [isLoading, setIsLoading] = useState(false)
  const [refreshCouner, setRefreshCouner] = useState(0)

 
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
    
  },[coordinates.lat, refreshCouner]);

  // API Fetch
  const fetchWeather = async () => {
    setIsLoading(true)
    await axios.get(`${baseURL}lat=${coordinates.lat}&lon=${coordinates.long}&lang=${language}&appid=${apiKey}`).then((response) => {
      console.log(response.data)
      setIsLoading(false)
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
    setIsLoading(true)
    await axios.get(`${baseURL}q=${locationName}&appid=${apiKey}`).then((response) => {
      const data: any = response.data;
      console.log(data);
      console.log(data.coord);
      setIsLoading(false)
      setCoordinates({lat: data.coord.lat, long: data.coord.lon})
      setSearchError(false)
    }).catch(error => {
      console.log(error)
      setSearchError(true)
    })
  }
 
    // Automatic refresh
    useEffect(() => {
      const interval = setInterval(() => {
        setRefreshCouner(refreshCouner + 1);
      }, 600000);
      
      return () => clearInterval(interval);
    }, [refreshCouner]);

    

  return (
    <>
    { !isApiKeyExist && getApiKey() }
    { !isLocationAllowed && <div className="alert alert-warning text-center" role="alert">Please allow access to your location</div>}
    { !isApiKeyCorrect && <div className="alert alert-danger text-center" role="alert">Your API Key is incorrect</div>}
    
    { isLocationAllowed && isApiKeyCorrect &&
      <div className="d-flex flex-column justify-content-center align-items-center wrap-custom">
        <div className="card col-sm-12 col-md-8 col-lg-6 text-center text-dark bg-light">
          { isLoading && <div className="page-loading"><i className="fas fa-spinner fa-spin"></i></div>}
          <Search onSearch={searchByName} />
          <Output data={weather} searchError={searchError} update={searchByName}/>
        </div>
      </div>
    }
    </>
  );
}

export default App;
