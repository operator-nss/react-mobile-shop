import logo from '../../assets/img/logo.png';
import cartImage from '../../assets/img/cart.png';
import favorites from '../../assets/img/favorites.svg';
import user from '../../assets/img/user.svg';
import {Link} from "react-router-dom";
import './header.scss'


function Header({setCartOpened, cartItems}) {
	
	const openCart = () => {
		setCartOpened(true);
		document.documentElement.classList.add('lock');
	 }
	
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
					<img width={18} height={18} alt='cart image' src={cartImage}/>
					<span>{cartItems.reduce((num, item) =>num + item.price, 0)}руб.</span>
				</li>
				<li>
					<Link to='/favorites'>
					<img width={18} className='icon' height={18} alt='favorites' src={favorites}/>
					</Link>
				</li>
				<Link to='/orders'>
					<img width={18} className='icon' height={18} alt='orders' src={user}/>
				</Link>
			</ul>
		</header>
	);
}

export default Header;
