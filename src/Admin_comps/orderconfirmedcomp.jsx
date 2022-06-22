import React, { useState } from "react";
// import order from '../src/assets/order.png';
import { useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";
// import Arrowicon from '../node_modules/@material-ui/icons/ArrowForward';
function Orderconfirmedcomp(props) {
    const navigate = useNavigate();
    const ref = useRef(null);
    const [reviewsinput,changereviewsinput]=useState([]);
    const [products, changeproducts] = useState([]);
    async function entry()
    {
        if (props.order) {
            let arr = [];
            let temp=[];
            for (let index = 0; index < JSON.parse(props.order.products).length; index++) {
                const element = JSON.parse(props.order.products)[index]
                temp.push('');
                // console.log(element);
                await axios.get(`https://infinite-falls-68793.herokuapp.com/products/${element}`).then((res) => {
                    arr.push(res.data);
                    // changeone(arr);
                }).catch((err) => {
                    console.log(err);
                });

            }
            changeproducts(arr);
            changereviewsinput(temp);
        }
        else {
            navigate('/')
        }
    }
    useEffect( () => {
        entry();
    }, []);
    return (
        <>
            <div className="flex flex-col w-full">
                <LoadingBar style={{ 'backgroundColor': 'red', 'zIndex': 10 }} ref={ref} />
                <div className="mt-3 w-full">

                    {products.map((element, index) => {
                        return <div key={index}> <div className="w-full px-5 py-5 flex rounded" >
                            <img className="mr-2" src={JSON.parse(element.photos)[0]} style={{ 'height': "120px", 'width': '120px' }} alt="" />
                            <div className=" pt-1 ml-2 flex flex-col justify-between" style={{ 'height': "120px" }}>
                                <div>
                                    <h1 className=" text-white font-semibold text-sm">{element.product_name}</h1>
                                    <h1 className=" text-white font-normal text-sm">{element.brand}</h1>
                                    <h1 className=" text-white font-normal text-sm">Rs. {element.price}</h1>
                                    
                                </div>
                                <div className="flex h-max w-max">
                                    <h1 className=" text-white font-semibold text-xs">Delivery Days: </h1>
                                    <h1 className=" text-white font-normal text-xs ml-1">{element.delivery_days}</h1>
                                </div>
                            </div>

                        </div>
                            <hr className="mx-10" />
                        </div>
                    })}


                </div>
                {props.order.status == "not delivered" ?
                    <div className="mt-10 mb-6 flex w-full justify-center sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row flex-row">
                        <button className="px-5 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-10 py-2 my-2 w-max  bg-white text-black font-semibold mx-5 rounded" onClick={async (e) => {
                            e.preventDefault();
                            ref.current.continuousStart(0);
                            await axios.put(`https://infinite-falls-68793.herokuapp.com/orders/${props.order.id}`,
                            {
                                "status":"delivered",
                            }, {
                                headers: {
                                    Authorization:
                                        `Bearer ${localStorage.getItem('jwt')}`,
                                },
                            }).then((res) => {
                                ref.current.complete();
                                navigate('/orders');
                            }).catch((err) => {
                                ref.current.complete();
                                console.log(err);
                            })
                        }}>Delivered</button>
                        <button className="px-5 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-10 py-2 my-2 w-max bg-white text-black font-semibold mx-5 rounded">Track Order</button>
                    </div> : <h1></h1>}
            </div>
        </>
    );
}

export default Orderconfirmedcomp;