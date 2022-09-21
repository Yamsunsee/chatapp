import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import Lobby from "./routes/Lobby";
import Chatroom from "./routes/Chatroom";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="bg-texture flex min-h-screen w-full select-none justify-center">
      <div className="flex w-full max-w-[120rem] items-center justify-center">
        <Routes>
          <Route path="yamess/signup" element={<Signup />} />
          <Route path="yamess/signin" element={<Signin />} />
          <Route path="yamess" element={<Lobby />} />
          <Route path="yamess/chatroom" element={<Chatroom />} />
        </Routes>
        <ToastContainer limit={3} autoClose={2000} position="top-right" draggable={false} />
      </div>
    </div>
  );
};

export default App;

