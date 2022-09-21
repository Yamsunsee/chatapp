import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAll } from "../../redux/APIs/roomAPIs";
import { remainingRoomsSelector, socketSelector } from "../../redux/selectors";
import NewRoom from "./NewRoom";
import Room from "./Room";

const Rooms = ({ isNewRoom }) => {
  const dispatch = useDispatch();
  const socket = useSelector(socketSelector);
  const rooms = useSelector(remainingRoomsSelector);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    socket.on("rooms", () => {
      fetchRooms();
    });
    socket.on("delete-room", () => {
      fetchRooms();
    });
  }, [socket]);

  const fetchRooms = async () => {
    const result = await dispatch(getAll());
    const { isSuccess, message } = unwrapResult(result);
    if (!isSuccess) {
      toast.error(message);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {isNewRoom && <NewRoom />}
      {rooms.map((room) => (
        <Room key={room._id} room={room} />
      ))}
    </div>
  );
};

export default Rooms;
