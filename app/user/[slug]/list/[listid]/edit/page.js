import Item from "csc-start/components/Item";
import Login from "csc-start/components/Login"
import supabase from "csc-start/utils/supabase";
import { notFound } from "next/navigation";
import {getUserBySlug} from "csc-start/utils/data";
import SocialLinks from "csc-start/components/SocialLinks";
import LinksLinks from "csc-start/components/LinksLinks";
import List from "csc-start/components/List";
import { getItemByListID } from "csc-start/utils/data";
import Edit from "csc-start/components/Edit";
const Page = async (props) => {
        const {params: {slug, listid}} = props;

        const{data, error, success} = await getItemByListID(listid);
        if(!!error){
            return <p>{error.message}</p>
        }
        
        if(!data){
            notFound();
        }
        if(!!error){
            return <p>{error.message}</p>
        }
        const {user_id} = data;
        return <>
           <Edit listId = {listid}></Edit>
        </>
}

export default Page;