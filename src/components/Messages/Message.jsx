const Message = ({ data }) => {
  const self = true;

  return (
    <div className={`mt-4 flex ${self ? "justify-end" : "items-end"}`}>
      {!self && <div className="mr-2 font-bold leading-4 text-slate-500">{data.userId.name}</div>}
      <div
        className={`w-fit rounded-full bg-blue-400 px-8 py-2 font-bold text-white ${
          self ? "rounded-br-none" : "rounded-bl-none"
        }`}
      >
        {data.content}
      </div>
    </div>
  );
};

export default Message;
