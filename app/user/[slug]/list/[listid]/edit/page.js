
import { notFound } from "next/navigation";
import { getItemByListID, getUserBySlug } from "csc-start/utils/data";
import Edit from "csc-start/components/Edit";
const Page = async (props) => {
        const {params: {slug, listid}} = props;
        
        const{data, error, success} = await getItemByListID(listid);
        const{userData, userError, userSuccess} = await getUserBySlug(slug);
        if(!!error){
            return <p>{error.message}</p>
        }
        
        if(!data){
            notFound();
        }
        if(!!error){
            return <p>{error.message}</p>
        }
        return <>
           <Edit listId = {listid} slug={slug}></Edit>
        </>
}

export default Page;