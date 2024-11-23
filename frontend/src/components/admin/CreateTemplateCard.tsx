"use client";

import { Card, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function CreateTemplateCard() {
    const router = useRouter();

    const handleCreateTemplate = () => {
        router.push("/apps/admin/templates/create");
    }

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Create a newsletter template here</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button onClick={handleCreateTemplate}>
                    Create a template
                </Button>
            </CardFooter>
        </Card>
    )
}