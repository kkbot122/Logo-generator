'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Github } from 'lucide-react';
// 1. Import the signIn helper for client-side components
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // 2. Handler for Google Login
  const handleGoogleLogin = async () => {
    await signIn("google", { 
      callbackUrl: "/dashboard", // Where to go after login
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F3F2ED] text-black font-sans selection:bg-black selection:text-[#F3F2ED]">
      
      {/* LEFT PANEL - BRAND */}
      <div className="hidden lg:flex w-1/2 bg-[#1a1a1a] text-[#F3F2ED] flex-col justify-between p-12 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-[#F3F2ED]/20 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        
        {/* Logo Area */}
        <div className="z-10">
           <span className="text-xs font-bold uppercase tracking-widest border border-[#F3F2ED] px-3 py-1">
             Aura Engine v2.0
           </span>
        </div>

        {/* Big Text */}
        <div className="z-10 relative">
          <h1 className="text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
            Design <br/>
            Intelligence <br/>
            For The <br/>
            Bold.
          </h1>
          <p className="text-neutral-400 max-w-md text-lg">
            Join 80,000+ designers and founders building the next generation of brands.
          </p>
        </div>

        {/* Footer info */}
        <div className="z-10 text-xs font-bold uppercase tracking-widest text-neutral-500">
           © 2025 Aura Inc.
        </div>
      </div>

      {/* RIGHT PANEL - FORM */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-12 lg:p-24 overflow-y-auto">
        
        {/* Navigation back */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Main Form Container */}
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          
          <div className="mb-10">
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">
              {isLogin ? 'Welcome Back.' : 'Create Account.'}
            </h2>
            <p className="text-gray-500 text-lg">
              {isLogin 
                ? 'Enter your credentials to access your workspace.' 
                : 'Start generating professional assets in seconds.'}
            </p>
          </div>

          {/* Social Buttons - MOVED UP for better UX since this is your active provider */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <button 
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 border border-black p-4 hover:bg-black hover:text-[#F3F2ED] transition-colors rounded-sm group"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:fill-current" aria-hidden="true"><path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-.4167-.0334-.8167-.1-1.2h-8.35v3.2h4.7834c-.2 1.1333-1.15 2.8833-3.4167 4.4167l-.0226.155 4.9657 3.8483.344.0343c2.95-2.7167 4.65-6.7167 4.65-11.2333 0-1.2167-.1333-2.3833-.35-3.5h-16.1v2.3333h9.0833c-.3833 1.9-1.9 4.3833-5.2333 6.6l-.1385.0135-5.068 3.9317.155.1548c2.5833 5.1166 7.8833 8.6166 14.1666 8.6166z" fill="currentColor" /></svg>
              <span className="text-xs font-bold uppercase tracking-widest">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 border border-black p-4 hover:bg-black hover:text-[#F3F2ED] transition-colors rounded-sm opacity-50 cursor-not-allowed" title="Coming Soon">
              <Github className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Github</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
              <span className="bg-[#F3F2ED] px-4 text-gray-400">Or using email</span>
            </div>
          </div>

          {/* Form - Note: This requires CredentialsProvider to function */}
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border border-black p-4 font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all rounded-sm"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-transparent border border-black p-4 font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all rounded-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest ml-1">Password</label>
                {isLogin && (
                  <button className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black">
                    Forgot?
                  </button>
                )}
              </div>
              <input 
                type="password" 
                className="w-full bg-transparent border border-black p-4 font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all rounded-sm"
              />
            </div>

            {/* Main Action Button */}
            <button className="bg-black text-[#F3F2ED] h-14 w-full flex items-center justify-between px-6 mt-2 hover:bg-neutral-800 transition-colors group rounded-sm opacity-50 cursor-not-allowed">
              <span className="font-bold uppercase tracking-widest">
                {isLogin ? 'Sign In' : 'Create Account'} (Email Disabled)
              </span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Toggle View */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold underline underline-offset-4 decoration-2 hover:text-black uppercase tracking-tight"
              >
                {isLogin ? 'Sign up for free' : 'Log in'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}