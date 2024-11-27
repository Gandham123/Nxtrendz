import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import HomeEl from './Components/Home';
import ProductEl from './Components/Products';
import CartEl from './Components/Cart';
import LoginEl from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import NotFoundEl from './Components/NotFound';
import ProductItemDetailsEl from './Components/ProductItemDetails';
import CartContest from './Context';
import { Component } from 'react';

class App extends Component{
  state={cartList:[]}
  addingCartProducts=(cartProductsRecieve)=>{
    const{cartList}=this.state
    const cartProductAlreadyExist=cartList.filter((eachItem)=>(eachItem.id===cartProductsRecieve.id))
    if(cartProductAlreadyExist.length===0){
      this.setState((prevState)=>({cartList:[...prevState.cartList,cartProductsRecieve]}))
    }
    else{
      const updatedCart=cartList.map((eachItem)=>{
        if(eachItem.id!==cartProductsRecieve.id){
          return {...eachItem}
        }
        else{
          return {...eachItem,counter:eachItem.counter+1}
        }
      })
      this.setState({cartList:updatedCart})
    }
  }
  deletingCartProduct=(Recieveid)=>{
    const{cartList}=this.state
    const updatedList=cartList.filter((eachItem)=>(eachItem.id!==Recieveid))
    this.setState({cartList:updatedList})
  }
  decreasingProductCount=(clickedProductId)=>{
    this.setState((prevState)=>({cartList:prevState.cartList.map((eachItem)=>{
      if(eachItem.id!==clickedProductId){
        return {...eachItem}
      }
      else{
        if(eachItem.counter>1){
          return{...eachItem,counter:eachItem.counter-1}
        }
        else{
          return{...eachItem}
        }
      }
    })}))
  }
  increasingProductCount=(clickedId)=>{
    this.setState((prevState)=>({cartList:prevState.cartList.map((eachItem)=>{
      if(eachItem.id!==clickedId){
        return{...eachItem}
      }
      else{
        return{...eachItem,counter:eachItem.counter+1}
      }
    })}))
  }
  render(){
    const{cartList}=this.state
  return (
    <div>
     <BrowserRouter>
     <CartContest.Provider value={{cartListEl:cartList, addProducts:this.addingCartProducts,
     deleteProducts:this.deletingCartProduct, increaseProductsCount:this.increasingProductCount,decreaseProductsCount:this.decreasingProductCount}}>
     <Switch>
      <ProtectedRoute exact path='/' component={HomeEl}/>
      <ProtectedRoute exact path='/products' component={ProductEl}/>
      <ProtectedRoute exact path='/cart' component={CartEl}/>
      <ProtectedRoute exact path='/products/:id' component={ProductItemDetailsEl}/>
      <Route exact path='/login' component={LoginEl}/>
      <Route exact path='*' component={NotFoundEl}/> 
     </Switch>
     </CartContest.Provider>
     </BrowserRouter>
    </div>
  );
}
}

export default App;
