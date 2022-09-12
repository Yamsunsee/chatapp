import NewRoom from "./NewRoom";
import Room from "./Room";

const Rooms = ({ rooms, isNewRoom, isRequest }) => {
  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {isNewRoom && <NewRoom />}
      {rooms.map((room) => (
        <Room key={room._id} room={room} isRequest={isRequest} />
      ))}
    </div>
  );
};

export default Rooms;
