"use client";

import useUser from "csc-start/hooks/useUser";
import useUserMustBeLogged from "csc-start/hooks/useUserMustBeLogged";
import useUserMustBeUser from "csc-start/hooks/useUserMustBeUser";
import useUserNotUser from "csc-start/hooks/useUserNotUser";
import {getItemFromList, addNewItem, updateComplete, deleteItem, updateOrder, getUserBySlug } from "csc-start/utils/data";
import { useState, useEffect } from "react";

const Edit = (props) => {
  const { listId, userId, slug } = props;
  const [listname, setListname] = useState("");
  const [currentList, setCurrentList] = useState([]);
  const [owner, setOwner] = useState("");
  const [currentUserID, setCurrentUserID] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemID, setItemID] = useState("");
  const [complete, setComplete] = useState("incomplete");
  const { user, refreshUser, error, loading } = useUser();
  // we removed the useUser in the userMustBeLogged component, and now are supplying the user
  useUserMustBeLogged(user, "in", "/login");
  useUserNotUser(owner,currentUserID);
  useEffect(() => {
    getItem();
  },);
  const getOwner = async () => {
    try {
      const{data, error, success} = await getUserBySlug(slug);
      setOwner(data.user_id);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };
  const getItem = async () => {
    try {
      const {data: tempCurrentList} = await getItemFromList(listId);
      setCurrentList(tempCurrentList);
      getOwner();
      setCurrentUserID(user.id);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };
  useUserNotUser(owner,currentUserID);
  const addItem = async (e) => {
    e.preventDefault();
    const order = currentList.length + 1;
    const addedList = await addNewItem(props.listId, itemName, order, complete);
    if (addedList.success == false) {
      //handle error
      return;
    }
    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
    refreshUser();
    //handle success
  };


  return (
    <div className="barge">
      {!!error && (
        <div
          className={`bg-red-200 border-2 border-red-800 text-red-800 py-2 px-5 my-10 text-center`}
        >
          <span className="font-bold">{error.message}</span>
        </div>
      )}
      {!error && loading && <p>Loading...</p>}
      {!error && !loading && (
        <div>
          <div className="flex justify-between my-5">
          Press Down to decrease item priority(viseversa)
          </div>
    
          <table>
            <thead>
              
            </thead>
            <tbody>
            {Array.isArray(currentList) && currentList.map((item) => {
                return (
                  <tr key={item.id}>
                    <button button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full" onClick={()=>{
                        updateOrder(item.id, item.order+1);
                    }}>Down</button>
                    <button button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full" onClick={()=>{
                        updateOrder(item.id, item.order-1);
                    }}>Up</button>
                    <td>{item.order}:</td>
                    <td>{item.item}</td>
                    <td>{item.complete}</td>
                    <button  button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full" onClick={()=>{
                        updateComplete(item.id, "complete");
                    }}>MarkDone</button>
                     <button button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full" onClick={()=>{
                        deleteItem(item.id);
                    }}>DELETE</button>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <form onSubmit={addItem}>
            <p className="h2">Add New Link</p>
            <p className="my-5">
              <label htmlFor="Name" className="inline-block w-[75px]">
                Name of Item:
              </label>
              <input
                id="itemName"
                className="border border-2 border-black px-2"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                type="text"
              />
            </p>
            <button  button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit"> ADD ITEM </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
