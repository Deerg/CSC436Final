import { getList } from "csc-start/utils/data";

const List = async (props) => {
  const { user_id, slug } = props;
  const {data: listname} = await getList(user_id);

  return (
    <div className="barge flex gap-[24px] py-[60px] justify-center gap-[43px] items-center flex">
        {Array.isArray(listname) && listname.map((list) => {
                return (
                  <a key={list.id} href={`./${slug}/list/${list.id}`}>
                    {list.id}: {list.listname}
                  </a>
                );
              })}
    </div>
  );
};

export default List;
