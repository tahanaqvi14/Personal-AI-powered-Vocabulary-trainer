import mongoose from 'mongoose'

const wordSchema = mongoose.Schema({
      wordname: {
        type: String,
        required: true,
        trim: true
      },
      meaning: {
        type: String,
        required: true,
        trim: true
      },
      sentence: {
        type: String,
        required: true,
        trim: true
      },
    
});

const WordModel = mongoose.model("Word", wordSchema, "Words");

export default WordModel;  // ✅ default export
