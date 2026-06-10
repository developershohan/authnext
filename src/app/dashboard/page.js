import {getServerSession} from "next-auth/next";
import {options} from "@/app/api/auth/[...nextauth]/options";


const  DashbardPage = async () => {

    const session = await getServerSession(options);

    
  return (
    <div>DashbardPage</div>
  )
}

export default DashbardPage