import { useEffect, useState } from "react";

const Modal = ({ toggle, type, cancle, isCancle }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("blue");

  useEffect(() => {
    switch (type) {
      case "create":
        setColor("blue");
        setText("Creating...");
        break;

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
          {type !== "all" && type !== "wait" && (
            <>
              <div className="spin mr-2 flex items-center">
                <ion-icon name="reload-circle"></ion-icon>
              </div>
              <div>{text}</div>
            </>
          )}
          {type === "wait" && (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center">
                <div className="spin mr-2 flex items-center">
                  <ion-icon name="reload-circle"></ion-icon>
                </div>
                <div>{isCancle ? "Cancling request..." : text}</div>
              </div>
              <div
                onClick={cancle}
                className="mt-4 cursor-pointer rounded-lg bg-orange-400 px-8 py-4 text-white hover:bg-orange-500"
              >
                Cancle
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Modal;
