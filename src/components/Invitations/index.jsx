import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getByUserId } from "../../redux/APIs/invitationAPIs";
import { invitationsSelector, userSelector } from "../../redux/selectors.js";
import Invitation from "./Invitation.jsx";

const Invitations = () => {
  const dispatch = useDispatch();
  const { _id: userId } = useSelector(userSelector);
  const invitations = useSelector(invitationsSelector);

  useEffect(() => {
    userId && fetchInvitations();
  }, [userId]);

  const fetchInvitations = async () => {
    const result = await dispatch(getByUserId({ userId }));
    const { isSuccess, message } = unwrapResult(result);
    if (!isSuccess) {
      toast.error(message);
    }
  };

  return (
    <div className={`group relative text-slate-500 ${invitations.length ? "new" : ""}`}>
      <div className="ml-2 flex cursor-pointer items-center text-3xl group-hover:text-blue-500">
        <ion-icon name="notifications"></ion-icon>
      </div>
      <div className="absolute top-0 left-full hidden w-[30rem] grid-cols-1 gap-2 rounded-lg bg-white p-4 shadow-lg group-hover:grid">
        {invitations.length ? (
          invitations.map((invitation) => <Invitation key={invitation._id} data={invitation} />)
        ) : (
          <div className="flex w-full items-center justify-center italic text-slate-400">No invitations</div>
        )}
      </div>
    </div>
  );
};

export default Invitations;
