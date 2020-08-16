import * as React from "react";
import './token.less';
import {connect} from "react-redux";
import {ActionCreators, localStoreToken} from "../../reducer/reducer";
import {PropertyWeatherCIty} from "../../type";
import {Operation} from "../../reducer/reducer";
interface Props {
  listWeather: PropertyWeatherCIty[],
  activeCity: PropertyWeatherCIty,
  isError: boolean,
  getToken: (key: any) => void,
  chekToken: () => void
}

class Token extends React.PureComponent<Props> {
  private inputRef : React.RefObject<HTMLInputElement>

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleClickButton() {
    localStoreToken.setItem(this.inputRef.current.value);
    this.props.getToken(this.inputRef.current.value);
  }
  render() {
    return  (
      <form onSubmit={(e)=> {
        e.preventDefault();
        this.handleClickButton();
        this.props.chekToken();
      }}
        className="token">
      <h1 className="token__title">Введите токен</h1>
      <input ref={this.inputRef} className="token__input" id="search" type="text" placeholder="введите токен"/>
      <button className="token__button" type="submit">start</button>
    </form>
    );
  }
}





const mapStateToProps = (state) => ({
  listWeather: state.listWeather,
  activeCity: state.activeCity,
  isError: state.isError
});

const mapDispatchToProps = (dispatch) =>({
  getToken: (key) => {
    dispatch(ActionCreators.getToken(key));
  },
  chekToken: () => {
    dispatch(Operation.chekToken())
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Token)
