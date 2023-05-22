"use client"

import useUserMustBeUser from "csc-start/hooks/useUserMustBeUser";
import useUser from "csc-start/hooks/useUser";
import { getCurrentUser,getItemFromList} from "csc-start/utils/data";
import { useState, useEffect } from "react";
import useUserMustBeLogged from "csc-start/hooks/useUserMustBeLogged";
const Item = (props) => {

  const {listid, user_id, slug} = props;
  const [currentList, setCurrentList] = useState([]);
  const [currentUserID, setCurrentUserID] = useState("");
  const {user, refreshUser, error, loading } = useUser();
  useUserMustBeUser(currentUserID, user_id, `/user/${slug}/list/${listid}/edit`);

  useEffect(() => {

    getItems();
  },);

  const getItems = async () => {
    try {
      const {data: tempCurrentList} = await getItemFromList(listid);
      setCurrentList(tempCurrentList);
      setCurrentUserID(user.id);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };
  return (
    <div className="barge flex gap-[24px] py-[60px] justify-center gap-[43px] items-center flex">
         <tbody>
            {Array.isArray(currentList) && currentList.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.order}:</td>
                    <td>{item.item}</td>
                    <td>{item.complete}</td>
                  </tr>
                );
              })}
            </tbody>
              <a href={`./${listid}/edit`}>EDIT</a>
    </div>
  );
};
export default Item;
