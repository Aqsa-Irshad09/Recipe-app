import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const CustomCalendar = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (selectedDate) => {
    setSelectedDate(selectedDate);
    onSelect(selectedDate, getDay(selectedDate));
  };

  const getDay = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = date.getDay();
    return days[dayIndex];
  };

  return <Calendar onClickDay={handleDateClick} value={selectedDate} />;
};

export default CustomCalendar;
