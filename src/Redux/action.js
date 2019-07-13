import { store } from './store'

const storeIncrement = (size) => {
      var action = {
         type: size,
         action : "increment"
      }
   store.dispatch(action)
 }

 const storeDecrement = (size) => {
   var action = {
      type: size,
      action : "decrement"
   }
   store.dispatch(action)
}

 export { 
   storeIncrement,
   storeDecrement
}