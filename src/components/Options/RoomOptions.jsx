import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteById, leave } from "../../redux/APIs/roomAPIs";
import { currentRoom, currentSocket, currentUser } from "../../redux/selectors";
import Id from "../Utilities/Id";

const RoomOptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSelector(currentSocket);
  const { _id: userId, accessToken } = useSelector(currentUser);
  const { _id: roomId, name: roomName, isPrivate, limit, host } = useSelector(currentRoom);

  const handleLeave = async () => {
    const result = await dispatch(leave({ accessToken, roomId, userId }));
    const { isSuccess, message } = unwrapResult(result);
    if (isSuccess) {
      navigate("/yamess");
      socket.emit("leave-room");
    } else {
      toast.error(message);
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteById({ accessToken, roomId }));
    const { isSuccess, message } = unwrapResult(result);
    if (isSuccess) {
      navigate("/yamess");
      socket.emit("delete-room", roomId);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="group relative z-20 font-bold text-slate-500">
      <div className="ml-2 flex cursor-pointer items-center text-3xl group-hover:text-blue-500">
        <ion-icon name="ellipsis-vertical"></ion-icon>
      </div>
      <div className="absolute top-0 right-full hidden w-[30rem] grid-cols-1 gap-2 rounded-lg bg-white p-4 shadow-lg group-hover:grid">
        <div className="flex items-end justify-between px-4 pt-4 text-2xl text-blue-400">
          <div>{roomName}</div>
          <Id data={roomId} title="Room ID" />
        </div>
        <div className="flex items-end justify-between border-b-2 border-slate-100 px-4 pb-4 text-sm italic">
          <div>
            {userId === host._id ? "You" : host.nickname} <span className="text-slate-300">[Host]</span>
          </div>
          <div>
            {isPrivate ? "Private" : "Public"} <span className="text-slate-300">[Type]</span>
          </div>
          <div>
            {limit} members <span className="text-slate-300">[Limit]</span>
          </div>
        </div>
        {userId === host._id ? (
          <div>
            <div className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-blue-400 hover:bg-blue-50">
              Change Name
              <div className="text-xl">
                <ion-icon name="trail-sign"></ion-icon>
              </div>
            </div>
            <div className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-blue-400 hover:bg-blue-50">
              Change Host
              <div className="text-xl">
                <ion-icon name="home"></ion-icon>
              </div>
            </div>
            <div className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-blue-400 hover:bg-blue-50">
              Change Type
              <div className="text-xl">
                <ion-icon name="lock-closed"></ion-icon>
              </div>
            </div>
            <div className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-blue-400 hover:bg-blue-50">
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
  );
};

export default RoomOptions;
