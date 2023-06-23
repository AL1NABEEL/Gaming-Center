// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   onSnapshot,
//   addDoc,
//   Timestamp,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { Typography } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import "./Discount.css"
// import { DatePicker } from "@mui/x-date-pickers";





// function Discount() {
// const [promoCode, setPromoCode] = useState([]);
// const [selectedRows, setSelectedRows] = useState([]);
// const [startDate, setStartDate] = useState(null);
// const [endDate, setEndDate] = useState(null);



// const discountCollectionRef = query(collection(db, "Discounts"));

// useEffect(() => {
//     onSnapshot(discountCollectionRef, (querySnapshot) => {
//     setPromoCode(
//         querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         Date: doc.data().Date.toDate().toLocaleString(),
//           Exp: doc.data().Exp.toDate().toLocaleString(),
//           id: doc.id,
//           status: doc.data().status,
//         }))
//       );
//     });
//   }, []);

//   const validationSchema = Yup.object().shape({
//     code: Yup.string().required("Code is required"),
//     discountValue: Yup.string().required("Discount Value is required"),
//     startDate: Yup.date().required("Starting Date is required"),
//     endDate: Yup.date().required("Ending Date is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       code: "",
//       discountValue: "",
//       startDate: null,
//       endDate: null,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       try {
       
//         await addDoc(discountCollectionRef, {
//           Code: values.code,
//           DiscountValue: values.discountValue,
//           Date: values.startDate,
//           Exp: values.endDate,
//         });
//         formik.resetForm();
//       } catch (err) {
//         alert(err);
//       }
//     },
//   });

//   const deletePromoCode = async (id) => {
//     try {
//       const codeId = doc(db, "Discounts", id);
//       await deleteDoc(codeId);
//     } catch (err) {
//       alert(err);
//     }
//   };

//   const handleStartDateChange = (date) => {
//     formik.setFieldValue("startDate", date);
//   };

//   const handleEndDateChange = (date) => {
//     formik.setFieldValue("endDate", date);
//   };

//   const handleRowSelection = (id) => {
//     setSelectedRows((prevSelectedRows) => {
//       if (prevSelectedRows.includes(id)) {
//         // Remove the row from selectedRows if it's already selected
//         return prevSelectedRows.filter((rowId) => rowId !== id);
//       } else {
//         // Add the row to selectedRows if it's not already selected
//         return [...prevSelectedRows, id];
//       }
//     });
//   };

  
//   return (
//     <div>
//     <LocalizationProvider dateAdapter={AdapterDayjs}>

//         <Typography variant="h3" align="left" m={2}>Discounts & Prizes</Typography>
//         {/* <Typography variant="subtitle" align="left" m={2} mb={10}>Discounts, prizes, other</Typography> <br /> <br /> */}
//         {/* <h1>discounts</h1> */}
        
//         <p>Discounts, prizes, other</p>

//         <Box
//         component="form"
//         sx={{ "& .MuiTextField-root": { m: 2, width: "25ch" } }}
//         noValidate
//         autoComplete="off"
//         onSubmit={formik.handleSubmit}
//         >
//         <TextField
//             style={{ml:4}}
//             type="string"
//             placeholder="makers 50"
//             id="code"
//             label="Code"
//             size="small"
//             required
//             {...formik.getFieldProps("code")}
//             error={formik.touched.code && formik.errors.code}
//             helperText={formik.touched.code && formik.errors.code}
//         /> 

//         <TextField
//             label="Discount Value"
//             name={formik.values.discountValue}
//             type="number"
//             id="discountValue"
//             size="small"
//             placeholder="12%"
//             required
//             {...formik.getFieldProps("discountValue")}
//             error={formik.touched.discountValue && formik.errors.discountValue}
//             helperText={
//             formik.touched.discountValue && formik.errors.discountValue
//             }
//         /> <br />

//         <label>starting date:</label>
//         <input
//             type="datetime-local"
//             value={formik.values.startDate? formik.values.startDate.toISOString().slice(0, -8): ""}
//             onChange={(e) => handleStartDateChange(new Date(e.target.value)) }
//             required
//         />
        
//         <DatePicker
//   label="Starting Date"
//   value={startDate}
//   onChange={(date) => setStartDate(date)}
//   renderInput={(params) => <TextField {...params} />}
// />

      

//         <label>ending date:</label>
//         <input
//             type="datetime-local"
//             value={formik.values.endDate ? formik.values.endDate.toISOString().slice(0, -8) : ""}
//             onChange={(e) => handleEndDateChange(new Date(e.target.value))}
//             required
//         />
        
//          <DatePicker
//           label="Ending Date"
//           value={endDate}
//           onChange={(date) => setEndDate(date)}
//           renderInput={(params) => <TextField {...params} />}
//         /> 
//         <br /> <br />  

//         <Button variant="contained" color="success" type="submit" sx={{ml:30, p:1}} size="small">
//             Add Discount
//         </Button>
//         </Box>

        
//         <table>
//         <thead>
//             <tr >
//             <th align="center"></th>
//             <th align="center">Code</th>
//             <th align="center">Status</th> 
//             <th align="center">DiscountValue</th>
//             <th align="center">Starting Date</th>
//             <th align="center">Ending Date</th>

//             </tr>
//         </thead>


//         <tbody >
//             {promoCode.map((discount) => (
//             <tr key={discount.id}>
//               <td align="center">
//         <input
//           type="checkbox"
//           checked={selectedRows.includes(discount.id)}
//           onChange={() => handleRowSelection(discount.id)}
//         /> </td>
//                 <td align="center">{discount.Code}</td>

//                 <td align="center">{discount.status ? 
//                 <Button variant="outlined" color="success" disableElevation size="small" sx={{borderRadius:5}}> Enrolled </Button> 
//                 :
//                 <Button variant="outlined" color="error" disableElevation size="small" sx={{borderRadius:5}}> Expired </Button>}</td>
                
//                 <td align="center">{discount.DiscountValue}</td>
//                 <td align="center">{discount.Date}</td>
//                 <td align="center">{discount.Exp}</td>
                

//                 <td>
//                 <button
//                 className="delete"
//                     onClick={() => deletePromoCode(discount.id)}
//                 >
//                     Delete
//                 </button>
//                 </td>
//             </tr>
//             ))}
//         </tbody>
//         </table>
        
//     </LocalizationProvider>
//     </div>
// );
// }

// export default Discount;



import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {collection, query, onSnapshot, addDoc, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { Typography, } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DatePicker } from "@mui/x-date-pickers";



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
        // Date: doc.data().Date.toDate().toLocaleString(),
        // Exp: doc.data().Exp.toDate().toLocaleString(),
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
      const newStartDate = startDate.toISOString().slice(0, 10);
      const newEndDate = endDate.toISOString().slice(0, 10);
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
            <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} />}
            />
<br /> <br />

    <label>ending date:</label>
            <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            renderInput={(params) => <TextField {...params} />}
            />            
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