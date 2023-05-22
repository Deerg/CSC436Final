"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useUserNotUser = (userId, expectedUserId, dest = "/") => {
  const router = useRouter();

  useEffect(() => {
    if (userId === "" || expectedUserId === "") {
      return;
    }
    if(userId != expectedUserId){
      router.push(dest);
    }
  }, [userId, expectedUserId, router, dest]);
};

export default useUserNotUser;
