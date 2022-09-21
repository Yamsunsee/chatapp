export const host = "http://localhost:5000";

//@ Users
const users = `${host}/users`;
export const userRoutes = {
  getManyById: () => users,
  signUp: () => `${users}/signUp`,
  signIn: () => `${users}/signIn`,
  changeNickname: (userId) => `${users}/${userId}/nickname`,
  addCurrentRoom: (userId) => `${users}/${userId}/room/addCurrent`,
  removeCurrentRoom: (userId) => `${users}/${userId}/room/removeCurrent`,
  addPendingRoom: (userId) => `${users}/${userId}/room/addPending`,
  removePendingRoom: (userId) => `${users}/${userId}/room/removePending`,
  deleteById: (userId) => `${users}/${userId}`,
};

//@ Rooms
const rooms = `${host}/rooms`;
export const roomRoutes = {
  getAll: () => rooms,
  getById: (roomId) => `${rooms}/${roomId}`,
  getPendingMembers: (roomId) => `${rooms}/${roomId}/pending`,
  create: () => `${rooms}/create`,
  changeName: (roomId) => `${rooms}/${roomId}/name`,
  changeType: (roomId) => `${rooms}/${roomId}/type`,
  changeLimit: (roomId) => `${rooms}/${roomId}/limit`,
  changeHost: (roomId) => `${rooms}/${roomId}/host`,
  deleteById: (roomId) => `${rooms}/${roomId}`,
};

//@ Messages
const messages = `${host}/messages`;
export const messageRoutes = {
  getByRoomId: (roomId) => `${messages}/${roomId}`,
  create: () => `${messages}/create`,
};

//@ Invitations
const invitations = `${host}/invitations`;
export const invitationRoutes = {
  getByUserId: (userId) => `${invitations}/${userId}`,
  create: () => `${invitations}/create`,
  deleteById: (roomId, userId) => `${invitations}/${roomId}/${userId}`,
};
