import { createBrowserRouter } from "react-router-dom";
import App, { Appointment, NewAppointment } from "../App";

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
