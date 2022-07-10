import btnRemove from '../../assets/img/btn-remove.svg'
import arrow from '../../assets/img/arrow.svg'
import clsx from "clsx";
import axios from "axios";
import React, {useState} from "react";
import Info from "../Info/Info";
import completeOrder from '../../assets/img/complete-order.jpg'
import emptyCart from '../../assets/img/empty-cart.jpg';
import './cart.scss'
import {useSelector} from "react-redux";
import {setCartItems, setCartOpened, setStatusCart} from "../../store/Slices/cartSlice";
import {setOrderId} from "../../store/Slices/ordersSlice";
import {RootState, useAppDispatch} from "../../store/store";

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

type CartProps = {
	deleteItem: any
}

const Cart:React.FC<CartProps> = ({deleteItem}) => {
	
	const dispatch = useAppDispatch();
	
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const {cartItems, cartOpened, statusCart} = useSelector((state:RootState) => state.cart);
	const {orderId} = useSelector((state:RootState) => state.order);
	
	function calcCart() {
		return cartItems.reduce((num, item) =>
			num + item.price, 0
		)
	}
	
	
	const onClickOrder = async () => {
		try {
			dispatch(setStatusCart('cart loading'));
			const {data} = await axios.post('https://62c0780cd40d6ec55cd18676.mockapi.io/orders', {
				items: cartItems,
			});
			dispatch(setOrderId(data.id));
			setIsOrderComplete(true);
			dispatch(setCartItems([]));
			
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete('https://62c0780cd40d6ec55cd18676.mockapi.io/cart/' + item.id);
				await delay(1000);
			}
		} catch (error) {
			alert('Ошибка при создании заказа :(');
		}
		dispatch(setStatusCart('cart success'));
	};
	
	
	const closeCart = () => {
		
		dispatch(setCartOpened(false));
		setTimeout(() => {
			document.documentElement.classList.remove('lock');
		}, 550)
		
	}
	
	return (
		<div className={clsx({cart__active: cartOpened}, "cart")}>
			<div className={clsx({drawer__active: cartOpened}, "drawer ")}>
				<h2 className="drawer__title">
					Корзина <img onClick={closeCart} className="cart__close" src={btnRemove} alt="close cart"/>
				</h2>
				
				{cartItems.length > 0 ? (
						<>
							<div className="drawer__items">
								
								{
									cartItems.map((item) => (
										<div key={item.realId} className="drawer__item item-drawer">
											<div
												style={{backgroundImage: `url(${item.imageUrl})`}}
												className="drawer__item-image"></div>
											
											<div className="item-drawer__label">
												<p className="item-drawer__title">{item.title}</p>
												<b>{item.price}руб.</b>
											</div>
											<img className="item-drawer__remove" onClick={() => deleteItem(item)} src={btnRemove}
											     alt="Remove item from cart"/>
										</div>
									))
									
								}
							
							
							</div>
							<div className="cart__total">
								<ul>
									<li>
										<span>Итого:</span>
										<div></div>
										<b>{calcCart()} руб. </b>
									</li>
									<li>
										<span>Налог 5%:</span>
										<div></div>
										<b>{(calcCart() * 0.05).toFixed()} руб. </b>
									</li>
								</ul>
								<button onClick={onClickOrder} disabled={statusCart === 'cart loading'} className="blueButton">
									Оформить заказ <img src={arrow} alt="Arrow"/>
								</button>
							</div>
						</>
					)
					: (
						<Info
							title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
							// setCartOpened={setCartOpened}
							setIsOrderComplete={setIsOrderComplete}
							description={
								isOrderComplete
									? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
									: 'Добавьте в корзину хотя бы 1 телефон, чтобы сделать заказ.'
							}
							image={isOrderComplete ? completeOrder : emptyCart}
						/>
					
					)}
			
			
			</div>
		</div>
	)
};

export default Cart;
