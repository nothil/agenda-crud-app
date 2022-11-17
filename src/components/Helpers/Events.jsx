import React from "react";
import moment from "moment";
import { event } from "../Helpers/Services";
import { addError, removeError } from "../Helpers/ErrorMessage";

// Get bookings/ appointments
export const showEvents = (events) => {
  return {
    type: "SHOW_EVENTS",
    payload: events,
  };
};

// get all
export const ShowEventsApi = () => async (dispatch) => {
  //i won't get the event from redux store as it is safer to
  //keep updated with db.
  const result = await event.get("/");

  try {
    const convertedDates = await result.data.map((event) => {
      return {
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        id: event._id,
        describe: event.describe,
      };
    });
    await dispatch(showEvents(convertedDates));
  } catch (err) {
    const error = await err.data.message;
    return error;
  }
};

// single item event by id
export default function showEvent(event) {
  console.log("event to be shown on the modal: ", event);
  return {
    type: "SHOW_EVENT",
    payload: event,
  };
}

export const ShowEventApi = (id) => async (dispatch) => {
  return async (dispatch) => {
    const result = await event.get(`/${id}/show`);
    try {
      const { title, _id, start, end, describe } = await result.data;
      const convertedEvent = {
        title,
        describe,
        id: _id,
        start: moment(start).format("ddd DD MMM YY LT"),
        end: moment(end).format("ddd DD MMM YY LT"),
      };
      await dispatch(showEvent(convertedEvent));
    } catch (err) {
      const error = await err.data.message;
      return error;
    }
  };
};

// Delete event

const deleteEvent = (id) => {
  return {
    type: "DELETE_EVENT",
    payload: id,
  };
};

const Delete = (id) => async (dispatch) => {
  const response = await event.delete(`${id}/delete`);
  try {
    const deleted = await response.data;
    await dispatch(deleteEvent(id));
    return { deleted };
  } catch (err) {
    const message = await response.message;
    console.log(err);
    return { message };
  }
};

const addEvent = (newEvent) => {
  return {
    type: "ADD_EVENT",
    payload: newEvent,
  };
};

// create appointment endpoint

const addEventApi = (values) => async (dispatch) => {
  const result = await event
    .post("/", {
      title: values.title,
      start: values.start,
      end: values.end,
      describe: values.describe,
    })

    .then(() => {
      if (result && result.data) {
        console.log("event from the api going to the reducer: ", result.data);
        dispatch(addEvent(result.data));
        dispatch(removeError());

        return "success";
      }
    })
    .catch((res) => {
      console.log("catch response, ", res);
      if (res.response.data) {
        console.log(res.response.data);
        dispatch(addError(res.response.data));
      }
    });
};

// update/edit

const updateEvent = (updatedEvent) => {
  return {
    type: "UPDATE_EVENT",
    payload: updatedEvent,
  };
};

const updateEventApi = (values, id) => async (dispatch) => {
  try {
    const result = await event.put(`/${id}/update`, {
      title: values.title,
      start: values.start,
      end: values.end,
      describe: values.describe,
    });
    if (result && result.data) {
      console.log("event from the api going to the reducer: ", result.data);
      dispatch(updateEvent(result.data));
      dispatch(removeError());
      return "success";
    }
  } catch (err) {
    console.log("catch response, ", err);
    if (err.response.data) {
      console.log(err.response.data);
      dispatch(addError(err.response.data));
    }
  }
};
//     console.log(result);
//     const response = result.data;
//     dispatch(removeError());
//     return "response was successful";
//   } catch (err) {
//     console.log(err);
//     dispatch(addError(err.response.data));
//   }

//    .then(res=>{
//        console.log(res)
//     if(res && res.data){

//         console.log(res.data)
//
//         return;
//     }else{
//         if(res.response.data){
//             console.log(res.response.data)
//         }
//     }
//    })
// };

export const closeEvent = () => {
  console.log("you closed the event and removed event state");
  return {
    type: "CLOSE_EVENT",
  };
};

export const closeModal = () => {
  console.log("modal is closed");
  return {
    type: "CLOSE_MODAL",
    payload: false,
  };
};

export const openModal = () => {
  console.log("modal is open");
  return {
    type: "OPEN_MODAL",
    payload: true,
  };
};

export const GetData = () => {
  // Get appointment from the local db
  React.useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // setData(data);
      });
    // ShowEventsApi();
    // console.log("");
  }, []);
};

export { Delete, addEventApi, updateEventApi };
