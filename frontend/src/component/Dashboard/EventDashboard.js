import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { setEvents, setLoading } from '../../slice/eventSlice';
import { eventEndpoints } from '../../services/apis';
import { addAttendee } from '../../services/operations/eventAPI';
import { apiConnector } from '../../services/apiconnector';

const { GET_EVENTS_API,DELETE_EVENT_API } = eventEndpoints;

const EventDashboard = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);

  const [selectedEventId, setSelectedEventId] = useState('');
  const [selectedperson, setSelectedPerson] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '', role: '' });

  // Fetch all events
  const fetchAllEvents = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('GET', GET_EVENTS_API);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setEvents(response.data.data));
    } catch (error) {
      toast.error('Could Not Fetch Events');
    }
    dispatch(setLoading(false));
  };

  // Effect to fetch events on initial render
  useEffect(() => {
    fetchAllEvents();
  }, []);

  // Effect to set initial state once events are loaded
  useEffect(() => {
    if (events.length > 0) {
      const firstEvent = events[0];
      setSelectedEventId(firstEvent._id);
      setSelectedPerson(firstEvent.people || []);
    }
  }, [events]);

  // Add new attendee
  const handleAddAttendee = () => {
    dispatch(addAttendee(selectedEventId, newAttendee.name, newAttendee.email, newAttendee.role));
    setNewAttendee({ name: '', email: '', role: '' });
    setIsModalOpen(false);
  };

  // Remove an attendee
 // Remove an attendee
const handleRemoveAttendee = async (index) => {
  dispatch(setLoading(true));
  
    // Get the attendee's ID based on the index
    const attendeeToRemove = selectedperson[index];
    console.log(attendeeToRemove);
    console.log("Currentid",selectedEventId);
    
    try{
      const response = await apiConnector('POST', 'http://localhost:4000/api/v1/event/deleteEvent',{ 
        selectedEventId: selectedEventId,
        attendeeId: attendeeToRemove._id,
    });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const updatedAttendees = selectedperson.filter((_, i) => i !== index);
      setSelectedPerson(updatedAttendees);
      const updatedEvents = events.map((event) =>
        event._id === selectedEventId
          ? { ...event, people: updatedAttendees }
          : event
      );
      dispatch(setEvents(updatedEvents));
      toast.success('Attendee removed successfully!');
    }
    catch (error) {
      toast.error('Could Not Remove Attendee');
    }
};


  // Handle event selection
  const handleEventSelection = (e) => {
    const eventId = e.target.value;
    const selectedEvent = events.find((event) => event._id === eventId);
    setSelectedEventId(eventId);
    setSelectedPerson(selectedEvent?.people || []);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-blue-200 mb-6">Attendee Management</h1>

      {/* Event Selector */}
      <div className="mb-6">
        <label htmlFor="event" className="block text-white font-medium mb-2">
          Select Event
        </label>
        <select
          id="event"
          className="block w-full px-4 py-2 border bg-richblack-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={selectedEventId}
          onChange={handleEventSelection}
        >
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name} - {event.date}
            </option>
          ))}
        </select>
      </div>

      {/* Attendee List */}
      <div className="bg-richblack-900 shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Attendee List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-blue-300 text-sm font-medium rounded-md hover:bg-indigo-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Attendee
          </button>
        </div>

        <table className="w-full table-auto border-collapse border border-white">
          <thead>
            <tr className="bg-richblack-800 text-white">
              <th className="px-4 py-2 text-left text-gray-700 font-medium border border-gray-300">
                Name
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-medium border border-gray-300">
                Email
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-medium border border-gray-300">
                Role
              </th>
              <th className="px-4 py-2 text-center text-gray-700 font-medium border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedperson.map((attendee,index) => (
              <tr key={index} className="hover:bg-gray-50 bg-richblack-800 text-white">
                <td className="px-4 py-2 border border-gray-300 text-gray-800">{attendee.name}</td>
                <td className="px-4 py-2 border border-gray-300 text-gray-800">{attendee.email}</td>
                <td className="px-4 py-2 border border-gray-300 text-gray-800">
                  <span className="px-2 py-1 text-sm rounded-md bg-blue-100 text-green-700">
                    {attendee.role}
                  </span>
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <button
                    onClick={() => handleRemoveAttendee(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5 inline text-pink-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-lg bg-[#2E2E2E] backdrop-blur-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Add New Attendee</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6 text-gray-500 text-white hover:text-gray-800" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAttendee();
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="block w-full px-4 py-2 border rounded-md bg-white/40 focus:outline-none"
                  value={newAttendee.name}
                  onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="block w-full px-4 py-2 border rounded-md bg-white/40 focus:outline-none"
                  value={newAttendee.email}
                  onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  className="block w-full px-4 py-2 border rounded-md bg-white/40 focus:outline-none"
                  value={newAttendee.role}
                  onChange={(e) => setNewAttendee({ ...newAttendee, role: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white bg-richblack-600 rounded-md hover:bg-indigo-700"
                >
                  Add Attendee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDashboard;
