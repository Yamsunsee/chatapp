import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { changeRoom } from "../../redux/slices/chatroomSlice";
import { socketSelector, userSelector, lobbyStatusSelector } from "../../redux/selectors";
import { create } from "../../redux/APIs/roomAPIs";
import roomImage from "../../assets/room.png";

const NewRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector(socketSelector);
  const { _id: userId } = useSelector(userSelector);
  const { createRoom: createRoomStatus } = useSelector(lobbyStatusSelector);
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [limit, setLimit] = useState(2);

  const isValidName = useMemo(() => name.trim().length > 0, [name]);

  const handleCreate = async () => {
    const result = await dispatch(
      create({
        room: {
          userId,
          name: name.trim(),
          isPrivate,
          limit,
        },
      })
    );
    const { isSuccess, message, data } = unwrapResult(result);
    if (isSuccess) {
      dispatch(changeRoom(data));
      navigate("/yamess/chatroom");
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col rounded-lg bg-white p-8 shadow-lg">
      <div className="flex items-center">
        <div className="mr-4 h-20 w-20 overflow-hidden rounded-full">
          <img className="h-full w-full object-contain" src={roomImage} alt="avatar" />
        </div>
        <div>
          <input
            onChange={(event) => setName(event.target.value)}
            onKeyDown={({ key }) => key === "Enter" && !createRoomStatus && isValidName && handleCreate()}
            className="text-2xl font-bold text-slate-500 focus:outline-0"
            value={name}
            placeholder="Untitle"
            autoFocus
          />
          <div className="flex items-center text-sm italic text-slate-400">
            <div className="flex items-center justify-center text-xl">
              <ion-icon name="key"></ion-icon>
            </div>
            <div>Room ID</div>
          </div>
          <div className="mt-2 flex items-center">
            <div
              onClick={() => setIsPrivate((prevIsPrivate) => !prevIsPrivate)}
              className="w-fit cursor-pointer rounded-full bg-blue-100 px-4 py-2 text-blue-400"
            >
              <span className={`${!isPrivate ? "text-blue-400" : "text-slate-400"}`}>Public</span>
              {" | "}
              <span className={`${isPrivate ? "text-blue-400" : "text-slate-400"}`}>Private</span>
            </div>
            <div
              className="
                  ml-4 flex w-fit items-center justify-center rounded-full bg-blue-100 px-4 py-2 text-blue-400"
            >
              <div
                onClick={() => setLimit((prevLimit) => Math.max(prevLimit - 1, 2))}
                className={`text-2xl leading-4 ${
                  limit <= 2 ? "text-slate-300" : "cursor-pointer text-blue-300 hover:text-blue-400"
                }`}
              >
                <ion-icon name="remove-circle"></ion-icon>
              </div>
              <div className="flex w-20 items-center justify-center px-4">
                <div className="mr-2 text-lg leading-4">
                  <ion-icon name="people-outline"></ion-icon>
                </div>
                <div>1/{limit}</div>
              </div>
              <div
                onClick={() => setLimit((prevLimit) => Math.min(prevLimit + 1, 10))}
                className={`text-2xl leading-4 ${
                  limit >= 10 ? "text-slate-300" : "cursor-pointer text-blue-300 hover:text-blue-400"
                }`}
              >
                <ion-icon name="add-circle"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      {createRoomStatus ? (
        <div className="mt-8 flex w-full cursor-wait items-center justify-center rounded-lg bg-blue-400 px-8 py-4 text-center text-xl font-bold uppercase text-white hover:bg-blue-500">
          <div className="spin mr-2 flex items-center text-xl">
            <ion-icon name="reload-circle"></ion-icon>
          </div>
          <div className="font-bold ">Creating...</div>
        </div>
      ) : (
        <div
          onClick={() => isValidName && handleCreate()}
          className={`mt-8 w-full rounded-lg px-8 py-4 text-center text-xl font-bold uppercase text-white ${
            isValidName ? "cursor-pointer bg-blue-400 hover:bg-blue-500" : "cursor-not-allowed bg-blue-300"
          }`}
        >
          Create room
        </div>
      )}
    </div>
  );
};

export default NewRoom;
