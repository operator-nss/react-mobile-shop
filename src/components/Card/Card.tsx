import heartUnliked from '../../assets/img/heart-unliked.svg'
import heartLiked from '../../assets/img/heart-liked.svg'
import plus from '../../assets/img/plus.svg';
import checked from '../../assets/img/btn-checked.svg';
import './card.scss';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Skeleton from "../Skeleton/Skeleton";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

type CardProps = {
	title: string,
	price: number,
	imageUrl: string,
	id: string,
	onPlus: any | null,
	realId: string,
	addFavorite: any | null,
}


const Card:React.FC<CardProps> = ({title, price, imageUrl, id, onPlus, realId, addFavorite}) => {


	const {status} = useSelector((state:RootState) => state.phone);
	const {statusFavorites} = useSelector((state:RootState) => state.favorite);
	const {cartItems, statusCart} = useSelector((state:RootState) => state.cart);
	const {favoriteItems} = useSelector((state:RootState) => state.favorite);


	const [isAdded, setIsAdded] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);


	const addToCart = () => {
		const id = cartItems.length + 1;
		onPlus({id, title, price, imageUrl, realId})
		setIsAdded(!isAdded)
	}

	useEffect(() => {
		if (favoriteItems.some(obj => obj.realId === realId)) {
			setIsFavorite(true)
		}
		if (cartItems.some(obj => obj.realId === realId)) {
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

			{status === 'phone loading' || statusFavorites === 'favorites loading' ? (
				<Skeleton />
			) : (
				<>
					<button onClick={onClickFavorite} disabled={statusFavorites === 'add to favorites'} className="card__favorite">
						<img src={!isFavorite ? heartUnliked : heartLiked} alt="Unliked"/>
					</button>

					<Link to={`/phone/${id}`}>
						<img width={133} className='card__image' height={112} src={imageUrl} alt="item"/>
						<h5 className='card__title'>{title}</h5>
					</Link>

					<div className="card__label">
						<div className="card__price">
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						<button disabled={statusCart === 'add to cart' || statusCart === 'remove from cart'} onClick={addToCart} className="button ">
							<img width={11}
								 style={isAdded ? {width: 32, height: 32} : {}}
								 height={11}
							     src={!isAdded ? plus : checked}
							     alt="add item to cart"/>
						</button>
					</div>
				</>
			)}


		</div>
	);
};

export default Card;
