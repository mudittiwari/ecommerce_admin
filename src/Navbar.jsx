import React from "react";
import { Link, useNavigate } from 'react-router-dom';
function Navbar()
{
    const navigate=useNavigate();
    return (
        <>
        {localStorage.getItem('user')?
            <nav className="bg-white" style={{'zIndex':0}}>
                <div>
                    <ul className="flex">
                        <li className="px-4 py-3 cursor-pointer"> 
                            <h1 className="text-black font-medium"><Link to="/addproduct">Add Product</Link></h1>
                        </li>
                        <li className="px-4 py-3 cursor-pointer" > 
                            <h1 className="text-black font-medium"><Link to="/products"> Products</Link></h1>
                        </li>
                        <li className="px-4 py-3 cursor-pointer" > 
                            <h1 className="text-black font-medium"><Link to="/">homepagecomps</Link></h1>
                        </li>
                        <li className="px-4 py-3 cursor-pointer"> 
                            <h1 className="text-black font-medium"><Link to="addremaining">Add remaining</Link></h1>
                        </li>
                        <li className="px-4 py-3 cursor-pointer"> 
                            <h1 className="text-black font-medium"><Link to="Orders">Orders</Link></h1>
                        </li>
                        <li className="px-4 py-3 cursor-pointer"> 
                            <h1 className="text-black font-medium" onClick={(e)=>{
                                e.preventDefault();
                                localStorage.removeItem('user');
                                localStorage.removeItem('jwt');
                                navigate('/login');
                            }}>Logout</h1>
                        </li>
                    </ul>
                </div>
            </nav>:
            null}
        </>
    );
}

export default Navbar;