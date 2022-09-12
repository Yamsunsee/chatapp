import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { signIn } from "../redux/APIs/userAPIs";
import { currentUser, enterStatus } from "../redux/selectors";

import signInImage from "../assets/images/signin.png";
import Logo from "../components/Utilities/Logo";
import { changeUser } from "../redux/lobbySlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signedInUser = useSelector(currentUser);
  const { signIn: signInStatus } = useSelector(enterStatus);

  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    signedInUser.name && navigate("/yamess");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData);

    const pattern = /\W/g;
    if (user.name.length < 3 || pattern.test(user.name))
      return toast.error("Username must be at least 3 characters long and contain only a-z, A-Z, 0-9 or _ characters!");

    if (user.password.length < 6 || pattern.test(user.password))
      return toast.error("Password must be at least 6 characters long and contain only a-z, A-Z, 0-9 or _ characters!");

    const result = await dispatch(signIn({ user }));
    const { isSuccess, message, data } = unwrapResult(result);
    if (isSuccess) {
      dispatch(changeUser(data));
      navigate("/yamess");
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="h-[32rem] w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg 2xl:h-[40rem] 2xl:max-w-5xl">
      <div className="flex h-full">
        <div className="w-96 overflow-hidden rounded-lg bg-slate-300 2xl:w-[28rem]">
          <img className="h-full w-full object-cover" src={signInImage} alt="image" />
        </div>
        <div className="ml-8 flex flex-grow flex-col justify-between">
          <Logo />
          <div className="flex w-full flex-col">
            <div className="text-4xl font-bold text-slate-600">Login to chat</div>
            <div className="mt-1 flex">
              <div className="mr-2 font-bold uppercase text-slate-400">Not a member?</div>
              <Link to="/yamess/signup">
                <div className="cursor-pointer font-bold uppercase text-blue-500 hover:text-blue-600">Sign up</div>
              </Link>
            </div>
            <form id="form" onSubmit={handleSubmit} className="mt-8">
              <div>
                <div className="text-sm font-bold text-slate-400">Name</div>
                <input
                  name="name"
                  className="w-full border-b p-4 font-light text-slate-400 placeholder:text-slate-300 focus:outline-none"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="off"
                  autoFocus
                />
              </div>
              <div className="mt-4">
                <div className="text-sm font-bold text-slate-400">Password</div>
                <div className="relative">
                  <input
                    name="password"
                    className="w-full border-b p-4 font-light text-slate-400 placeholder:text-slate-300 focus:outline-none"
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="off"
                  />
                  <div
                    onClick={() => setIsShowPassword((previousState) => !previousState)}
                    className="transfrom absolute bottom-1 right-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-xl text-slate-300"
                  >
                    <ion-icon name={isShowPassword ? "eye-off" : "eye"}></ion-icon>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {signInStatus ? (
            <button className="mt-12 flex w-fit cursor-wait items-center self-center rounded-full bg-blue-500 px-6 py-4 text-white hover:bg-blue-600">
              <div className="spin mr-2 flex items-center text-xl">
                <ion-icon name="reload-circle"></ion-icon>
              </div>
              <div className="font-bold ">Joining...</div>
            </button>
          ) : (
            <button
              type="submit"
              form="form"
              className="mt-12 flex w-fit cursor-pointer items-center self-center rounded-full bg-blue-500 px-6 py-4 text-white hover:bg-blue-600"
            >
              <div className="mr-2 flex items-center text-xl">
                <ion-icon name="enter"></ion-icon>
              </div>
              <div className="font-bold ">Join lobby</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
