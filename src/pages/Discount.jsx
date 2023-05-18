import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {collection, query, onSnapshot, addDoc, Timestamp, } from "firebase/firestore";

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
        // unlike string and number, date type requires this function to be read by react
        }))
    );
    });
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const newStartDate = startDate ? Timestamp.fromDate(startDate) : null;
    const newEndDate = endDate ? Timestamp.fromDate(endDate) : null;
    await addDoc(discountCollectionRef, {
        Code: code,
        DiscountValue: discountValue, 
        Date: newStartDate,
        Exp: newEndDate,
    });
    } catch (err) {
    alert(err);
    }
};

return (
    <>
    {promoCode.map((Discounts) => {
        return (
        <>
            <h1>code:{Discounts.Code}</h1>
            <h1>NumOfUse:{Discounts.NumOfUse}</h1>
            <h1>DiscountValue:{Discounts.DiscountValue}</h1> 
            <h1>Date:{Discounts.Date}</h1>
            <h1>Exp:{Discounts.Exp}</h1>
            

            <input
            type="string"
            placeholder="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            />

            <input
            type="string"
            placeholder="discount value"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            />

            <input
            type="datetime-local"
            placeholder="starting date"
            value={startDate ? startDate.toISOString().slice(0, -8) : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            />

            <input
            type="datetime-local"
            placeholder="exp date"
            value={startDate ? startDate.toISOString().slice(0, -8) : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            />

            <button onClick={handleSubmit}>add discount</button>
        </>
        );
    })}
    </>
);
}

export default Discount;
