import React, { useEffect, useRef } from "react";
import storage from "../Firebase";
import { useState } from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

function Addproduct() {
    const ref = useRef(null);
    const [submit_status,changesubstatus]=useState(false);
    const [upload_status,changeupstatus]=useState(false);
    const [imagearray, changeimagearray] = useState([]);
    const [image, setImage] = useState('');
    const [title, changetitle] = useState('');
    const [quantity, changequantity] = useState(0);
    const [actual_price, changeactual_price] = useState(0);
    const [discount, changediscount] = useState(0);
    const [category, changecategory] = useState('');
    const [subcategory, changesubcategory] = useState('');
    const [desc, changedesc] = useState('');
    const [brand, changebrand] = useState('');
    const [brandinfo, changebrandinfo] = useState('');
    const [use, changeuse] = useState('');
    const [features, changefeatures] = useState('');
    const [price, changeprice] = useState(0);
    const [deliverydays, changedeliverydays] = useState(0);
    const upload = async (e) => {
        
        e.preventDefault();
        // console.log(image);
        if (image == null)
            return;
        changeupstatus(true);
        changesubstatus(true);
        
        ref.current.continuousStart(0);
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot);
            }, (err) => {
                //catches the errors
                console.log(err);
                ref.current.complete();
                changeupstatus(false);
                changesubstatus(false);
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                console.log(submit_status, upload_status);
                storage.ref('images').child(image.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        console.log(fireBaseUrl);
                        changeimagearray([...imagearray, fireBaseUrl]);
                    });
                ref.current.complete();
                changeupstatus(false);
                changesubstatus(false);
            });
            
            // console.log(submit_status,upload_status);
            // changeupstatus(false);

    }
    // useEffect(()=>{
    //     console.log(upload_status)
    //     console.log(submit_status);
    // },[upload_status,submit_status])
    return (
        <>
            <LoadingBar style={{ 'backgroundColor': 'red', 'zIndex': 10 }} ref={ref} />
            <div className="w-3/4 mx-auto my-5">
                <h1 className="text-white text-xl font-bold my-10 mx-auto w-1/2 text-center">Add Product</h1>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changetitle(e.target.value);
                    }} value={title} name="title" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changecategory(e.target.value);
                    }} value={category} name="category" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changesubcategory(e.target.value);
                    }} value={subcategory} name="subcategory" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="subcategory" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sub Category</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={desc} onChange={(e) => {
                        changedesc(e.target.value);
                    }} name="desc" id="desc" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-gray-300 focus:outline-none focus:ring-0  peer" placeholder=" " required="" />
                    <label for="desc" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="number" value={price} onChange={(e) => {
                        changeprice(e.target.value);
                    }} name="price" id="price" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " required="" />
                    <label for="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="number" value={discount} onChange={(e) => {
                        changediscount(e.target.value);
                    }} name="discount" id="discount" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " required="" />
                    <label for="discount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Discount</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="number" value={actual_price} onChange={(e) => {
                        changeactual_price(e.target.value);
                    }} name="actual_price" id="actual_price" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " required="" />
                    <label for="actual_price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">actual_price</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="number" value={quantity} onChange={(e) => {
                        changequantity(e.target.value);
                    }} name="quantity" id="quantity" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " required="" />
                    <label for="quantity" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantity</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={brand} onChange={(e) => {
                        changebrand(e.target.value);
                    }} name="brand" id="brand" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " required="" />
                    <label for="brand" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">brand</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={use} onChange={(e) => {
                        changeuse(e.target.value);
                    }} name="use" id="use" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " required="" />
                    <label for="use" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">use</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={features} onChange={(e) => {
                        changefeatures(e.target.value);
                    }} name="features" id="features" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " required="" />
                    <label for="features" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">features</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={deliverydays} onChange={(e) => {
                        changedeliverydays(e.target.value);
                    }} name="deliverydays" id="deliverydays" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " required="" />
                    <label for="deliverydays" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">deliverydays</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={brandinfo} onChange={(e) => {
                        changebrandinfo(e.target.value);
                    }} name="brandinfo" id="brandinfo" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " required="" />
                    <label for="brandinfo" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">brandinfo</label>
                </div>
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="mb-10">
                        <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                        <button className="bg-pink-900 w-24 rounded border-0 px-4 py-3 my-2 mx-8" disabled={upload_status} onClick={async (e) => {
                            upload(e)
                            // e.preventDefault();
                        }}>Upload</button>
                    </div>
                    <button type="button" className="bg-pink-900 w-24 rounded border-0 px-4 py-3 my-2 mx-8" disabled={submit_status} onClick={async (e) => {
                        e.preventDefault();
                        ref.current.continuousStart(0);
                        changeupstatus(true);
                        changesubstatus(true);
                        await axios.post("https://infinite-falls-68793.herokuapp.com/products", {
                            "category_name": category.trim(),
                            "subcategory_name": subcategory.trim(),
                            "product_name": title.trim(),
                            "price": price,
                            "discount": discount,
                            "actual_price": actual_price,
                            "quantity": quantity,
                            "desc": desc,
                            "photos": JSON.stringify(imagearray),
                            "reviews":null,
                            "product_use":use,
                            "special_features":features,
                            "brand":brand,
                            "delivery_days":deliverydays,
                            "about_brand":brandinfo,
                            
                        }, {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem('jwt')}`,
                            },
                        }).then((res) => {
                            console.log(res);
                        }).catch((err)=>{
                            console.log(err);
                        })
                        changeupstatus(false);
                        changesubstatus(false);
                        ref.current.complete();
                    }}>Submit</button>
                </div>
            </div>
        </>
    );
}


export default Addproduct;