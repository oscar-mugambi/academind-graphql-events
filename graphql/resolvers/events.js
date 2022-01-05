const { dateToString } = require('../../helpers/date');
const { user } = require('./merge');
const Event = require('../../models/events');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event.date),
    creator: user.bind(this, event.creator),
  };
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();

      const newEvents = events.map((event) => transformEvent(event));

      return newEvents;
    } catch (error) {
      console.log(error);
    }
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      //mongoose converts the string to an object ID
      creator: '61bc6eaf09e01f0391f77b2f',
    });

    let createdEvent;

    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      User.findById('61bc6eaf09e01f0391f77b2f')
        .then((user) => {
          user.createdEvents.push(event);
          return user;
        })
        .then((user) => {
          return user.save();
        });
    } catch (error) {
      console.log(error);
      throw error;
    }

    return createdEvent;
  },

  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
};
