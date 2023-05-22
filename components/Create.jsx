"use client";

import useUser from "csc-start/hooks/useUser";
import useUserMustBeLogged from "csc-start/hooks/useUserMustBeLogged";
import { addNewList } from "csc-start/utils/data";
import { useState, useEffect } from "react";

const Profile = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [listname, setListname] = useState("");
  const [linkType, setLinkType] = useState("link");
  const [currentLinks, setCurrentLinks] = useState([]);

  // the user hook, will, provide us with the following, and it is completely abstracted away
  //  - user, and update whenever it's changed (undefined if loading, set if loaded)

  const { user, refreshUser, error, loading } = useUser();
  // we removed the useUser in the userMustBeLogged component, and now are supplying the user
  useUserMustBeLogged(user, "in", "/login");

  useEffect(() => {
    if (user) {
      let tempCurrentLinks = user.listAuthor;
      setCurrentLinks(tempCurrentLinks);
    }
  }, [user, linkType]);


  const addList = async (e) => {
    e.preventDefault();
    const order = currentLinks.length + 1;
    const addedLink = await addNewList(user.id, listname);
    if (addedLink.success == false) {
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

          <p className="h2 my-5">
            Currently Viewing <span className="capitalize"></span>{" "}
            Lists
          </p>
          <table>
            <thead>

            </thead>
            <tbody>
            {currentLinks.map((list) => {
                return (
                  <tr key={list.id}>
                    <td> {list.id}: {list.listname}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <form onSubmit={addList}>
            <p className="h2">Add New List</p>
            <p className="my-5">
              <label htmlFor="Name" className="inline-block w-[75px]">
                Listname
              </label>
              <input
                id="listname"
                className="border border-2 border-black px-2"
                value={listname}
                onChange={(e) => setListname(e.target.value)}
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

export default Profile;
