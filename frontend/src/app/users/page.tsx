import { UserDataTable } from "@/components/datatables/users/UserDataTable";
import { UserDataTableColumns } from "@/components/datatables/users/UserDataTableColumns";

export default function UserPage() {
    const users = [
        {
            username: "nicholas",
            password: "ong",
            roles: ["admin"]
        },
        {
            username: "sherry",
            password: "koo",
            roles: ["marketing"]
        },
        {
            username: "danelle",
            password: "goh",
            roles: ["sales"]
        },
        {
            username: "dexter",
            password: "chua",
            roles: ["sales", "marketing"]
        },
        {
            username: "hao ran",
            password: "tong",
            roles: ["admin", "marketing"]
        },
    ]
    return (
        <div>
            <UserDataTable columns={UserDataTableColumns} data={users}/>
        </div>
    )
}