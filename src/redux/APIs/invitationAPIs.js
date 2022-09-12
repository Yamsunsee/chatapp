import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { invitationRoutes } from "./APIs";

export const getByUserId = createAsyncThunk("invitations/getByUserId", async ({ userId }) => {
  try {
    const { data } = await axios.get(invitationRoutes.getByUserId(userId));
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const create = createAsyncThunk("invitations/create", async ({ invitation }) => {
  try {
    const { data } = await axios.post(invitationRoutes.create(), invitation);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const deleteById = createAsyncThunk("invitations/deleteById", async ({ roomId, userId }) => {
  try {
    const { data } = await axios.delete(invitationRoutes.deleteById(roomId, userId));
    return data;
  } catch (error) {
    return error.response.data;
  }
});
