import * as React from "react";
import {Switch, Router, Route} from "react-router-dom";
import "../variables-less/variables.less";
import "./app.less";
import WeatherMain from "../weather-main/weather-main";
import WeatherInfo from "../weather-info/weather-info";
import history from "../../history";
import {AppRoute} from "../../util/const";


const App = () => {

  return (<Router history={history}>
    <Switch>
      <Route exact path={AppRoute.ROOT}
        render={()=>
          <WeatherMain/>
        }
      />
      <Route exact path={AppRoute.WEATHER_INFO}
        render={()=>
          <WeatherInfo/>
        }
      />
    </Switch>
  </Router>);
};

export default App;


