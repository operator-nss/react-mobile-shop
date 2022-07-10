import React from 'react';
import search from "../../assets/img/search.svg";
import Card from "../../components/Card/Card";
import favoritesEmpty from '../../assets/img/favorite-empty.png'
import './favorites.scss'
import {useDispatch, useSelector} from "react-redux";

const Favorites = ({ onAddToCart, addFavorite, onChangeSearchInput}) => {
	
	const {favoriteItems, statusFavorites} = useSelector(state => state.favorite);
	const {searchValue} = useSelector(state => state.phone);
	
	
	const renderItems = () => {
		const filteredItems = favoriteItems.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
		
		return (statusFavorites === 'favorites loading' ? [...Array(4)] : filteredItems).map((item, index) => (
			<Card
				key={index}
				addFavorite={(obj) => addFavorite(obj)}
				onPlus={(obj) => onAddToCart(obj)}
				{...item}
			/>
		));
	}
	
		return (
			<div className="favorites">
				<div className="favorites__label">
					<h1>{searchValue ? `Поиск по избранному по: "${searchValue}"` : 'Избранное'}</h1>
					<div className="favorites__search">
						<img src={search} alt="Search"/>
						<input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..."/>
					</div>
				</div>
				
				<div className="list__items">
					
					{favoriteItems.length > 0 ? (renderItems()) : (
						<>
						<h4 className='favorites__empty'>
							<img className='favorites__image' src={favoritesEmpty} alt=""/>
							<p>К сожалению Вы еще не добавляли ничего...</p>
							
						</h4>
						
						</>
					)}
					
				</div>

			</div>
		);
	}
;

export default Favorites;