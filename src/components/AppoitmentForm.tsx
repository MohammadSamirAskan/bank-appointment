import React from "react";
import { AppointmentObj } from "../types";
import config from "../config";
import BankComboBox from "./BankComboBox";
import Button from "./Buttons";
import ErrorMessage from "./ErrorMessage";
import Input from "./Input";

function AppointmentForm({ onSubmit }: { onSubmit: (appNo: number) => void }) {
  const [firstName, setFirstname] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [nationalId, setNationalId] = React.useState("");
  const [selectedBank, setSelectedBank] = React.useState({ id: 0, name: "" });
  const [error, setError] = React.useState("");
  const [lastAppNo, setLastAppNo] = React.useState(() => {
    let newAppNo = 100;
    const appNoStr = window.localStorage.getItem("lastAppNo");
    if (appNoStr != undefined && !isNaN(+appNoStr)) {
      newAppNo = +appNoStr;
    }
    return newAppNo;
  });

  // Store Last Appointment Number
  React.useEffect(() => {
    window.localStorage.setItem("lastAppNo", `${lastAppNo}`);
  }, [lastAppNo]);

  return (
    <form
      className="flex flex-col space-y-5"
      onChange={() => {
        if (error) setError("");
      }}
      onSubmit={(e) => {
        e.preventDefault();

        const appointmentNum = lastAppNo + 1;

        const todayHours = new Date().getHours();
        const todayMins = new Date().getMinutes();

        let daysToAppointment = Math.floor(Math.random() * 10);

        const includeToday =
          todayHours < 14 || (todayHours === 14 && todayMins <= 15);
        // Do not include today
        if (includeToday) {
          daysToAppointment += 1;
        }

        // appointment date
        const now = Date.now();
        const offsetMillseconds =
          (new Date(now).getHours() * 3600 +
            new Date(now).getMinutes() * 60 +
            new Date(now).getSeconds()) *
            1000 +
          new Date(now).getMilliseconds();

        const appointmentDate =
          now - offsetMillseconds + 86400 * 1000 * daysToAppointment;

        let appointmentHours = 8;
        // Time for today as appointment day
        if (daysToAppointment === 0) {
          appointmentHours =
            new Date(now).getHours() +
            (Math.floor(Math.random() * 10) % (16 - new Date().getHours()));
        } else {
          appointmentHours += Math.floor(Math.random() * 10) % 8;
        }

        console.table([
          {
            appointmentDate,
            appointmentHours,
            daysToAppointment,
            bank: selectedBank.name,
          },
        ]);
        // search if appointment exists
        let storedBookings: { [key: number]: AppointmentObj } | null = null;
        try {
          console.log(window.localStorage.getItem(config.bookingStorageKey));
          storedBookings = JSON.parse(
            window.localStorage.getItem(config.bookingStorageKey) || ""
          );

          if (typeof storedBookings !== "object") storedBookings = null;
          console.log("storedBookings", storedBookings);
        } catch (e) {
          /* empty */
        }

        if (storedBookings == null) {
          storedBookings = {
            [appointmentNum]: {
              appointmentNo: appointmentNum,
              firstName,
              surname,
              selectedBank,
              nationalId,
              date: appointmentDate,
              hour: appointmentHours,
            },
          };
        } else {
          for (const appointmentNo in storedBookings) {
            const currentBooking = storedBookings[appointmentNo];

            const isValidBooking = Boolean(
              currentBooking &&
                currentBooking.firstName &&
                currentBooking.surname &&
                currentBooking.selectedBank?.id &&
                currentBooking.selectedBank?.name &&
                currentBooking.nationalId
            );

            console.log("currentBooking", isValidBooking, currentBooking);
            if (
              isValidBooking &&
              currentBooking.selectedBank.id === selectedBank.id &&
              currentBooking.nationalId === nationalId
            ) {
              setError(
                "An appointment already exists with given national ID and Bank."
              );
              return;
            }
          }

          storedBookings = {
            ...storedBookings,
            [appointmentNum]: {
              appointmentNo: appointmentNum,
              firstName,
              surname,
              selectedBank,
              nationalId,
              date: appointmentDate,
              hour: appointmentHours,
            },
          };
        }
        window.localStorage.setItem(
          config.bookingStorageKey,
          JSON.stringify(storedBookings)
        );

        // increament appointment number
        setLastAppNo((appNo) => appNo + 1);

        onSubmit(appointmentNum);

        // create new if does not exist
      }}
    >
      <div>
        <label htmlFor="first-name">First Name</label>
        <Input
          value={firstName}
          name="first-name"
          onChange={(e) => setFirstname(e.target.value)}
          className="text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="surname">Surname</label>
        <Input
          value={surname}
          name="surname"
          onChange={(e) => setSurname(e.target.value)}
          className="text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="national-id">National ID</label>
        <Input
          value={nationalId}
          name="national-id"
          onChange={(e) => setNationalId(e.target.value)}
          className="text-sm"
          required
        />
      </div>

      <div>
        <BankComboBox selected={selectedBank} setSelected={setSelectedBank} />
      </div>

      {error && <ErrorMessage message={error} />}

      <Button
        className="mt-10 px-4 py-2 font-semibold w-fit self-center"
        type="submit"
      >
        Find a Date
      </Button>
    </form>
  );
}

export default AppointmentForm;
