const { Schema, model, Types } = require('mongoose')

const dateFormat = require('../utils/dateFormat');


const  ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 280
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );
  
  const ThoughtSchema = new Schema(
    {
     thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
     },
     createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
     },
     username: {
        type: String,
        required: true,
    },
    // use ReactionSchema to validate data for a reaction
    reactions: [ReactionSchema],

    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );
  
  // get total count 
  ThoughtSchema.virtual('reactionCount').get(function() {
    //return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
    return this.reactions.length;
  });
  
  const Thoughts = model('Thoughts', ThoughtSchema);
  
  module.exports = Thoughts;