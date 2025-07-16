"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { slideConfigurations } from "@/data/slides";

export default function SlidesIndexPage() {
  const router = useRouter();
  const [presentationName, setPresentationName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!presentationName.trim() || !passcode.trim()) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    // Check if presentation exists
    const config =
      slideConfigurations[
        presentationName
          .toLowerCase()
          .trim() as keyof typeof slideConfigurations
      ];
    if (!config) {
      setError("Présentation introuvable");
      setIsLoading(false);
      return;
    }

    try {
      // Verify passcode
      const response = await fetch("/api/verify-passcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: presentationName.toLowerCase().trim(),
          passcode: passcode.trim(),
        }),
      });

      if (response.ok) {
        // Wait a bit longer for the cookie to be properly set, then redirect
        setTimeout(() => {
          router.push(`/slides/${presentationName.toLowerCase().trim()}`);
        }, 200);
      } else {
        setError("Code d'accès incorrect");
      }
    } catch (error) {
      console.error("Access verification failed:", error);
      setError("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Image
            src="/Logo White.svg"
            alt="Pixl Logo"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-foreground">
            Pixl Presentations
          </h1>
          <p className="text-muted-foreground mt-2">
            Accédez à vos présentations sécurisées
          </p>
        </div>

        {/* Access Form */}
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">
              Accès à la présentation
            </CardTitle>
            <CardDescription className="text-center">
              Entrez le nom de la présentation et votre code d&apos;accès
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAccess} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="presentation"
                  className="text-sm font-medium text-foreground"
                >
                  Nom de la présentation
                </label>
                <Input
                  id="presentation"
                  type="text"
                  placeholder="ex: ora"
                  value={presentationName}
                  onChange={(e) => setPresentationName(e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="passcode"
                  className="text-sm font-medium text-foreground"
                >
                  Code d&apos;accès (5 chiffres)
                </label>
                <Input
                  id="passcode"
                  type="password"
                  placeholder="•••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  maxLength={5}
                  className="w-full text-center text-lg tracking-widest"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-sm text-red-500 text-center bg-red-50 dark:bg-red-950/20 p-2 rounded-md border border-red-200 dark:border-red-800">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-pixl-teal hover:bg-pixl-teal/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Vérification...
                  </div>
                ) : (
                  "Accéder à la présentation"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2025 Pixl. Toutes les présentations sont protégées.</p>
        </div>
      </div>
    </div>
  );
}
