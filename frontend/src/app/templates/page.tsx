import { TemplateDataTable } from "@/components/datatables/templates/TemplateDataTable"
import { TemplateDataTableColumns } from "@/components/datatables/templates/TemplateDataTableColumns"
import { FormDialogButton } from "@/components/form-dialog-button"
import { CreateTemplateForm } from "@/components/forms/create-template-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TemplatesPage() {

    const req = await fetch("http://localhost:8080/api/template");
    
    if (req.ok) {
        const templates = await req.json();

        return (
            <div className="grid grid-cols-12 gap-4">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Create a newsletter template here</CardTitle>
                    </CardHeader>
                    <CardFooter>
                        <FormDialogButton
                            title="Create a template"
                            label="Create a template"
                            description="Fill in the form below to create a new template"
                            form={<CreateTemplateForm/>}
                        />
                    </CardFooter>
                </Card>
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