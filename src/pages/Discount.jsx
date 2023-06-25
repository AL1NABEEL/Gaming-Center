
// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import {collection, query, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
// import { Typography, } from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import { DatePicker } from "@mui/x-date-pickers";



// function Discount() {
// const [promoCode, setPromoCode] = useState([]);
// const [code, setCode] = useState("");
// const [discountValue, setDiscountValue] = useState("");
// const [startDate, setStartDate] = useState(null);
// const [endDate, setEndDate] = useState(null);



// const discountCollectionRef = query(collection(db, "Discounts"));


// useEffect(() => {
//     onSnapshot(discountCollectionRef, (querySnapshot) => {
//     setPromoCode(
//         querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         // Date: doc.data().Date.toDate().toLocaleString(),
//         // Exp: doc.data().Exp.toDate().toLocaleString(),
//         // unlike string and number, date type requires this function to be read by react
//         id:doc.id
//         }))
//     );
//     });
// }, []);



// const handleSubmit = async (e) => {

//     try {
//       const newStartDate = startDate.toISOString().slice(0, 10);
//       const newEndDate = endDate.toISOString().slice(0, 10);
//     await addDoc(discountCollectionRef, {
//         Code: code,
//         DiscountValue: discountValue, 
//         Date: newStartDate,
//         Exp: newEndDate,
//     });
//     setCode("");
//     setDiscountValue("");
//     setStartDate(null);
//     setEndDate(null);
//     // to empty the input fields after we press add discount button  
//     } catch (err) {
//     alert(err);
//     }
    
// };


// const deletePromoCode = async (id) => {
//     try{
//     const codeId = doc(db, "Discounts", id);
//     await deleteDoc(codeId);
//     } catch(err) {
//         alert(err);
//     }
// };


        
// return (
//     <>
//     <LocalizationProvider dateAdapter={AdapterDayjs}>

//     <Typography variant="h3">Discounts & Prizes</Typography>
//     <Typography variant="subtitle1" >Discounts & Prizes</Typography>


//     <Box
//     component="form"
//     sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
//     noValidate
//     autoComplete="off"
//     >
    
    
//     <TextField
//         type="string"
//         placeholder="makers 50"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         id="outlined-required"
//         label="Code"
//         defaultValue="Hello World"
        
//         /> 

//         <TextField 
//         label="Discount Value"
//         type="number"
//         value={discountValue}
//         onChange={(e) => setDiscountValue(e.target.value)}
//         placeholder="12%"
        
//         /> <br />

    
//             <DatePicker
//             value={startDate}
//             onChange={(date) => setStartDate(date)}
//             renderInput={(params) => <TextField {...params} />}
//             label="Starting Date"
//             />

    
//             <DatePicker
//             value={endDate}
//             onChange={(date) => setEndDate(date)}
//             renderInput={(params) => <TextField {...params} />}
//             label="Ending Date"
//             />            
//             <br /> <br />

//             <Button variant="contained" color="success" onClick={handleSubmit}>
//             Add Discount
//             </Button>

//     </Box>


//     <table style={{ margin: "20px" }}>
//         <thead >
//         <tr style={{color:"red"}} >
//             <th>Code</th>
//             <th>NumOfUse</th>
//             <th>Total Discounted Value</th>
//             <th>DiscountValue</th>
//             <th>Starting Date</th>
//             <th>Ending Date</th>
//             <th>Actions</th>
//         </tr>
//         </thead>

//         <tbody>
//         {promoCode.map((discount) => (
//             <tr key={discount.id}>
//             <td>{discount.Code}</td>
//             <td>{discount.NumOfUse}</td>
//             <td>{discount.totalDiscountedValue}</td>
//             <td>{discount.DiscountValue}</td>
//             <td>{discount.Date}</td>
//             <td>{discount.Exp}</td>
//             <td>
//                 <button onClick={() => deletePromoCode(discount.id)}>
//                 Delete
//                 </button>
//             </td>
//             </tr>
//         ))}
//         </tbody>

//     </table>
    
//     </LocalizationProvider>
//     </>
// );
// }

// export default Discount;


// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   onSnapshot,
//   addDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { Typography } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import { DatePicker } from "@mui/x-date-pickers";
// import { useFormik } from "formik";
// import * as yup from "yup";

