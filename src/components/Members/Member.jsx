import { useSelector } from "react-redux";
import { roomSelector } from "../../redux/selectors";

const Members = ({ data, isJoined, isInvited, toggleInvite }) => {
  const { hostId } = useSelector(roomSelector);

  return (
    <div className="mt-4 flex w-full items-center justify-center rounded-full bg-blue-400 py-4 text-center text-2xl font-bold text-white hover:bg-blue-500">
      <div className="mr-4">{data.nickname}</div>
      {isJoined ? (
        <div className="rounded-full bg-white px-4 py-2 text-sm text-blue-400 shadow-lg">
          {data._id === hostId ? "Host" : "Joined"}
        </div>
      ) : isInvited ? (
        <div
          onClick={() => toggleInvite(data._id, true)}
          className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm text-blue-400 shadow-lg hover:text-red-500"
        >
          Invited
        </div>
      ) : (
        <div
          onClick={() => toggleInvite(data._id, false)}
          className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm text-blue-400 shadow-lg hover:text-green-500"
        >
          Invite
        </div>
      )}
    </div>
  );
};

export default Members;
