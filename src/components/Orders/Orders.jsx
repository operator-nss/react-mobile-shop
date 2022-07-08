import React, {useEffect} from 'react';
import axios from 'axios';
import Card from "../Card/Card";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Orders = () => {
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	
	useEffect(() => {
		(async () => {
			try {
				const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/orders');
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
				setIsLoading(false);
			} catch (error) {
				alert('Ошибка при запросе заказов');
				console.error(error);
			}
		})();
	}, []);
	
	const clearOrders = async () => {
		try {
			setIsLoading(true);
			for (let i = 0; i < orders.length; i++) {
				const item = orders[i];
				await axios.delete('https://62c0780cd40d6ec55cd18676.mockapi.io/orders/' + item.id);
				await delay(1000);
			}
			setOrders([]);
		} catch (error) {
			alert('Ошибка при очистки заказов');
		}
		setIsLoading(false);
	};
	
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>Мои заказы</h1>
				<button onClick={clearOrders}>Очистить заказы</button>
			</div>
			
			<div className="d-flex flex-wrap">
				{(isLoading ? [...Array(8)] : orders).map((item, index) => (
					<Card key={index} loading={isLoading} {...item} />
				))}
			</div>
		</div>
	);
};

export default Orders;