import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    uuid: { type: String, required: true },
    username: { type: String, required: true },
    started: { type: Number, required: true },
    initialStats: { type: Object, required: true },
    userID: { type: String, required: true },
    checkups: Array,
    date: Number,
});

export default mongoose.model('user', usersSchema);