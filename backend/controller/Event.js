const Event = require("../model/Event");
exports.createEvent = async (req, res) => {
    try {
        const { name, description, date} = req.body;

        //Validate data
        if (!name || !description || !date ) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        //Create Event
        const response = await Event.create({
            name,
            description,
            date,
        });

       
        console.log("Event created: ", response);
        return res.status(200).json({
            success: true,
            message: "Event created successfully",
        });
    } catch (err) {
        console.log("Error in creating event: ", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        return res.status(200).json({
            success: true,
            data: events,
        });
    } catch (err) {
        console.log("Error in getting events: ", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.deleteEventbyId = async (req, res) => {
    try {
        const { id } = req.body;

        //Validate data
        if (!id) {
            return res.status(403).json({
                success: false,
                message: "Please provide an id",
            });
        }

        //Delete Event
        const response = await Event.findByIdAndDelete(id);
        console.log("Event deleted: ", response);
        return res.status(200).json({
            success: true,
            message: "Event deleted successfully",
        });
    } catch (err) {
        console.log("Error in deleting event: ", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.addAttendee = async (req, res) => {
    try {
        const { eventId, name, email, role } = req.body;
        console.log("Request body: ", req.body);
        //Validate data
        if (!eventId || !name || !email || !role) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        //Create attendee
        const event = await Event.findById(eventId);
        event.people.push({ name, email, role });
        await event.save();
        console.log("Attendee added: ", event);
        return res.status(200).json({
            success: true,
            message: "Attendee added successfully",
        });
    } catch (err) {
        console.log("Error in adding attendee: ", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
exports.getEventById = async (req, res) => {
    try{
        const {selectedEventId} = req.body;
        console.log("Request body: ", req.body);
        //Validate data
        if(!selectedEventId){
            return res.status(403).json({
                success: false,
                message: "Please provide an id",
            });
        }
        //Get Event
        const event = await Event.findById(selectedEventId);
        console.log("Event fetched: ", event);
        return res.status(200).json({
            success: true,
            data: event,
        });
        

    }
    catch (err) {
        console.log("Error in getting event: ", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.deleteAttendee = async (req, res) => {
    try {
        const { selectedEventId, attendeeId } = req.body;

        console.log("Request body: ", req.body);
        //Validate data
        if (!selectedEventId || !attendeeId) {
            return res.status(403).json({
                success: false,
                message: "Please provide an id",
            });
        }

        //Delete Attendee
        const event = await Event.findById(selectedEventId);
        event.people = event.people.filter(
            (attendee) => attendee._id.toString() !== attendeeId
        );
        await event.save();
        console.log("Attendee deleted: ", event);
        return res.status(200).json({
            success: true,
            message: "Attendee deleted successfully",
        });
    } catch (err) {
        console.log("Error in deleting attendee: ", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.addNewTask= async (req, res) => {
    try {
        const { eventId, name } = req.body;
        console.log("Request body: ", req.body);
        //Validate data
        if (!eventId || !name) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        //Create task
        const event = await Event.findById(eventId);
        event.tasks.push({ name });
        const response=await event.save();

        console.log("Task added: ", response);
        return res.status(200).json({
            success: true,
            message: "Task added successfully",
            data:response.tasks
        });
    } catch (err) {
        console.log("Error in adding task: ", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.updateTaskStatus = async (req, res) => {
    try {
        const { eventId, taskId, status } = req.body;
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

        const task = event.tasks.id(taskId);
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

        task.status = status;
        await event.save();

        res.status(200).json({ success: true, message: 'Task status updated successfully', data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
