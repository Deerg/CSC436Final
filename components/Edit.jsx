"use client";

import useUser from "csc-start/hooks/useUser";
import useUserMustBeLogged from "csc-start/hooks/useUserMustBeLogged";
import { addNewList, getItemByListID, getItemFromList, addNewItem, updateComplete } from "csc-start/utils/data";
import { useState, useEffect } from "react";

const Edit = (props) => {
  const [listname, setListname] = useState("");
  const [currentList, setCurrentList] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemID, setItemID] = useState("");
  const [complete, setComplete] = useState("incomplete");
  const { user, refreshUser, error, loading } = useUser();
  // we removed the useUser in the userMustBeLogged component, and now are supplying the user
  useUserMustBeLogged(user, "in", "/login");
    
  useEffect(() => {
    getItem();
  },);
  const getItem = async () => {
    try {
      const {data: tempCurrentList} = await getItemFromList(props.listId);
      setCurrentList(tempCurrentList);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };
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

  const updateStatus = async(e) =>{
    updateComplete(e, "true");
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
          </div>
    
          <table>
            <thead>
            </thead>
            <tbody>
            {Array.isArray(currentList) && currentList.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.order}:</td>
                    <td>{item.item}</td>
                    <td>{item.complete}</td>
                    <button onClick={()=>{
                        updateComplete(item.id, "complete");
                    }}>MarkDone</button>
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
            <p className="text-center">
              <input type="submit" className="button small" />
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
