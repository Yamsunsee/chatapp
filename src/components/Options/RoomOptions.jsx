import { useEffect, useRef, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeCurrentRoom } from "../../redux/APIs/userAPIs";
import { changeRoom } from "../../redux/slices/chatroomSlice";
import { chatroomStatusSelector, roomSelector, socketSelector, userSelector } from "../../redux/selectors";
import Id from "../Utilities/Id";
import { deleteById } from "../../redux/APIs/roomAPIs";
import Modal from "../Utilities/Modal";

const RoomOptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSelector(socketSelector);
  const { _id: userId } = useSelector(userSelector);
  const { _id: roomId, name: roomName, isPrivate, limit, hostId } = useSelector(roomSelector);
  const { deleteRoom: deleteRoomStatus } = useSelector(chatroomStatusSelector);
  const [newName, setNewName] = useState(roomName);
  const name = useRef();

  useEffect(() => {
    name.current.onblur = () => handleNewName();
  }, []);

  const handleNewName = () => {
    name.current.readOnly = true;
    const trimmedName = name.current.value.trim();
    if (trimmedName.length > 0) {
      setNewName(trimmedName);
    } else {
      setNewName(roomName);
    }
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Enter") {
      name.current.blur();
      handleNewName();
    }
  };

  const handleChangeName = () => {
    setNewName("");
    name.current.readOnly = false;
    name.current.focus();
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteById({ roomId }));
    const { isSuccess, message } = unwrapResult(result);
    if (isSuccess) {
      dispatch(changeRoom({}));
      navigate("/yamess");
    } else {
      toast.error(message);
    }
  };

  const handleLeave = async () => {
    const result = await dispatch(removeCurrentRoom({ userId, roomId }));
    const { isSuccess, message } = unwrapResult(result);
    if (isSuccess) {
      dispatch(changeRoom({}));
      navigate("/yamess");
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      <Modal toggle={deleteRoomStatus} type="delete" />
      <div className="group relative z-20 font-bold text-slate-500">
        <div className="ml-2 flex cursor-pointer items-center text-3xl group-hover:text-blue-500">
          <ion-icon name="ellipsis-vertical"></ion-icon>
        </div>
        <div className="absolute top-0 right-full hidden w-[30rem] grid-cols-1 gap-2 rounded-lg bg-white p-4 shadow-lg group-hover:grid">
          <div className="flex items-end justify-between px-4 pt-4 text-2xl text-blue-400">
            <input
              className="outline-none"
              ref={name}
              value={newName}
              onChange={(event) => {
                setNewName(event.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder={roomName}
              readOnly={true}
            />
            <Id data={roomId} title="Room ID" />
          </div>
          <div className="flex items-end justify-between border-b-2 border-slate-100 px-4 pb-4 text-sm italic">
            <div>
              {isPrivate ? "Private" : "Public"} <span className="text-slate-300">[Type]</span>
            </div>
            <div>
              {limit} members <span className="text-slate-300">[Limit]</span>
            </div>
          </div>
          {userId === hostId ? (
            <div>
              <div
                onClick={handleChangeName}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-blue-400 hover:bg-blue-50"
              >
                Change Name
                <div className="text-xl">
                  <ion-icon name="trail-sign"></ion-icon>
                </div>
              </div>
              <div
                onClick={() => console.log("Change host")}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-blue-400 hover:bg-blue-50"
              >
                Change Host
                <div className="text-xl">
                  <ion-icon name="home"></ion-icon>
                </div>
              </div>
              <div
                onClick={() => console.log("Change type")}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-blue-400 hover:bg-blue-50"
              >
                Change Type
                <div className="text-xl">
                  <ion-icon name="lock-closed"></ion-icon>
                </div>
              </div>
              <div
                onClick={() => console.log("Change limit")}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-blue-400 hover:bg-blue-50"
              >
                Change Limit
                <div className="text-xl">
                  <ion-icon name="people"></ion-icon>
                </div>
              </div>
              <div
                onClick={handleDelete}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-red-400 hover:bg-red-50"
              >
                Delete Room
                <div className="text-xl">
                  <ion-icon name="trash"></ion-icon>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={handleLeave}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-orange-400 hover:bg-orange-50"
            >
              Leave Room
              <div className="text-xl">
                <ion-icon name="log-out"></ion-icon>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoomOptions;
