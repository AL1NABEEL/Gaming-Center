import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {collection, query, onSnapshot, addDoc, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { Typography, } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';



function Discount() {
const [promoCode, setPromoCode] = useState([]);
const [code, setCode] = useState("");
const [discountValue, setDiscountValue] = useState("");
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [isFormValid, setIsFormValid] = useState(false);


const discountCollectionRef = query(collection(db, "Discounts"));


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


    useEffect(() => {
    // Check if all required fields are filled
    const isValid = code && discountValue && startDate && endDate;
    setIsFormValid(isValid);
    }, [code, discountValue, startDate, endDate]);

const handleSubmit = async (e) => {

    if (!isFormValid) {
        alert("Please fill all required fields");
        return;
    }

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>

    <Typography variant="h3">Discounts & Prizes</Typography>
    <Typography variant="subtitle1" >Discounts & Prizes</Typography>


    <Box
    component="form"
    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
    noValidate
    autoComplete="off"
    >
    
    
    <TextField
        type="string"
        placeholder="makers 50"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        id="outlined-required"
        label="Code"
        defaultValue="Hello World"
        size="small"
        required
        /> 

        <TextField 
        label="Discount Value"
        type="number"
        value={discountValue}
        onChange={(e) => setDiscountValue(e.target.value)}
        size="small"
        placeholder="12%"
        required
        /> <br />

    <label>starting date:</label>
    <input
            type="datetime-local"
            value={startDate ? startDate.toISOString().slice(0, -8) : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            required
            /> 
            {/* <DatePicker 
            type="datetime-local"
            value={startDate ? startDate.toISOString().slice(0, -8) : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}/> */}

            {/* <DatePicker
            value={startDate? startDate.toISOString():''}
            onChange={(date) => setStartDate(date)}
            /> */}

            {/* <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            /> */}
<br /> <br />

    <label>ending date:</label>
            <input
            type="datetime-local"
            value={endDate ? endDate.toISOString().slice(0, -8) : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            required
            /> 

            {/* <DatePicker
            type="datetime-local"
            value={endDate ? endDate.toISOString().slice(0, -8) : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            /> */}

            {/* <DatePicker
            value={endDate ? endDate.toISOString():''}
            onChange={(date) => setEndDate(date)}
            /> */}

            {/* <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            /> */}
            
            <br /> <br />


            <Button variant="contained" color="success" onClick={handleSubmit}>
            Add Discount
            </Button>

    </Box>


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
                Delete
                </button>
            </td>
            </tr>
        ))}
        </tbody>

    </table>
    
    </LocalizationProvider>
    </>
);
}

export default Discount;
