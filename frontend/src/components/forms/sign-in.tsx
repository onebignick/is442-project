"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/user/login", { email, password });

            if (response.status === 200) {
                router.push("/users");
            }
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="border-0">
                <CardHeader>
                    <CardTitle className="text-5xl">
                        <div> Hey there! 👋 </div>
                    </CardTitle>

                    <CardDescription className="text-2xl">
                        Sign in to your account
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col justify-center gap-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Enter your email here"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <Input
                            type="password"
                            placeholder="Enter your password here"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <Button type="submit" className="bg-background text-black hover:bg-background/70">
                        Continue
                    </Button>
                </CardContent>

            </Card>
        </form>
    );
}
