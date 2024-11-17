import { BreadcrumbComponent } from "@/components/breadcrumb-component";
import { EditUserForm } from "@/components/forms/edit-user-form";
import { IndividualUserCard } from "@/components/user/IndividualUserCard";

const breadcrumbItems = [
    { label: "Home", href: "/apps/admin" },
    { label: "Users", href: "/apps/admin/users" },
]

interface IndividualUserPageProps {
    params: { username: string };
}

export default async function IndividualUserPage({ params } : IndividualUserPageProps) {
    const userDataResponse =  await fetch(`http://localhost:8080/api/user/${params.username}`);
    const userData = await userDataResponse.json();

    return (
        <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-12">
                <BreadcrumbComponent items={breadcrumbItems}/>
            </div>
            <IndividualUserCard className="col-span-12" user={userData}/>
            <EditUserForm className="col-span-12" targetUser={userData}/>
        </div>
    )
}