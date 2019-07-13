import React, { Component } from 'react'
import { connect } from 'react-redux'
import {storeDecrement , storeIncrement} from './Redux/action';

export default class RenderMainComponent extends Component
{
  constructor(props)
  {
    super(props)
    this.handleMinusIconClick = this.handleMinusIconClick.bind(this);
    this.handlePlusIconClick = this.handlePlusIconClick.bind(this);
  }

  handlePlusIconClick(size)
  {
    this.props.increment(size)
  }
  handleMinusIconClick(size)
  {
    this.props.decrement(size)
  }
  render()
  {
    let thisObj = this;
    let pizzaVariantObj = thisObj.props.storeValues;
    let keys = Object.keys(pizzaVariantObj);
    return(
      <>
      {
        pizzaVariantObj && keys && keys.length ? keys.map(function(value , key)
        {
          return (
            <div key={key}>
            {
              ( value !== "adult" && value !== "children" ) ?  
                  <div className = { (value === "adult" || value === "children" ) ? "memberWholeCont" : "pizzaParent"}>
                    <div className = { (value ==="adult" || value === "children") ? "member" : "pizza"} id = {value} aria-label = {value} data-val = {value} key = {key}>{value}</div>
                  </div>
              :
              <div className = "membersCont" id={"member"+key}>
                <div className = "innerMemberContainer">
                  <div className = { (value === "adult" || value === "children" ) ? "memberWholeCont" : "pizzaParent"}>
                    <div className = { (value ==="adult" || value === "children") ? "member" : "pizza"} id = {value} aria-label = {value} data-val = {value} key = {key}>{value}</div>
                  </div>
                </div>
              </div>
            }
            {
              pizzaVariantObj[value] ? 
              <div className = {(value === "adult" || value === "children" ) ? "memberIconWrapper" : "pizzaIconWrapper"}>
               <div  className ={pizzaVariantObj[value].minusEnabled === "true" ? "enabled minusIcon icon" : "minusIcon icon disabled"}  onClick={() => thisObj.handleMinusIconClick(value)}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48" fill='#000000'><path className = "innerPath" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M,14h6v20h-6V14z"></path><path fill="#fff" d="M14,21h20v6H14V21z"></path></svg>
                </div> 
                <div className = "inputCont">{pizzaVariantObj[value].selectedValue ? pizzaVariantObj[value].selectedValue :0} </div>
                <div className ={pizzaVariantObj[value].plusEnabled === "true" ? "enabled  plusIcon icon" : "plusIcon icon disabled"} onClick={() => thisObj.handlePlusIconClick(value)}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48" fill="#000000"><path className = "innerPath" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M21,14h6v20h-6V14z"></path><path fill="#fff" d="M14,21h20v6H14V21z"></path></svg>
                </div> 
              </div> :""
            }
          </div>)
        })
        :""
      }
      </>
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
const ConRenderMainComponent = Connector(RenderMainComponent)

export {
  ConRenderMainComponent
}
