import heartUnliked from '../../assets/img/heart-unliked.svg'
import heartLiked from '../../assets/img/heart-liked.svg'
import plus from '../../assets/img/plus.svg';
import checked from '../../assets/img/btn-checked.svg';
import './card.scss';
import {useEffect, useState} from "react";
import ContentLoader from "react-content-loader";
import {Link} from "react-router-dom";

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
	              favorited = false,
	              loading = false
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
			
			{!loading ? (
				<ContentLoader
					speed={2}
					width={155}
					height={250}
					viewBox="0 0 155 265"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb">
					<rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
					<rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
					<rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
					<rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
					<rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
				</ContentLoader>
			) : (
				<>
					<div onClick={onClickFavorite} className="card__favorite">
						<img src={!isFavorite ? heartUnliked : heartLiked} alt="Unliked"/>
					</div>
					
					<Link to={`/phone/${id}`}>
						<img width={133} className='card__image' height={112} src={imageUrl} alt="item"/>
						<h5 className='card__title'>{title}</h5>
					</Link>
					
					<div className="card__label">
						<div className="card__price">
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						<button onClick={addToCart} className="button ">
							<img width={11} style={isAdded ? {width: 32, height: 32} : null} height={11}
							     src={!isAdded ? plus : checked}
							     alt="add item to cart"/>
						</button>
					</div>
				</>
			)}
		
		
		</div>
	);
}

export default Card;
