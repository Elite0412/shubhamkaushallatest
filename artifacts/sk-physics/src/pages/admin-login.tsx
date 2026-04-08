import { useState } from "react";
import { useLocation } from "wouter";
import { BookOpen, Lock, LogIn } from "lucide-react";
import { useAdminLogin } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const loginMutation = useAdminLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    loginMutation.mutate(
      { data: { password } },
      {
        onSuccess: (data) => {
          if (data.success && data.token) {
            localStorage.setItem("sk_admin_token", data.token);
            toast({
              title: "Login Successful",
              description: "Welcome to the admin dashboard.",
            });
            setLocation("/admin/dashboard");
          } else {
            toast({
              variant: "destructive",
              title: "Login Failed",
              description: "Invalid password provided.",
            });
          }
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Incorrect password or server error.",
          });
        },
      }
    );
  };

  // If already logged in, redirect
  if (typeof window !== "undefined" && localStorage.getItem("sk_admin_token")) {
    setLocation("/admin/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl shadow-sky-900/10 border-sky-100 rounded-3xl overflow-hidden">
        <div className="bg-sky-950 p-8 text-center text-white">
          <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
            <Lock size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl font-bold mb-2">Admin Portal</CardTitle>
          <CardDescription className="text-sky-200">
            Secure login for SK Physics management
          </CardDescription>
        </div>
        
        <CardContent className="p-8 bg-white">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-sky-900">
                Admin Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-sky-50 border-sky-100 focus-visible:ring-cyan-500"
                autoFocus
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-cyan-600 hover:bg-cyan-700" 
              disabled={loginMutation.isPending || !password}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2">Logging in...</span>
              ) : (
                <span className="flex items-center gap-2"><LogIn size={18} /> Login to Dashboard</span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}