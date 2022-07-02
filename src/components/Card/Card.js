import heartUnliked from '../../assets/img/heart-unliked.svg'
import plus from '../../assets/img/plus.svg';
import checked from '../../assets/img/btn-checked.svg';
import './card.scss';
import {useEffect, useState} from "react";

function Card({title, price, imageUrl, onPlus, onClickFavorite}) {
  
  const [isAdded, setIsAdded] = useState(false);
  
  const addToCart = () => {
    onPlus({title, price, imageUrl})
    setIsAdded(!isAdded)
   }
  
  useEffect(() => {
  
  }, [isAdded])
 
  return (
    <div className="card">
      <div onClick={onClickFavorite} className="favorite">
        <img src={heartUnliked} alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button onClick={addToCart} className="button ">
          <img width={11} style={isAdded ? {width: 32, height: 32} : null} height={11}  src={!isAdded ? plus : checked} alt="Plus" />
        </button>
      </div>
    </div>
  );
}

export default Card;
