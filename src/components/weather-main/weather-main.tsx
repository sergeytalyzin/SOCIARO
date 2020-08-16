import * as React from "react";
import './weather-main.less';
import {connect} from "react-redux";
import {ActionCreators, localStoreListWeather, Operation} from "../../reducer/reducer";
import history from "../../history";
import {AppRoute} from "../../util/const";
import Error from "../error/error";
import Token from "../token/token";
import {PropertyWeatherCIty} from "../../type";

interface Props {
  getListWeather: () => void,
  addListWeather: (city:string) => void,
  listWeather: PropertyWeatherCIty[],
  getActiveCity: (city:PropertyWeatherCIty) => void,
  activeCity: PropertyWeatherCIty,
  changeStatusError: () => void,
  isError: boolean,
  token: any
}

class WeatherMain extends React.PureComponent<Props> {
  private ref: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    document.addEventListener(`click`, this.props.changeStatusError);
  }
  componentWillUnmount() {
    document.removeEventListener(`click`, this.props.changeStatusError);
  }

  handleClickInput() {
    this.props.addListWeather(this.ref.current.value);
  }
  handleClickActiveCity(city) {

    this.props.getActiveCity(city);
  }
  handleSubmit(e){
    e.target.reset();
  }
  render() {
    return (
      <main className="weather">
        <section className="weather__location">
          <p className="weather__location-text">Location</p>
          <form onSubmit={(e)=>{
            e.preventDefault();

            this.handleClickInput();
            this.handleSubmit(e);
          }} className="weather__location-form">
            <input ref={this.ref} className="weather__location-input" id="search" type="search" placeholder="для поиска введите город"/>
            <label htmlFor="search"/>
            <div className="container">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#3da35a"
                  fill="transparent"/>
              </svg>
            </div>
            <button onClick={()=>{
              let checkmark = document.querySelector(`svg`);
              if (!checkmark.classList.contains(`animate`)) {
                checkmark.classList.add(`animate`);

                setTimeout(() => {
                  checkmark.classList.remove(`animate`);
                }, 1700);
              }
            }}>add this city</button>

            <ul className="weather__list">
              {this.props.listWeather.map((city, i)=>(
                <li className="weather__list-item" key={i}>
                  <span data-city={city.name} onClick={(e)=>{
                    this.handleClickActiveCity(e.currentTarget.dataset.city);
                    history.push(AppRoute.WEATHER_INFO);
                  }}

                  className="weather__list-span" tabIndex={i + 1}>{city.name}</span>
                  <span id="delete"
                    onClick={()=>{
                      localStoreListWeather.deleteItem(city.id);
                      this.props.getListWeather();
                    }}
                  >&#10060;</span>
                  <span className="weather__list-span--temp">{Math.floor(city.main.temp)}&deg;C</span>
                </li>
              ))}
            </ul>
          </form>
          {this.props.isError ? (
            <Error/>
          ) :
            (
              ``
            )
          }
          {this.props.token ? (
              ``
            ) :
            (
              <Token/>
            )
          }
        </section>
      </main>
    );
  }
}


const mapStateToProps = (state) => ({
  listWeather: state.listWeather,
  activeCity: state.activeCity,
  isError: state.isError,
  token: state.token
});

const mapDispatchToProps = (dispatch) =>({
  addListWeather: (city) => {
    dispatch(Operation.getList(city));
  },
  getActiveCity: (city) => {
    dispatch(Operation.activeCity(city));
  },
  getListWeather: () => {
    dispatch(ActionCreators.getListWeather(localStoreListWeather.getAll()));
  },
  changeStatusError: () => {
    dispatch(ActionCreators.isError(false));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(WeatherMain);


