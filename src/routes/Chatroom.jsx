import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { chatroomStatusSelector, roomSelector, socketSelector, userSelector } from "../redux/selectors";
import Logo from "../components/Utilities/Logo";
import RoomOptions from "../components/Options/RoomOptions";
import Messages from "../components/Messages";
import Members from "../components/Members";
import Requests from "../components/Requests";

const Chatroom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSelector(socketSelector);
  const { _id: userId } = useSelector(userSelector);
  const { _id: roomId, name, hostId } = useSelector(roomSelector);

  useEffect(() => {
    socket.on("delete-room", (deletedRoomId) => {
      roomId === deletedRoomId && navigate("/yamess");
      toast.warning("Your current room has been deleted!");
    });
  }, [socket]);

  return (
    <div className="flex h-screen w-full">
      <div className="flex w-96 flex-col items-center bg-white p-8 shadow-lg">
        <Logo />
        <div className="mt-8 rounded-full bg-blue-100 px-8 py-4 font-bold text-blue-400">Online: 10</div>
        <Members />
      </div>
      {name && (
        <div className="flex h-screen w-full flex-col p-8">
          <div className="flex justify-between rounded-full bg-white px-8 py-4 text-slate-500">
            <div className="flex items-center">
              <div className="text-2xl font-bold">{name}</div>
              {userId === hostId && <Requests />}
            </div>
            <RoomOptions />
          </div>
          <Messages
            messages={[{ _id: "123", content: "Hello", userId: { name: "yam" } }]}
            pendingMessages={[{ content: "Hi" }]}
          />
          <form action="" className="flex w-full">
            <input
              className="flex-grow rounded-tl-full rounded-bl-full px-8 py-4 text-slate-500 focus:outline-none"
              name="content"
              type="text"
              placeholder="Enter your message"
              autoComplete="off"
              autoFocus
            />
            <button
              className="rounded-tr-full rounded-br-full bg-blue-400 px-8 py-4 font-bold text-white hover:bg-blue-500"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatroom;
