import { useEffect, ReactNode, useState } from "react";
import { Outlet, redirect, useNavigate } from "react-router";
import { isAuth } from "~/services/auth";
import Logout from "./logout/logout";
import AuthProvider from "~/contexts/auth/authProvider";
import fbAuth, { fbStore } from "~/firebase/firebaseConfig";

export async function clientLoader() {
  // mock slow response from firebase
  // await new Promise((resolve) =>
  //   setTimeout(() => {
  //     resolve(undefined);
  //   }, 2000)
  // );
  const isLogged = await isAuth();
  if (!isLogged) {
    throw redirect("/");
  }
}

export default function LoggedWrapper({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = fbAuth.onAuthStateChanged((_user) => {
      if (!_user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthProvider>
      <div className="flex flex-col gap-2">
        <div className=" self-end">
          <Logout />
        </div>
        {/* Progress bar */}
        <Outlet />
      </div>
    </AuthProvider>
  );
}
