import * as React from "react";
import {connect} from "react-redux";
import './weather-info.less';
import history from "../../history";
import {AppRoute} from "../../util/const";
import {PropertyWeatherCIty} from "../../type";
import * as moment from "moment"

function formateTime(time) {
  const date = new Date(time * 1000);
  const timeStr = date.toLocaleTimeString();
  return `${timeStr}`;
}

function maxminTemp(min, max) {
  if (max && min) {
    return (
      <li className="info__item">
        <p className="info__item--text max-temp">{Math.floor(max)}&deg;C&#8593;</p>
        <p className="info__item--text min-temp">{Math.floor(min)}&deg;C&#8595;</p>
      </li>
    );
  }
}



interface Props {
  activeCity: PropertyWeatherCIty
}

const WeatherInfo : React.FunctionComponent<Props> = (props:Props) => {
  const {activeCity} = props;

  if (JSON.stringify(activeCity) === `{}`) {
    return <div/>;
  } else {
    const dayTime = activeCity.sys.sunset - activeCity.sys.sunrise;
    const dataInfo = moment().format('MMMM Do YYYY, h:mm a');
    return (
      <main className="weather-info">
        <section className="weather-info__property">
          <div className="weather-info__container">
            <span className="weather-info__container--date">{dataInfo}</span>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              history.push(AppRoute.ROOT);
            }} className="weather-info__container--back">назад</a>
            <span className="weather-info__container--country">{activeCity.name},{activeCity.sys.country}</span>
          </div>
          <ul className="weather-info__list info">
            <li className="info__item">
              <span className="info__item--span">{activeCity.weather[0].description}</span></li>
            <li className="info__item"><span className="info__item--span info__item--span-temp">{Math.floor(activeCity.main.temp)}&deg;</span></li>
            {maxminTemp(activeCity.main.temp_min, activeCity.main.temp_max)}
            <li className="info__item info__item--property humidity"><span className="info__item--span">{activeCity.main.humidity}%</span><p>Humidity</p></li>
            <li className="info__item info__item--property pressure"><span className="info__item--span">{activeCity.main.pressure}mBar</span><p>Pressure</p></li>
            <li className="info__item info__item--property speed"><span className="info__item--span">{activeCity.wind.speed}km/h</span><p>Wind</p></li>
            <li className="info__item info__item--property sunrise"><span className="info__item--span">{formateTime(activeCity.sys.sunrise)}</span><p>Sunrise</p></li>
            <li className="info__item info__item--property sunset"><span className="info__item--span">{formateTime(activeCity.sys.sunset)}</span><p>Sunset</p></li>
            <li className="info__item info__item--property dayTime"><span className="info__item--span">{formateTime(dayTime)}</span><p>Daytime</p></li>
          </ul>
        </section>
      </main>
    );
  }


};




const mapStateToProps = (state) => ({
  activeCity: state.activeCity
});
export default connect(mapStateToProps, null)(WeatherInfo);
