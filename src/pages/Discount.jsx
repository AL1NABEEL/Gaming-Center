import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import * as yup from "yup";
import moreverticon from "../Makers project/more icon/moreverticon.svg";
import "./Discount.css"
import swal from 'sweetalert';
import Loading from "../Loading/Loading";




// setting up constants 
const Discount = () => {
  const [promoCode, setPromoCode] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPromoCodeId, setSelectedPromoCodeId] = useState(null);
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [loading, setLoading] = useState(true);


  const discountCollectionRef = query(collection(db, "Discounts"));

  // fetching data from firebase 
  useEffect(() => {
    onSnapshot(discountCollectionRef, (querySnapshot) => {
      setPromoCode(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          status: doc.data().status,
        }))
      );
      setLoading(false);
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


  // validation for the inputs using yup 
  const validationSchema = yup.object().shape({
    code: yup.string().required("Code is required"),
    discountValue: yup.number().required("Discount value is required").min(0,"Discount value cannot be negative" ).max(100, "Discount value cannot exceed 100" ),
    startDate: yup.date().nullable().required("Starting date is required"),
    endDate: yup
      .date()
      .nullable()
      .min(
        yup.ref("startDate"),
        "Ending date should be after the starting date"
      )
      .required("Ending date is required"),
  });


  const formik = useFormik({
    initialValues: {
      code: "",
      discountValue: "",
      startDate: null,
      endDate: null,
    },
    validationSchema: validationSchema,
    // uploading data to firebase 
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
        swal({
          title: "Discount Added!",
          text: "Discount has been successfully added.",
          icon: "success",
          button: "OK",
        }).then(() => {
          resetForm();
        });        
        resetForm();
      } catch (err) {
        alert(err);
      }
    },
  });


  // validation for the starting date datepicker from mui 
  const errorMessageStartDate = React.useMemo(() => {
    if (formik.touched.startDate && formik.errors.startDate) {
      return formik.errors.startDate;
    } else if (formik.touched.startDate && !formik.values.startDate) {
      return "Starting date is required";
    } else {
      return "";
    }
  }, [formik.touched.startDate, formik.errors.startDate, formik.values.startDate]);


  // validation for the ending date datepicker from mui 
  const errorMessageEndDate = React.useMemo(() => {
    if (formik.touched.endDate && formik.errors.endDate) {
      return formik.errors.endDate;
    } else if (formik.touched.endDate && !formik.values.endDate) {
      return "Ending date is required";
    } else {
      return "";
    }
  }, [formik.touched.endDate, formik.errors.endDate, formik.values.endDate]);


  
// this is for the alert when deleting a promocode 
  const handleDelete = async () => {
    if (selectedPromoCodeId) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, the discount will be permanently removed.",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deletePromoCode(selectedPromoCodeId);
          setSelectedPromoCodeId(null); // Clear the selected promo code after deletion
          swal("Discount deleted!", {
            icon: "success",
          });
        }
      });
    }
  };
  
  
// changing the status of the promocode from disalbed to enabled and vice versa 
  const togglePromoCodeStatus = async (id, currentStatus) => {
    try {
      const codeId = doc(db, "Discounts", id);
      await updateDoc(codeId, { status: !currentStatus });
      swal({
        title: "PromoCode status changed successfully",
        text:"you have changed the status of the promocode"
      })
    } catch (err) {
      alert(err);
    }
  };



  // without this Block, if you open the options in the moreverticon you will not be able to close it 
  useEffect(() => {
    const handleClickOutside = () => {
      setOptionsVisible(false);
    };
  
    if (isOptionsVisible) {
      document.addEventListener("click", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOptionsVisible]);
  



  return (
    <div div className="container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <h1>Discounts & Prizes</h1>
        <p>Discount, Prize, Other </p>


        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { my: 4, width: "25ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            label="Code"
            type="string"
            placeholder="makers 50"
            {...formik.getFieldProps("code")}
            error={formik.touched.code && formik.errors.code ? true : false}
            helperText={formik.touched.code && formik.errors.code}
            sx={{mr:4}}
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
            helperText={formik.touched.discountValue && formik.errors.discountValue}
          /> <br />

          <DatePicker
          label="Starting Date"
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
            sx={{mr:4}}
          />

          <DatePicker
            label="Ending Date"
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
          />

          

          <Button variant="contained" color="success" type="submit" sx={{mt:4, ml:10, p:2}}>
            Add Discount
          </Button>
        </Box>
        {loading ? (
  <Loading />
) : (
        <table style={{ margin: "20px" }}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Status</th>
              <th>DiscountValue</th>
              <th>Starting Date</th>
              <th>Ending Date</th>
            </tr>
          </thead>

          <tbody>
            {promoCode.map((discount) => (
              <tr key={discount.id}>
                <td>{discount.Code}</td>
                <td>
                  {discount.status ? (
                    <Button
                      variant="outlined"
                      color="success"
                      disableElevation
                      size="small"
                      sx={{ borderRadius: 5 }}
                    >
                      Enabled
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      disableElevation
                      size="small"
                      sx={{ borderRadius: 5 }}
                    >
                      Disabled
                    </Button>
                  )}
                </td>
                <td>{discount.DiscountValue}</td>
                <td>{discount.Date}</td>
                <td>{discount.Exp}</td>
                <td style={{ position: "relative" }}>

        <img
          src={moreverticon}
          alt="more icon"
          height={35}
          width={30}
          className="moreverticon"
          onClick={(e) => {
            setSelectedPromoCodeId(discount.id);
            setOptionsVisible(!isOptionsVisible);
            e.stopPropagation();
          }}
        />
        {selectedPromoCodeId === discount.id && isOptionsVisible && (
         <div
         className="optionsContainer"
       >
         <button
           onClick={() => handleDelete()}
           className="deletebutton"
           onMouseEnter={(e) => (e.target.style.backgroundColor = "lightgray")}
           onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
         >
           Delete
         </button>
         <button
           onClick={() => togglePromoCodeStatus(discount.id, discount.status)}
           className="disableEnable-button"
           onMouseEnter={(e) => (e.target.style.backgroundColor = "lightgray")}
           onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
         >
           {discount.status ? "Disable" : "Enable"}
         </button>
       </div>
        )}
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
        )}
      </LocalizationProvider>
    </div>
  );
};

export default Discount;

