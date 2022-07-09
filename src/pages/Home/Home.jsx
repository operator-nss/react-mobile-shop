import React from 'react';
import search from "../../assets/img/search.svg";
import Card from "../../components/Card/Card";
import './home.scss'

const Home = ({
	              sneakers,
	              cartItems,
	              favoriteItems,
	              searchValue,
	              onAddToCart,
	              addFavorite,
	              onChangeSearchInput
              }) => {
	
	
	return (
		
		<div className="main">
			<div className="main__label">
				<h1>{searchValue ? `Поиск: "${searchValue}"` : 'Все кроссовки'}</h1>
				<div className="favorites__search">
					<img src={search} alt="Search"/>
					<input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..."/>
				</div>
			</div>
			
			<div className="list__items">
				
				
				{sneakers
					.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
					.map((item) => {
						return <Card
							cartItems={cartItems}
							favoriteItems={favoriteItems}
							onPlus={(item) => onAddToCart(item)}
							addFavorite={(item) => addFavorite(item)}
							key={item.realId}
							id={item.id}
							realId={item.realId}
							title={item.title}
							price={item.price}
							imageUrl={item.imageUrl}/>
					})}
			
			
			</div>
		</div>
	);
};

export default Home;