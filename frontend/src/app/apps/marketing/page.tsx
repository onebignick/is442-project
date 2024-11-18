import { TotalWebsiteVisits } from "@/components/charts/TotalWebsiteVisits";

export default function MarketingApp() {
    return (
        <div className="grid grid-cols-12 gap-4 p-8">
            <div className="col-span-12 lg:col-span-6">
                <TotalWebsiteVisits/>
            </div>
        </div>
    )
}