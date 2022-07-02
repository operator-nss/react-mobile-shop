import btnRemove from '../assets/img/btn-remove.svg'
import sneakers1 from '../assets/img/sneakers/1.jpg'
import arrow from '../assets/img/arrow.svg'


const Drawer = ({cartItems, setCartOpened={setCartOpened}}) => {
 
 return (
    <div
      // style={{display: 'none'}}
      className="overlay">
    <div className="drawer">
      <h2 className="d-flex justify-between mb-30">
        Корзина <img onClick={() => setCartOpened(false)} className="cu-p" src={btnRemove} alt="Remove"/>
      </h2>
      
      <div className="items">
  
        {
          cartItems.map((item, i) => (
          <div key={i} className="cartItem d-flex align-center mb-20">
            <div
              style={{backgroundImage: `url(${item.imageUrl})`}}
              className="cartItemImg"></div>
    
            <div className="mr-20 flex">
              <p className="mb-5">{item.title}</p>
              <b>{item.price}руб.</b>
            </div>
            <img className="removeBtn" src={btnRemove} alt="Remove"/>
          </div>
        ))
        
        }
        
        

      </div>
      
      <div className="cartTotalBlock">
        <ul>
          <li>
            <span>Итого:</span>
            <div></div>
            <b>21 498 руб. </b>
          </li>
          <li>
            <span>Налог 5%:</span>
            <div></div>
            <b>1074 руб. </b>
          </li>
        </ul>
        <button className="greenButton">
          Оформить заказ <img src={arrow} alt="Arrow"/>
        </button>
      </div>
    </div>
  </div>
)};

export default Drawer;
