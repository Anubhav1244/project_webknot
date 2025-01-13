import React, { use, useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import {setLoading,setEvents } from "../../slice/eventSlice";
import { useTable } from "react-table";
import Calendar from "react-calendar";
import { CalendarIcon } from "@heroicons/react/outline";
import { format } from "date-fns";
import { createEvent } from "../../services/operations/eventAPI";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../services/apiconnector";
import { eventEndpoints } from "../../services/apis";
import { deleteEvent } from "../../services/operations/eventAPI";
const { GET_EVENTS_API } = eventEndpoints;

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // Access events and loading state from Redux
  const events = useSelector((state) => state.event.events);
  const loading = useSelector((state) => state.event.loading);

  // Local state to manage popup visibility and new event data
  const [showPopup, setShowPopup] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    description: "",
  });

  // Handle input changes for the event form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    if (newEvent.name && newEvent.date) {
      dispatch(setLoading(true));
      const formattedEvent = {
        ...newEvent,
        date: format(newEvent.date, "MMMM do, yyyy"),
      };
      dispatch(createEvent(formattedEvent.name, formattedEvent.date, formattedEvent.description));
      
      setShowPopup(false); // Close popup
      setNewEvent({ name: "", date: "", description: "" }); // Reset form
      dispatch(setLoading(false));
    }
  };

  const fetchEvents = async () => {
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("GET", GET_EVENTS_API);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log("Events fetched: ", response.data);
        dispatch(setEvents(response.data.data));
    } catch (error) {
        toast.error("Could Not Fetch Events");
    }
    dispatch(setLoading(false));
    };


  useEffect(() => {
    fetchEvents();
    }, []);
    console.log("Events: ", events);
  // Handle deleting an event
  const handleDeleteEvent = (index) => {
    console.log("Dleteing event at index: ", events[index]);
    dispatch(deleteEvent(events[index]._id));
    dispatch(setLoading(true));
  };

  // React Table setup
  const columns = React.useMemo(
    () => [
      {
        Header: "Event Name",
        accessor: "name",
      },
      {
        Header: "Event Date",
        accessor: "date",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <button
            onClick={() => handleDeleteEvent(row.index)}
            className="bg-pink-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        ),
      },
    ],
    [events]
  );

  const data = React.useMemo(() => events, [events]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="admin-dashboard">
      {/* Button to open the "Add Event" popup */}
      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Event
      </button>

      {/* React Table */}
      <table
        {...getTableProps()}
        className="table-auto w-full border-collapse text-white bg-[#2E2E2E] border border-gray-500"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-2 p-2 text-center bg-[#3A3A3A] text-white"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-700">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="border-2 p-2 text-center"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Popup for adding a new event */}
      {showPopup && (
        <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="popup-content w-[90vw] max-w-[800px] bg-[#2E2E2E] p-6 rounded-lg border border-gray-500 shadow-lg">
            <h2 className="text-2xl text-white font-semibold mb-6 text-center">
              Add New Event
            </h2>

            <div className="flex flex-col sm:flex-row sm:space-x-6">
              {/* Left Section - Calendar */}
              <div className="sm:w-2/3 flex flex-col items-center">
                <label className="block mb-2 text-white text-lg font-medium">
                  Event Date
                </label>
                <Calendar
                  onChange={(date) => setNewEvent({ ...newEvent, date })}
                  value={newEvent.date}
                  className="react-calendar rounded-lg bg-white/5 border border-gray-500 shadow-md p-4"
                  tileClassName={({ date }) =>
                    newEvent.date &&
                    format(date, "yyyy-MM-dd") ===
                      format(newEvent.date, "yyyy-MM-dd")
                      ? "bg-white text-black rounded-md"
                      : "text-white hover:bg-white/20"
                  }
                />
              </div>

              {/* Right Section - Selected Date Display */}
              <div className="sm:w-1/3 mt-6 sm:mt-0 flex flex-col items-center">
                <div className="w-full h-[190px] mt-10 rounded-md bg-white/5 border border-gray-500 p-4 flex flex-col items-center justify-center">
                  {newEvent.date ? (
                    <>
                      <CalendarIcon className="w-12 h-12 mb-2 text-white/40" />
                      <p className="text-white font-semibold text-lg">
                        {format(newEvent.date, "MMMM do, yyyy")}
                      </p>
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-12 h-12 mb-2 text-white/40" />
                      <p className="text-white/60 text-sm">No date selected</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Input Fields Section */}
            <div className="mt-6">
              <div className="mb-4">
                <label className="block mb-2 text-white text-lg font-medium">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newEvent.name}
                  onChange={handleInputChange}
                  placeholder="Enter event name"
                  className="w-full p-3 border border-gray-700 rounded-md bg-[#1F1F1F] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white text-lg font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                  className="w-full p-3 border border-gray-700 rounded-md bg-[#1F1F1F] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleAddEvent}
                className="bg-[#3A3A3A] text-white px-6 py-2 rounded-md hover:bg-gray-700 mr-4"
              >
                Add Event
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-[#3A3A3A] text-white px-6 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

