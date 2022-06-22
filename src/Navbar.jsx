import React from "react";
import { Link, useNavigate } from 'react-router-dom';
function Navbar()
{
    return (
        <>
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
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;