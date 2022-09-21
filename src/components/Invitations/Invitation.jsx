const Invitation = ({ data }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-lg px-4 py-2 hover:bg-blue-50">
      <div className="mr-4 italic text-slate-400">
        <span className="font-bold text-blue-400">{data.userId.name}</span>
        {" invited you to join room "}
        <span className="font-bold text-blue-400">{data.roomId.name}</span>
      </div>
      <div className="flex items-center">
        <div
          onClick={() => console.log("accept", data._id)}
          className="mr-2 flex cursor-pointer items-center text-3xl text-green-300 hover:text-green-400"
        >
          <ion-icon name="checkmark-circle"></ion-icon>
        </div>
        <div
          onClick={() => console.log("decline", data._id)}
          className="flex cursor-pointer items-center text-3xl text-red-300 hover:text-red-400"
        >
          <ion-icon name="close-circle"></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
