import { User } from "@/types/User"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface IndividualUserCardProps {
    className: string;
    user: User;
}

export function IndividualUserCard({ className, user } : IndividualUserCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>View current user information</CardDescription>
            </CardHeader>
            <CardContent>
                username: {user.username},
                password: {user.password},
                roles: {user.roles},
            </CardContent>
        </Card>
    )
}