import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentRoom, currentSocket, currentUser, roomStatus } from "../redux/selectors";
import { getPendingMembers, removePendingMember } from "../redux/APIs/roomAPIs";
import { unwrapResult } from "@reduxjs/toolkit";
import { resetCurrent } from "../redux/lobbySlice";
import Logo from "../components/Utilities/Logo";
import Members from "../components/Members";
import Messages from "../components/Messages";
import Notifications from "../components/Notifications";
import RoomOptions from "../components/Options/RoomOptions";
import Modal from "../components/Utilities/Modal";
import { toast } from "react-toastify";

const ChatRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSelector(currentSocket);
  const { accessToken, _id: userId } = useSelector(currentUser);
  const { name, _id: roomId, host, pendingMembers, members } = useSelector(currentRoom);
  const { leave: leaveStatus, delete: deleteStatus } = useSelector(roomStatus);
  const [onlineMembers, setOnlineMembers] = useState([]);

  useEffect(() => {
    fetchPendingMembers();
    socket.emit("join", userId);
  }, []);

  useEffect(() => {
    socket.on("delete-room", (deletedRoomId) => {
      if (roomId === deletedRoomId) {
        dispatch(resetCurrent());
        navigate("/yamess");
        toast.warning("Your current room has been delete!");
      }
    });
    socket.on("request", ({ roomId: targetRoomId }) => {
      if (roomId === targetRoomId) {
        fetchPendingMembers();
      }
    });
    socket.on("users", (userIdList) => {
      setOnlineMembers(userIdList);
    });
  }, [socket]);

  const fetchPendingMembers = async () => {
    const result = await dispatch(getPendingMembers({ accessToken, roomId }));
    const { isSuccess, message } = unwrapResult(result);
    if (!isSuccess) {
      toast.error(message);
    }
  };

  const handleResponse = async (isAccept, targetUserId) => {
    const result = await dispatch(removePendingMember({ accessToken, roomId, userId: targetUserId }));
    const { isSuccess, message } = unwrapResult(result);
    if (isSuccess) {
      fetchPendingMembers();
      if (isAccept) {
        socket.emit("accept-request", { userId: targetUserId, roomId });
      } else {
        socket.emit("decline-request", { userId: targetUserId, roomId });
      }
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      <Modal toggle={deleteStatus} type="delete" />
      <Modal toggle={leaveStatus} type="leave" />
      <div className="flex h-screen w-full">
        <div className="flex w-96 flex-col items-center bg-white p-8 shadow-lg">
          <Logo />
          <div className="mt-8 rounded-full bg-blue-100 px-8 py-4 font-bold text-blue-400">Online: 10</div>
          <Members online={onlineMembers} joined={members} />
        </div>
        {name && (
          <div className="flex h-screen w-full flex-col p-8">
            <div className="flex justify-between rounded-full bg-white px-8 py-4 text-slate-500">
              <div className="flex items-center">
                <div className="text-2xl font-bold">{name}</div>
                {userId === host._id && (
                  <Notifications data={pendingMembers} isUsers={true} handleResponse={handleResponse} />
                )}
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
    </>
  );
};

export default ChatRoom;
