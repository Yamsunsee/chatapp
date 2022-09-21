import { createSelector } from "@reduxjs/toolkit";

//@ Socket
export const socketSelector = (state) => state.socket.current;

//@ Enter route
export const enterStatusSelector = (state) => state.enter.isLoading;

//@ Lobby route
export const lobbyStatusSelector = (state) => state.lobby.isLoading;
export const filtersSelector = (state) => state.lobby.filters;
export const userSelector = (state) => state.lobby.user;
export const onlineMembersSelector = (state) => state.lobby.onlineMembers;
export const invitationsSelector = (state) => state.lobby.invitations;
export const roomsSelector = (state) => state.lobby.rooms;
export const remainingRoomsSelector = createSelector(roomsSelector, filtersSelector, (rooms, filters) => {
  const filteredRooms = rooms.filter((room) => room._id.includes(filters.search) || room.name.includes(filters.search));
  switch (filters.option) {
    case "public":
      return filteredRooms.filter((room) => !room.isPrivate);

    case "private":
      return filteredRooms.filter((room) => room.isPrivate);

    default:
      return filteredRooms;
  }
});

//@ Chatroom route
export const chatroomStatusSelector = (state) => state.chatroom.isLoading;
export const joinedMembersSelector = (state) => state.chatroom.room.joinedMembers;
export const messagesSeletor = (state) => state.chatroom.messages;
export const roomSelector = (state) => state.chatroom.room;
export const idleMembersSelector = createSelector(
  onlineMembersSelector,
  joinedMembersSelector,
  (onlineMembers, joinedMembers) => {
    return onlineMembers.filter(
      (onlineMember) => !joinedMembers.some((joinedMember) => onlineMember._id === joinedMember._id)
    );
  }
);
