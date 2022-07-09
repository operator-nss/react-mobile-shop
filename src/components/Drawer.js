import btnRemove from '../assets/img/btn-remove.svg'
import arrow from '../assets/img/arrow.svg'
import clsx from "clsx";
import axios from "axios";
import {useState} from "react";
import Info from "./Info/Info";
import completeOrder from '../assets/img/complete-order.jpg'
import emptyCart from '../assets/img/empty-cart.jpg';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({orderId, setOrderId, cartItems,setCartItems, deleteItem, setCartOpened, cartOpened}) => {
	
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	
	function calcCart() {
		return cartItems.reduce((num, item) =>
			num + item.price, 0
		)
	}
	
	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post('https://62c0780cd40d6ec55cd18676.mockapi.io/orders', {
				items: cartItems,
			});
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);
			
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete('https://62c0780cd40d6ec55cd18676.mockapi.io/cart/' + item.id);
				await delay(1000);
			}
		} catch (error) {
			alert('Ошибка при создании заказа :(');
		}
		setIsLoading(false);
	};
	
	
	const closeCart = () => {
		setCartOpened(false)
	}
	
	return (
		<div className={clsx({overlay__active: cartOpened}, "overlay")}>
			<div className={clsx({drawer__active: cartOpened}, "drawer")}>
				<h2 className="d-flex justify-between mb-30">
					Корзина <img onClick={closeCart} className="cu-p" src={btnRemove} alt="Remove"/>
				</h2>
				
				{cartItems.length > 0 ? (
					<>
					<div className="items">
						
						{
							cartItems.map((item) => (
								<div key={item.realId} className="cartItem d-flex align-center mb-20">
									<div
										style={{backgroundImage: `url(${item.imageUrl})`}}
										className="cartItemImg"></div>
									
									<div className="mr-20 flex">
										<p className="mb-5">{item.title}</p>
										<b>{item.price}руб.</b>
									</div>
									<img className="removeBtn" onClick={() => deleteItem(item)} src={btnRemove} alt="Remove"/>
								</div>
							))
							
						}
					
					
					</div>
					<div className="cartTotalBlock">
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
						<button onClick={onClickOrder} className="greenButton">
							Оформить заказ <img src={arrow} alt="Arrow"/>
						</button>
					</div>
					</>
				)
					: (
						
						<Info
							title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
							setCartOpened={setCartOpened}
							setIsOrderComplete={setIsOrderComplete}
							description={
								isOrderComplete
									? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
									: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
							}
							image={isOrderComplete ? completeOrder : emptyCart}
						/>
					) }
			
				
				
			</div>
		</div>
	)
};

export default Drawer;
