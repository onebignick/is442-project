import { TemplateDataTable } from "@/components/datatables/templates/TemplateDataTable"
import { TemplateDataTableColumns } from "@/components/datatables/templates/TemplateDataTableColumns"
import { FormDialogButton } from "@/components/form-dialog-button"
import { CreateTemplateForm } from "@/components/forms/create-template-form"

export default async function TemplatesPage() {

    const req = await fetch("http://localhost:8080/api/template");
    
    if (req.ok) {
        const templates = await req.json();

        return (
            <div>
                <FormDialogButton
                    title="Create a template"
                    label="Create a template"
                    description="Fill in the form below to create a new template"
                    form={<CreateTemplateForm/>}
                />
                <TemplateDataTable columns={TemplateDataTableColumns} data={templates}/>
            </div>
        )
    } else {
        return (
            <div>Unable to retrieve data please try again</div>
        )
    }
}