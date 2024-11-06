import { EditUserForm } from "@/components/forms/edit-user-form";
import { User } from "@/types/User";

export default async function EditUserPage({ params } : { params: { username: string }}) {

    const res = await fetch("http://localhost:8080/api/user/" + params.username, {
        method: "GET"
    })
    
    if (res.ok) {
        const response = await res.json();
        
        return (
            <EditUserForm targetUser={response as User}/>
        )
    } else {
        return (
            <p>user not found</p>
        )
    }
}