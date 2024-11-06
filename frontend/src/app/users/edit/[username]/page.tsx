import { EditUserForm } from "@/components/forms/edit-user-form";
import { User } from "@/types/User";
import { UserDTO } from "@/types/UserDTO";

export default async function EditUserPage({ params } : { params: { username: string }}) {
    const res = await fetch("http://localhost:8080/api/user/" + params.username, {
        method: "GET"
    })
    
    if (res.ok) {
        const response = await res.json();
        const userDTO: UserDTO = new UserDTO(response.username, response.password, response.roles);
        const targetUser: User = userDTO.toUser();
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