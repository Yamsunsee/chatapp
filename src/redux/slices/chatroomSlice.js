import { createSlice } from "@reduxjs/toolkit";

const chatroomSlice = createSlice({
  name: "chatroom",
  initialState: {
    isLoading: {
      leaveRoom: false,
      deleteRoom: false,
      getRequests: false,
      getMembers: false,
      getMessages: false,
    },
    room: {},
    requests: [],
    members: [],
    messages: [],
  },
  reducers: {},
});

// export const {} = chatroomSlice.actions;
export default chatroomSlice.reducer;
