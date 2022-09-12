import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { messageRoutes } from "./APIs";

export const getByRoomId = createAsyncThunk("messages/getByRoomId", async ({ roomId }) => {
  try {
    const { data } = await axios.get(messageRoutes.getByRoomId(roomId));
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const create = createAsyncThunk("messages/create", async ({ message }) => {
  try {
    const { data } = await axios.post(messageRoutes.create(), message);
    return data;
  } catch (error) {
    return error.response.data;
  }
});
