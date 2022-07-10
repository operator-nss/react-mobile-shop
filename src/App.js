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
import phone from './assets/img/phone.png';
import clsx from "clsx";
import {fetchPhones, setSearchValue} from "./store/Slices/phoneSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchCart, setCartItems, setStatusCart} from "./store/Slices/cartSlice";
import {fetchFavorites, setFavoriteItems, setStatusFavorites} from "./store/Slices/favoritesSlice";

const FullPhone = React.lazy(() => import(/* webpackChunkName: "FullPhone" */'./pages/FullPhone/FullPhone'))


const App = () => {
	const dispatch = useDispatch();
	
	
	const {cartItems} = useSelector(state => state.cart);
	const {favoriteItems} = useSelector(state => state.favorite);
	
	// const [cartOpened, setCartOpened] = useState(false);
	
	// const [cartItems, setCartItems] = useState([]);
	// const [favoriteItems, setFavoriteItems] = useState([]);
	// const [phones, setPhones] = useState([]);
	// const [searchValue, setSearchValue] = useState('');
	
	
	const loading = useRef(false);
	
	// const [orderId, setOrderId] = useState(null);
	// const [orders, setOrders] = React.useState([]);
	
	const bgRef = useRef(false);
	
	
	//
	// const getAllData = async () => {
	// 	await Promise.All(dispatch(fetchPhones()),
	// 		dispatch(fetchCart()),
	// 		dispatch(fetchFavorites()))
	// }
	
	useEffect(() => {
		if (!bgRef.current) {
			bgRef.current = true
		}
		
		if (!loading.current) {
			dispatch(fetchPhones());
			dispatch(fetchCart());
			dispatch(fetchFavorites())
			
		}
		loading.current = true
		
	}, [])
	
	
	const deleteItem = (item) => {
		const newArr = cartItems.filter(obj => obj.realId !== item.realId)
		dispatch(setCartItems([...newArr]))
		axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/cart/${item.id}`)
	}
	
	const onChangeSearchInput = (e) => {
		dispatch(setSearchValue(e.target.value))
	}
	
	
	const onAddToCart = async (item) => {
		try {
			const newItem = cartItems.some(obj => +obj.realId === +item.realId);
			if (!newItem) {
				dispatch(setStatusCart('add to cart'))
				dispatch(setCartItems([...cartItems, item]));
				await axios.post('https://62c0780cd40d6ec55cd18676.mockapi.io/cart', item)
			} else {
				dispatch(setStatusCart('remove from cart'))
				const findItemToDelete = cartItems.find(obj => obj.title === item.title);
				const newArr = cartItems.filter(obj => item.realId !== obj.realId);
				dispatch(setCartItems([...newArr]));
				await axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/cart/${findItemToDelete.id}`)
			}
			dispatch(setStatusCart('cart idle'))
		} catch (e) {
			console.log(e)
		}
		
	}
	
	const addFavorite = async (item) => {
		try {
			dispatch(setStatusFavorites('add to favorites'))
			if (favoriteItems.some(obj => +obj.realId === +item.realId)) {
				const newArr = favoriteItems.filter(obj => obj.realId !== item.realId);
				const findItemToDelete = favoriteItems.find(obj => obj.title === item.title);
				dispatch(setFavoriteItems([...newArr]));
				await axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/favorites/${findItemToDelete.id}`);
			} else {
				const {data} = await axios.post('https://62c0780cd40d6ec55cd18676.mockapi.io/favorites', item);
				dispatch(setFavoriteItems([...favoriteItems, data]))
			}
			dispatch(setStatusFavorites('idle'))
		} catch (e) {
			alert('не удалось фавориты сделать')
		}
	}
	
	
	return (
		
		
		<div className="wrapper">
			
			<img className={clsx({active: bgRef.current}, 'bg bg1')} src={bgPhone1} alt="background-phone"/>
			<img className={clsx({active: bgRef.current}, 'bg bg2')} src={bgPhone2} alt="background-phone"/>
			<img className={clsx({active: bgRef.current}, 'bg bg3')} src={phone} alt="background-phone"/>
			
			<Cart deleteItem={deleteItem}/>
			
			<Header/>
			
			<Routes>
				<Route path="/" element={
					<Home
						// sneakers={phones}
						// loading={loading}
						// cartItems={cartItems}
						// favoriteItems={favoriteItems}
						// searchValue={searchValue}
						// setSearchValue={setSearchValue}
						onAddToCart={onAddToCart}
						addFavorite={addFavorite}
						onChangeSearchInput={onChangeSearchInput}
					/>}/>
				
				<Route path="/favorites" element={<Favorites
					// sneakers={phones}
					// cartItems={cartItems}
					// favoriteItems={favoriteItems}
					// searchValue={searchValue}
					// setSearchValue={setSearchValue}
					onAddToCart={onAddToCart}
					addFavorite={addFavorite}
					onChangeSearchInput={onChangeSearchInput}
				/>}/>
				
				<Route path="/orders" element={
					<Orders
						// orders={orders}
						// setOrders={setOrders}
						// sneakers={phones}
						// cartItems={cartItems}
						// favoriteItems={favoriteItems}
						// searchValue={searchValue}
						// setSearchValue={setSearchValue}
						onAddToCart={onAddToCart}
						addFavorite={addFavorite}
						// orderId={orderId}
						// setOrderId={setOrderId}
						onChangeSearchInput={onChangeSearchInput}
					/>}/>
				
				
				<Route path='phone/:id' element={
					<React.Suspense fallback={<div>Загрузка...</div>}>
						<FullPhone/>
					</React.Suspense>
				}/>
			
			
			</Routes>
		
		</div>)
		;
}


export default App;
