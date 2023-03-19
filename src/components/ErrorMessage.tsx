import { HiExclamation } from "react-icons/hi";
import * as React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="w-full bg-red-700 rounded-md">
      <section className="ml-1 py-2 px-4 rounded-md bg-red-200">
        <div className="flex flex-row items-center space-x-2 text-red-700 font-bold">
          <HiExclamation />
          <h6>Error</h6>
        </div>
        <p className="w-full mt-2 text-start text-sm text-red-700">{message}</p>
      </section>
    </div>
  );
}
