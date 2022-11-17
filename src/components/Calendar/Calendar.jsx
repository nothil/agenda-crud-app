import React, { useEffect } from "react";
import format from "date-fns/format";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import Data from "../Helpers/DammyEvents";
import GetData from "../Helpers/Events";

import { ShowEventsApi, ShowEventApi, closeEvent } from "../Helpers/Events";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "./Calendar.scss";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// function EventAgenda({ event }) {
//   return (
//     <span>
//       <em style={{ color: "magenta" }}>{event.title}</em>
//       <p>{event.desc}</p>
//     </span>
//   );
// }

// const CustomToolbar = (toolbar) => {
//   const goAgenda = () => {
//     toolbar.onNavigate("agenda");
//   };
// };

const Calendars = ({ events, showEventsApi }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = React.useState({});

  // customazition of the calendar

  const handleOpen = (event) => {
    setOpenModal(true);
    if (event.id) {
      ShowEventApi(event.id);
    }
  };

  useEffect(() => {
    GetData(setData);
    console.log("i renderd because of refresh or start");
  }, []);

  const handleClose = () => {
    setOpenModal(false);
    closeEvent();
  };

  return (
    <div className="calendar">
      {/* <Modals
        open={openModal}
        handleOpen={handleOpen}
        handleClose={handleClose}
      ></Modals> */}
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={Data}
        onSelectEvent={handleOpen}
      />
    </div>
  );
};

export default Calendars;
