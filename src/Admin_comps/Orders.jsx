import React, { useEffect, useRef, useState } from "react";
import logo from '../assets/logo.png';
import Orders_returns_comp from "./Orders_returns_comp.jsx";
import LoadingBar from "react-top-loading-bar";
// import Navbar from "./Navbar";
import axios from "axios";

 function Orders() {
    const ref=useRef(null);
    const [orders,changeorders]=useState([]);
    async function fetchorders()
    {
        console.log(localStorage.getItem('user'));
        await axios.get("https://infinite-falls-68793.herokuapp.com/orders",{
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then((res)=>{
            // console.log(res);
            changeorders(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    }
    useEffect(()=>{
        fetchorders();
    },[])

    return (
        <>
            <div className="w-full px-6 my-6">
            <LoadingBar style={{ 'backgroundColor': 'red', 'zIndex': 10 }} ref={ref} />
            {/* <Navbar /> */}
                
                <h1 className="text-xl font-semibold my-6 mx-auto w-max">Orders & Returns</h1>
                <div>
                    {orders.map((element,index)=>{
                        if(index==0)
                            return <Orders_returns_comp order={element} key={index} />
                        return <div><hr className="w-11/12 text-white my-10" /><Orders_returns_comp order={element} key={index} /></div>
                    })}
                </div>
            </div>
        </>
    );
}

export default Orders;