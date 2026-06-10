import {getServerSession} from "next-auth/next";
import {options} from "@/app/api/auth/[...nextauth]/options";

const PostsPage = async () => {
  const session = await getServerSession(options);

  return (
    <div>PostsPage</div>
  )
}

export default PostsPage