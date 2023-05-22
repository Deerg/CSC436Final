// @todo ADD ERROR HANDLING THROUGHOUT APP

import{getLatestUsers} from "csc-start/utils/data";
import Link from "next/link";
export const revalidate = 5;

export default async function Home() {
  const {success, data, error} = await getLatestUsers();

  if(error) {
    return<p>Error: {error.message} </p>
  }

  if(data.length === 0){
    return <p>No user have signed up yet</p>
  }

  return(
    <main className="barge">
    {data.map(({name, slug}) =>{
      return <Link key = {slug} href={`/user/${slug}`} className="block my-5 button small">
        {slug}
      </Link>
      
    })}

  </main>
  )
}
