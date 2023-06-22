import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as Yup from "yup";



function Discount() {
const [promoCode, setPromoCode] = useState([]);

const discountCollectionRef = query(collection(db, "Discounts"));

useEffect(() => {
    onSnapshot(discountCollectionRef, (querySnapshot) => {
    setPromoCode(
        querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        Date: doc.data().Date.toDate().toLocaleString(),
          Exp: doc.data().Exp.toDate().toLocaleString(),
          id: doc.id,
        }))
      );
    });
  }, []);

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    discountValue: Yup.string().required("Discount Value is required"),
    startDate: Yup.date().required("Starting Date is required"),
    endDate: Yup.date().required("Ending Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      discountValue: "",
      startDate: null,
      endDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const newStartDate = values.startDate ? Timestamp.fromDate(values.startDate) : null;
        const newEndDate = values.endDate  ? Timestamp.fromDate(values.endDate) : null;
        await addDoc(discountCollectionRef, {
          Code: values.code,
          DiscountValue: values.discountValue,
          Date: newStartDate,
          Exp: newEndDate,
        });
        formik.resetForm();
      } catch (err) {
        alert(err);
      }
    },
  });

  const deletePromoCode = async (id) => {
    try {
      const codeId = doc(db, "Discounts", id);
      await deleteDoc(codeId);
    } catch (err) {
      alert(err);
    }
  };

  const handleStartDateChange = (date) => {
    formik.setFieldValue("startDate", date);
  };

  const handleEndDateChange = (date) => {
    formik.setFieldValue("endDate", date);
  };


  return (
    <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>

        <Typography variant="h3" align="left" m={2}>Discounts & Prizes</Typography>
        <Typography variant="subtitle" align="left" m={2} mb={10}>Discounts, prizes, other</Typography>

        <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        >
        <TextField
            style={{m:2}}
            type="string"
            placeholder="makers 50"
            id="code"
            label="Code"
            size="small"
            required
            {...formik.getFieldProps("code")}
            error={formik.touched.code && formik.errors.code}
            helperText={formik.touched.code && formik.errors.code}
        /> 

        <TextField
            label="Discount Value"
            type="number"
            id="discountValue"
            size="small"
            placeholder="12%"
            required
            {...formik.getFieldProps("discountValue")}
            error={formik.touched.discountValue && formik.errors.discountValue}
            helperText={
            formik.touched.discountValue && formik.errors.discountValue
            }
        /> <br />

        <label>starting date:</label>
        <input
            type="datetime-local"
            value={formik.values.startDate? formik.values.startDate.toISOString().slice(0, -8): ""}
            onChange={(e) => handleStartDateChange(new Date(e.target.value)) }
            required
        />
        <br />

        <label>ending date:</label>
        <input
            type="datetime-local"
            value={formik.values.endDate ? formik.values.endDate.toISOString().slice(0, -8) : ""}
            onChange={(e) => handleEndDateChange(new Date(e.target.value))}
            required
        /> <br /> <br /> 

        <Button variant="contained" color="success" type="submit" sx={{ml:30}}>
            Add Discount
        </Button>
        </Box>

        
        <table>
        <thead>
            <tr >
            <th align="center">Code</th>
            <th align="center">Total Discounted Value</th>
            <th align="center">DiscountValue</th>
            <th align="center">Starting Date</th>
            <th align="center">Ending Date</th>
            </tr>
        </thead>


        <tbody >
            {promoCode.map((discount) => (
            <tr key={discount.id}>
                <td align="center">{discount.Code}</td>
                <td align="center">{discount.totalDiscountedValue}</td>
                <td align="center">{discount.DiscountValue}</td>
                <td align="center">{discount.Date}</td>
                <td align="center">{discount.Exp}</td>
                <td>
                <button
                className="delete"
                    onClick={() => deletePromoCode(discount.id)}
                >
                    Delete
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        
    </LocalizationProvider>
    </div>
);
}

export default Discount;
