// import logo from './logo.svg';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Payment from './Component/Payment';
import Paypal from './Component/Paypal';

function App() {
  return (
    <div className="App">
      
      {/* <Paypal/> */}
      <BrowserRouter>
      <Route path='/' component={Paypal}/>
      <Route path='/payment' component={Payment}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
