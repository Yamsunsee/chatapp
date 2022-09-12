import { createSlice } from "@reduxjs/toolkit";
import { getByUserId } from "./APIs/invitationAPIs";
import { getAll } from "./APIs/roomAPIs";

const lobbySlice = createSlice({
  name: "lobby",
  initialState: {
    isLoading: {
      createRoom: false,
      joinPublicRoom: false,
      joinPrivateRoom: false,
      leavePrivateRoom: false,
      getRooms: false,
      getInvitations: false,
    },
    filters: {
      search: "",
      option: "all",
    },
    user: {},
    rooms: [],
    invitations: [],
  },
  reducers: {
    changeSearch: (state, action) => {
      state.filters.search = action.payload;
    },
    changeOption: (state, action) => {
      state.filters.option = action.payload;
    },
    changeUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading.getRooms = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading.getRooms = false;
        state.rooms = action.payload.data;
      })
      .addCase(getByUserId.pending, (state) => {
        state.isLoading.getInvitations = true;
      })
      .addCase(getByUserId.fulfilled, (state, action) => {
        state.isLoading.getInvitations = false;
        state.invitations = action.payload.data;
      });
  },
});

export const { changeSearch, changeOption, changeUser } = lobbySlice.actions;
export default lobbySlice.reducer;
