import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {} from "../../redux/APIs/roomAPIs";
import { currentSocket, currentUser } from "../../redux/selectors";

import Id from "../Utilities/Id";
import roomImage from "../../assets/images/room.png";

const Room = ({ room, isRequest }) => {
  const flag = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSelector(currentSocket);
  const { _id: userId } = useSelector(currentUser);

  const handleJoin = async () => {
    if (room.isPrivate) {
      const result = await dispatch(addPendingMember({ roomId: room._id, userId }));
      const { isSuccess, message } = unwrapResult(result);
      if (isSuccess) {
        socket.emit("request", { userId, roomId: room._id });
        isRequest(true);
        dispatch(pendingRoomId(room._id));
      } else {
        toast.error(message);
      }
    } else {
      const result = await dispatch(join({ accessToken, roomId: room._id, userId }));
      const { isSuccess, message } = unwrapResult(result);
      if (isSuccess) {
        navigate("/yamess/chatroom");
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <div className="flex flex-col rounded-lg bg-white p-8 shadow-lg">
      <div className="flex items-center">
        <div className="mr-4 h-20 w-20 overflow-hidden rounded-full">
          <img className="h-full w-full object-contain" src={roomImage} alt="avatar" />
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-500">{room.name}</div>
          <Id data={room._id} title={room._id} />
          <div className="mt-2 flex items-center">
            <div
              className={`
                    w-fit rounded-full px-4 py-2 
                    ${room.isPrivate ? "bg-orange-100 text-orange-400" : "bg-green-100 text-green-400"}
                  `}
            >
              {room.isPrivate ? "Private" : "Public"}
            </div>
            <div
              className={`
                  ml-4 flex w-fit items-center justify-center rounded-full px-4 py-2 
                    ${room.isPrivate ? "bg-orange-100 text-orange-400" : "bg-green-100 text-green-400"}
                  `}
            >
              <div className="mr-2 text-lg leading-4">
                <ion-icon name="people-outline"></ion-icon>
              </div>
              <div>
                {room.members.length}/{room.limit}
              </div>
            </div>
          </div>
        </div>
      </div>
      {room.members.length === room.limit ? (
        <div className="mt-8 w-full cursor-no-drop rounded-lg bg-red-400 px-8 py-4 text-center text-xl font-bold uppercase text-white hover:bg-red-500">
          This room is full
        </div>
      ) : room.isPrivate === true ? (
        <div
          onClick={handleJoin}
          className="mt-8 w-full cursor-pointer rounded-lg bg-orange-400 px-8 py-4 text-center text-xl font-bold uppercase text-white hover:bg-orange-500"
        >
          {flag ? "Pending request" : "Ask to join room"}
        </div>
      ) : (
        <div
          onClick={handleJoin}
          className="mt-8 w-full cursor-pointer rounded-lg bg-green-400 px-8 py-4 text-center text-xl font-bold uppercase text-white hover:bg-green-500"
        >
          Join room
        </div>
      )}
    </div>
  );
};

export default Room;
