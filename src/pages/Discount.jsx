import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {collection, query, onSnapshot, addDoc, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { Typography, } from "@mui/material";
// import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';


function Discount() {
const [promoCode, setPromoCode] = useState([]);
const [code, setCode] = useState("");
const [discountValue, setDiscountValue] = useState("");
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);

const discountCollectionRef = query(collection(db, "Discounts"));


// const [selectedDate, setSelectedDate] = React.useState(new Date());

//     const handleDateChange = (date) => {
//       setSelectedDate(date);
//     };


useEffect(() => {
    onSnapshot(discountCollectionRef, (querySnapshot) => {
    setPromoCode(
        querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        Date: doc.data().Date.toDate().toLocaleString(),
        Exp: doc.data().Exp.toDate().toLocaleString(),
        // unlike string and number, date type requires this function to be read by react
        id:doc.id
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
    try{
    const codeId = doc(db, "Discounts", id);
    await deleteDoc(codeId);
    } catch(err) {
        alert(err);
    }
};


return (
    <>
    <Typography variant="h3">Discounts & Prizes</Typography>
    <Typography variant="subtitle1">Discounts & Prizes</Typography>
    
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


    <table style={{ margin: "20px" }}>
        <thead >
        <tr style={{color:"red"}} >
            <th>Code</th>
            <th>NumOfUse</th>
            <th>Total Discounted Value</th>
            <th>DiscountValue</th>
            <th>Starting Date</th>
            <th>Ending Date</th>
            <th>Actions</th>
        </tr>
        </thead>

        <tbody>
        {promoCode.map((discount) => (
            <tr key={discount.id}>
            <td>{discount.Code}</td>
            <td>{discount.NumOfUse}</td>
            <td>{discount.totalDiscountedValue}</td>
            <td>{discount.DiscountValue}</td>
            <td>{discount.Date}</td>
            <td>{discount.Exp}</td>
            <td>
                <button onClick={() => deletePromoCode(discount.id)}>
                delete promo code
                </button>
            </td>
            </tr>
        ))}
        </tbody>

    </table>

    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
      label="Select Date"
      value={selectedDate}
      onChange={handleDateChange}
      format="MM/dd/yyyy"
    />
  </MuiPickersUtilsProvider> */}

    </>
);
}

export default Discount;
