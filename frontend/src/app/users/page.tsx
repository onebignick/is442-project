import { UserDataTable } from "@/components/datatables/users/UserDataTable";
import { UserDataTableColumns } from "@/components/datatables/users/UserDataTableColumns";
import { FormDialogButton } from "@/components/form-dialog-button";
import { CreateUserForm } from "@/components/forms/create-user-form";
import { BreadcrumbComponent } from '@/components/breadcrumb-component';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UserPage() {
    try {
        const breadcrumbItems = [
            { label: "Home", href: "/" },
            { label: "Users", href: "/users" },
        ]
    
        const req = await fetch("http://localhost:8080/api/users", {
            method: "GET"
        })
        
        if (req.ok) {
            const users = await req.json();
            
            return (
                <>
                    <BreadcrumbComponent items={breadcrumbItems} />
                    <div className="grid grid-cols-12 gap-4">
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>
                                    Create a user
                                </CardTitle>
                                <CardDescription>
                                    Click below to use our form to create a new user!       
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <FormDialogButton
                                    title="Create a user"
                                    label="Create a user"
                                    description="Fill in the form below to create a new user"
                                    form={<CreateUserForm/>}
                                />
                            </CardFooter>
                        </Card>

                        <Card className="col-span-12">
                            <CardHeader>
                                <CardTitle>
                                    All Users
                                </CardTitle>
                                <CardDescription>
                                    See all user information here
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <UserDataTable columns={UserDataTableColumns} data={users}/>
                            </CardContent>
                        </Card>
                    </div>
                </>
            )
        }
    }

    catch {
        return (
            <p> An error occured :( </p>
        )
    }
}