import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
function Homepagecomp() {
    const [products_list, changelist] = useState([]);
    const location = useLocation();
    const [prod_id, changeid] = useState();
    const [submit_status, changesubstatus] = useState(false);
    const ref = useRef();
    useEffect(async() => {
        // console.log("mudit tiwari");
        // console.log(localStorage.getItem('jwt'));
       
            await axios.get(`https://infinite-falls-68793.herokuapp.com/${location.state.comp}`, {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem('jwt')}`,
                },
            }).then((res) => {
                changelist(JSON.parse(res.data.products));
                console.log(res.data.products);
                // console.log(products_list);
            }).catch((err) => {
                console.log(err);
            });
        
        console.log(products_list);
    }, [])
    return (
        <>
            <div className="w-100">
                <LoadingBar style={{ 'backgroundColor': 'red', 'zIndex': 10 }} ref={ref} />
                <div className="w-3/4 mx-auto my-10">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" onChange={(e) => {
                            changeid(e.target.value);
                        }} value={prod_id} name="prod_id" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                        <label for="prod_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product ID</label>
                    </div>
                    <button type="button" className="bg-pink-900 w-24 rounded border-0 px-4 py-3 my-2 mx-auto block" disabled={submit_status} onClick={async (e) => {
                        let valid = true;
                        e.preventDefault();
                        ref.current.continuousStart(0);
                        changesubstatus(true);
                        await axios.get(`https://infinite-falls-68793.herokuapp.com/products/${prod_id}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('jwt')}`
                            }
                        }).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            alert("this product id is invalid");
                            valid = false;
                        })
                        if (!valid) {
                            ref.current.complete();
                            changesubstatus(false);
                            return;
                        }
                        
                            await axios.get(`https://infinite-falls-68793.herokuapp.com/${location.state.comp}`, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                                }
                            }).then(async (res) => {
                                // console.log(res.data.products);
                                var prods;
                                console.log(res.data.products);
                                if(res.data.products)
                                {
                                    if (res.data.products.length>0)
                                        prods = JSON.parse(res.data.products);
                                    else 
                                        prods=[];
                                }
                                else
                                    prods = [];
                                console.log(prods);
                                prods.push(prod_id);
                                
                                // console.log(prods);
                                prods = JSON.stringify(prods);
                                // console.log(prods);
                                await axios.put(`https://infinite-falls-68793.herokuapp.com/${location.state.comp}`, {
                                    "products": prods
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                                    }
                                }).then((res) => {
                                    changesubstatus(false);
                                    // changelist(prods);
                                    changelist(JSON.parse(res.data.products));
                                    console.log(res);
                                }).catch((err) => {
                                    changesubstatus(false);
                                    console.log(err);
                                });

                            }).catch((err) => {
                                changesubstatus(false);
                                console.log(err);
                            })
                        
                        ref.current.complete();

                    }}>Submit</button>
                    <div className="my-16 w-0 h-0"></div>
                    {
                        products_list!=null?
                        products_list.map(element => {
                            return <div className="w-3/4 flex  my-8 mx-auto h-20 bg-white">
                                <div className="w-1/2 flex items-center h-full">
                                    <div className="flex justify-center items-center h-24 w-max">
                                        <h1 className="text-black mx-10 font-semibold text-lg">
                                            {element}
                                        </h1>
                                    </div>
                                </div>
                                <div className="w-1/2 flex items-center justify-end">
                                    <button className="bg-pink-900 w-24 rounded border-0 px-4 py-3 mx-10 block" onClick={async (e) => {
                                        e.preventDefault();
                                        ref.current.continuousStart(0);
                                        // console.log("product list is");
                                        // console.log(products_list);
                                        console.log(products_list.indexOf(element));
                                        let index = products_list.indexOf(element);
                                        // var temp_lst=products_list.;
                                        var temp_list=[];
                                        temp_list.push(...products_list);
                                        temp_list.splice(index, 1);
                                        console.log("temp list is");
                                        console.log(temp_list);
                                        
                                        // console.log(products_list);
                                        await axios.put(`https://infinite-falls-68793.herokuapp.com/${location.state.comp}`, {
                                            "products": JSON.stringify(temp_list)
                                        }, {
                                            headers: {
                                                Authorization: `Bearer ${localStorage.getItem('jwt')}`
                                            }
                                        }).then((res) => {
                                            // changesubstatus(false);
                                            changelist(temp_list);
                                            console.log("product list is");
                                            console.log(products_list);
                                            console.log(res);
                                            ref.current.complete();
                                        }).catch((err) => {
                                            // changesubstatus(false);
                                            console.log(err);
                                            ref.current.complete();
                                        });
                                        
                                    }}>Remove</button>
                                </div>
                            </div>
                        }):<h1></h1>
                    }

                </div>
            </div>
        </>
    );
}
export default Homepagecomp;