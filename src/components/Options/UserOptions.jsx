import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { changeUser } from "../../redux/slices/lobbySlice";
import { deleteById } from "../../redux/APIs/userAPIs";
import { socketSelector, userSelector } from "../../redux/selectors";
import Id from "../Utilities/Id";

const UserOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector(socketSelector);
  const { _id: userId, nickname } = useSelector(userSelector);
  const [newName, setNewName] = useState(nickname);
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
      setNewName(nickname);
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
    const result = await dispatch(deleteById({ userId }));
    const { isSuccess, message } = unwrapResult(result);
    if (isSuccess) {
      navigate("/yamess/signin");
      dispatch(changeUser({}));
      socket.emit("leave");
    } else {
      toast.error(message);
    }
  };

  const handleSignOut = () => {
    navigate("/yamess/signin");
    dispatch(changeUser({}));
    socket.emit("leave");
  };

  return (
    <div className="group relative z-20 font-bold text-slate-500">
      <div className="ml-2 flex cursor-pointer items-center text-3xl group-hover:text-blue-500">
        <ion-icon name="ellipsis-vertical"></ion-icon>
      </div>
      <div className="absolute top-0 right-full hidden w-[30rem] grid-cols-1 gap-2 rounded-lg bg-white p-4 shadow-lg group-hover:grid">
        <div className="flex items-end justify-between border-b-2 border-slate-100 p-4 text-2xl">
          <input
            className="text-blue-400 outline-none"
            ref={name}
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={nickname}
            readOnly={true}
          />
          <Id data={userId} title="User ID" />
        </div>
        <div
          onClick={handleChangeName}
          className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-blue-400 hover:bg-blue-50"
        >
          Change Nickname
          <div className="text-xl">
            <ion-icon name="person"></ion-icon>
          </div>
        </div>
        <div
          onClick={handleDelete}
          className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-red-400 hover:bg-red-50"
        >
          Delete Account
          <div className="text-xl">
            <ion-icon name="trash"></ion-icon>
          </div>
        </div>
        <div
          onClick={handleSignOut}
          className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-orange-400 hover:bg-orange-50"
        >
          Sign Out
          <div className="text-xl">
            <ion-icon name="log-out"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOptions;
