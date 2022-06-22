import React, { useEffect } from "react";
// import logo from '../src/assets/logo.png';
import Orderconfirmedcomp from "./orderconfirmedcomp";
// import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
function Orderconfirmed() {
    const navigate=useNavigate();
    const location=useLocation();
    //if user not in localstorage redirect to login in useeffect
    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate('/login');
        }
    },[])


    return (
        <>
            <div className="w-full my-6 ">
                {/* <Navbar /> */}
                {/* <div className='flex justify-center my-5'>
                    <img src={logo} height="200px" width="200px" alt="" />
                </div> */}
                <h1 className="text-center text-xl font-semibold my-6">ORDER DETAILS</h1>

                <div className="px-6">
                    {location.state?
                <Orderconfirmedcomp order={location.state} />:<h1></h1>}
                </div>
            </div>
        </>
    );
}

export default Orderconfirmed;