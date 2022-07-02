import heartUnliked from '../../assets/img/heart-unliked.svg'
import plus from '../../assets/img/plus.svg';
import './card.scss';

function Card({name, price, imageUrl}) {
  
  const onClickButton = () => {
    console.log(imageUrl)
   }
  
  
  return (
    <div className="card">
      <div className="favorite">
        <img src={heartUnliked} alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button onClick={onClickButton}
                className="button">
          <img width={11} height={11} src={plus} alt="Plus" />
        </button>
      </div>
    </div>
  );
}

export default Card;
