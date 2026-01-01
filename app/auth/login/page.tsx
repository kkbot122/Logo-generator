"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 
import { signIn } from "next-auth/react";
// 1. Import the official Google colored logo
import { FcGoogle } from "react-icons/fc"; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F3F2ED] text-black font-sans selection:bg-black selection:text-[#F3F2ED]">
      
      {/* LEFT PANEL - BRAND */}
      <div className="hidden lg:flex w-1/2 bg-[#1a1a1a] text-[#F3F2ED] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-[#F3F2ED]/20 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="z-10 relative mt-auto mb-auto">
          <h1 className="text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
            Design <br />
            Intelligence <br />
            For The <br />
            Bold.
          </h1>
          <p className="text-neutral-400 max-w-md text-lg">
            Join designers and founders building the next generation of brands.
          </p>
        </div>

        <div className="z-10 text-xs font-bold uppercase tracking-widest text-neutral-500">
          © 2025 Aura Inc.
        </div>
      </div>

      {/* RIGHT PANEL - LOGIN ACTION */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-12 lg:p-24 overflow-y-auto relative">
        
        {/* Navigation back */}
        <div className="absolute top-6 left-6 md:top-12 md:left-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Center Container */}
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">
              {isLogin ? "Welcome Back." : "Get Started."}
            </h2>
            <p className="text-gray-500 text-lg">
              {isLogin
                ? "Sign in to access your workspace."
                : "Create your account in seconds."}
            </p>
          </div>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-4 bg-white border border-black p-6 hover:bg-black hover:text-[#F3F2ED] transition-all duration-300 rounded-sm group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            {/* 2. Use the FcGoogle Component */}
            <FcGoogle size={24} />
            <span className="text-sm font-black uppercase tracking-widest">
              Continue with Google
            </span>
          </button>

          {/* Toggle Text */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold underline underline-offset-4 decoration-2 hover:text-black uppercase tracking-tight"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}