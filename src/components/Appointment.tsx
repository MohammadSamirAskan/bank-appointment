import saveAs from "file-saver";
import html2canvas from "html2canvas";
import { toCanvas } from "qrcode";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config";
import { AppointmentObj } from "../types";
import Button from "./Buttons";

export function Appointment() {
  const qrRef = React.useRef<HTMLCanvasElement>(null);
  const printAreaRef = React.useRef<HTMLDivElement>(null);

  const [storedBooking, setStoredBooking] =
    React.useState<AppointmentObj | null>(null);

  const { bookingNo: bookingNoOrNID } = useParams();
  const navigate = useNavigate();

  const bookingTime =
    storedBooking?.hour &&
    storedBooking?.date &&
    new Date(
      storedBooking?.date + storedBooking.hour * 3600 * 1000
    ).toLocaleTimeString();

  const bookingDate =
    storedBooking?.date && new Date(storedBooking?.date).toLocaleDateString();

  React.useEffect(() => {
    if (!bookingNoOrNID) return setStoredBooking(null);

    let allBookings = null;
    try {
      allBookings = JSON.parse(
        window.localStorage.getItem(config.bookingStorageKey) || ""
      );

      if (typeof allBookings !== "object") return setStoredBooking(null);
    } catch (e) {
      return setStoredBooking(null);
    }

    if (allBookings != null) {
      const currentBooking = allBookings[bookingNoOrNID];

      if (isValidBooking(currentBooking)) {
        setStoredBooking(currentBooking);
      } else {
        for (const booking in allBookings as {
          [key: number]: AppointmentObj;
        }) {
          const currentBooking = allBookings[booking];
          if (
            isValidBooking(currentBooking) &&
            currentBooking?.nationalId === bookingNoOrNID
          ) {
            return setStoredBooking(currentBooking);
          }
        }
        setStoredBooking(null);
      }
    }
  }, [bookingNoOrNID]);

  React.useEffect(() => {
    if (qrRef.current && storedBooking?.nationalId) {
      toCanvas(
        qrRef.current,
        `Appointment Number: ${storedBooking.appointmentNo}\nName: ${storedBooking?.firstName} ${storedBooking?.surname}\nNational ID: ${storedBooking?.nationalId}\nBank: ${storedBooking?.selectedBank.name}\nTranfer Type: ${storedBooking?.tranferType.name}\nDate: ${bookingDate} ${bookingTime}
      `,
        (err) => {
          if (err) console.log(err);
          else console.log("SUCCESS!");
        }
      );
    }
  }, [
    bookingDate,
    bookingTime,
    storedBooking?.appointmentNo,
    storedBooking?.firstName,
    storedBooking?.nationalId,
    storedBooking?.selectedBank.name,
    storedBooking?.surname,
    storedBooking?.tranferType.name,
  ]);

  if (storedBooking == null) {
    return <div>No Appointment Found!</div>;
  }

  return (
    <>
      <div className="w-full flex flex-col justify-center " ref={printAreaRef}>
        <h2 className="text-lg font-bold self-center  mt-7 mb-4">
          Your Appointment
        </h2>
        <div className="w-full flex flex-col text-sm items-center border-b-2 border-appGray">
          <div className="w-full grid grid-cols-2 grid-rows-1 items-center border-b-[1px] border-appGray py-2">
            <div className="font-semibold">Apointment Number:</div>
            <div>{storedBooking?.appointmentNo}</div>
          </div>

          <div className="w-full grid grid-cols-2 grid-rows-1 items-center border-b-[1px] border-appGray py-2">
            <div className="font-semibold">Name:</div>
            <div>
              {storedBooking?.firstName} {storedBooking?.surname}
            </div>
          </div>

          <div className="w-full grid grid-cols-2 grid-rows-1 items-center border-b-[1px] border-appGray py-2">
            <div className="font-semibold">National ID:</div>
            <div>{storedBooking?.nationalId}</div>
          </div>

          <div className="w-full grid grid-cols-2 grid-rows-1 items-center border-b-[1px] border-appGray py-2">
            <div className="font-semibold">Bank:</div>
            <div>{storedBooking?.selectedBank.name}</div>
          </div>

          <div className="w-full grid grid-cols-2 grid-rows-1 items-center border-b-[1px] border-appGray py-2">
            <div className="font-semibold">Transfer Type:</div>
            <div>{storedBooking?.tranferType.name}</div>
          </div>

          <div className="w-full grid grid-cols-2 grid-rows-1 items-center border-b-[1px] border-appGray py-2">
            <div className="font-semibold">Date:</div>
            <div className="space-x-3">
              <span>{bookingDate}</span>
              <span>{bookingTime}</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-[1fr,1fr] grid-rows-1 items-center border-b-[1px] border-appGray py-2">
            <div className="font-semibold">QR Code:</div>
            <canvas id="qr-code-container" ref={qrRef}>
              {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString()}
            </canvas>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between print:hidden mb-10 mt-5">
        <Button
          className="px-4 py-2 font-semibold w-fit"
          type="button"
          onClick={() => {
            navigate("/", {});
          }}
        >
          New Appointment
        </Button>
        <Button
          variant="secondary"
          className="px-4 py-2 font-semibold w-fit  text-sm"
          onClick={() => {
            if (printAreaRef.current) {
              html2canvas(printAreaRef.current).then((canvas) => {
                canvas.toBlob((blob) => {
                  if (blob) saveAs(blob, "appointment.png");
                });
              });
            }
          }}
        >
          Download
        </Button>
      </div>
    </>
  );
}

function isValidBooking(currentBooking?: AppointmentObj | null) {
  return Boolean(
    currentBooking &&
      currentBooking.firstName &&
      currentBooking.surname &&
      currentBooking.selectedBank?.id &&
      currentBooking.tranferType &&
      currentBooking.selectedBank?.name &&
      currentBooking.nationalId
  );
}
