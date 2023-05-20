"use client";

import useUser from "csc-start/hooks/useUser";
import Link from "next/link";

const ActionsFooter = () => {
  const { user, loading } = useUser();
  if (loading) {
    return <p className="barge">Loading</p>;
  }
  if (!user) {
    // user is not logged in
    return (
      <div className="flex justify-between text-white">
        <div className="m-2">
          <Link href="/login">Login</Link>
        </div>
        <div className="m-2">
          <Link href="/register">Register</Link>
        </div>
      </div>
    );
  }
  // user is logged in
  return (
    <div className="flex justify-between text-white">
      <div className="m-2">
        <Link href="/list/create">Create</Link>
      </div>
      <div className="m-2">
        <Link href="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default ActionsFooter;
