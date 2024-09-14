import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const description =
  "Login with you Google account to access your email inbox.";
export default function LoginForm() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button className="w-full">Login with Google</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
