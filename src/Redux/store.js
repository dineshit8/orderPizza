import { createStore, combineReducers } from 'redux'

const orderPizza = (state = 0, action) =>
{
    let size = action.type;
    if(action.action === "decrement")
    {
        let decrementObj = Object.assign({}, state);
        decrementObj.pizzaObj[size].selectedValue--;
        switch(size)
        {
            case 'small' :
                if(decrementObj.pizzaObj["children"].selectedValue > 0)
                {
                    decrementObj.pizzaObj["children"].selectedValue--;
                }
                else if(decrementObj.pizzaObj["adult"].selectedValue > 0)
                {
                    decrementObj.pizzaObj["adult"].selectedValue--;
                    decrementObj.pizzaObj["children"].selectedValue++;
                }
                break;
            case 'medium':
                if(decrementObj.pizzaObj["adult"].selectedValue > 1)
                {
                    decrementObj.pizzaObj["adult"].selectedValue--;
                }
                else if(decrementObj.pizzaObj["children"].selectedValue > 1)
                {
                    decrementObj.pizzaObj["children"].selectedValue-= 2;
                }
                break;
            case 'large':
                if(decrementObj.pizzaObj["adult"].selectedValue > 2)
                {
                    decrementObj.pizzaObj["adult"].selectedValue-=2;
                }
                else if((decrementObj.pizzaObj["children"].selectedValue > 1) && (decrementObj.pizzaObj["adult"].selectedValue >1))
                {
                    decrementObj.pizzaObj["adult"].selectedValue--;
                    decrementObj.pizzaObj["children"].selectedValue -= 2;
                }
                else if(decrementObj.pizzaObj["children"].selectedValue > 3)
                {
                    decrementObj.pizzaObj["children"].selectedValue -= 4;
                }
                break;
            case 'adult':
                if(decrementObj.pizzaObj["medium"].selectedValue > 0)
                {
                    decrementObj.pizzaObj["medium"].selectedValue--;
                }
                else if(decrementObj.pizzaObj["large"].selectedValue > 0)
                {
                    decrementObj.pizzaObj["medium"].selectedValue++;
                    decrementObj.pizzaObj["large"].selectedValue--;
                }
                break;
            case 'children':
                if(decrementObj.pizzaObj["small"].selectedValue > 0)
                {
                    decrementObj.pizzaObj["small"].selectedValue--;
                }
                else if(decrementObj.pizzaObj["medium"].selectedValue > 0)
                {
                    decrementObj.pizzaObj["medium"].selectedValue--;
                    decrementObj.pizzaObj["small"].selectedValue++;
                }
                else if(decrementObj.pizzaObj["large"].selectedValue > 0)
                {
                    decrementObj.pizzaObj["large"].selectedValue--;
                    decrementObj.pizzaObj["medium"].selectedValue++;
                    decrementObj.pizzaObj["small"].selectedValue++;
                }
                break;
        }
        const decrementedStore = generalisation(decrementObj);
        return Object.assign({},state, {
            ...decrementedStore
        });
    }
    else if(action.action === "increment")
    {
        let incrementObj = Object.assign({}, state);
        incrementObj.pizzaObj[size].selectedValue++;
        switch(size)
        {
            case 'small' :
                incrementObj.pizzaObj["children"].selectedValue++;
                break;
            case 'medium' : 
                incrementObj.pizzaObj["adult"].selectedValue++;
                break;
            case 'large' :
                incrementObj.pizzaObj["adult"].selectedValue += 2;
                break;
            case 'adult' :
                incrementObj.pizzaObj["medium"].selectedValue++;
                break;
            case 'children' :
                incrementObj.pizzaObj["small"].selectedValue++;
                break;
        }
        const incrementedStore = generalisation(incrementObj);
        return Object.assign({},state, {
            ...incrementedStore
        });
    }
   
   return state;
}
const generalisation = (toGeneralizeObj) =>
{
    let tempObj = Object.assign({}, toGeneralizeObj);
    if (tempObj.pizzaObj["small"].selectedValue === 2) {
        tempObj.pizzaObj["small"].selectedValue -= 2;
        tempObj.pizzaObj["medium"].selectedValue++
    }
    if (tempObj.pizzaObj["medium"].selectedValue === 2) {
        tempObj.pizzaObj["medium"].selectedValue -= 2;
        tempObj.pizzaObj["large"].selectedValue++;
    }
    let toValidate = buttonOperation(tempObj);
    return toValidate;
}
const buttonOperation = (pizza) =>
{
    let newStateObject = Object.assign({}, pizza);
    let tempState = totalCalculate(newStateObject);
    let maxLimit = 1000;
    tempState.pizzaObj["small"].plusEnabled = (tempState.orderTotalValue + 150) <= maxLimit ? "true" : "false";
    tempState.pizzaObj["medium"].plusEnabled = (tempState.orderTotalValue + 200) <= maxLimit ? "true" : "false";
    tempState.pizzaObj["large"].plusEnabled = (tempState.orderTotalValue + 300) <= maxLimit ? "true" : "false";
    tempState.pizzaObj["children"].plusEnabled = (tempState.orderTotalValue + 150) <= maxLimit ? "true" : "false";
    tempState.pizzaObj["adult"].plusEnabled = (tempState.orderTotalValue + 200) <= maxLimit ? "true" : "false";

    tempState.pizzaObj["small"].minusEnabled = (tempState.pizzaObj["small"].selectedValue > 0) ? "true" : "false";
    tempState.pizzaObj["medium"].minusEnabled = (((tempState.pizzaObj["medium"].selectedValue > 1) || (tempState.pizzaObj["large"].selectedValue > 0)) && (tempState.pizzaObj["medium"].selectedValue !== 0)) ? "true" : "false";
    tempState.pizzaObj["large"].minusEnabled = (((tempState.pizzaObj["medium"].selectedValue === 0) && (tempState.pizzaObj["large"].selectedValue === 1)) || (tempState.pizzaObj["large"].selectedValue === 0)) ? "false" : "true";
    tempState.pizzaObj["adult"].minusEnabled = (tempState.pizzaObj["adult"].selectedValue === 1) ? "false" : "true";
    tempState.pizzaObj["children"].minusEnabled = (tempState.pizzaObj["children"].selectedValue === 0) ? "false" : "true";   
    return tempState;
}

const totalCalculate = (pizza) => {
    pizza.orderTotalValue = pizza.pizzaObj["small"].selectedValue * 150 + pizza.pizzaObj["medium"].selectedValue * 200 + pizza.pizzaObj["large"].selectedValue * 300;
    return pizza;
}

const allReducers = combineReducers({
    pizzaValue: orderPizza
})

const store = createStore(
    allReducers,
    {
        pizzaValue: {
            "orderTotalValue": 450,
            "pizzaObj": {
                "small":
                {
                    "minusEnabled": "true",
                    "selectedValue": 1,
                    "plusEnabled": "true"
                },
                "medium": {
                    "minusEnabled": "false",
                    "selectedValue": 0,
                    "plusEnabled": "true",
                },
                "large": {
                    "minusEnabled": "false",
                    "selectedValue": 1,
                    "plusEnabled": "true",
                },
                "adult": {
                    "minusEnabled": "true",
                    "selectedValue": 2,
                    "plusEnabled": "true"
                },
                "children": {
                    "minusEnabled": "true",
                    "selectedValue": 1,
                    "plusEnabled": "true"
                }
            }
        },
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store }