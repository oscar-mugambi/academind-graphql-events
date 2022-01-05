const Event = require('../../models/events');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event.date),
    creator: user.bind(this, event.creator),
  };
};

const user = (userId) => {
  return User.findById(userId)
    .then((user) => {
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents),
      };
    })
    .catch((err) => {
      throw err;
    });
};

const events = (eventIds) => {
  return Event.find({ _id: { $in: eventIds } }).then((events) => {
    return events.map((event) => {
      return transformEvent(event);
    });
  });
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (error) {
    throw error;
  }
};

module.exports.user = user;
module.exports.events = events;
module.exports.singleEvent = singleEvent;
