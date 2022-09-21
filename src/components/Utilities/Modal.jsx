import { useEffect, useState } from "react";

const Modal = ({ toggle, type }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("blue");

  useEffect(() => {
    switch (type) {
      case "join":
        setColor("green");
        setText("Joining...");
        break;

      case "leave":
        setColor("orange");
        setText("Leaving...");
        break;

      case "send":
        setColor("orange");
        setText("Sending request...");
        break;

      case "wait":
        setColor("orange");
        setText("Wating for the host's response...");
        break;

      case "delete":
        setColor("red");
        setText("Deleting...");
        break;

      default:
        break;
    }
  }, [type]);

  return (
    <>
      {toggle && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center text-xl font-bold text-${color}-400 ${
            type !== "all" ? "bg-texture" : ""
          }`}
        >
          {type !== "all" && (
            <>
              <div className="spin mr-2 flex items-center">
                <ion-icon name="reload-circle"></ion-icon>
              </div>
              <div>{text}</div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Modal;
