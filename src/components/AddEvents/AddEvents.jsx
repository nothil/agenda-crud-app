import React from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import post from "../Helpers/Services";
// import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
// import * as yup from "yup";
import { addEventApi } from "../Helpers/Events";
import "./AddEvents.scss";

import "react-datepicker/dist/react-datepicker.css";

//schema to validate event inputs
// const schema = yup
//   .object({
//     title: yup.string().required("Can't Be Empty"),
//     start: yup.date().required("Please specify the time to start"),
//   })
//   .required();

//Create appointment Endpoint
// const addUser = async (user) => {
//   return await axios.post("http://localhost:5000/data", user);
// };

// const initialValue = {
//   title: "",
//   start: "",
//   end: "",
//   description: "",
// };

const AddEvents = (input) => {
  // const location = useLocation();
  // const [rerender, setRerender] = useState(false);
  // const [dbError, setError] = useState(false);

  const [info, setInfo] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  // const { title, start, end, describe } = info;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  // resolver: yupResolver(schema),

  const title = useFieldArray({
    control,
    name: "title",
  });

  const start = useFieldArray({
    control,
    name: "start",
  });

  const end = useFieldArray({
    control,
    name: "end",
  });

  const describe = useFieldArray({
    control,
    name: "describe",
  });

  // const onValueChange = (e) => {
  //   //  console.log(e);
  //   // console.log(e.target.value);
  //   setInfo({ ...info, [e.target.name]: e.target.value });
  //   console.log(info);
  // };

  // Create appointment Endpoint
  // const onSubmit = (input) => {
  //   setIsLoading(true);

  //   post(input).then((res) => {
  //     const { data } = res;
  //     console.log(data);
  //     if (data.success) {
  //       reset();
  //       //Notify the user
  //       console.log("Appointment created successfully");
  //     } else {
  //       console.log("Appointment creation failed");
  //     }
  //     setIsLoading(false);
  //   });
  // };

  // e.preventDefault();

  // let payload = {
  //   title: title.value,
  //   start: start.value,
  //   end: end.value,
  //   description: describe.value,
  // };

  // await addUser(payload);
  // useEffect(() => {
  //   console.log(addEventApi);
  // }, [addEventApi]);

  return (
    <form className=" align-content-center m-5">
      <div className="align-content-center m-5">
        <p>Add event details below</p>
      </div>
      <div className="mb-4" style={{ zIndex: "100" }}>
        <label htmlFor="title" className="form-label">
          Event Title
        </label>
        <input
          type="text"
          placeholder="title"
          className="form-control"
          name="title"
          aria-describedby="title"
          ref={register()}
          errors={errors}
        />
        {/* <p
          className={`error text-warning position-absolute ${
            errors.title ? "active" : ""
          }`}
        >
          {errors.title ? <i className="bi bi-info-circle me-2"></i> : ""}
          {errors.title?.message}
        </p> */}
      </div>

      <div className="mb-4" style={{ zIndex: "100" }}>
        <label htmlFor="start" className="form-label">
          Start Date
        </label>

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
              name="start"
            />
          )}
        />
        {/* error handling */}
        {/* <p
          className={`error text-warning position-absolute ${
            errors.start ? "active" : ""
          }`}
        >
          {errors.start ? <i className=" bi bi-info-circle me-2"></i> : ""}
          {errors.start?.message}
        </p> */}
        {/* <p
          className={`error text-warning position-absolute ${
            dbError.start ? "" : "d-none"
          }`}
        >
          {dbError.start ? <i className=" bi bi-info-circle me-2"></i> : ""}
          {dbError.start}
        </p> */}
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
              name="end"
            />
          )}
        />
        {/* <p
          className={`error text-warning position-absolute ${
            dbError.end ? "" : "d-none"
          }`}
        >
          {dbError.end ? <i className=" bi bi-info-circle me-2"></i> : ""}
          {dbError.end}
        </p> */}
      </div>

      <div className="mb-4">
        <label htmlFor="describe" className="form-label">
          Event Description{" "}
          <span className="text-danger small">(optional)</span>
        </label>
        <input
          ref={register}
          type="text"
          placeholder="describe your event"
          className="form-control"
          name="describe"
          aria-describedby="describe"
        />
      </div>
      <button type="submit" className="btn btn-success" loading={isLoading}>
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
