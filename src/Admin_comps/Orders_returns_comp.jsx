import React, { useEffect } from "react";
import order from '../assets/order.png';
import { useNavigate } from "react-router-dom";
function Orders_returns_comp(props) {
    const navigate=useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate('/login');
        }
    },[])
    return (
        <>
            <div className="flex flex-col w-full" onClick={(e)=>{
                e.preventDefault();
                navigate("/order",{state:props.order});
            }}>
                <div className="flex items-center mx-2">

                    <img className="sm:block md:block lg:block xl:block 2xl:block hidden" src={order} style={{
                        'width': '200px',
                        'height': '200px',
                    }} alt="" />
                    <img className="sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden block" src={order} style={{
                        'width': '120px',
                        'height': '120px',
                    }} alt="" />
                    <div className="ml-5 mt-2">
                        <h1 className="text-white">Order ID: {props.order.id}</h1>
                        <h1 className="text-white">Date: {props.order.date}</h1>
                        <h1 className="text-white text-sm mt-2">Total Amount: {props.order.total_amount}</h1>
                        <h1 className="text-white text-sm mt-2">Address: {props.order.address}</h1>
                        <h1 className="text-white text-sm mt-2">Status: {props.order.status}</h1>
                        

                    </div>
                </div>


            </div   >
        </>
    );
}

export default Orders_returns_comp;