"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useUserMustBeUser = (userId, expectedUserId, dest = "/") => {
  const router = useRouter();

  useEffect(() => {
    if (userId === undefined) {
      return;
    }
    if(userId === expectedUserId){
      router.push(dest);
    }
  }, [userId, expectedUserId, router, dest]);
};

export default useUserMustBeUser;
