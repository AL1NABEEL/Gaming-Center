import React from "react";
import { useEffect,useState } from "react";
import { db } from "../firebase";
import { collection, getDocs}from "firebase/firestore";
function Discount() {

    const [promoCode,setPromoCode]= useState([]);

    const discountCollectionRef= collection(db,'Discounts')
    useEffect(()=>{
    const getPromoCode= async ()=>{
    const data= await getDocs(discountCollectionRef);
    console.log(data);
    }
    getPromoCode();
    },[]);

    return(    
    <>
    ghg
    </>
    )
}
export default Discount;