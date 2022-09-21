import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getManyById } from "../redux/APIs/userAPIs";
import { changeOption, changeSearch } from "../redux/slices/lobbySlice";
import {
  filtersSelector,
  onlineMembersSelector,
  roomSelector,
  roomsSelector,
  socketSelector,
  userSelector,
} from "../redux/selectors";
import Rooms from "../components/Rooms";
import Invitations from "../components/Invitations";
import UserOptions from "../components/Options/UserOptions";

const Lobby = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSelector(socketSelector);
  const { nickname, _id: userId } = useSelector(userSelector);
  const { search, option } = useSelector(filtersSelector);
  const onlineMembers = useSelector(onlineMembersSelector);
  const rooms = useSelector(roomsSelector);
  const { name: roomName } = useSelector(roomSelector);
  const [isNewRoom, setIsNewRoom] = useState(false);

  useEffect(() => {
    if (roomName) {
      navigate("/yamess/chatroom");
    } else if (nickname) {
      socket.emit("join", userId);
    } else {
      const storageData = JSON.parse(localStorage.getItem("yamess-data"));
      navigate(`/yamess/sign${storageData ? "in" : "up"}`);
    }
  }, []);

  useEffect(() => {
    socket.on("users", (users) => {
      fetchOnlineMembers(users);
    });
  }, [socket]);

  const fetchOnlineMembers = async (userIdList) => {
    const result = await dispatch(getManyById({ userIdList }));
    const { isSuccess, message } = unwrapResult(result);
    if (!isSuccess) {
      toast.error(message);
    }
  };

  return (
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
            <Invitations />
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
              Online: {onlineMembers.length}
            </div>
            <div className="rounded-full bg-blue-100 px-8 py-4 font-bold text-blue-400">Room: {rooms.length}</div>
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
      <Rooms isNewRoom={isNewRoom} />
    </div>
  );
};

export default Lobby;
