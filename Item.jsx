import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "./Header";
function Item({isValid2, nameOfTheUser, email2}){
    const [product, setProduct]=useState(null); 
    const { name_of_the_category, title } = useParams();
    const [active1, setActive1]=useState(false);
    const [active2, setActive2]=useState(false);
    const [active3, setActive3]=useState(false);
    const [displayPrice, setDisplayPrice]=useState(0);
    const [weight, setWeight]=useState(0);
    const [totalWeight, setTotalWeight]= useState(0);
    const [totalPrice, setTotalPrice]= useState(0);
    const [quantity, setQuantity]= useState(0);
    const [verifyQuantity, setVerifyQuantity]=useState(true);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await fetch(`https://roastery-website-backend-2.onrender.com/api/item/${name_of_the_category}/${title}`);
                if(!response.ok){
                    console.log("The response was unfortunately not ok");
                    throw new Error(`HTTP: ${response.status} : ${response.statusText}`);
                }
                const data=await response.json();
                setDisplayPrice(data.Price_per_kg);
                console.log("The display Price is (we are in Item.jsx) is: "+data.Price_per_kg);
                if(data){
                    console.log("The products in the Items.jsx are: "+data);
                    setProduct(data);
                }
            }
            catch(err){
                console.log("an error has occured");
                console.error("An error has occured",error);
                setProduct(null);
            }
        }
        fetchData();
    },[title, name_of_the_category]);
    if(!product)
        return(
            <p
            style={{
                fontWeight:"bold",
                fontSize:"20px",
            }}
        >Loading product...</p>
        );
    return(
        <div className="Item">
            <Header isValid2={isValid2} nameOfTheUser={nameOfTheUser} email={email}/>
            <div style={{
                  display:"flex",
                  flexWrap:"wrap",
                  marginTop:"100px",
                  marginLeft:"350px",
                  backgroundColor:"lightyellow",
            }}>
                <img src={product.Image} style={{
                    width:"300px",
                  height:"350px",
                  marginTop:"40px",
                }}/>
                <div className="itemInfo">
                    <p id="title">{product.Product_name}</p>
                    <p>{displayPrice} $</p>
                    <div className="buttons">
                        <button className={active1? "activeButton" : ""}
                            onClick={()=>{
                                    setActive1(true);
                                    setActive2(false);
                                    setActive3(false);
                                    setDisplayPrice(product.Price_per_kg/5);
                                    setWeight(0.2);
                                    setTotalWeight(0.2*quantity);
                                    setTotalPrice(quantity*product.Price_per_kg/5);
                            }}
                        >200g</button>
                        <button className={active2? "activeButton" : ""}
                            onClick={()=>{
                                    setActive2(true);
                                    setActive1(false);
                                    setActive3(false);
                                    setDisplayPrice(product.Price_per_kg/2);
                                    setWeight(0.5);
                                    setTotalWeight(0.5*quantity);
                                    setTotalPrice(quantity*product.Price_per_kg/2);
                            }}
                        >500g</button>
                        <button className={active3? "activeButton" : ""}
                            onClick={()=>{
                                    setActive3(true);
                                    setActive2(false);
                                    setActive1(false);
                                    setDisplayPrice(product.Price_per_kg);
                                    setWeight(1);
                                    setTotalWeight(1*quantity);
                                    setTotalPrice(quantity*product.Price_per_kg);
                            }}
                        >1000g</button>
                    </div>
                    <p>Quantity:</p>
                    {!verifyQuantity &&
                    <p style={{
                        color:"red",
                        fontSize: "15px",
                    }}>Please enter a non-negative number</p>
                    }
                    <div className="quantityToAddToCart">
                        <input type="number" onChange={(e)=>{
                            if(e.target.value>=0){
                                setVerifyQuantity(true);
                                setTotalWeight(weight*e.target.value);
                                if(weight!=0)
                                    setTotalPrice(e.target.value*displayPrice);
                                setQuantity(e.target.value);
                            }
                            else
                                setVerifyQuantity(false);
                        }}></input>
                        
                        <button
                        onClick={async()=>{
                           if(!isValid2){
                                window.location.href="/sign_in";
                                return; 
                           }
                           else{
                            const productName=product.Product_name;
                            const response= await fetch(
                                `http://localhost:3000/addToCart?email=${email}&productName=${productName}&totalWeight=${totalWeight}&totalPrice=${totalPrice}`,
                                {
                                    method: "POST",
                                    credentials: "include",
                                }   
                            );
                            if(response){
                                alert("Your product was added to the cart");
                            }
                           }  
                        }}
                        >ADD TO CART</button>
                    </div>
                    <hr style={{
                        width:"750px",
                    }}/>
                    <div className="categories">
                    </div>
                    <div className="categories">
                    <p style={{
                        fontWeight:"bold",
                    }}>Description</p>
                    <p>: {product.Description}</p>
                    </div>
                    <p> {totalWeight.toFixed(2)} kg of {product.Product_name}.. Price: {totalPrice.toFixed(2)} $ </p>
                </div>
            </div>
        </div>
    );
}
export default Item;
