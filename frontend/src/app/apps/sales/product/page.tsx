import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SalesAppProduct() {
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <Card className="sm:col-span-2" x-chunk="chunk-0">
                    <CardHeader className="pb-3">
                        <CardTitle>Your Products</CardTitle>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Dynamic Products Dashboard for Seamless Management and Insightful Analysis.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button>Create new Product</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}