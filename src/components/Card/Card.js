import heartUnliked from '../../assets/img/heart-unliked.svg'
import heartLiked from '../../assets/img/heart-liked.svg'
import plus from '../../assets/img/plus.svg';
import checked from '../../assets/img/btn-checked.svg';
import './card.scss';
import {useEffect, useState} from "react";

function Card({
	              title,
	              price,
	              imageUrl,
	              onPlus,
	              id,
	              addFavorite,
	              favoriteItems,
	              cartItems,
	              favorited = false
              }) {
	
	const [isAdded, setIsAdded] = useState(false);
	const [isFavorite, setIsFavorite] = useState(favorited);
	
	
	const addToCart = () => {
		onPlus({title, price, imageUrl, id})
		setIsAdded(!isAdded)
	}
	
	useEffect(() => {
		if (favoriteItems.find(obj => obj.title === title)) {
			setIsFavorite(true)
		}
		if (cartItems.find(obj => obj.id === id)) {
			setIsAdded(true)
		} else {
			setIsAdded(false)
		}
	}, [cartItems, favoriteItems, id])
	
	const onClickFavorite = () => {
		addFavorite({title, price, imageUrl, id})
		setIsFavorite(!isFavorite)
	}
	
	return (
		<div className="card">
			<div onClick={onClickFavorite} className="favorite">
				<img src={!isFavorite ? heartUnliked : heartLiked} alt="Unliked"/>
			</div>
			<img width={133} height={112} src={imageUrl} alt="Sneakers"/>
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
				<button onClick={addToCart} className="button ">
					<img width={11} style={isAdded ? {width: 32, height: 32} : null} height={11} src={!isAdded ? plus : checked}
					     alt="Plus"/>
				</button>
			</div>
		</div>
	);
}

export default Card;