// const Discount = () => {
//   const [promoCode, setPromoCode] = useState([]);
//   const [error, setError] = React.useState(null);

//   const discountCollectionRef = query(collection(db, "Discounts"));

//   useEffect(() => {
//     onSnapshot(discountCollectionRef, (querySnapshot) => {
//       setPromoCode(
//         querySnapshot.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }))
//       );
//     });
//   }, []);

// //   const errorMessage = React.useMemo(() => {
// //     switch (error) {  case 'invalidDate': {
// //       return 'Your date is not valid';
// //     }

// //     default: {
// //       return '';
// //     }
// //   }
// // }, [error]);

// const errorMessage = React.useMemo(() => {
//   if (formik.touched.startDate && formik.errors.startDate) {
//     return formik.errors.startDate;
//   } else if (formik.touched.startDate && !formik.values.startDate) {
//     return "Starting date is required";
//   } else {
//     return "";
//   }
// }, [error]);


//   const deletePromoCode = async (id) => {
//     try {
//       const codeId = doc(db, "Discounts", id);
//       await deleteDoc(codeId);
//     } catch (err) {
//       alert(err);
//     }
//   };

// const validationSchema = yup.object().shape({
//   code: yup.string().required("Code is required"),
//   discountValue: yup.string().required("Discount value is required"),
//   // startDate: yup.date().nullable().required("Starting date is required"),
//   // endDate: yup.date().nullable().required("Ending date is required"),
// });


//   const formik = useFormik({
//     initialValues: {
//       code: "",
//       discountValue: "",
//       startDate: null,
//       endDate: null,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const newStartDate = values.startDate.toISOString().slice(0, 10);
//         const newEndDate = values.endDate.toISOString().slice(0, 10);
//         await addDoc(discountCollectionRef, {
//           Code: values.code,
//           DiscountValue: values.discountValue,
//           Date: newStartDate,
//           Exp: newEndDate,
//         });
//         resetForm();
//       } catch (err) {
//         alert(err);
//       }
//     },
//   });

//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Typography variant="h3">Discounts & Prizes</Typography>
//         <Typography variant="subtitle1">Discounts & Prizes</Typography>

//         <Box
//           component="form"
//           sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
//           noValidate
//           autoComplete="off"
//           onSubmit={formik.handleSubmit}
//         >
//           <TextField
//             type="string"
//             placeholder="makers 50"
//             {...formik.getFieldProps("code")}
//             id="code"
//             label="Code"
//             error={formik.touched.code && formik.errors.code ? true : false}
//             helperText={formik.touched.code && formik.errors.code}
//           />

//           <TextField
//             label="Discount Value"
//             type="number"
//             {...formik.getFieldProps("discountValue")}
//             placeholder="12%"
//             error={
//               formik.touched.discountValue && formik.errors.discountValue
//                 ? true
//                 : false
//             }
//             helperText={formik.touched.discountValue && formik.errors.discountValue}
//           />

// <DatePicker
//   value={formik.values.startDate}
//   onChange={(date) => {
//     formik.setFieldValue("startDate", date);
//     formik.setFieldTouched("startDate", true);
//   }}
//   disablePast
//   onError={(newError) => setError(newError)}
//   slotProps={{
//     textField: {
//       helperText:
//         formik.touched.startDate && formik.errors.startDate
//           ? formik.errors.startDate
//           : errorMessage,
//     },
//   }}
//   error={formik.touched.startDate && formik.errors.startDate ? true : false}
//   label="Starting Date"
// />



