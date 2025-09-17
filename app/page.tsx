"use client";

import { useEffect } from "react";
import { useAuth } from "./context/authContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PenTool, Layers, Repeat, Sparkles } from "lucide-react";
import { EB_Garamond } from "next/font/google";

const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function LandingPage() {
  const {user, loading} = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if(!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if(loading || user) { 
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-gray-900 flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-gray-200 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className={`${garamond.className} text-2xl font-bold text-[#6E0B14]`}>
            Turbo
          </div>

          {/* Nav + Theme Toggle */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
              <a href="#features" className="hover:text-[#6E0B14] transition">
                Features
              </a>
              <a href="#pricing" className="hover:text-[#6E0B14] transition">
                Pricing
              </a>
              <a href="#about" className="hover:text-[#6E0B14] transition">
                About
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="border-gray-900 bg-[#6E0B14] hover:bg-[#5a0910] text-gray-200"
                onClick={() => router.push("/login")}
              >
                Log in
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-grow">
        <section className="px-6 py-32 text-center">
          <h1
            className={`${garamond.className} text-6xl md:text-7xl font-bold text-[#6E0B14]`}
          >
            Turbo Assist
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-700">
            Supercharge your writing workflows. Like Google Docs—but with AI:
            version control, agentic replacements, and model-agnostic prompting.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="rounded-md px-8 py-6 text-lg font-medium bg-[#6E0B14] text-white hover:bg-[#5a0910]"
            >
              Coming Soon...
            </Button>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Features */}
        <section
          id="features"
          className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-white border border-gray-200 rounded-md shadow-sm"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <feature.icon className="w-10 h-10 text-[#6E0B14] mb-4" />
                <h3
                  className={`${garamond.className} text-xl font-semibold text-gray-900 mb-2`}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* CTA */}
        <section className="py-32 px-6 text-center">
          <h2
            className={`${garamond.className} text-4xl md:text-5xl font-bold mb-6 text-[#6E0B14]`}
          >
            Write. Rewrite. Create. With AI.
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700 mb-10">
            Turbocharge your creativity with document-native AI tools that
            empower your writing like never before.
          </p>
          <Button
            size="lg"
            className="rounded-md px-10 py-6 text-lg font-medium bg-[#6E0B14] text-white hover:bg-[#5a0910]"
          >
            Join the Beta
          </Button>
        </section>
      </main>
    </div>
  );
}

const features = [
  {
  title: "Version Control",
  description: "Track changes and roll back your documents with git-like precision.",
  icon: Layers,
  },
  {
  title: "Agentic Replacement",
  description: "Select text and let AI rewrite, refactor, or expand intelligently.",
  icon: PenTool,
  },
  {
  title: "Model Agnostic",
  description: "Choose from different LLMs and providers—your workflow, your choice.",
  icon: Repeat,
  },
  {
  title: "Creative Boost",
  description: "Brainstorm, outline, and generate in an interface made for writers.",
  icon: Sparkles,
  },
];