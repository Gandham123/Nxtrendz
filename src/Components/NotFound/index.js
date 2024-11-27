import "./index.css";
import HeaderEl from "../Header";
const NotFoundEl=()=>{
    return(
        <>
        <HeaderEl/>
        <div className="bg-container-not-found">
           
            <img src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png" className="not-found-image-styling" alt="not-found"/>
        </div>
        </>
    )
}
export default NotFoundEl