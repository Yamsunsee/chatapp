import Room from "./schema.js";
import User from "../User/schema.js";
import Message from "../Message/schema.js";
import Invitation from "../Invitation/schema.js";

export const getAll = async (req, res) => {
  try {
    const rooms = await Room.find();
    const newRooms = await Promise.all(
      rooms.map(async (room) => {
        const joinedMembers = await User.find({ currentRoomId: room._id }, "nickname");
        return { ...room._doc, joinedMembers };
      })
    );
    return res.status(200).json({ isSuccess: true, message: "Successfully!", data: newRooms });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findOne({ _id: roomId });
    const joinedMembers = await User.find({ currentRoomId: roomId }, "nickname");
    const pendingMembers = await User.find({ pendingRoomId: roomId }, "nickname");
    return res
      .status(200)
      .json({ isSuccess: true, message: "Successfully!", data: { ...room._doc, joinedMembers, pendingMembers } });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

export const getJoinedMembers = async (req, res) => {
  try {
    const { roomId } = req.params;
    const members = await User.find({ currentRoomId: roomId }, "nickname");
    return res.status(200).json({ isSuccess: true, message: "Successfully!", data: members });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};
export const getPendingMembers = async (req, res) => {
  try {
    const { roomId } = req.params;
    const members = await User.find({ pendingRoomId: roomId }, "nickname");
    return res.status(200).json({ isSuccess: true, message: "Successfully!", data: members });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { userId, name, isPrivate, limit } = req.body;
    const newRoom = new Room({
      name,
      limit,
      isPrivate,
      hostId: userId,
    });
    await newRoom.save();
    await User.findOneAndUpdate({ _id: userId }, { currentRoomId: newRoom._id }, { new: true });
    return res.status(200).json({
      isSuccess: true,
      message: "Successfully!",
      data: { _id: newRoom._id },
    });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

export const changeName = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { name } = req.body;
    await Room.findOneAndUpdate({ _id: roomId }, { name });
    return res.status(200).json({ isSuccess: true, message: "Successfully!" });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

export const changeType = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { isPrivate } = req.body;
    await Room.findOneAndUpdate({ _id: roomId }, { isPrivate });
    return res.status(200).json({ isSuccess: true, message: "Successfully!" });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

export const changeLimit = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { limit } = req.body;
    await Room.findOneAndUpdate({ _id: roomId }, { limit });
    return res.status(200).json({ isSuccess: true, message: "Successfully!" });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

export const changeHost = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { hostId } = req.body;
    await Room.findOneAndUpdate({ _id: roomId }, { hostId });
    return res.status(200).json({ isSuccess: true, message: "Successfully!" });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { roomId } = req.params;
    await User.updateMany({ currentRoomId: roomId }, { $set: { currentRoomId: null } });
    await Room.deleteOne({ _id: roomId });
    await Message.deleteMany({ roomId });
    await Invitation.deleteMany({ roomId });
    return res.status(200).json({ isSuccess: true, message: "Deleted!" });
  } catch (error) {
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};
