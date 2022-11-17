import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { addEventApi } from "../Helpers/Events";
import "./AddEvents.scss";

// import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
// import { useLocation } from "react-router-dom";
// import { set } from "date-fns";

//schema to validate event inputs
const schema = yup
  .object({
    title: yup.string().required("Can't Be Empty"),
    start: yup.date().required("Please specify the time to start"),
  })
  .required();

//Create appointment Endpoint
const addUser = async (user) => {
  return await axios.post("http://localhost:5000/data", user);
};

const initialValue = {
  title: "",
  start: "",
  end: "",
  description: "",
};

const AddEvents = ({ addEventApi, error }) => {
  // const location = useLocation();
  const [rerender, setRerender] = useState(false);
  const [dbError, setError] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [info, setInfo] = useState(initialValue);
  const { title, start, end, describe } = info;

  useEffect(() => {
    if (error && !firstRender) {
      setError(error);
    }
    // if (!error.start && !error.end && dbError !== false) {
    //   // setTimeout(location("/"));
    // }
  }, [rerender]);

  const {
    register,
    handleSubmit,

    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onValueChange = (e) => {
    //  console.log(e);
    // console.log(e.target.value);
    setInfo({ ...info, [e.target.name]: e.target.value });
    console.log(info);
  };

  // Create appointment Endpoint
  const onSubmit = async () => {
    await addUser(info);

    //redirect to display all appointments
  };

  useEffect(() => {
    console.log(addEventApi);
  }, [addEventApi]);

  // const onSubmit = async (values) => {
  //   setFirstRender(false);
  //   addEventApi.then(() => {
  //     setRerender(!rerender);
  //   });
  // };

  return (
    <form onSubmit={onSubmit()} className=" align-content-center m-5">
      <div className="align-content-center m-5">
        <p>Add event details below</p>
      </div>
      <div className="mb-4" style={{ zIndex: "100" }}>
        <label htmlFor="title" className="form-label">
          Event Title
        </label>
        <input
          {...register("title")}
          type="text"
          placeholder="title"
          className="form-control"
          id="title"
          aria-describedby="title"
          // onChange={(e) => onValueChange(e)}
          // name="title"
          // value={title}
        />
        <p
          className={`error text-warning position-absolute ${
            errors.title ? "active" : ""
          }`}
        >
          {errors.title ? <i className="bi bi-info-circle me-2"></i> : ""}
          {errors.title?.message}
        </p>
      </div>

      <div className="mb-4" style={{ zIndex: "100" }}>
        <label htmlFor="start" className="form-label">
          Start Date
        </label>
        {/* controllers are the way you can wrap and use datePicker inside react form-hook*/}
        {/* start date controller*/}
        <Controller
          control={control}
          name="start"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              value={field.value}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control"
              id="start"
            />
          )}
        />
        {/* error handling */}
        <p
          className={`error text-warning position-absolute ${
            errors.start ? "active" : ""
          }`}
        >
          {errors.start ? <i className=" bi bi-info-circle me-2"></i> : ""}
          {errors.start?.message}
        </p>
        <p
          className={`error text-warning position-absolute ${
            dbError.start ? "" : "d-none"
          }`}
        >
          {dbError.start ? <i className=" bi bi-info-circle me-2"></i> : ""}
          {dbError.start}
        </p>
      </div>

      <div className="mb-4" style={{ zIndex: "100" }}>
        <label htmlFor="end" className="form-label">
          End Date
        </label>
        {/* end date controller*/}
        <Controller
          control={control}
          name="end"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select end date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              value={field.value}
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
              className="form-control"
              id="end"
            />
          )}
        />
        <p
          className={`error text-warning position-absolute ${
            dbError.end ? "" : "d-none"
          }`}
        >
          {dbError.end ? <i className=" bi bi-info-circle me-2"></i> : ""}
          {dbError.end}
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="describe" className="form-label">
          Event Description{" "}
          <span className="text-danger small">(optional)</span>
        </label>
        <input
          {...register("describe")}
          type="text"
          placeholder="describe your event"
          className="form-control"
          id="describe"
          aria-describedby="describe"
          // onChange={(e) => onValueChange(e)}
          // name="describe"
          // value={describe}
        />
      </div>
      <button
        type="submit"
        className="btn btn-success"
        onClick={() => onSubmit()}
      >
        Create Event
      </button>
    </form>
  );
};

function mapStateToProps({ event, error }) {
  return {
    error,
    // event
  };
}

export default AddEvents;
