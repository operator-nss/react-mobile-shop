import logo from '../assets/img/logo.png';
import cartImage from '../assets/img/cart.png';
import user from '../assets/img/user.svg';



function Header({setCartOpened}) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src={logo} />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul onClick={() => setCartOpened(true)} className="d-flex cu-p">
        <li className="mr-30">
          <img width={18} height={18} src={cartImage} />
          <span>1205 руб.</span>
        </li>
        <li>
          <img width={18} height={18} src={user} />
        </li>
      </ul>
    </header>
  );
}

export default Header;
