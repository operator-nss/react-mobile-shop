import React from 'react';
import search from "../../assets/img/search.svg";
import Card from "../../components/Card/Card";
import './home.scss'
import {useSelector} from "react-redux";
import Error from "../../components/Error/Error";
import {RootState} from "../../store/store";
import {Phone} from "../../store/Slices/phoneSlice";

type HomeProps = {
	onAddToCart:any, addFavorite:any, onChangeSearchInput:any
}

const Home:React.FC<HomeProps> = ({ onAddToCart, addFavorite, onChangeSearchInput }) => {
	
	const {error, status} = useSelector((state:RootState) => state.phone);
	const {phones, searchValue} = useSelector((state:RootState) => state.phone);
	
	
	const renderItems = () => {
		const filteredItems = phones.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
		
		return (status === 'phone loading' ? [...Array(8)] : filteredItems).map((item, index) => (
			<Card
				key={index}
				addFavorite={(obj:Phone) => addFavorite(obj)}
				onPlus={(obj:Phone) => onAddToCart(obj)}
				{...item}
			/>
		));
	 }

	
	return (
	
		<div className="main">

			<div className="main__label">
				<h1>{searchValue ? `Поиск: "${searchValue}"` : 'Все телефоны'}</h1>
				<div className="favorites__search">
					<img src={search} alt="Search"/>
					<input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..."/>
				</div>
			</div>
			
			{error ? <Error /> : <div className="list__items">{renderItems()}</div>}
		</div>
	);
};

export default Home;