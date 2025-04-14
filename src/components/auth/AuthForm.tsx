
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type AuthFormProps = {
  onLogin: (userData: { username: string; password: string }) => void;
};

export default function AuthForm({ onLogin }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // For now, we'll just simulate auth since we don't have a backend
    if (isLogin) {
      onLogin({ username, password });
      toast.success("Logged in successfully");
    } else {
      // In a real app, this would create a new user
      onLogin({ username, password });
      toast.success("Account created successfully");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-warm-200 animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-serif text-center text-warm-900">
          {isLogin ? "Welcome Back" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-center text-warm-700">
          {isLogin ? "Sign in to access your photos" : "Sign up to start your photo journey"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border-warm-200 focus:border-warm-500 focus:ring-warm-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-warm-200 focus:border-warm-500 focus:ring-warm-500"
            />
          </div>
          
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-warm-200 focus:border-warm-500 focus:ring-warm-500"
              />
            </div>
          )}
          
          <Button type="submit" className="w-full bg-warm-500 hover:bg-warm-600 text-white">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="link" 
          onClick={() => setIsLogin(!isLogin)}
          className="text-warm-700 hover:text-warm-900"
        >
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
}
