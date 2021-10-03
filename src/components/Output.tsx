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
                <div className="card-body">
                    <h1 className="card-title fw-bold">{forecast.name}</h1>
                    <p className="update-time-text">Frissitve:<br />{dateTime}</p>

                    <ul className="d-flex justify-content-center list-unstyled">
                        <li className="align-self-center">
                            <img src={require(`../images/temp.png`).default} alt="" width="100px" />
                        </li>
                        <li>
                            <p><img src={require(`../images/${forecast.weather[0].icon}.svg`).default} alt="" width="100px" /></p>
                            <p>{forecast.weather[0].description}</p>
                            <p className="feel-like">Hoerzet: {forecast.main.feels_like}&#8451;</p>
                            <p className="temperature">{forecast.main.temp}&#8451;</p>
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