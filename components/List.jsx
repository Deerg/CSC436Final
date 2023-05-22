"use client"

import { getList } from "csc-start/utils/data";
import useUser from "csc-start/hooks/useUser";
import useUserMustBeLogged from "csc-start/hooks/useUserMustBeLogged";
import { addNewList } from "csc-start/utils/data";
import { useState, useEffect } from "react";
import Link from "next/link";

const List = (props) => {
  const { user_id, slug } = props;
  const [listname, setListname] = useState("");
  const [linkType, setLinkType] = useState("link");
  const [currentLinks, setCurrentLinks] = useState([]);

  // the user hook, will, provide us with the following, and it is completely abstracted away
  //  - user, and update whenever it's changed (undefined if loading, set if loaded)

  const { user, refreshUser, error, loading } = useUser();
  // we removed the useUser in the userMustBeLogged component, and now are supplying the user
  useEffect(() => {

    getLists();
  },);

  const getLists = async () => {
    try {
      const {data: tempCurrentList} = await getList(user_id);
      setCurrentLinks(tempCurrentList);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };
  return (
    <div className="barge flex gap-[24px] py-[60px] justify-center gap-[43px] items-center flex">
<table>
            <thead>

            </thead>
            <tbody>
            {Array.isArray(currentLinks) && currentLinks.map((list) => {
                return (
                  <tr key={list.id}>
                    <td><Link href={`/user/${slug}/list/${list.id}`}>{list.id}: {list.listname}</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
  );
};

export default List;
