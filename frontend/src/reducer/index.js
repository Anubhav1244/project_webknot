import {combineReducers} from "@reduxjs/toolkit"

import authReducer from '../slice/authSlice'
import profileReducer from '../slice/profile'
import eventReducer from '../slice/eventSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    event: eventReducer
})

export default rootReducer;