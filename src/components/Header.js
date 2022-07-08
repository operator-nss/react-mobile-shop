import logo from '../assets/img/logo.png';
import cartImage from '../assets/img/cart.png';
import favorites from '../assets/img/favorites.svg';
import user from '../assets/img/user.svg';
import {Link} from "react-router-dom";


function Header({setCartOpened, cartItems}) {
	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to='/' className="d-flex align-center">
				<img width={40} height={40} src={logo}/>
				<div>
					<h3 className="text-uppercase">React Sneakers</h3>
					<p className="opacity-5">Магазин лучших кроссовок</p>
				</div>
			</Link>
			<ul  className="d-flex cu-p">
				<li  onClick={() => setCartOpened(true)} className="mr-30">
					<img width={18} height={18} alt='image' src={cartImage}/>
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
