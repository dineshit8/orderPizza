import React , {Component} from 'react';
import { connect } from 'react-redux';
import { ConRenderMainComponent } from './MainComponent'
import {storeDecrement , storeIncrement} from './Redux/action';
import './App.scss';

export default class Wrapper extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {title : "Order Pizza"}
  }

  render()
  {
    return(
      <div className = "wrapper">
        <div className = "innerWrapper">
          <div className = "header">
            <div className = "title" aria-label = "Order Pizza">{this.state.title ? this.state.title : "Order Pizza"}</div>
          </div>
          <div className = "bodyContainer">
            <div className = "innerCont">
              <div className = "pizzaCont">
                <ConRenderMainComponent storeValues = {this.props.storeValue.pizzaObj}/>
              </div>
            </div>
          </div>
          <div className = "footer">
            <div className="footerInnerCont">
              <div className="orderLabel" aria-label="Order Total">Order Total</div>
              <div className = "orderTotal">{this.props.storeValue.orderTotalValue}</div>
            </div>
          </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
return({
      storeValue: state.pizzaValue
    })
}
const mapActionToProps = (dispatch, props) => (
{
  increment: storeIncrement,
  decrement : storeDecrement,
})

const Connector = connect(mapStateToProps, mapActionToProps)
const ConWrapper = Connector(Wrapper)

export {
  ConWrapper
}
