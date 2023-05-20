import supabase from "csc-start/utils/supabase";
import { notFound } from "next/navigation";
import { getLinksLinks, getUserBySlug,getSocialLinks } from "csc-start/utils/data";
import SocialLinks from "csc-start/components/SocialLinks";
import LinksLinks from "csc-start/components/LinksLinks";
import List from "csc-start/components/List";

const Page = async ({params: {slug}}) => {
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
        <List user_id={user_id} />
    </>
}

export default Page;