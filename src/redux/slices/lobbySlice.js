import { createSlice } from "@reduxjs/toolkit";
import { getByUserId } from "../APIs/invitationAPIs";
import { create, getAll } from "../APIs/roomAPIs";
import { getManyById } from "../APIs/userAPIs";

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
      getOnlineMembers: false,
    },
    filters: {
      search: "",
      option: "all",
    },
    user: {},
    rooms: [],
    invitations: [],
    onlineMembers: [],
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
      .addCase(getManyById.pending, (state) => {
        state.isLoading.getOnlineMembers = true;
      })
      .addCase(getManyById.fulfilled, (state, action) => {
        state.isLoading.getOnlineMembers = false;
        state.onlineMembers = action.payload.data;
      })
      .addCase(getByUserId.pending, (state) => {
        state.isLoading.getInvitations = true;
      })
      .addCase(getByUserId.fulfilled, (state, action) => {
        state.isLoading.getInvitations = false;
        state.invitations = action.payload.data;
      })
      .addCase(create.pending, (state) => {
        state.isLoading.createRoom = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading.createRoom = false;
      });
  },
});

export const { changeSearch, changeOption, changeUser } = lobbySlice.actions;
export default lobbySlice.reducer;
