const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: 'User Name is Required',
        trim: true
    }, 
    email: {
      type: String,
	    require: true,
      unique: true,
	  //ise Regex to validate e-mail address
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
  	thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

//get total count of friends
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create the User Model using the Schema
const User = model('User', UserSchema);

//export the user model
module.exports = User;
