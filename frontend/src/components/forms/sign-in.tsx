"use client"

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SignInForm() {
    return (
        <SignIn.Root>
            <SignIn.Step name="start" className="w-xl">
                <Card className="border-0">
                    <CardHeader>
                        <CardTitle className="text-5xl">
                            <h1>Hey there! 👋</h1>
                        </CardTitle>
                        <CardDescription>
                            Sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center gap-4">

                    <Clerk.Field name="identifier">
                        <Clerk.Input asChild>
                            <Input type="email" placeholder="Enter your email here"/>
                        </Clerk.Input>
                        <Clerk.FieldError/>
                    </Clerk.Field>

                    <Clerk.Field name="password">
                        <Clerk.Input asChild>
                            <Input type="password" placeholder="Enter your password here"/>
                        </Clerk.Input>
                        <Clerk.FieldError/>
                    </Clerk.Field>
                    <SignIn.Action navigate="forgot-password" className="text-left">Forgot Password?</SignIn.Action>

                    <SignIn.Action submit asChild>
                        <Button className="bg-coral text-black hover:bg-coral/70">Continue</Button>
                    </SignIn.Action>
                    </CardContent>
                </Card>
            </SignIn.Step>
        </SignIn.Root>
    )
}