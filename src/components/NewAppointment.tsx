import { useNavigate } from "react-router-dom";
import AppointmentForm from "./AppoitmentForm";
import React from "react";

export default function NewAppointment() {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative">
        <hr className="my-7" />
        <p className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] px-3 bg-white">
          or
        </p>
      </div>

      <AppointmentForm
        onSubmit={(bookingNo: number) => {
          navigate("/search/" + bookingNo);
        }}
      />
    </>
  );
}
