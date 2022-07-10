import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import './fullPhone.scss'

const FullPhone = () => {
	
	const [phone, setPhone] = useState();
	
	const {id} = useParams();
	const navigate = useNavigate();
	
	useEffect(() => {
		async function fetchPhone() {
			try {
				const {data} = await axios.get(`https://62c0780cd40d6ec55cd18676.mockapi.io/items/` + id);
				setPhone(data);
			} catch (error) {
				alert('Ошибка при получении телефона!');
				navigate('/');
			}
		}
		
		fetchPhone();
	}, [])
	
	if (!phone) {
		return <div>'Загрузка...'</div>
	}
	
	return (
		<div className={'phone'}>
			<img className='phone__image' src={phone.imageUrl} alt=""/>
			<h2 className='phone__title'>Телефон {phone.title}</h2>
			<h3 className='phone__price'>Цена {phone.price}руб.</h3>
		</div>
	)
};

export default FullPhone;