import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Admin_panel from "./Admin_panel";
function AdminLogin() {
    const navigate = useNavigate();
    // const history=use
    // const history = useHistor
    const [email, changeemail] = useState('');
    const [password, changepassword] = useState('');


    useEffect(() => {
        // localStorage.removeItem('user');
        console.log(JSON.parse(localStorage.getItem('user')));
        if (localStorage.getItem('user')) {

            if (JSON.parse(localStorage.getItem('user')).isAdmin == true) {
                navigate("/Admin_dashboard");
            }
        }
    }, []);
    return (
        <>
            <div className="w-2/5 mx-auto my-20">
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" onChange={(e) => {
                        changeemail(e.target.value);
                    }} value={email} name="email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="email" className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" value={password} onChange={(e) => {
                        changepassword(e.target.value);
                    }} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-gray-300 focus:outline-none focus:ring-0  peer" placeholder=" " required="" />
                    <label for="password" className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>



                <button type="button" className="text-white block mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async (e) => {
                    e.preventDefault();
                    // await axios.post("http://localhost:1337/products", {
                    //     "category_name": "a",
                    //     "subcategory_name": "b",
                    //     "product_name": "c",
                    //     "price": 100,
                    //     "discount": 50,
                    //     "actual_price": 200,
                    //     "quantity": 1,
                    //     "desc": "this is the first product in the store",
                    //     "photos": {}
                    // },{
                    //     headers: {
                    //         Authorization:
                    //             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzYwNjRhMzE3NGRjMjA4Y2M4NDAxOSIsImlhdCI6MTY1MTkwMjA2OSwiZXhwIjoxNjU0NDk0MDY5fQ.SxXKlTnQ5bznDSET-4lQr9P1lV_bqu4ekpvwiuxx04U',
                    //     },
                    // }).then((res) => {
                    //     console.log(res);
                    // })
                    await axios.post('https://infinite-falls-68793.herokuapp.com/auth/local', {
                        'identifier': email,
                        "password": password,
                    }).then((res) => {
                        console.log("logged in");
                        // console.log(res.data);
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        localStorage.setItem('jwt',res.data.jwt);
                        navigate("/Admin_dashboard");
                    }).catch((err) => {
                        console.log(err);
                    });

                }}>Login</button>
            </div>
        </>
    );
}

export default AdminLogin;