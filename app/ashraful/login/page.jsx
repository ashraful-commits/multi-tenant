"use client";


import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const Login = (props) => {
  const router = useRouter();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleOnchange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
 

  const handleForm = (e) => {
    e.preventDefault();

    signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: true,
      callbackUrl: props.callbackUrl ?? "localhost:3000",
    })
      .then(() => {
        setInput({
          email: "",
          password: "",
        });
        
      })
      .catch((error) => {
        console.log(error);

      });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <div className="py-6 bg-black sm:py-8 lg:py-12">
        <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
          <h2 className="mb-4 text-2xl font-bold text-center text-white md:mb-8 lg:text-3xl">
            Login
          </h2>
          <form
            onSubmit={handleForm}
            className="mx-auto max-w-lg rounded-lg border-[2px] border-gray-800"
          >
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="email"
                  className="inline-block mb-2 text-sm text-white sm:text-base"
                >
                  Email
                </label>
                <input
                  value={input.email}
                  onChange={handleOnchange}
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 text-white transition duration-100 bg-gray-800 rounded outline-none ring-indigo-300 focus:ring"
                  placeholder="Email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="inline-block mb-2 text-sm text-white sm:text-base"
                >
                  Password
                </label>
                <input
                  value={input.password}
                  onChange={handleOnchange}
                  name="password"
                  type="password"
                  className="w-full px-3 py-2 text-white transition duration-100 bg-gray-800 rounded outline-none ring-indigo-300 focus:ring"
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-blue-500 rounded-lg outline-none hover:bg-blue-700 focus-visible:ring active:bg-blue-600 md:text-base"
              >
                Login
              </button>
              <div className="mb-3">
                <p className="py-5 text-white">
                  _______________ or sign in _______________
                </p>
                <button
                  onClick={(e) => handleGoogleLogin(e)}
                  className="flex flex-wrap justify-center w-full items-center gap-3  text-white bg-gray-900 hover:border-gray-500 px-2 py-1.5 rounded-md"
                >
                  <svg
                    version="1.1"
                    id="Icons"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                    width={14}
                    height={14}
                  >
                    <style
                      type="text/css"
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n\t.st0{fill:#FFFFFF;}\n\t.st1{fill:#3A559F;}\n\t.st2{fill:#F4F4F4;}\n\t.st3{fill:#FF0084;}\n\t.st4{fill:#0063DB;}\n\t.st5{fill:#00ACED;}\n\t.st6{fill:#FFEC06;}\n\t.st7{fill:#FF0000;}\n\t.st8{fill:#25D366;}\n\t.st9{fill:#0088FF;}\n\t.st10{fill:#314358;}\n\t.st11{fill:#EE6996;}\n\t.st12{fill:#01AEF3;}\n\t.st13{fill:#FFFEFF;}\n\t.st14{fill:#F06A35;}\n\t.st15{fill:#00ADEF;}\n\t.st16{fill:#1769FF;}\n\t.st17{fill:#1AB7EA;}\n\t.st18{fill:#6001D1;}\n\t.st19{fill:#E41214;}\n\t.st20{fill:#05CE78;}\n\t.st21{fill:#7B519C;}\n\t.st22{fill:#FF4500;}\n\t.st23{fill:#00F076;}\n\t.st24{fill:#FFC900;}\n\t.st25{fill:#00D6FF;}\n\t.st26{fill:#FF3A44;}\n\t.st27{fill:#FF6A36;}\n\t.st28{fill:#0061FE;}\n\t.st29{fill:#F7981C;}\n\t.st30{fill:#EE1B22;}\n\t.st31{fill:#EF3561;}\n\t.st32{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;}\n\t.st33{fill:#0097D3;}\n\t.st34{fill:#01308A;}\n\t.st35{fill:#019CDE;}\n\t.st36{fill:#FFD049;}\n\t.st37{fill:#16A05D;}\n\t.st38{fill:#4486F4;}\n\t.st39{fill:none;}\n\t.st40{fill:#34A853;}\n\t.st41{fill:#4285F4;}\n\t.st42{fill:#FBBC05;}\n\t.st43{fill:#EA4335;}\n",
                      }}
                    />
                    <g>
                      <path
                        className="st39"
                        d="M8.9,16c0,0.6,0.1,1.2,0.2,1.8L11,16l-1.8-1.8C9,14.8,8.9,15.4,8.9,16z"
                      />
                      <path
                        className="st40"
                        d="M16,23.1c-3.3,0-6-2.2-6.8-5.2l-6.7,6.7C5.3,29,10.3,32,16,32c3.1,0,6-0.9,8.5-2.5l-6.7-6.7
		C17.2,23,16.6,23.1,16,23.1z"
                      />
                      <path
                        className="st41"
                        d="M32,13.8c-0.1-0.5-0.5-0.8-1-0.8H16c-0.6,0-1,0.4-1,1v5c0,0.6,0.4,1,1,1h5.3c-0.9,1.4-2.2,2.3-3.5,2.8
		l6.7,6.7C29,26.7,32,21.7,32,16c0-0.3,0-0.5,0-0.7C32.1,14.9,32.1,14.4,32,13.8z"
                      />
                      <path
                        className="st42"
                        d="M8.9,16c0-0.6,0.1-1.2,0.2-1.8L2.5,7.5C0.9,10,0,12.9,0,16s0.9,6,2.5,8.5l6.7-6.7C9,17.2,8.9,16.6,8.9,16z"
                      />
                      <path
                        className="st43"
                        d="M28.5,6c-1.1-1.4-2.5-2.6-4-3.6C22,0.9,19.1,0,16,0C10.3,0,5.3,3,2.5,7.5l6.7,6.7c0.8-3,3.6-5.2,6.8-5.2
		c0.6,0,1.2,0.1,1.8,0.3c0.9,0.3,1.7,0.8,2.6,1.5c0.3,0.3,0.7,0.3,1.1,0.1l6.7-3.3c0.3-0.1,0.5-0.4,0.5-0.7
		C28.8,6.6,28.7,6.3,28.5,6z"
                      />
                    </g>
                  </svg>
                  Sign in with Google
                </button>

                <button
                  onClick={(e) => handleFacebookLogin(e)}
                  className="flex mt-2 flex-wrap justify-center w-full text-blue-500 bg-gray-900 items-center gap-3 hover:border-gray-500 px-2 py-1.5 rounded-md"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <path
                      fill="#1877F2"
                      d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"
                    />
                    <path
                      fill="#ffffff"
                      d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"
                    />
                  </svg>
                  Sign in with Facebook
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center p-4">
              <p className="text-sm text-center text-gray-500">
                Do&apos;n have an account?
                <a
                  href="/register"
                  className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
