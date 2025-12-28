'use client';

import { Save, User, Mail, Lock } from "lucide-react";

// Define the User type based on what NextAuth returns
type UserProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function SettingsForm({ user }: { user: UserProps }) {
  return (
    <>
      {/* SECTION 1: PROFILE */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-black/10">
        <div className="col-span-1">
          <h2 className="text-xl font-black uppercase tracking-tight mb-2">Profile</h2>
          <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-[200px]">
            This is your profile information.
          </p>
        </div>

        <div className="col-span-2 space-y-6">
           {/* Form Fields */}
           <div className="grid grid-cols-2 gap-6">
              <InputGroup 
                label="Display Name" 
                placeholder="Your Name"
                value={user.name || ""} 
                icon={<User size={14}/>} 
              />
           </div>
        </div>
      </section>

      {/* SECTION 2: ACCOUNT */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-black/10">
        <div className="col-span-1">
          <h2 className="text-xl font-black uppercase tracking-tight mb-2">Account Login</h2>
          <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-[200px]">
            Manage your email and password credentials.
          </p>
        </div>

        <div className="col-span-2 space-y-6">
           <InputGroup 
             label="Email Address" 
             value={user.email || ""} 
             icon={<Mail size={14}/>} 
             readOnly={true} // Email from Google is usually read-only
           />
           
           <div className="p-6 bg-white border border-black/10 rounded-sm flex items-center justify-between group hover:border-black transition-colors">
              <div className="flex flex-col gap-1">
                 <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Lock size={12} /> Password
                 </span>
                 <span className="text-[10px] text-neutral-400 font-medium">
                    Managed by Google Provider
                 </span>
              </div>
              <button 
                disabled 
                className="px-4 py-2 bg-neutral-100 text-neutral-400 rounded-sm text-[10px] font-bold uppercase tracking-widest cursor-not-allowed"
              >
                  Update
              </button>
           </div>
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-end gap-4 pt-4">
         <button className="px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 rounded-sm transition-colors text-neutral-500 hover:text-black">
           Cancel
         </button>
         <button className="px-8 py-3 bg-black text-white hover:bg-neutral-800 transition-colors rounded-sm flex items-center gap-2 text-xs font-bold uppercase tracking-widest shadow-lg">
            <Save size={14} /> Save Changes
         </button>
      </div>
    </>
  );
}

// --- REUSABLE FORM COMPONENTS ---

function InputGroup({ 
  label, 
  placeholder, 
  value, 
  icon, 
  isTextArea = false,
  readOnly = false
}: { 
  label: string, 
  placeholder?: string, 
  value?: string, 
  icon?: React.ReactNode, 
  isTextArea?: boolean,
  readOnly?: boolean
}) {
  return (
    <div className="flex flex-col gap-2 group">
      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-focus-within:text-black transition-colors flex items-center gap-2">
        {icon} {label}
      </label>
      
      {isTextArea ? (
        <textarea 
          className="w-full bg-transparent border border-black/20 p-4 min-h-[120px] text-sm font-medium focus:outline-none focus:border-black focus:bg-white transition-all rounded-sm placeholder:text-neutral-300 resize-none"
          placeholder={placeholder}
          defaultValue={value}
          readOnly={readOnly}
        />
      ) : (
        <input 
          type="text" 
          className={`w-full bg-transparent border border-black/20 p-4 h-12 text-sm font-medium focus:outline-none focus:border-black transition-all rounded-sm placeholder:text-neutral-300 
            ${readOnly ? 'opacity-60 cursor-not-allowed bg-neutral-100' : 'focus:bg-white'}`}
          placeholder={placeholder}
          defaultValue={value}
          readOnly={readOnly}
        />
      )}
    </div>
  )
}