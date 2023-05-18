import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {collection, query, onSnapshot, addDoc, Timestamp, deleteDoc, doc } from "firebase/firestore";

function Discount() {
const [promoCode, setPromoCode] = useState([]);
const [code, setCode] = useState("");
const [discountValue, setDiscountValue] = useState("");
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);

const discountCollectionRef = query(collection(db, "Discounts"));

useEffect(() => {
    onSnapshot(discountCollectionRef, (querySnapshot) => {
    setPromoCode(
        querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        Date: doc.data().Date.toDate().toLocaleString(),
        Exp: doc.data().Exp.toDate().toLocaleString(),
        id:doc.id
        // unlike string and number, date type requires this function to be read by react
        }))
    );
    });
}, []);

const handleSubmit = async (e) => {
    try {
    const newStartDate = startDate ? Timestamp.fromDate(startDate) : null;
    const newEndDate = endDate ? Timestamp.fromDate(endDate) : null;
    await addDoc(discountCollectionRef, {
        Code: code,
        DiscountValue: discountValue, 
        Date: newStartDate,
        Exp: newEndDate,
    });
    setCode("");
    setDiscountValue("");
    setStartDate(null);
    setEndDate(null);
    // to empty the input fields after we press add discount button  
    } catch (err) {
    alert(err);
    }
};


const deletePromoCode = async (id) => {
    const codeId = doc(db, "Discounts", id);
    await deleteDoc(codeId);
};


return (
    <>
    <label>code:</label>
            <input
            type="string"
            placeholder="makers 50"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            /> <br />

    <label>discount value:</label>
            <input
            type="string"
            placeholder="10%"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            /> <br />

    <label>starting date:</label>
            <input
            type="datetime-local"
            value={startDate ? startDate.toISOString().slice(0, -8) : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            /> <br />

    <label>ending date:</label>
            <input
            type="datetime-local"
            value={endDate ? endDate.toISOString().slice(0, -8) : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            /> <br />

            <button onClick={handleSubmit}>add discount</button>


        {promoCode.map((Discounts) => {
            return (
            <>
            <h1>code:{Discounts.Code}</h1>
            <h1>NumOfUse:{Discounts.NumOfUse}</h1>
            <h1>DiscountValue:{Discounts.DiscountValue}</h1> 
            <h1>Starting Date:{Discounts.Date}</h1>
            <h1>Exp Date:{Discounts.Exp}</h1>
            <button onClick={ () => {deletePromoCode(Discounts.id)}}>
                    delete promo code
                    </button>
            <hr />
            </>
        );
    })}        
    </>
);
}

export default Discount;
