import { EditTemplateForm } from "@/components/forms/edit-template-form";


export default async function TemplatePage({ params } : { params: { templateId: string }}) {

    const res = await fetch("http://localhost:8080/api/template/" + params.templateId, {
        method: "GET"
    })
    
    if (res.ok) {
        const template = await res.json();

        return (
            <div>
                <EditTemplateForm targetTemplate={template}/>
            </div>
        )
    } else {
        return (
            <p>template not found</p>
        )
    }
}