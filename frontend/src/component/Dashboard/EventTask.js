import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { apiConnector } from '../../services/apiconnector';
import { eventEndpoints } from '../../services/apis';

const EventTask = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [newTaskName, setNewTaskName] = useState(""); // State for new task input

  const { GET_EVENTS_API, GET_EVENTS_API_ID, ADD_NEW_TASK_API, UPDATE_TASK_STATUS_API } = eventEndpoints;

  useEffect(() => {
    // Fetch all events on component mount
    const getEvents = async () => {
      try {
        const { data } = await apiConnector('GET', GET_EVENTS_API);
        const response = data?.data;
        setEvents(response);
        setSelectedEventId(response[0]?._id); // Select the first event by default
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    getEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      // Fetch tasks for the selected event
      const getTasks = async () => {
        try {
          const data = await apiConnector('POST', GET_EVENTS_API_ID, { selectedEventId });
          console.log(data.data.data.tasks);
          setTasks(data?.data?.data?.tasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      getTasks();
    }
  }, [selectedEventId]);

  const handleAddTask = async () => {
    setShowModal(true); // Open the modal
  };
  const handleTaskStatusToggle=(taskId, status)=>{
    const newStatus = status === 'completed' ? 'pending' : 'completed';
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    const updateTaskStatus = async () => {
      try {
        await apiConnector('POST', UPDATE_TASK_STATUS_API, {
          eventId: selectedEventId,
          taskId,
          status: newStatus,
        });
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    };
    updateTaskStatus();
  }
  const handleSaveTask = async () => {
    try {
      const newTask = { name: newTaskName };
      const { data } = await apiConnector('POST', ADD_NEW_TASK_API, { eventId: selectedEventId, ...newTask });
      const tasksdata=data?.data;
      setNewTaskName(""); // Clear input field
      setShowModal(false); // Close modal
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-blue-200 mb-6">Task Management</h1>

      {/* Event Selector */}
      <div className="mb-6">
        <label htmlFor="event" className="block text-gray-700 font-medium mb-2 text-white">
          Select Event
        </label>
        <select
          id="event"
          className="block w-full px-4 py-2 border bg-richblack-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name} - {event.date}
            </option>
          ))}
        </select>
      </div>

      {/* Tasks List */}
      <div className="shadow-md rounded-lg p-6 border-2 border-richblack-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Tasks List</h2>
          <button
            onClick={handleAddTask}
            className="flex items-center px-4 py-2 text-blue-300 text-sm font-medium rounded-md hover:bg-blue-600"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </div>

        <ul className="space-y-4">
          {tasks && tasks.map((task) => (
            <li
              key={task._id}
              className="flex  justify-between items-center p-4 border rounded-md shadow-sm"
            >
              <div className="flex text-white items-center space-x-4">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-500"
                  checked={task.status === 'completed'}
                  onChange={() => handleTaskStatusToggle(task._id, task.status)}
                />
                <span
                  className={`text-lg text-white ${
                    task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {task.name}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  task.status === 'completed'
                    ? ' bg-caribbeangreen-200 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#2E2E2E] p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-white">Add New Task</h2>
            <input
              type="text"
              className="block w-full px-4 py-2 border rounded-md mb-4"
              placeholder="Task Name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleSaveTask}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTask;
