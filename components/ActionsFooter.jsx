"use client";
import { useEffect, useState } from "react";
import useUser from "csc-start/hooks/useUser";
import Link from "next/link";
import { getName } from "csc-start/utils/data";

const ActionsFooter = () => {
  const [currentList, setCurrentList] = useState([]);
  const getNameByID = async () => {
    try {
      const { data: tempCurrentList } = await getName(user.id);
      setCurrentList(tempCurrentList);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getNameByID();
  });

  const { user, loading } = useUser();
  if (loading) {
    return <p className="barge">Loading</p>;
  }

  if (!user) {
    // user is not logged in
    return (
      <div className="flex justify-between text-white mr-8">
        <div className="m-5">
          <Link href="/login">Login</Link>
        </div>
        <div className="m-5">
          <Link href="/register">Register</Link>
        </div>
      </div>
    );
  }

  // user is logged in
  return (
    <div className="flex justify-center text-white">
      <div className="m-5">
        <Link
          className="hover:text-brutal-yello duration-300 transition-all"
          href="/"
        >
          {currentList.map((item) => {
            return <a key={item.name}>{item.name}</a>;
          })}
        </Link>
      </div>
      <div className="m-5">
        <Link href="/list/create">Create</Link>
      </div>
      <div className="m-5">
        <Link href="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default ActionsFooter;
