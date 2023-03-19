import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import React from "react";

const banks = [
  { id: 1, name: "Ghazanfar Bank" },
  { id: 2, name: "Afghan International Bank" },
  { id: 3, name: "Afghan United Bank" },
  { id: 4, name: "Azizi Bank" },
  { id: 5, name: "Maiwand Bank" },
  { id: 6, name: "Kabul Bank" },
];

export default function BankComboBox({
  selected,
  setSelected,
}: {
  selected: {
    id: number;
    name: string;
  };
  setSelected: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
    }>
  >;
}) {
  const [query, setQuery] = useState("");

  const filteredBank =
    query === ""
      ? banks
      : banks.filter((bank) =>
          bank.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <>
      <Combobox value={selected} onChange={setSelected}>
        <Combobox.Label className={"justify-self-end"}>Bank</Combobox.Label>
        <div className="relative mt-1 w-[20rem] rounded-lg">
          {/* <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-thirdGray sm:text-sm"> */}
          <div className=" w-full border-[1px] rounded-md border-appGray/50 hover:ring-[3px] hover:ring-appGray/50 focus-within:border-appText">
            <Combobox.Input
              as="input"
              className={`w-full rounded-lg border-none py-1 align-middle ${
                document.dir === "ltr" ? "pl-3 pr-10" : "pr-3 pl-10"
              } text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none`}
              displayValue={(item: typeof banks[0]) => item.name}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Select A Bank"
              required
            />
            <Combobox.Button
              className={`absolute inset-y-0 ${
                document.dir === "ltr" ? "right-0 pr-2" : "left-0 pl-2"
              } flex items-center `}
            >
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredBank.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredBank.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-700 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-blue-700"
                            }`}
                          >
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  );
}
