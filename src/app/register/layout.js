import {getServerSession} from "next-auth/next";
import {options} from "../api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";


export default async function RegisterLayout({children}) {
    const session = await getServerSession(options);
    if (session) {
        redirect("/dashboard");
    }
    return (
        <div>
            {children}
        </div>
    )
}