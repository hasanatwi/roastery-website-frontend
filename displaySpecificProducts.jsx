import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Category from "./Category";
function DisplaySpecificProducts({isValid2, nameOfTheUser, email}){
    const {title}=useParams();
    console.log("The title is: "+title);
    console.log("The value of isValid2 is: "+isValid2);
    console.log("Hello world");
    console.log("The value of nameOfTheUser is: "+nameOfTheUser);
    console.log("The value of email is: "+email);
    const [products, setProducts]=useState([]);
    const [loading, setLoading]=useState(false);
    useEffect(()=>{
        console.log("The products are: ", products[0]);
    },[products]);
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true);
            try{
                const response=await fetch(`https://roastery-website-backend-2.onrender.com/api/products/${title}`);
                if(!response.ok){
                    throw new Error(`HTTP ${response} : ${response.statusText}`);
                }
                const data=await response.json();
                console.log("data is: ", data);
                setProducts(Array.isArray(data)? data : []);
            }
            catch(err){
                console.error("There is an error: ",err);
                setProducts([]);
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();
    },[title]);
    return(
        <div>
        {loading && (<p
            style={{
                fontWeight:"bold",
                fontSize:"20px",
            }}
        >Loading {title}...</p>)}
        {!loading && (
        <div style={{
            backgroundColor:"lightyellow",
            minHeight:"745px",
        }}>
            <Header isValid={isValid2} nameOfTheUser={nameOfTheUser} email={email}/>
            <div style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginTop: "50px",
                backgroundColor:"lightyellow",
            }}>
                {products.map((product)=>(
                    <Category title={product.Product_name} image={product.Image} name_of_the_category={title}/>
                ))}
            </div>
        </div>)
        }
        </div>
    );
}
export default DisplaySpecificProducts;
