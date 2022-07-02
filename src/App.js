import Card from './components/Card/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import search from  './assets/img/search.svg';
import {useEffect, useState} from "react";



const App = () => {
  
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [sneakers, setSneakers] = useState([]);
  let arr = [];
  
  
    useEffect(() => {
    fetch('https://62c0780cd40d6ec55cd18676.mockapi.io//items')
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(res => setSneakers(res))
  }, [])

  const onAddToCart = (item) => {
      if(cartItems.find(obj => obj.id === item.id)) {
        arr = cartItems.filter(obj => obj.id !== item.id);
        setCartItems([...arr])
      } else {
        setCartItems([...cartItems, item])
      }
      
    
   }
  
  const deleteItem = (i) => {
  // const arr = cartItems.filter((item) => {
  //   item.id !== i;
  // })
  }
  
  return (
    <div className="wrapper clear">
      
      {cartOpened ? <Drawer cartItems={cartItems} deleteItem={deleteItem} setCartOpened={setCartOpened}/> : null}
      
      <Header setCartOpened={setCartOpened}/>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src={search} alt="Search"/>
            <input placeholder="Поиск..."/>
          </div>
        </div>
        
        <div className="d-flex sneakers">
          {
            sneakers.map((item) => {
              return <Card
                onPlus={(item) => onAddToCart(item)}
                onClickFavorite={() => console.log('добавили в закаладки')}
                           key={item.id} title={item.title} price={item.price} imageUrl={item.imageUrl} />
              })
          }
        </div>
      </div>
    </div>
  );
}
  


export default App;
