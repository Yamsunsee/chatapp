import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { getByUserId } from "../../redux/APIs/invitationAPIs";

import { roomSelector, userSelector } from "../../redux/selectors.js";

import Request from "./Request.jsx";

const Requests = () => {
  const dispatch = useDispatch();

  const { _id: userId } = useSelector(userSelector);
  const { pendingMembers: requests } = useSelector(roomSelector);

  return (
    <div className={`group relative text-slate-500 ${requests.length ? "new" : ""}`}>
      <div className="ml-2 flex cursor-pointer items-center text-3xl group-hover:text-blue-500">
        <ion-icon name="notifications"></ion-icon>
      </div>
      <div className="absolute top-0 left-full hidden w-[30rem] grid-cols-1 gap-2 rounded-lg bg-white p-4 shadow-lg group-hover:grid">
        {requests.length ? (
          requests.map((request) => <Request key={request._id} data={request} />)
        ) : (
          <div className="flex w-full items-center justify-center italic text-slate-400">No requests</div>
        )}
      </div>
    </div>
  );
};

export default Requests;
