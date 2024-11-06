import { UserDataTable } from "@/components/datatables/users/UserDataTable";
import { UserDataTableColumns } from "@/components/datatables/users/UserDataTableColumns";

export default async function UserPage() {
    const req = await fetch("http://localhost:8080/api/users", {
        method: "GET"
    })
    
    if (req.ok) {
        const users = await req.json();
        
        return (
            <div>
                <UserDataTable columns={UserDataTableColumns} data={users}/>
            </div>
        )
    } else {
        return (
            <p>An error occured</p>
        )
    }
}