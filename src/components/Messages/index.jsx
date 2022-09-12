import Message from "./Message";
import PendingMessage from "./PendingMessage";

const Messages = ({ messages, pendingMessages }) => {
  return (
    <div className="my-4 flex flex-grow flex-col-reverse overflow-auto">
      {pendingMessages.map((message, index) => (
        <PendingMessage key={index + message} data={message} />
      ))}
      {messages.map((message) => (
        <Message key={message._id} data={message} />
      ))}
    </div>
  );
};

export default Messages;
