import StoreLocal from "../localStorage/localStorage";
import {STATUS} from "../util/const";



export const localStoreListWeather = new StoreLocal('listWeather');
const localStoreActiveCity = new StoreLocal('activeCity');
export const localStoreToken = new StoreLocal('token');

const initializeState = {
  listWeather: localStoreListWeather.getAll() || [],
  activeCity: localStoreActiveCity.getAll() || {},
  isError: false,
  token: localStoreToken.getAll() || null
};

const ActionTypes = {
  LIST_WEATHER: `LIST_WEATHER`,
  CITY_WEATHER: `CITY_WEATHER`,
  DELETE_CITY: `DELETE_CITY`,
  ISERROR: `ISERROR`,
  TOKEN: 'TOKEN'

};

export const ActionCreators = {
  getListWeather: (data)=> ({
    type:ActionTypes.LIST_WEATHER,
    payload: data,
  }),
  activeCityWeather: (data) => ({
    type:ActionTypes.CITY_WEATHER,
    payload: data,
  }),
  isError: (key) => ({
    type:ActionTypes.ISERROR,
    payload: key,
  }),
  getToken: (key) => ({
    type:ActionTypes.TOKEN,
    payload: key,
  }),
};





export const Operation = {
  getList: (city) => async (dispatch, getState) => {
    const state = getState();
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${state.token}&lang=ru`)
      const data = await response.json()

      if(response.status === STATUS.SUCCESS) {
        localStoreListWeather.setItems(data)
        dispatch(ActionCreators.getListWeather(localStoreListWeather.getAll()))
      } else if (response.status === STATUS.BAD_REQUEST || STATUS.NOT_FOUND) {
        dispatch(ActionCreators.isError(true))
      }
    }catch (e) {
      throw e
    }
    },
  activeCity: (city) => async (dispatch,getState) => {
    const state = getState();
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${state.token}&lang=ru`)
      const data = await response.json()
      localStoreActiveCity.setItem(data)
      dispatch(ActionCreators.activeCityWeather(localStoreActiveCity.getAll()))
    }catch (e) {
      throw e
    }
  },
  chekToken: () => async (dispatch,getState) => {
    const state = getState();
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=${state.token}&lang=ru`)
      if(response.status === STATUS.NO_AUTH) {
        localStoreToken.setItem(null)
        dispatch(ActionCreators.getToken(localStoreToken.getAll()))
      }
    }catch (e) {
      throw e
    }
  }

}


export const reducer = (state = initializeState, action ) => {
  switch (action.type) {
    case ActionTypes.LIST_WEATHER:
      return {...state, listWeather: action.payload};
    case ActionTypes.CITY_WEATHER:
      return {...state, activeCity: action.payload};
    case ActionTypes.ISERROR:
      return {...state, isError: action.payload};
    case ActionTypes.TOKEN:
      return {...state, token: action.payload};
  }
  return state;
};

