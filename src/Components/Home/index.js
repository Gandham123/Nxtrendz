import "./index.css"
import HeaderEl from "../Header"
//import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const HomeEl=(props)=>{
   const{history}=props
    const handlingClick=()=>{
        history.replace('/products')
      }
      return(
        <>
        <h1 className="Home-name-heading">Home</h1>
          <HeaderEl/>
         <div className="home-main-bg-container">
            <div className="Home-text-container">
              <h1 className="home-main-heading">Clothes That Get You Noticed</h1>
              <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png" className="small-view-home-img-styling" alt="Home-image"/>
              <p className="home-paragraph">Fashion is part of the dialy air does not quite
                help that it changes all the time. Clothes have always been a maker of the era and we are in 
                a revolution. Your fashion makes you been seen and  heard that way you are. So,celebrate
                the seasons new and exciting fashion in your way.
              </p>
              <button className="home-button-styling" onClick={handlingClick}>Shop Now</button>
            </div>
            <div className="Home-image-container">
              <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png" className="home-img-styling" alt="Home-image"/>
            </div>
         </div>
        </>
      )
}

export default HomeEl