import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps {
    className?: string;
    onChange: (dateRange: DateRange | undefined) => void;  // Accept onChange as a prop
}

export function DatePickerWithRange({
    className,
    onChange,  // Destructure onChange from props
}: DatePickerWithRangeProps) {
    const [date, setDate] = React.useState<DateRange | undefined>(undefined);

    // Handle the date selection and notify parent via onChange
    const handleDateChange = (dateRange: DateRange | undefined) => {
        setDate(dateRange);  // Update local state
        onChange(dateRange);  // Call the onChange prop passed from the parent
    };

    return (
        <div className={cn("grid gap-2", className)}>
        <Popover>
            <PopoverTrigger asChild>
            <Button
                id="date"
                variant={"outline"}
                className={cn(
                "w-[300px] justify-start text-left font-normal flex items-center gap-2",
                !date && "text-muted-foreground"
                )}
            >
                <CalendarIcon />
                {date?.from ? (
                date.to ? (
                    <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                    </>
                ) : (
                    format(date.from, "LLL dd, y")
                )
                ) : (
                <span>Pick a date</span>
                )}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateChange}  // Use handleDateChange for selection
                numberOfMonths={2}
            />
            </PopoverContent>
        </Popover>
        </div>
    );
}
