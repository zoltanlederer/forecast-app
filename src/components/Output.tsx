import React, { useEffect, useState } from "react";
import { languages as language } from "../components/Languages";
import { colortheme } from "../components/Colortheme";

interface IData {
    data: any,
    searchError: boolean,
    update: (locationName: string | undefined) => {},
    languageSwitch: any,
    themeColor: any,
}

const Output = ({data, searchError, update, languageSwitch, themeColor}: IData) => {

    const [greeting, setGreeting] = useState('');
    const [lang, setLang] = useState(languageSwitch);
    const [darkTheme, setDarkTheme] = useState('light');

    // Switch language
    useEffect(() => {
        setLang(languageSwitch);
    },[languageSwitch])

    // Light/Dark mode
    useEffect(() => {
        setDarkTheme(themeColor);
    },[themeColor])

    // Date and Time
    const currentDate = new Date();
    const date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    const time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    const dateTime = date + ' ' + time;
    
    // Greeting hours
    const hours = currentDate.getHours();
    useEffect(() => {
        if (hours >= 7 && hours < 12) {
            setGreeting(language[lang]['morning']);
        } else if (hours >= 12 && hours < 18) {
            setGreeting(language[lang]['afternoon']);
        } else {
            setGreeting(language[lang]['evening']);
        }
    }, [hours])

    // Manual refresh
    const handleUpdate = (e: React.MouseEvent<Element, MouseEvent>) : void => {
        e.preventDefault();
        const locationName = document.querySelector('#location-name');
        update(locationName?.innerHTML);
    }

    
    const renderWeather = (): JSX.Element[] => {
        return (
            data.map((forecast: any) => {
            return (
                <>
                <div className="card-body">
                    { searchError && <div className="alert alert-danger" role="alert"><p className="m-0 p-0">{language[lang]['searchError']}</p></div> }
                    <div className="alert alert-secondary" role="alert"><h2 className="m-0 p-0">{greeting}</h2></div>
                    <h1 className="card-title fw-bold" id="location-name">{forecast.name}</h1>
                    <p className="update-time-text">{language[lang]['updated']}:<br />{dateTime}</p>

                    <ul className="d-flex justify-content-center list-unstyled">
                        <li className="align-self-center">
                            <img src={require(`../images/temp.png`).default} alt="" width="100px" />
                        </li>
                        <li>
                            <p><img className="weather-icon" src={require(`../images/${forecast.weather[0].icon}.png`).default} alt={forecast.weather[0].description} /></p>
                            <p className="text-capitalize">{forecast.weather[0].description}</p>
                            <p className="feel-like">{language[lang]['feelsLike']}: {Math.floor(forecast.main.feels_like)}&#8451;</p>
                            <p className="temperature">{Math.floor(forecast.main.temp)}&#8451;</p>
                        </li>
                    </ul>
                    <button className={`btn ${colortheme[darkTheme]['updateBtn']}`}
                         type="submit" onClick={handleUpdate}
                    >
                    {language[lang]['refresh']}
                    </button>
                </div>
                <div className={`card-footer ${colortheme[darkTheme]['cardFooter']}`}>
                    {language[lang]['weatherApp']}
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