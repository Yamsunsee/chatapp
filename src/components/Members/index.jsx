import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getManyById } from "../../redux/APIs/userAPIs";
import { joinedMembersSelector, idleMembersSelector } from "../../redux/selectors";
import { toast } from "react-toastify";
import Member from "./Member";

const Members = () => {
  const joinedMembers = useSelector(joinedMembersSelector);
  const idleMembers = useSelector(idleMembersSelector);

  return (
    <div className="h-full w-full overflow-scroll">
      <div>
        {joinedMembers.map((joinedUser) => (
          <Member key={joinedUser.nickname} data={joinedUser} isJoined={true} />
        ))}
      </div>
      <div className="my-8 h-2 rounded-full bg-blue-200"></div>
      <div>
        {idleMembers.length
          ? idleMembers.map((idleMember) => (
              <Member
                key={idleMember.nickname}
                data={idleMember}
                isJoined={false}
                // isInvited={invitedMemebers.includes(idleUser._id) || true}
                // toggleInvite={handleInviteUser}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Members;
