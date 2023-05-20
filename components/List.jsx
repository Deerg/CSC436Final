import { getList } from "csc-start/utils/data";
import Facebook from "../images/facebook.svg";
import Snapchat from "../images/snapchat.svg";
import Twitter from "../images/twitter.svg";
import Instagram from "../images/instagram.svg";
import Image from "next/image";

const List = async ({user_id}) => {
  const {data: listname} = await getList(user_id);

  return (
    <div className="barge flex gap-[24px] py-[60px] justify-center gap-[43px] items-center flex">
        {Array.isArray(listname) && listname.map((list) => {
                return (
                  <a key={list.id} href={`.../list/${list.listname}`}>
                    {list.id}: {list.listname}
                  </a>
                );
              })}
    </div>


  );
};

export default List;
