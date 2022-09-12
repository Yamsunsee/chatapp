import { useSelector } from "react-redux";
import { currentUser } from "../../redux/selectors";
import Id from "../Utilities/Id";

const UserOptions = () => {
  const { _id: userId, nickname } = useSelector(currentUser);

  return (
    <div className="group relative z-20 font-bold text-slate-500">
      <div className="ml-2 flex cursor-pointer items-center text-3xl group-hover:text-blue-500">
        <ion-icon name="ellipsis-vertical"></ion-icon>
      </div>
      <div className="absolute top-0 right-full hidden w-[30rem] grid-cols-1 gap-2 rounded-lg bg-white p-4 shadow-lg group-hover:grid">
        <div className="flex items-end justify-between border-b-2 border-slate-100 p-4 text-2xl">
          <div className="text-blue-400">{nickname}</div>
          <Id data={userId} title="User ID" />
        </div>
        <div className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-blue-400 hover:bg-blue-50">
          Change Nickname
          <div className="text-xl">
            <ion-icon name="person"></ion-icon>
          </div>
        </div>
        <div className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-red-400 hover:bg-red-50">
          Delete Account
          <div className="text-xl">
            <ion-icon name="trash"></ion-icon>
          </div>
        </div>
        <div className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-orange-400 hover:bg-orange-50">
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
