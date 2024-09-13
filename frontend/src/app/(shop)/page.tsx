import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function App() {
  return (
    <div className="flex flex-col h-full justify-center p-10 gap-4">
      <h1 className="font-bold text-6xl text-center">DISCOVER EXTRA VIRGIN OLIVE OIL GIFT IDEAS</h1>
      <div className="flex flex-row justify-center">
        <Button asChild>
          <Link href="/sg">Shop Now</Link>
          </Button>
      </div>
    </div>
  );
}