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
// connect to firebase and show data 
  useEffect(() => {
    onSnapshot(discountCollectionRef, (querySnapshot) => {
      setPromoCode(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          status: doc.data().status,
        }))
      );
    });
  }, []);


  // delete promocode function 
  const deletePromoCode = async (id) => {
    try {
      const codeId = doc(db, "Discounts", id);
      await deleteDoc(codeId);
    } catch (err) {
      alert(err);
    }
  };


  // validations for all input fields 
  const validationSchema = yup.object().shape({
    code: yup.string().required("Code is required"),
    discountValue: yup.string().required("Discount value is required"),
    startDate: yup.date().nullable().required("Starting date is required"),
    endDate: yup.date().nullable().min(yup.ref("startDate"), "Ending date should be after the starting date")
    .required("Ending date is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      discountValue: "",
      startDate: null,
      endDate: null,
    },

    // uploading the data to firebase 
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const newStartDate = values.startDate.toISOString().slice(0, 10);
        const newEndDate = values.endDate.toISOString().slice(0, 10);
// the lines above changes the date to string and cuts it to 10 inputs only so its stored like DD-MM-YYYY
        await addDoc(discountCollectionRef, {
          Code: values.code,
          DiscountValue: values.discountValue,
          Date: newStartDate,
          Exp: newEndDate,
        });
        resetForm();
        // the line above empties all input field after we press submit 
      } catch (err) {
        alert(err);
      }
    },
  });



  // this is for the starting date error message 
  const errorMessageStartDate = React.useMemo(() => {
    if (formik.touched.startDate && formik.errors.startDate) {
      return formik.errors.startDate;
    } else if (formik.touched.startDate && !formik.values.startDate) {
      return "Starting date is required";
    } else {
      return "";
    }
  }, [formik.touched.startDate, formik.errors.startDate, formik.values.startDate]);
  


  // this is for the ending date error message 
  const errorMessageEndDate = React.useMemo(() => {
    if (formik.touched.endDate && formik.errors.endDate) {
      return formik.errors.endDate;
    } else if (formik.touched.endDate && !formik.values.endDate) {
      return "Ending date is required";
    } else {
      return "";
    }
  }, [formik.touched.endDate, formik.errors.endDate, formik.values.endDate]);
  
  
  
  

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
            label="Code"
            error={formik.touched.code && formik.errors.code ? true : false}
            helperText={formik.touched.code && formik.errors.code}
          />

          <TextField
            label="Discount Value"
            type="number"
            {...formik.getFieldProps("discountValue")}
            placeholder="12%"
            error={formik.touched.discountValue && formik.errors.discountValue? true: false}
            helperText={formik.touched.discountValue && formik.errors.discountValue}
          /> <br />

          <DatePicker
          value={formik.values.startDate}
          onChange={(date) => {
          formik.setFieldValue("startDate", date);
          }}
          disablePast
          onError={(newError) => {
          formik.setFieldError("startDate", newError);
          setError(newError);
          }}
          slotProps={{
          textField: {
          error: formik.touched.startDate && formik.errors.startDate ? true : false,
          helperText:
          formik.touched.startDate && formik.errors.startDate
          ? formik.errors.startDate
          : errorMessageStartDate,
          },
          }}
          label="Starting Date"
          />

          <DatePicker
          value={formik.values.endDate}
          onChange={(date) => formik.setFieldValue("endDate", date)}
          disablePast
          onError={(newError) => {
          formik.setFieldError("endDate", newError);
          setError(newError);
          }}
          slotProps={{
          textField: {
          error: formik.touched.endDate && formik.errors.endDate ? true : false,
          helperText:
          formik.touched.endDate && formik.errors.endDate
          ? formik.errors.endDate
          : errorMessageEndDate,
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
              <th>Status</th>
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
                <td align="center">  {discount.status ? 
                <Button variant="outlined" color="success" disableElevation size="small" sx={{borderRadius:5}}> Enabled </Button> 
                :
                <Button variant="outlined" color="error" disableElevation size="small" sx={{borderRadius:5}}> Disabled </Button>}
                </td>
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

