const Notification = ({ data, handleResponse, isUsers }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-lg px-4 py-2 hover:bg-blue-50">
      <div className="mr-4 italic text-slate-400">
        {!isUsers && "Someone invited you to join room "}
        <span className="font-bold text-blue-400">{data.name}</span>
        {isUsers && " asked to join your room"}
      </div>
      <div className="flex items-center">
        <div
          onClick={() => handleResponse(true, data._id)}
          className="mr-2 flex cursor-pointer items-center text-3xl text-green-300 hover:text-green-400"
        >
          <ion-icon name="checkmark-circle"></ion-icon>
        </div>
        <div
          onClick={() => handleResponse(false, data._id)}
          className="flex cursor-pointer items-center text-3xl text-red-300 hover:text-red-400"
        >
          <ion-icon name="close-circle"></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default Notification;
