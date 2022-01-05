const User = require('../../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  createUser: async (args) => {
    const userExists = await User.findOne({
      email: args.userInput.email,
    });
    if (userExists) {
      throw new Error('this user exists');
    }
    const hashedPass = await bcrypt.hash(args.userInput.password, 12);
    const user = await new User({
      email: args.userInput.email,
      password: hashedPass,
    });
    try {
      const savedUser = await user.save();
      console.log(savedUser);
      return { ...savedUser._doc, password: null, _id: savedUser.id };
    } catch (error) {
      throw error;
    }
  },
};
