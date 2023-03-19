import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Appointment } from "./Appointment";
import NewAppointment from "./NewAppointment";
import * as React from "react";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <NewAppointment />,
      },
      {
        path: "/search/:bookingNo",
        element: <Appointment />,
      },
    ],
  },
]);
