import Card from './components/Card/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import search from  './assets/img/search.svg';


const App = () => {
  
  const arr = [
    {name: 'Мужские кросовки Nike Blazer Mid Suede' , price: 12999, imageUrl: './assets/img/sneakers/1.jpg'},
    {name: 'Мужские кросовки Nike Air Max' , price: 15600, imageUrl: './1.jpg'},
    {name: 'Мужские кросовки Nike Blazer Mid Suede' , price: 12999, imageUrl: './assets/img/sneakers/1.jpg'},
    {name: 'Мужские кросовки Nike Air Max' , price: 15600, imageUrl: './1.jpg'},
  ]
  return (
    <div className="wrapper clear">
      <Drawer/>
      <Header/>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src={search} alt="Search"/>
            <input placeholder="Поиск..."/>
          </div>
        </div>
        
        <div className="d-flex">
          {
            arr.map((item, i) => {
              return <Card key={i} name={item.name} price={item.price} imageUrl={item.imageUrl} />
              })
          }
        </div>
      </div>
    </div>
  );
}
  


export default App;
