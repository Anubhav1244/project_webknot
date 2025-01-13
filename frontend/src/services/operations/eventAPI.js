import { apiConnector } from '../apiconnector';
import  {toast} from 'react-hot-toast';
import {setLoading} from '../../slice/authSlice';
import {eventEndpoints} from '../apis';
const {CREATE_EVENT_API,DELETE_EVENT_API,ADD_ATTENDEE_API}=eventEndpoints;
export function createEvent(name, date, description) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        
        try {
            const response = await apiConnector("POST", CREATE_EVENT_API, {
                name,
                date,
                description,
                // checkUserPresent: true,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Event created successfully");
            
        } catch (error) {
            toast.error("Could Not Create event");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function deleteEvent(id) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", DELETE_EVENT_API, {
                id,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Event deleted successfully");
        } catch (error) {
            toast.error("Could Not Delete event");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function addAttendee(eventId, name, email, role) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", ADD_ATTENDEE_API, {
                eventId,
                name,
                email,
                role,
            });
            console.log("Response from add attendee: ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Attendee added successfully");
        } catch (error) {
            toast.error("Could Not Add Attendee");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}
