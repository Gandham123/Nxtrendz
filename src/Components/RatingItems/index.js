import './index.css'


const RatingItemEl=(props)=>{
    const{ratingData,updaterating,ratingIsActive}=props;
    const selectedRatingStyle=ratingIsActive?'extra-rating-styling':'';
    const{ratingId,imageUrl}=ratingData
    const clickedRating=()=>{
        updaterating(ratingId)
    }
    return(
        <div className='ratings-container'>
            <img src={imageUrl} className='stars-image-styling' alt='stars'/>
            <p className={`stars-text ${selectedRatingStyle}`} onClick={clickedRating}>&up</p>
        </div>
    )
}
export default RatingItemEl