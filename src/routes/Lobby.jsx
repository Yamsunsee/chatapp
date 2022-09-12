import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { addCurrentRoom, removePendingRoom } from "../redux/APIs/userAPIs";
import { getAll } from "../redux/APIs/roomAPIs";
import { getByUserId } from "../redux/APIs/invitationAPIs";
import { currentSocket, currentUser, filters, invitations, pendingRoomId, remainingRooms } from "../redux/selectors";

// import Rooms from "../components/Rooms";
import Notifications from "../components/Notifications";
import UserOptions from "../components/Options/UserOptions";
import Modal from "../components/Utilities/Modal";

const Lobby = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const socket = useSelector(currentSocket);
  const { nickname, _id: userId } = useSelector(currentUser);
  const { search, option } = useSelector(filters);
  const rooms = useSelector(remainingRooms);
  const currentInvitations = useSelector(invitations);
  const targetRoomId = useSelector(pendingRoomId);

  const [isNewRoom, setIsNewRoom] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // useEffect(() => {
  //   socket.emit("join", userId);
  // }, []);

  // useEffect(() => {
  //   socket.on("users", (users) => {
  //     setOnlineUsers(users);
  //   });
  //   socket.on("rooms", () => {
  //     fetchRooms();
  //   });
  //   socket.on("response", ({ userId: targetUserId, roomId, isAccept }) => {
  //     if (userId === targetUserId) {
  //       if (isAccept) {
  //         handleJoinRoom(roomId);
  //       } else {
  //         setIsRequest(false);
  //       }
  //     }
  //   });
  // }, [socket]);

  useEffect(() => {
    if (nickname) {
      fetchRooms();
      fetchInvitations();
    } else {
      navigate("/yamess/signin");
    }
  }, []);

  const fetchRooms = async () => {
    const result = await dispatch(getAll());
    const { isSuccess, message } = unwrapResult(result);
    if (!isSuccess) {
      toast.error(message);
    }
  };

  const fetchInvitations = async () => {
    const result = await dispatch(getByUserId({ userId }));
    const { isSuccess, message } = unwrapResult(result);
    if (!isSuccess) {
      toast.error(message);
    }
  };

  const handleJoinRoom = async (roomId) => {
    const result = await dispatch(addCurrentRoom({ roomId, userId }));
    const { isSuccess, message } = unwrapResult(result);
    if (isSuccess) {
      navigate("/yamess/chatroom");
    } else {
      toast.error(message);
    }
  };

  const handleCancleRequest = async () => {
    const result = await dispatch(removePendingRoom({ roomId: targetRoomId, userId }));
    const { isSuccess, message } = unwrapResult(result);
    if (isSuccess) {
      socket.emit("request", { userId, roomId: targetRoomId });
      setIsRequest(false);
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      {/* <Modal toggle={createRoomStatus} type="all" />
      <Modal toggle={addPendingRoomStatus} type="send" />
      <Modal
        toggle={isRequest && !addPendingRoomStatus}
        type="wait"
        cancle={handleCancleRequest}
        isCancle={removePendingRoomStatus}
      />
      <Modal toggle={addCurrentRoomStatus} type="join" /> */}
      <div className="w-full self-start">
        <div className="bg-texture sticky top-0 z-10 p-8 shadow-lg">
          <div className="flex items-end justify-between">
            <div className="flex items-center">
              <div className="mr-1 flex items-center text-4xl text-blue-500">
                <ion-icon name="rocket"></ion-icon>
              </div>
              <div className="text-3xl font-bold text-slate-600">
                Ya
                <span className="text-slate-400">mess</span>
              </div>
              <Notifications data={currentInvitations} isUsers={false} />
            </div>
            <div className="italic text-slate-400">
              Hello <span className="font-bold text-red-400">{nickname}</span>!{" "}
              <span className="hidden lg:inline-block">Your friends are online! Let's join to chat with them!</span>
            </div>
            <UserOptions />
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div
              onClick={() => setIsNewRoom((previousState) => !previousState)}
              className={`flex w-48 cursor-pointer justify-center rounded-full px-8 py-4 text-white ${
                isNewRoom ? "bg-slate-400 hover:bg-slate-500" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              <div className="mr-2 flex items-center text-xl">
                {isNewRoom ? <ion-icon name="close-circle"></ion-icon> : <ion-icon name="add-circle"></ion-icon>}
              </div>
              <div className="font-bold">{isNewRoom ? "Cancle" : "New room"}</div>
            </div>
            <div className="flex">
              <div className="mr-4 rounded-full bg-blue-100 px-8 py-4 font-bold text-blue-400">
                Online: {onlineUsers.length}
              </div>
              <div className="rounded-full bg-blue-100 px-8 py-4 font-bold text-blue-400">Room: 10</div>
            </div>
            <input
              onChange={(event) => dispatch(changeSearch(event.target.value))}
              className="w-96 rounded-full px-8 py-4 font-bold text-slate-400 focus:outline-slate-400"
              type="text"
              placeholder="Find room by name or ID"
              autoComplete="off"
              value={search}
            />
            <div className="flex font-bold text-slate-400">
              <div className="mr-4 text-2xl leading-4">
                <ion-icon name="funnel"></ion-icon>
              </div>
              <div className="mr-4">
                <input
                  onChange={() => dispatch(changeOption("all"))}
                  type="radio"
                  name="sort"
                  id="all"
                  className="cursor-pointer"
                  checked={option === "all"}
                />
                <label className="ml-1 cursor-pointer" htmlFor="all">
                  All
                </label>
              </div>
              <div className="mr-4">
                <input
                  onChange={() => dispatch(changeOption("public"))}
                  type="radio"
                  name="sort"
                  id="public"
                  className="cursor-pointer"
                  checked={option === "public"}
                />
                <label className="ml-1 cursor-pointer" htmlFor="public">
                  Public
                </label>
              </div>
              <div>
                <input
                  onChange={() => dispatch(changeOption("private"))}
                  type="radio"
                  name="sort"
                  id="private"
                  className="cursor-pointer"
                  checked={option === "private"}
                />
                <label className="ml-1 cursor-pointer" htmlFor="private">
                  Private
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* <Rooms rooms={rooms} isNewRoom={isNewRoom} isRequest={setIsRequest} targetRoomId={setTargetRoomId} /> */}
      </div>
    </>
  );
};

export default Lobby;
