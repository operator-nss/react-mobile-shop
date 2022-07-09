import React from 'react';
import search from "../../assets/img/search.svg";
import Card from "../../components/Card/Card";
import favoritesEmpty from '../../assets/img/favorite-empty.png'
import './favorites.scss'
import {Link} from "react-router-dom";

const Favorites = ({
	                   sneakers,
	                   cartItems,
	                   favoriteItems,
	                   searchValue,
	                   setSearchValue,
	                   onAddToCart,
	                   addFavorite,
	                   onChangeSearchInput
                   }
	) => {
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
					
					{favoriteItems.length > 0 ? (
						favoriteItems.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
							.map((item) => {
								return <Card
									cartItems={cartItems}
									favoriteItems={favoriteItems}
									onPlus={(item) => onAddToCart(item)}
									addFavorite={(item) => addFavorite(item)}
									key={item.realId}
									favorited={true}
									{...item}
								/>
							})
					) : (
						<>
						<h4 className='favorites__empty'>
							<img className='favorites__image' src={favoritesEmpty} alt=""/>
							<p>К сожалению Вы еще не добавляли ничего...</p>
							
						</h4>
						
						</>
					)}
				
				
				</div>
				<Link to='/'>
					<button className='favorites__button blueButton'>
						Вернуться на главную страницу
					</button>
				</Link>
			</div>
		);
	}
;

export default Favorites;