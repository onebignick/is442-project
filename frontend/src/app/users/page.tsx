import { UserDataTable } from "@/components/datatables/users/UserDataTable";
import { UserDataTableColumns } from "@/components/datatables/users/UserDataTableColumns";
import { FormDialogButton } from "@/components/form-dialog-button";
import { CreateUserForm } from "@/components/forms/create-user-form";
import { UserDTO } from "@/types/UserDTO";

export default async function UserPage() {
    const req = await fetch("http://localhost:8080/api/users", {
        method: "GET"
    })
    
    if (req.ok) {
        const usersDTO = await req.json();
        for (let i=0;i<usersDTO.length;i++) {
            usersDTO[i] = new UserDTO(
                usersDTO[i].username,
                usersDTO[i].password,
                usersDTO[i].roles
            ).toUser();
        }
        
        return (
            <div>
                <FormDialogButton
                    title="Create a user"
                    label="Create a user"
                    description="Fill in the form below to create a new user"
                    form={<CreateUserForm/>}
                />
                <UserDataTable columns={UserDataTableColumns} data={usersDTO}/>
            </div>
        )
    } else {
        return (
            <p>An error occured</p>
        )
    }
}