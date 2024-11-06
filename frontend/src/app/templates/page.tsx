import { FormDialogButton } from "@/components/form-dialog-button"
import { CreateTemplateForm } from "@/components/forms/create-template-form"

export default async function TemplatesPage() {
    console.log()
    return (
        <div>
            <FormDialogButton
                title="Create a template"
                label="Create a template"
                description="Fill in the form below to create a new template"
                form={<CreateTemplateForm/>}
            />
        </div>
    )
}