import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
              }
        })
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const handleUpdateClick = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            }
        })
        result = await result.json();
        navigate("/");
    }

    return(
        <div className="product">
             <h1>Update Product</h1>
             <input placeholder="Enter Product Name" type="text" className="inputBox"
             value={name} onChange={(e)=>{setName(e.target.value)}} />

             <input placeholder="Enter Product Price" type="text" className="inputBox"
             value={price} onChange={(e)=>{setPrice(e.target.value)}} />

             <input placeholder="Enter Product Category" type="text" className="inputBox"
             value={category} onChange={(e)=>{setCategory(e.target.value)}} />

             <input placeholder="Enter Product Company" type="text" className="inputBox"
             value={company} onChange={(e)=>{setCompany(e.target.value)}} />

             <button type="button" onClick={handleUpdateClick} className="appButton">Update Product</button>
        </div>
    )
}

export default UpdateProduct;