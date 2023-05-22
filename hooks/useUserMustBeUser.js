"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useUserMustBeUser = (userId, expectedUserId, url = "/") => {
  const router = useRouter();
  useEffect(() => {
    if (userId === undefined) {
      return;
    }
    if(userId!=expectedUserId){
      router.push(url);
    }
  }, [userId, expectedUserId, router, url]);
};

export default useUserMustBeUser;
