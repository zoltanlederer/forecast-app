import React, { useEffect, useState } from "react";

interface IData {
    data: any,
    searchError: boolean
}

const Output = ({data, searchError}: IData) => {

    const [greeting, setGreeting] = useState('');

    // Date and Time
    const currentDate = new Date();
    const date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    const time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    const dateTime = date + ' ' + time;
    // Greeting hours
    const hours = currentDate.getHours();

    useEffect(() => {
        if (hours >= 7 && hours < 12) {
            setGreeting('Jo reggelt');
        } else if (hours >= 12 && hours < 18) {
            setGreeting('Jonapot');
        } else {
            setGreeting('Jo estet');
        }
    })

    
    const renderWeather = (): JSX.Element[] => {
        return (
            data.map((forecast: any) => {
            return (
                <>
                <div className="card-body">
                    { searchError && <div className="alert alert-danger" role="alert"><p className="m-0 p-0">City has not found. Try again.</p></div> }
                    <div className="alert alert-info" role="alert"><h2 className="m-0 p-0">{greeting}</h2></div>
                    <h1 className="card-title fw-bold">{forecast.name}</h1>
                    <p className="update-time-text">Frissitve:<br />{dateTime}</p>

                    <ul className="d-flex justify-content-center list-unstyled">
                        <li className="align-self-center">
                            <img src={require(`../images/temp.png`).default} alt="" width="100px" />
                        </li>
                        <li>
                            <p><img className="weather-icon" src={require(`../images/${forecast.weather[0].icon}.png`).default} alt={forecast.weather[0].description} /></p>
                            <p>{forecast.weather[0].description}</p>
                            <p className="feel-like">Hoerzet: {Math.floor(forecast.main.feels_like)}&#8451;</p>
                            <p className="temperature">{Math.floor(forecast.main.temp)}&#8451;</p>
                        </li>
                    </ul>
                    <button className="btn btn-outline-secondary">Frissites</button>
                </div>
                <div className="card-footer text-muted">
                    Weather App
                </div>
                </>
            )
          })
        )
      }


    return (
        <div>
            {renderWeather()}
        </div>
    )
};

export default Output;