import { BreadcrumbComponent } from "@/components/breadcrumb-component";
import { TemplateDataTable } from "@/components/datatables/templates/TemplateDataTable"
import { TemplateDataTableColumns } from "@/components/datatables/templates/TemplateDataTableColumns"
import { FormDialogButton } from "@/components/form-dialog-button"
import { CreateTemplateForm } from "@/components/forms/create-template-form"
import { CreateTemplateCard } from "@/components/admin/CreateTemplateCard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const breadcrumbItems = [
    { label: "Home", href: "/apps/admin" },
];

export default async function TemplatesPage() {

    const req = await fetch("http://localhost:8080/api/template");
    
    if (req.ok) {
        const templates = await req.json();

        return (
            <div className="grid grid-cols-12 gap-4 p-8">
                <div className="col-span-12">
                    <BreadcrumbComponent items={breadcrumbItems}/>
                </div>
                <CreateTemplateCard></CreateTemplateCard>
                <Card className="col-span-12">
                    <CardHeader>
                        <CardTitle>All Newsletter Templates</CardTitle>
                        <CardDescription>View all your newsletter templates here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TemplateDataTable columns={TemplateDataTableColumns} data={templates}/>
                    </CardContent>
                </Card>
            </div>
        )

    } else {
        return (
            <div>Unable to retrieve data please try again</div>
        )
    }
}