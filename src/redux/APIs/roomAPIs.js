import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { roomRoutes } from "../paths";

export const getAll = createAsyncThunk("rooms/getAll", async () => {
  try {
    const { data } = await axios.get(roomRoutes.getAll());
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const getById = createAsyncThunk("rooms/getById", async ({ roomId }) => {
  try {
    const { data } = await axios.get(roomRoutes.getById(roomId));
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const getJoinedMembers = createAsyncThunk("rooms/getJoinedMembers", async ({ roomId }) => {
  try {
    const { data } = await axios.get(roomRoutes.getJoinedMembers(roomId));
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const getPendingMembers = createAsyncThunk("rooms/getPendingMembers", async ({ roomId }) => {
  try {
    const { data } = await axios.get(roomRoutes.getPendingMembers(roomId));
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const create = createAsyncThunk("rooms/create", async ({ room }) => {
  try {
    const { data } = await axios.post(roomRoutes.create(), room);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const changeName = createAsyncThunk("users/changeName", async ({ userId, name }) => {
  try {
    const { data } = await axios.patch(roomRoutes.changeName(userId), {
      name,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const changeType = createAsyncThunk("users/changeType", async ({ userId, isPrivate }) => {
  try {
    const { data } = await axios.patch(roomRoutes.changeType(userId), {
      isPrivate,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const changeLimit = createAsyncThunk("users/changeLimit", async ({ userId, limit }) => {
  try {
    const { data } = await axios.patch(roomRoutes.changeLimit(userId), {
      limit,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const changeHost = createAsyncThunk("users/changeHost", async ({ userId, hostId }) => {
  try {
    const { data } = await axios.patch(roomRoutes.changeHost(userId), {
      hostId,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const deleteById = createAsyncThunk("rooms/deleteById", async ({ roomId }) => {
  try {
    const { data } = await axios.delete(roomRoutes.deleteById(roomId));
    return data;
  } catch (error) {
    return error.response.data;
  }
});
