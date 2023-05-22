
import { getItemByListID, getItemFromList, getList } from "csc-start/utils/data";

const Item = async (props) => {
  const {listid, user_id} = props;
  const {data: items} = await getItemByListID(listid);
  return (
    <div className="barge flex gap-[24px] py-[60px] justify-center gap-[43px] items-center flex">
         <tbody>
            {Array.isArray(items) && items.map((item) => {
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
