"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface PasscodeInputProps {
  onCorrectPasscode: () => void;
  partnerName?: string;
  partnerLogo?: string;
  slug: string;
}

export default function PasscodeInput({
  onCorrectPasscode,
  partnerName,
  partnerLogo,
  slug,
}: PasscodeInputProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a small delay for security
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const response = await fetch("/api/verify-passcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passcode, slug }),
      });

      if (response.ok) {
        onCorrectPasscode();
      } else {
        setError("Code d'accès incorrect");
        setPasscode("");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5); // Only numbers, max 5 digits
    setPasscode(value);
    setError("");
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl p-8">
        {/* Header with logos */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="/Logo White.svg"
                alt="Pixl Logo"
                width={32}
                height={32}
              />
              <span className="text-lg font-bold text-foreground">Pixl</span>
            </div>

            {partnerLogo && (
              <>
                <span className="text-xl font-bold text-pixl-teal">×</span>
                <div className="flex items-center gap-2">
                  <Image
                    src={partnerLogo}
                    alt={`${partnerName} Logo`}
                    width={32}
                    height={32}
                    className="rounded"
                  />
                  <span className="text-lg font-bold text-foreground">
                    {partnerName}
                  </span>
                </div>
              </>
            )}
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            Accès sécurisé
          </h1>
          <p className="text-muted-foreground text-sm">
            Veuillez entrer le code d&apos;accès à 5 chiffres pour voir cette
            présentation
          </p>
        </div>

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="• • • • •"
              value={passcode}
              onChange={handlePasscodeChange}
              className="text-center text-2xl tracking-[0.5em] font-mono"
              maxLength={5}
              autoComplete="off"
              autoFocus
            />
            {error && (
              <p className="text-destructive text-sm mt-2 text-center">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={passcode.length !== 5 || isLoading}
          >
            {isLoading ? "Vérification..." : "Accéder à la présentation"}
          </Button>
        </form>

        {/* Security notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 Cette présentation est protégée et confidentielle
          </p>
        </div>
      </div>
    </div>
  );
}