//           <DatePicker
//             value={formik.values.endDate}
//             onChange={(date) => formik.setFieldValue("endDate", date)}
//             disablePast
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 error={
//                   formik.touched.endDate && formik.errors.endDate ? true : false
//                 }
//                 helperText={formik.touched.endDate && formik.errors.endDate}
//               />
//             )}
//             label="Ending Date"
//           />

//           <br /> <br />

//           <Button variant="contained" color="success" type="submit">
//             Add Discount
//           </Button>
//         </Box>

//         <table style={{ margin: "20px" }}>
//           <thead>
//             <tr style={{ color: "red" }}>
//               <th>Code</th>
//               <th>NumOfUse</th>
//               <th>Total Discounted Value</th>
//               <th>DiscountValue</th>
//               <th>Starting Date</th>
//               <th>Ending Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {promoCode.map((discount) => (
//               <tr key={discount.id}>
//                 <td>{discount.Code}</td>
//                 <td>{discount.NumOfUse}</td>
//                 <td>{discount.totalDiscountedValue}</td>
//                 <td>{discount.DiscountValue}</td>
//                 <td>{discount.Date}</td>
//                 <td>{discount.Exp}</td>
//                 <td>
//                   <button onClick={() => deletePromoCode(discount.id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </LocalizationProvider>
//     </>
//   );
// };

// export default Discount;


import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import * as yup from "yup";

const Discount = () => {
  const [promoCode, setPromoCode] = useState([]);
  const [error, setError] = useState(null);

  const discountCollectionRef = query(collection(db, "Discounts"));

  useEffect(() => {
    onSnapshot(discountCollectionRef, (querySnapshot) => {
      setPromoCode(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  const deletePromoCode = async (id) => {
    try {
      const codeId = doc(db, "Discounts", id);
      await deleteDoc(codeId);
    } catch (err) {
      alert(err);
    }
  };

  const validationSchema = yup.object().shape({
    code: yup.string().required("Code is required"),
    discountValue: yup.string().required("Discount value is required"),
    startDate: yup.date().nullable().required("Starting date is required"),
    endDate: yup.date().nullable().required("Ending date is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      discountValue: "",
      startDate: null,
      endDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const newStartDate = values.startDate.toISOString().slice(0, 10);
        const newEndDate = values.endDate.toISOString().slice(0, 10);
        await addDoc(discountCollectionRef, {
          Code: values.code,
          DiscountValue: values.discountValue,
          Date: newStartDate,
          Exp: newEndDate,
        });
        resetForm();
      } catch (err) {
        alert(err);
      }
    },
  });

  const errorMessage = React.useMemo(() => {
    if (formik.touched.startDate && formik.errors.startDate) {
      return formik.errors.startDate;
    } else if (formik.touched.startDate && !formik.values.startDate) {
      return "Starting date is required";
    } else if (formik.touched.endDate && !formik.values.endDate) {
      return "Ending date is required";
    } else {
      return "";
    }
  }, [formik.touched.startDate, formik.errors.startDate, formik.values.startDate, formik.touched.endDate, formik.values.endDate]);
  

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant="h3">Discounts & Prizes</Typography>
        <Typography variant="subtitle1">Discounts & Prizes</Typography>

        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            type="string"
            placeholder="makers 50"
            {...formik.getFieldProps("code")}
            id="code"
            label="Code"
            error={formik.touched.code && formik.errors.code ? true : false}
            helperText={formik.touched.code && formik.errors.code}
          />

          <TextField
            label="Discount Value"
            type="number"
            {...formik.getFieldProps("discountValue")}
            placeholder="12%"
            error={
              formik.touched.discountValue && formik.errors.discountValue
                ? true
                : false
            }
            helperText={
              formik.touched.discountValue && formik.errors.discountValue
            }
          /> <br />

<DatePicker
  value={formik.values.startDate}
  onChange={(date) => {
    formik.setFieldValue("startDate", date);
    
  }}
  disablePast
  onError={(newError) => setError(newError)}
  slotProps={{
    textField: {
      error: formik.touched.startDate && formik.errors.startDate ? true : false,
      helperText:
        formik.touched.startDate && formik.errors.startDate
          ? formik.errors.startDate
          : errorMessage,
    },
  }}
  label="Starting Date"
/>


<DatePicker
  value={formik.values.endDate}
  onChange={(date) => {
    formik.setFieldValue("endDate", date);
    formik.setFieldTouched("endDate", true);
  }}
  disablePast
  onError={(newError) => setError(newError)}
  slotProps={{
    textField: {
      error: formik.touched.endDate && formik.errors.endDate ? true : false,
      helperText:
        formik.touched.endDate && formik.errors.endDate
          ? formik.errors.endDate
          : "",
    },
  }}
  label="Ending Date"
/>


          <br /> <br />

          <Button variant="contained" color="success" type="submit">
            Add Discount
          </Button>
        </Box>

        <table style={{ margin: "20px" }}>
          <thead>
            <tr style={{ color: "red" }}>
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
};

export default Discount;

