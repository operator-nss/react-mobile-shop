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
	              id,
	              onPlus,
	              realId,
	              addFavorite,
	              favoriteItems,
	              cartItems,
	              favorited = false
              }) {
	
	const [isAdded, setIsAdded] = useState(false);
	const [isFavorite, setIsFavorite] = useState(favorited);
	
	
	const addToCart = () => {
		const id = cartItems.length + 1;
		onPlus({id, title, price, imageUrl, realId})
		setIsAdded(!isAdded)
	}
	
	useEffect(() => {
		if (favoriteItems?.some(obj => obj.realId === realId)) {
			setIsFavorite(true)
		}
		if (cartItems?.some(obj => obj.realId === realId)) {
			setIsAdded(true)
		} else {
			setIsAdded(false)
		}
	}, [cartItems, favoriteItems, realId])
	
	const onClickFavorite = () => {
		if (favoriteItems.find(obj => obj.realId === realId)) {
			setIsFavorite(false);
			const id = favoriteItems.length + 1;
			addFavorite({title, id, price, imageUrl, realId})
		} else {
			addFavorite({title, price, id, imageUrl, realId})
			setIsFavorite(true)
		}
		
	}
	
	return (
		<div className="card">
			<div onClick={onClickFavorite} className="card__favorite">
				<img src={!isFavorite ? heartUnliked : heartLiked} alt="Unliked"/>
			</div>
			<img width={133} height={112} src={imageUrl} alt="item"/>
			<h5 className='card__title'>{title}</h5>
			<div className="card__label">
				<div className="card__price">
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
				<button onClick={addToCart} className="button ">
					<img width={11} style={isAdded ? {width: 32, height: 32} : null} height={11} src={!isAdded ? plus : checked}
					     alt="add item to cart"/>
				</button>
			</div>
		</div>
	);
}

export default Card;
