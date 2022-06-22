import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
function Addcat() {
    const [brand, changebrand] = useState('');
    const [category, changecategory] = useState('');
    const [brands, changebrands] = useState([]);
    const [categories, changecategories] = useState([]);
    async function fetchdata()
    {
        await axios.get(`https://infinite-falls-68793.herokuapp.com/category`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((res) => {
            if (res.data.categories)
                changecategories(JSON.parse(res.data.categories));
        }).catch((err) => {
            console.log(err);
        });
        await axios.get(`https://infinite-falls-68793.herokuapp.com/brand`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((res) => {
            if (res.data.brands)
                changebrands(JSON.parse(res.data.brands));
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchdata();
    }, [])
    return (
        <>
            <div className="w-100">
                <div className="w-1/2 py-10 flex mx-auto">
                    <input type="text" value={category} onChange={(e) => {
                        e.preventDefault();
                        changecategory(e.target.value);
                        
                    }} name="category" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder="Add category" required="" />
                    <button type="button" onClick={async(e)=>{
                        e.preventDefault();
                        let temp_arr = [];
                        temp_arr.push(...categories);
                        temp_arr.push(category);
                        await axios.put(`https://infinite-falls-68793.herokuapp.com/category`, {
                            "categories":JSON.stringify(temp_arr)
                        },{
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('jwt')}`
                            }
                        }).then((res) => {
                                console.log(res);
                                changecategories(JSON.parse(res.data.categories));
                        }).catch((err) => {
                                console.log(err);
                        });
                    }} className="bg-pink-900 mx-5 w-24 rounded border-0 px-4 py-3 block" >Submit</button>
                </div>
                <div className="w-1/2 mb-10 flex mx-auto">
                    <input type="text" value={brand} onChange={(e) => {
                        e.preventDefault();
                        changebrand(e.target.value);
                    }} name="brand" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder="Add brand" required="" />
                    <button type="button" onClick={async(e)=>{
                        e.preventDefault();
                        let temp_arr = [];
                        temp_arr.push(...brands);
                        temp_arr.push(brand);
                        await axios.put(`https://infinite-falls-68793.herokuapp.com/brand`, {
                            "brands":JSON.stringify(temp_arr)
                        },{
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('jwt')}`
                            }
                        }).then((res) => {
                                console.log(res);
                                changebrands(JSON.parse(res.data.brands));
                        }).catch((err) => {
                                console.log(err);
                        });
                    }}
                     className="bg-pink-900 mx-5 w-24 rounded border-0 px-4 py-3 block" >Submit</button>
                </div>
            </div>
        </>
    );
}

export default Addcat;