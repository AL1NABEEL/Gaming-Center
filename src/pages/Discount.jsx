import React from "react";
import { useEffect,useState } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot}from "firebase/firestore";

function Discount() {

    const [promoCode,setPromoCode]= useState([]);

    useEffect(() => {
        const discountCollectionRef = query(collection(db, 'Discounts'));
        onSnapshot(discountCollectionRef, (querySnapshot) => {
            setPromoCode(
            querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            Date: doc.data().Date.toDate().toLocaleString(),   
            Exp: doc.data().Exp.toDate().toLocaleString(),
            // unlike string and number, date type requires this function to be read by react
            Permittivity: doc.data().Permittivity.path,
            }))
        );
        });
    }, []);
    

    return(    
    <>
    {promoCode.map((Discounts)=>{
        return(
            <>
            
            <h1>code:{Discounts.Code}</h1>
            <h1>NumOfUse:{Discounts.NumOfUse}</h1>
            <h1>DiscountValue:{Discounts.DiscountValue}</h1>
            <h1>Date:{Discounts.Date}</h1>
            <h1>Exp:{Discounts.Exp}</h1>
            <h1>Permittivity:{Discounts.Permittivity}</h1>
            
            </>
        )
    })}
    </>
    )
}
export default Discount;

