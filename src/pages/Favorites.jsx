import React from 'react';
import search from "../assets/img/search.svg";
import Card from "../components/Card/Card";

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
			<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					<h1>{searchValue ? `Поиск по избранному по: "${searchValue}"` : 'Избранное'}</h1>
					<div className="search-block d-flex">
						<img src={search} alt="Search"/>
						<input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..."/>
					</div>
				</div>
				
				<div className="d-flex sneakers">
					
					
					{favoriteItems
						.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
						.map((item) => {
							return <Card
								cartItems={cartItems}
								favoriteItems={favoriteItems}
								onPlus={(item) => onAddToCart(item)}
								addFavorite={(item) => addFavorite(item)}
								key={item.id}
								favorited={true}
								{...item}
							/>
						})}
				
				
				</div>
			</div>
		);
	}
;

export default Favorites;