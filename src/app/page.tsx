import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, AlertCircle, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 text-indigo-600">
          <MapPin className="h-6 w-6" />
          <span className="font-bold text-xl">Civic Connect</span>
        </div>
        <nav className="flex gap-4">
          <Link href="/issues">
            <Button variant="ghost">Browse Issues</Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" className="text-slate-500">Admin</Button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 mb-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">

          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              Report <span className="text-indigo-600">Local Issues.</span><br />
              Improve Your City.
            </h1>
            <p className="text-lg text-slate-600 max-w-lg">
              Civic Connect empowers you to report potholes, broken streetlights, and other civic issues directly to your local government for faster resolution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-2 text-slate-600">
                <AlertCircle className="h-5 w-5 text-indigo-500" />
                <span>Snap a photo</span>
              </div>
              <div className="hidden sm:block text-slate-300">•</div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="h-5 w-5 text-indigo-500" />
                <span>Tag location</span>
              </div>
              <div className="hidden sm:block text-slate-300">•</div>
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="h-5 w-5 text-indigo-500" />
                <span>Track status</span>
              </div>
            </div>
          </div>

          {/* Login / Signup Card */}
          <Card className="w-full max-w-md mx-auto shadow-xl border-slate-200/60">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account or continue as a guest to report an issue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Link href="/dashboard" className="block w-full pt-2">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Sign In (Mock)</Button>
              </Link>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
              </div>

              <Link href="/dashboard" className="block w-full">
                <Button variant="outline" className="w-full">Continue as Guest</Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
