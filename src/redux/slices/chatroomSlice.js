import { createSlice } from "@reduxjs/toolkit";
import { deleteById, getById, getPendingMembers } from "../APIs/roomAPIs";

const chatroomSlice = createSlice({
  name: "chatroom",
  initialState: {
    isLoading: {
      leaveRoom: false,
      deleteRoom: false,
      getRoom: false,
      getRequests: false,
      getMessages: false,
    },
    room: {},
    messages: [],
  },
  reducers: {
    changeRoom: (state, action) => {
      state.room = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getById.pending, (state) => {
        state.isLoading.getRoom = true;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading.getRoom = false;
        state.room = action.payload.data;
      })
      .addCase(getPendingMembers.pending, (state) => {
        state.isLoading.getRequests = true;
      })
      .addCase(getPendingMembers.fulfilled, (state, action) => {
        state.isLoading.getRequests = false;
        state.room.pendingMembers = action.payload.data;
      })
      .addCase(deleteById.pending, (state) => {
        state.isLoading.deleteRoom = true;
      })
      .addCase(deleteById.fulfilled, (state) => {
        state.isLoading.deleteRoom = false;
      });
  },
});

export const { changeRoom } = chatroomSlice.actions;
export default chatroomSlice.reducer;
