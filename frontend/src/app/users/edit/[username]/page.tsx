import { EditUserForm } from "@/components/forms/edit-user-form";

export default async function EditUserPage({ params } : { params: { username: string }}) {
    const res = await fetch("http://localhost:8080/api/user/" + params.username, {
        method: "GET"
    })
    
    if (res.ok) {
        const targetUser = await res.json();
        return (
            <div>
                <EditUserForm targetUser={targetUser}/>
            </div>
        )
    } else {
        return (
            <p>user not found</p>
        )
    }
}