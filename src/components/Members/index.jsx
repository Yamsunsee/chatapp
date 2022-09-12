import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getManyById } from "../../redux/APIs/userAPIs";
import { currentUser } from "../../redux/selectors";
import { toast } from "react-toastify";
import Member from "./Member";

const Members = ({ online, joined }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(currentUser);
  const [joinedMembers, setJoinedMembers] = useState([]);
  const [idleMembers, setIdleMembers] = useState([]);

  console.log({ joinedMembers, idleMembers });

  useEffect(() => {
    const idle = online.filter((member) => !joined?.includes(member));
    fetchJoinedMembers(joined);
    fetchIdleMembers(idle);
  }, [online, joined]);

  const fetchJoinedMembers = async (userIdList) => {
    const result = await dispatch(getManyById({ accessToken, userIdList }));
    const { isSuccess, message, data } = unwrapResult(result);
    if (isSuccess) {
      setJoinedMembers(data);
    } else {
      toast.error(message);
    }
  };

  const fetchIdleMembers = async (userIdList) => {
    const result = await dispatch(getManyById({ accessToken, userIdList }));
    const { isSuccess, data } = unwrapResult(result);
    if (isSuccess) {
      setIdleMembers(data);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="h-full w-full overflow-scroll">
      <div>
        {joinedMembers.map((joinedUser) => (
          <Member key={joinedUser.name} data={joinedUser} isJoined={true} />
        ))}
      </div>
      <div className="my-8 h-2 rounded-full bg-blue-200"></div>
      <div>
        {idleMembers.length
          ? idleMembers.map((idleUser) => (
              <Member
                key={idleUser.name}
                data={idleUser}
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
