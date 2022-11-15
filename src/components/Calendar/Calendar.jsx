import React from "react";
// import "antd/dist/antd.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import Modal from "../Modal/Modal";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// import moment from "moment";
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

const Calendars = ({ events, showEventsApi }) => {
  const [openModal, setOpenModal] = React.useState(false);

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <div className="calendar">
      <Modal
        open={openModal}
        onClose={handleCancel}
        // showEventsApi={showEventsApi}
      ></Modal>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        // style={{ height: 300, margin: 200, fontFamily: "Patrick Hand" }}
      />
    </div>
  );
};

export default Calendars;
