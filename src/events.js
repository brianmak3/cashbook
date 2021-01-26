import { EventRegister } from 'react-native-event-listeners';
const EventsEmit = (title, data) => {
    EventRegister.emit(title, data)
},
    Events = EventRegister;
export {
    EventsEmit,
    Events
}