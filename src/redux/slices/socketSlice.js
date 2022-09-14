import io from "socket.io-client";
import { createSlice } from "@reduxjs/toolkit";
import { host } from "../paths";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    current: io(host, { transports: ["websocket"] }),
  },
});

export default socketSlice.reducer;
