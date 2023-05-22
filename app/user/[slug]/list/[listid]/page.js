
import supabase from "csc-start/utils/supabase";
import { notFound } from "next/navigation";
import { getLinksLinks, getUserBySlug,getSocialLinks, getCurrentUser } from "csc-start/utils/data";

import Item from "csc-start/components/Item";
export const revalidate = 5;

const Page = async (props) => {
    const {params: {slug, listid}} = props;
    const{data, error, success} = await getUserBySlug(slug);
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
        <Item user_id={user_id} listid={listid} slug={slug}/>
    </>
}

export default Page;