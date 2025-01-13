
const express=require('express');
const router=express.Router();
const {createEvent,
    getEvents,
    deleteEventbyId,
    addAttendee,
    deleteAttendee,
    getEventById,
updateTaskStatus,
addNewTask}=require('../controller/Event');

router.post('/createEvent',createEvent);
router.get('/getEvents',getEvents);
router.delete('/deleteEvent',deleteEventbyId);
router.post('/addAttendee',addAttendee);
router.post('/deleteEvent',deleteAttendee);
router.post('/getEvent',getEventById);
router.post('/updateTaskStatus',updateTaskStatus);
router.post('/addTask',addNewTask);

module.exports=router;

