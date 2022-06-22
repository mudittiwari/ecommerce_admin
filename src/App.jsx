// import logo from './logo.svg';
import './App.css';
import { BrowserRouter,HashRouter,Route,Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Addproduct from './Admin_comps/Addproduct';
import Editproduct from './Admin_comps/Editproduct';
// import Admin_panel from './Admin_panel';
import Admin_panel from './Admin_panel';
import Products from './Admin_comps/Products';
import AdminLogin from './AdminLogin';
import Addcat from './Admin_comps/Addcat';
import Orders from './Admin_comps/Orders';
import Orderconfirmed from './Admin_comps/Orderconfirmed';
// import Editproduct from './Admin_comps/Editproduct';
function App() {
    return( 
    <>
        <HashRouter>
        <Navbar/>
            <Routes>
                <Route exact path="/" element={<AdminLogin/>}/>
                <Route exact path="/login" element={<AdminLogin/>}/>
                <Route exact path="/addproduct" element={<Addproduct/>}/>
                <Route exact path="/editproduct" element={<Editproduct/>}/>
                <Route exact path="/products" element={<Products/>}/>
                <Route exact path="/addremaining" element={<Addcat/>}/>
                <Route exact path="/orders" element={<Orders/>}/>
                <Route exact path="/order" element={<Orderconfirmed/>}/>
                <Route exact path="products/editproduct" element={<Editproduct/>}/>
            </Routes>
           
        </HashRouter>
    </>
    );
}

export default App;
