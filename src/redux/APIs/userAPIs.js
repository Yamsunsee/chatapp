import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRoutes } from "../paths";

export const getManyById = createAsyncThunk("users/getManyById", async ({ userIdList }) => {
  try {
    const { data } = await axios.get(userRoutes.getManyById(), {
      params: {
        userIdList,
      },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const signUp = createAsyncThunk("users/signUp", async ({ user }) => {
  try {
    const { data } = await axios.post(userRoutes.signUp(), user);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const signIn = createAsyncThunk("users/signIn", async ({ user }) => {
  try {
    const { data } = await axios.post(userRoutes.signIn(), user);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const changeNickname = createAsyncThunk("users/changeNickname", async ({ userId, nickname }) => {
  try {
    const { data } = await axios.patch(userRoutes.changeNickname(userId), {
      nickname,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const addCurrentRoom = createAsyncThunk("users/addCurrentRoom", async ({ userId, roomId }) => {
  try {
    const { data } = await axios.patch(userRoutes.addCurrentRoom(userId), {
      roomId,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const removeCurrentRoom = createAsyncThunk("users/removeCurrentRoom", async ({ userId, roomId }) => {
  try {
    const { data } = await axios.patch(userRoutes.removeCurrentRoom(userId), {
      roomId,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const addPendingRoom = createAsyncThunk("users/addPendingRoom", async ({ userId, roomId }) => {
  try {
    const { data } = await axios.patch(userRoutes.addPendingRoom(userId), {
      roomId,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const removePendingRoom = createAsyncThunk("users/removePendingRoom", async ({ userId, roomId }) => {
  try {
    const { data } = await axios.patch(userRoutes.removePendingRoom(userId), {
      roomId,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const deleteById = createAsyncThunk("users/removePendingRoom", async ({ userId }) => {
  try {
    const { data } = await axios.delete(userRoutes.deleteById(userId));
    return data;
  } catch (error) {
    return error.response.data;
  }
});
