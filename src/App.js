import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import Orders from "./pages/Orders/Orders";
import bgPhone1 from './assets/img/1iphone.png';
import bgPhone2 from './assets/img/2iphone.png';
import phone2 from './assets/img/phone2.png';
import phone from './assets/img/phone.png';


const App = () => {
	
	
	const [cartOpened, setCartOpened] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [favoriteItems, setFavoriteItems] = useState([]);
	const [sneakers, setSneakers] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const loading = useRef(false);
	const [orderId, setOrderId] = useState(null);
	const [orders, setOrders] = React.useState([]);
	
	useEffect(() => {
		if (!loading.current) {
			async function fetchData() {
				try {
					const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
						axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/cart'),
						axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/favorites'),
						axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/items'),
					]);
					
					setCartItems(cartResponse.data);
					setFavoriteItems(favoritesResponse.data);
					setSneakers(itemsResponse.data);
				} catch (error) {
					alert('Ошибка при запросе данных ;(');
					console.error(error);
				}
			}
			
			fetchData();
		}
		
		loading.current = true
		
	}, [])
	
	const onAddToCart = (item) => {
		try {
			const newItem = cartItems.some(obj => +obj.realId === +item.realId);
			if (!newItem) {
				setCartItems([...cartItems, item]);
				axios.post('https://62c0780cd40d6ec55cd18676.mockapi.io/cart', item)
			} else {
				const findItemToDelete = cartItems.find(obj => obj.title === item.title);
				const newArr = cartItems.filter(obj => item.realId !== obj.realId);
				setCartItems([...newArr]);
				axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/cart/${findItemToDelete.id}`)
			}
		} catch (e) {
			console.log(e)
		}
		
	}
	
	const deleteItem = (item) => {
		const newArr = cartItems.filter(obj => obj.realId !== item.realId)
		setCartItems([...newArr])
		axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/cart/${item.id}`)
	}
	
	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}
	
	const addFavorite = async (item) => {
		try {
			if (favoriteItems.some(obj => +obj.realId === +item.realId)) {
				const newArr = favoriteItems.filter(obj => obj.realId !== item.realId);
				const findItemToDelete = favoriteItems.find(obj => obj.title === item.title);
				setFavoriteItems([...newArr]);
				axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/favorites/${findItemToDelete.id}`);
			} else {
				const {data} = await axios.post('https://62c0780cd40d6ec55cd18676.mockapi.io/favorites', item);
				setFavoriteItems((prev) => [...prev, data])
			}
		} catch (e) {
			alert('не удалось фавориты сделать')
		}
	}
	
	
	return (
		
		
		<div className="wrapper">
			
			<img className='bg bg1' src={bgPhone1} alt="background-phone"/>
			<img className='bg bg2' src={bgPhone2} alt="background-phone"/>
			<img className='bg bg3' src={phone} alt="background-phone"/>
			<img className='bg bg4' src={phone2} alt="background-phone"/>
			
			<Cart setCartItems={setCartItems} orderId={orderId} setOrderId={setOrderId} cartItems={cartItems}
			      deleteItem={deleteItem} cartOpened={cartOpened} setCartOpened={setCartOpened}/>
			
			<Header cartItems={cartItems} orders={orders} favoriteItems={favoriteItems}  setCartOpened={setCartOpened}/>
			
			
			<Routes>
				<Route path="/" element={
					<Home
					sneakers={sneakers}
					loading={loading}
					cartItems={cartItems}
					favoriteItems={favoriteItems}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onAddToCart={onAddToCart}
					addFavorite={addFavorite}
					onChangeSearchInput={onChangeSearchInput}
				/>}/>
				
				<Route path="/favorites" element={<Favorites
					sneakers={sneakers}
					cartItems={cartItems}
					favoriteItems={favoriteItems}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onAddToCart={onAddToCart}
					addFavorite={addFavorite}
					onChangeSearchInput={onChangeSearchInput}/>}/>
				
				<Route path="/orders" element={
					<Orders
						orders={orders}
						setOrders={setOrders}
					sneakers={sneakers}
					cartItems={cartItems}
					favoriteItems={favoriteItems}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onAddToCart={onAddToCart}
					addFavorite={addFavorite}
					orderId={orderId}
					setOrderId={setOrderId}
					onChangeSearchInput={onChangeSearchInput}/>}/>
			</Routes>
		
		</div>);
}


export default App;
