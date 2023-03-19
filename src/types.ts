export type AppointmentObj = {
  appointmentNo: number;
  firstName: string;
  surname: string;
  selectedBank: {
    id: number;
    name: string;
  };
  tranferType: {
    id: number;
    name: string;
  };
  nationalId: string;
  date: number;
  hour: number;
};