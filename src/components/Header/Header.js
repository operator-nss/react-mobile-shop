import logo from '../../assets/img/logo.png';
import cartImage from '../../assets/img/cart.png';
import cartImageH from '../../assets/img/cart-h.png';
import favorites from '../../assets/img/favorites.png';
import favoritesH from '../../assets/img/favorites-h.png';
import user from '../../assets/img/user.png';
import userH from '../../assets/img/user-h.png';
import {Link} from "react-router-dom";
import './header.scss'
import {useEffect, useState} from "react";


function Header({setCartOpened, cartItems, orders, favoriteItems}) {
	const [overFavorites, setOverFavorites] = useState(false);
	const [overUser, setOverUser] = useState(false);
	const [overCart, setOverCart] = useState(false);
	
	
	const openCart = () => {
		setCartOpened(true);
		document.documentElement.classList.add('lock');
	 }
	
	useEffect(() => {
		cartItems.length > 0 ? setOverCart(true) : setOverCart(false)
		favoriteItems.length > 0 ? setOverFavorites(true) : setOverFavorites(false)
		orders.length > 0 ? setOverUser(true) : setOverUser(false)
	}, [cartItems.length, favoriteItems.length, orders.length])
	 
	
	return (
		<header className="header">
			<Link to='/' className="header__label">
				<img className='header__image' width={40} height={40} src={logo}/>
				<div>
					<h3 className="header__logo">React Mobile</h3>
					<p className="header__description">Магазин телефонов</p>
				</div>
			</Link>
			<ul  className="header__list">
				<li  onClick={openCart} className="header__cart">
					<img width={18} height={18}
					     onMouseOver={() => setOverCart(true)}
					     onMouseOut={() => setOverCart(false)}
					     alt='cart image' src={overCart ? cartImageH : cartImage }/>
					<span>{cartItems.reduce((num, item) =>num + item.price, 0)}руб.</span>
				</li>
				<li>
					<Link to='/favorites'>
					<img width={18}
					     onMouseOver={() => setOverFavorites(true)}
					     onMouseOut={() => setOverFavorites(false)}
					     className='icon' height={18} alt='favorites' src={overFavorites ? favoritesH : favorites}/>
					</Link>
				</li>
				<Link to='/orders'>
					<img width={18}
					     onMouseOver={() => setOverUser(true)}
					     onMouseOut={() => setOverUser(false)}
					     className='icon' height={18} alt='orders' src={overUser ? userH : user}/>
				</Link>
			</ul>
		</header>
	);
}

export default Header;
