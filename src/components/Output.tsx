import React from "react";

interface IData {
    data: any
}

const Output = ({data}: IData) => {

    // Date and Time
    let currentDate = new Date();
    let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    let dateTime = date + ' ' + time;

    const renderWeather = (): JSX.Element[] => {
        return (
            data.map((forecast: any) => {
            return (
              <>
              <h1>Varos: {forecast.name} </h1>
              <p>Lekerdezve: {dateTime}</p>
              <img src={require(`../images/${forecast.weather[0].icon}.svg`).default} alt="" width="100px" />
              <p>Idojaras: {forecast.weather[0].description}</p>
              <p>Homerseklet: {forecast.main.temp}</p>
              <p>Hoerzet: {forecast.main.feels_like}</p>
              </>
            )
          })
        )
      }


    return (
        <div>
            {/* <h2>Output:</h2> */}
            {renderWeather()}
        </div>
    )
};

export default Output;