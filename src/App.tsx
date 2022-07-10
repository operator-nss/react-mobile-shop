import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import React, {useEffect, useRef} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import Orders from "./pages/Orders/Orders";
import bgPhone1 from './assets/img/1iphone.png';
import bgPhone2 from './assets/img/2iphone.png';
import phone from './assets/img/phone.png';
import clsx from "clsx";
import {fetchPhones, Phone, setSearchValue} from "./store/Slices/phoneSlice";
import {useSelector} from "react-redux";
import {fetchCart, setCartItems, setStatusCart} from "./store/Slices/cartSlice";
import {fetchFavorites, setFavoriteItems, setStatusFavorites} from "./store/Slices/favoritesSlice";
import {RootState, useAppDispatch} from "./store/store";

const FullPhone = React.lazy(() => import(/* webpackChunkName: "FullPhone" */'./pages/FullPhone/FullPhone'))


const App = () => {
	const dispatch = useAppDispatch();
	
	
	const {cartItems} = useSelector((state:RootState) => state.cart);
	const {favoriteItems} = useSelector((state:RootState) => state.favorite);
	
	const loading = useRef(false);

	const bgRef = useRef(false);
	
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
	
	
	const deleteItem = (item:Phone) => {
		const newArr = cartItems.filter(obj => obj.realId !== item.realId)
		dispatch(setCartItems([...newArr]))
		axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/cart/${item.id}`)
	}
	
	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchValue(e.target.value))
	}
	
	
	const onAddToCart = async (item:Phone) => {
		try {
			const newItem = cartItems.some(obj => +obj.realId === +item.realId);
			if (!newItem) {
				dispatch(setStatusCart('add to cart'))
				dispatch(setCartItems([...cartItems, item]));
				await axios.post('https://62c0780cd40d6ec55cd18676.mockapi.io/cart', item)
			} else {
				dispatch(setStatusCart('remove from cart'))
				const findItemToDelete:any = cartItems.find(obj => obj.title === item.title);
				const newArr = cartItems.filter(obj => item.realId !== obj.realId);
				dispatch(setCartItems([...newArr]));
				await axios.delete(`https://62c0780cd40d6ec55cd18676.mockapi.io/cart/${findItemToDelete.id}`)
			}
			dispatch(setStatusCart('cart idle'))
		} catch (e) {
			console.log(e)
		}
		
	}
	
	const addFavorite = async (item:Phone) => {
		try {
			dispatch(setStatusFavorites('add to favorites'))
			if (favoriteItems.some(obj => +obj.realId === +item.realId)) {
				const newArr = favoriteItems.filter(obj => obj.realId !== item.realId);
				const findItemToDelete:any = favoriteItems.find(obj => obj.title === item.title);
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
						onAddToCart={onAddToCart}
						addFavorite={addFavorite}
						onChangeSearchInput={onChangeSearchInput}
					/>}/>
				
				<Route path="/favorites" element={<Favorites
					onAddToCart={onAddToCart}
					addFavorite={addFavorite}
					onChangeSearchInput={onChangeSearchInput}
				/>}/>
				
				<Route path="/orders" element={
					<Orders
						// onAddToCart={onAddToCart}
						// addFavorite={addFavorite}
						// onChangeSearchInput={onChangeSearchInput}
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
