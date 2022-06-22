import React, { useEffect, useRef } from "react";
// import 'flowbite';
import storage from "./Firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Addproduct from "./Admin_comps/Addproduct";
import Products from "./Admin_comps/Products";
import LoadingBar from "react-top-loading-bar";
import Addcat from "./Admin_comps/Addcat";

async function fetchproducts() {
    var prods;
    await axios.get("https://infinite-falls-68793.herokuapp.com/products",{
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem('jwt')}`,
        },
    }).then((res)=>{
        prods=res.data;
    });
    return prods;
}
function Admin_panel() {
    const ref=useRef(null);
    const navigate=useNavigate();
    const [comp,changecomp]=useState('addproduct');
    const [products,changeproducts]=useState();
    useEffect(()=>{
        fetchproducts().then((res)=>{
            // console.log(res);
            changeproducts(res);
            // changecomp("products");
            // console.log(products);
        });
    },[products])
    return (
        <>
             <LoadingBar style={{ 'backgroundColor': 'red', 'zIndex': 10 }} ref={ref} />
            
            
            <div className="w-full flex-col py-10 h-full flex justify-center items-center">
                <button  className="my-4" onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Admin_dashboard/products/homepagecomp",{state:{
                        "comp":"homepage-sectionone"
                    }})
                }}>Homepage component one</button>
                <button  className="my-4" onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Admin_dashboard/products/homepagecomp",{state:{
                        "comp":"homepage-sectiontwo"
                    }})
                }}>Homepage component two</button>
                <button  className="my-4" onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Admin_dashboard/products/homepagecomp",{state:{
                        "comp":"homepage-sectionthree"
                    }})
                }}>Homepage component three</button>
                 <button  className="my-4" onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Admin_dashboard/products/homepagecomp",{state:{
                        "comp":"homepage-sectionfour"
                    }})
                }}>Homepage component four</button>
                 <button  className="my-4" onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Admin_dashboard/products/homepagecomp",{state:{
                        "comp":"homepage-sectionfive"
                    }})
                }}>Homepage component five</button>
                 <button  className="my-4" onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Admin_dashboard/products/homepagecomp",{state:{
                        "comp":"homepage-sectionsix"
                    }})
                }}>Homepage component six</button>
                

            </div>
            
        </>
    );
}


export default Admin_panel;