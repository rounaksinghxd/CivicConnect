"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Upload, Camera, ArrowLeft, Image as ImageIcon, X } from "lucide-react";
import { CATEGORIES, Category } from "@/lib/store";
import { addIssueAction } from "@/app/actions";
import { MapPickerWrapper } from "@/components/map/map-picker-wrapper";

export default function DashboardPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState<Category>("Other");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
    const [showMap, setShowMap] = useState(false);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setPhotoUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await addIssueAction({ title, description, location, category, photoUrl });
        setIsSubmitting(false);

        if (result.success) {
            router.push("/issues");
        } else {
            alert("Failed to submit issue. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="px-6 py-4 bg-white border-b flex justify-between items-center sticky top-0 z-10">
                <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:opacity-80 transition-opacity">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium text-slate-600 hidden sm:inline">Back Home</span>
                </Link>
                <div className="flex items-center gap-2 text-indigo-600">
                    <MapPin className="h-6 w-6" />
                    <span className="font-bold text-xl">Civic Connect</span>
                </div>
                <div className="w-20" /> {/* Spacer for centering */}
            </header>

            <main className="flex-1 p-6 lg:p-12 mb-12">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Submit an Issue</h1>
                        <p className="text-slate-500 mt-2">
                            Help us improve your neighborhood by reporting local problems.
                        </p>
                    </div>

                    <Card className="shadow-lg border-slate-200/60">
                        <CardHeader>
                            <CardTitle>Issue Details</CardTitle>
                            <CardDescription>All fields are required unless marked optional.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="space-y-2">
                                    <Label htmlFor="title">Issue Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g. Broken Streetlight"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.map(c => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Please provide details about the issue..."
                                        className="h-32"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="location"
                                            placeholder="Street address or intersection"
                                            required
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="shrink-0 gap-2"
                                            onClick={() => setShowMap(!showMap)}
                                        >
                                            <MapPin className="h-4 w-4" />
                                            <span className="hidden sm:inline">{showMap ? "Hide Map" : "Pick on Map"}</span>
                                        </Button>
                                    </div>
                                    {showMap && (
                                        <div className="mt-4">
                                            <MapPickerWrapper
                                                onLocationSelect={(addr) => {
                                                    setLocation(addr);
                                                    setShowMap(false);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Photo</Label>
                                    {photoUrl ? (
                                        <div className="relative rounded-lg overflow-hidden border border-slate-200">
                                            <img src={photoUrl} alt="Selected" className="w-full h-48 object-cover" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                                onClick={() => setPhotoUrl(undefined)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <label htmlFor="photo-upload" className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center gap-4 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                <ImageIcon className="h-6 w-6" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-slate-700">Click to upload an image</p>
                                                <p className="text-xs text-slate-500 mt-1">PNG, JPG or GIF</p>
                                            </div>
                                            <input
                                                id="photo-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handlePhotoChange}
                                            />
                                        </label>
                                    )}
                                </div>

                                <div className="pt-4 flex justify-end gap-4">
                                    <Button type="button" variant="ghost" onClick={() => router.push("/")}>Cancel</Button>
                                    <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 w-32">
                                        {isSubmitting ? "Submitting..." : "Report Issue"}
                                    </Button>
                                </div>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
