import Header from './components/Header';
import Drawer from './components/Drawer';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";


const App = () => {
	
	
	
	const [cartOpened, setCartOpened] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [favoriteItems, setFavoriteItems] = useState([]);
	const [sneakers, setSneakers] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	
	let arr = [];
	
	
	useEffect(() => {
		
		axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/items')
			.then(res => setSneakers(res.data))
		
		axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/cart')
			.then(res => setCartItems(res.data))
		
		axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/favorites')
			.then(res => setFavoriteItems(res.data))
		
		// fetch('https://62c0780cd40d6ec55cd18676.mockapi.io/items')
		// 	.then(res => res.json())
		// 	.then(res => setSneakers(res))
		
		
	}, [])
	
	const onAddToCart = (item) => {
		try {
			const newItem = cartItems.find(obj => obj.id === item.id);
			if (!newItem) {
				setCartItems([...cartItems, item]);
				
				axios.post('https://62c0780cd40d6ec55cd18676.mockapi.io/cart', item)
				
			} else {
				const newArr = cartItems.filter(obj => item.id !== obj.id);
				setCartItems([...newArr])
				axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/cart/${item.id}`)
			}
		} catch (e) {
			alert(e)
		}
		
	}
	
	const deleteItem = (item) => {
		const newArr = cartItems.filter(obj => obj.id !== item.id)
		setCartItems([...newArr])
		axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/cart/${item.id}`)
	}
	
	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
		console.log(searchValue)
	}
	
	const addFavorite = async (item) => {
		try {
			if(favoriteItems.find(obj => obj.id === item.id)) {
				const newArr = favoriteItems.filter(obj => obj.id !== item.id)
				setFavoriteItems([...newArr]);
				axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/favorites/${item.id}`);
			} else {
				const {id, title, price, imageUrl} = item;
				const {data} = await axios.post('https://62c0780cd40d6ec55cd18676.mockapi.io/favorites', { title, price, imageUrl, id } );
				
				setFavoriteItems((prev) => [...prev, data])
			}
		} catch (e) {
			alert('не удалось фавориты сделать')
		}
	}
	
	 
	 
	
	return (
		
		
		<div className="wrapper clear">
		
		{cartOpened ? <Drawer cartItems={cartItems} deleteItem={deleteItem} setCartOpened={setCartOpened}/> : null}
		
 		<Header setCartOpened={setCartOpened}/>
		
			
			<Routes>
				<Route path="/" element={<Home
					sneakers={sneakers}
					cartItems={cartItems}
					favoriteItems={favoriteItems}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onAddToCart={onAddToCart}
					addFavorite={addFavorite}
					onChangeSearchInput={onChangeSearchInput}
				/>} />
				<Route path="/favorites" element={<Favorites
					sneakers={sneakers}
					cartItems={cartItems}
					favoriteItems={favoriteItems}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onAddToCart={onAddToCart}
					addFavorite={addFavorite}
					onChangeSearchInput={onChangeSearchInput}/>} />
			</Routes>
		
	</div>);
}


export default App;
