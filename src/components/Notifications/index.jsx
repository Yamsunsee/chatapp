import Notification from "./Notification.jsx";

const Notifications = ({ data, isUsers, handleResponse = null }) => {
  return (
    <div className={`group relative text-slate-500 ${data.length ? "new" : ""}`}>
      <div className="ml-2 flex cursor-pointer items-center text-3xl group-hover:text-blue-500">
        <ion-icon name="notifications"></ion-icon>
      </div>
      <div className="absolute top-0 left-full hidden w-[30rem] grid-cols-1 gap-2 rounded-lg bg-white p-4 shadow-lg group-hover:grid">
        {data.length ? (
          data.map((notification) => (
            <Notification
              key={notification._id}
              data={notification}
              isUsers={isUsers}
              handleResponse={handleResponse}
            />
          ))
        ) : (
          <div className="flex w-full items-center justify-center italic text-slate-400">
            {isUsers ? "No requests" : "No invitations"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
