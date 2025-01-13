import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [], // Stores all events
  loading: false, // For loading state management
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload); // Add a new event
    },
    deleteEvent: (state, action) => {
      state.events.splice(action.payload, 1); // Remove an event by index
    },
    setEvents: (state, action) => {
      state.events = action.payload; // Replace all events with the fetched ones
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set loading state
    },
    setTasks: (state, action) => {
      state.tasks = action.payload; // Replace all tasks with the fetched ones
    },
  },
});

export const { addEvent, deleteEvent, setEvents, setLoading ,setTasks} = eventSlice.actions;
export default eventSlice.reducer;
