/* src/app/dashboard/settings/billing/page.tsx */
import { 
  Check, 
  CreditCard, 
  Zap, 
  Download, 
  Clock, 
  AlertCircle 
} from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      
      {/* SECTION 1: CURRENT STATUS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Active Plan Card */}
        <div className="bg-[#1a1a1a] text-[#F3F2ED] p-8 rounded-sm flex flex-col justify-between min-h-[240px] relative overflow-hidden group">
           {/* Abstract Decoration */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
           
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                 <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Current Plan</span>
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Free Tier</h2>
              <p className="text-sm text-neutral-400 max-w-[200px] leading-relaxed">
                 Perfect for hobbyists and trying out the Aura Engine.
              </p>
           </div>

           <div className="relative z-10 pt-8 border-t border-white/10 mt-auto">
              <div className="flex justify-between items-end mb-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Renewal Date</span>
                 <span className="text-sm font-bold uppercase tracking-wide">Always Free</span>
              </div>
           </div>
        </div>

        {/* Credit Usage Card */}
        <div className="bg-white border border-black/10 p-8 rounded-sm flex flex-col justify-between min-h-[240px]">
           <div>
              <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    <Zap size={12} className="text-black"/> Usage
                 </div>
                 <button className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 decoration-black/20 hover:decoration-black transition-all">
                    History
                 </button>
              </div>
              
              <div className="flex items-end gap-2 mb-2">
                 <span className="text-6xl font-black tracking-tighter leading-none">850</span>
                 <span className="text-xl font-bold text-neutral-300 mb-1">/ 1000</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wide text-neutral-500">Credits Remaining</span>
           </div>

           {/* Progress Bar */}
           <div className="w-full bg-neutral-100 h-4 rounded-sm overflow-hidden border border-black/5 relative">
              <div className="absolute top-0 left-0 h-full bg-black w-[85%]"></div>
              {/* Stripe Pattern Overlay */}
              <div className="absolute inset-0 w-full h-full opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)', backgroundSize: '10px 10px' }}></div>
           </div>
        </div>
      </section>

      {/* SECTION 2: AVAILABLE PLANS */}
      <section>
        <div className="mb-8">
           <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Upgrade Plan</h2>
           <p className="text-sm text-neutral-500 max-w-md">
             Unlock higher limits, advanced export options, and priority generation speeds.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Free Plan */}
           <PlanCard 
             name="Starter" 
             price="$0" 
             features={['1,000 Credits/mo', 'Standard Speed', 'PNG Export Only', 'Community Support']}
             current
           />
           
           {/* Pro Plan (Highlighted) */}
           <PlanCard 
             name="Professional" 
             price="$29" 
             period="/ mo"
             features={['10,000 Credits/mo', 'Fast Generation', 'Vector (SVG) Export', 'Brand Kits', 'Priority Support']}
             isPopular
           />

           {/* Team Plan */}
           <PlanCard 
             name="Agency" 
             price="$99" 
             period="/ mo"
             features={['Unlimited Credits', 'Turbo Mode', 'White-label Reports', 'API Access', 'Dedicated Manager']}
           />
        </div>
      </section>

      {/* SECTION 3: PAYMENT METHOD */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-black/10">
         <div className="col-span-1">
            <h3 className="text-lg font-black uppercase tracking-tight mb-2">Payment Method</h3>
            <p className="text-xs text-neutral-500 max-w-[200px]">
               Manage your billing details and preferred payment cards.
            </p>
         </div>

         <div className="col-span-2">
            <div className="border border-black/10 bg-white rounded-sm p-6 flex items-center justify-between group hover:border-black transition-colors">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-16 bg-neutral-100 border border-black/10 rounded-sm flex items-center justify-center">
                     <CreditCard size={20} className="text-neutral-400" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold uppercase tracking-tight">Visa ending in 4242</span>
                     <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Expires 12/2028</span>
                  </div>
               </div>
               <button className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors">
                  Edit
               </button>
            </div>
            <button className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors">
               <span className="h-4 w-4 border border-black/20 rounded-full flex items-center justify-center text-xs">+</span>
               Add New Card
            </button>
         </div>
      </section>

      {/* SECTION 4: INVOICE HISTORY */}
      <section className="pt-12 border-t border-black/10">
         <h3 className="text-lg font-black uppercase tracking-tight mb-6">Invoice History</h3>
         
         <div className="border border-black/10 rounded-sm bg-white overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 p-4 border-b border-black/10 bg-neutral-50 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
               <div>Date</div>
               <div>Amount</div>
               <div>Status</div>
               <div className="text-right">Download</div>
            </div>

            {/* Rows */}
            <InvoiceRow date="Oct 01, 2025" amount="$0.00" status="Paid" />
            <InvoiceRow date="Sep 01, 2025" amount="$0.00" status="Paid" />
            <InvoiceRow date="Aug 01, 2025" amount="$0.00" status="Paid" />
         </div>
      </section>

    </div>
  );
}

// --- SUBCOMPONENTS ---

function PlanCard({ 
  name, 
  price, 
  period = "", 
  features, 
  current = false, 
  isPopular = false 
}: { 
  name: string, 
  price: string, 
  period?: string, 
  features: string[], 
  current?: boolean, 
  isPopular?: boolean 
}) {
  return (
    <div className={`relative p-8 rounded-sm border flex flex-col transition-all duration-300 ${
      isPopular 
        ? 'border-black bg-[#F3F2ED] shadow-xl scale-[1.02] z-10' 
        : 'border-black/10 bg-white hover:border-black/30'
    }`}>
      {isPopular && (
         <div className="absolute top-0 right-0 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-sm">
            Recommended
         </div>
      )}

      <div className="mb-6">
         <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">{name}</h3>
         <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black tracking-tighter">{price}</span>
            <span className="text-sm font-bold text-neutral-400">{period}</span>
         </div>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
         {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-xs font-medium text-neutral-600">
               <Check size={14} className="text-black shrink-0" />
               <span className="uppercase tracking-wide">{feature}</span>
            </li>
         ))}
      </ul>

      <button 
        disabled={current}
        className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${
           current 
             ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-transparent' 
             : isPopular
                ? 'bg-black text-white hover:bg-neutral-800'
                : 'bg-white border border-black text-black hover:bg-black hover:text-white'
        }`}
      >
         {current ? 'Current Plan' : 'Upgrade'}
      </button>
    </div>
  )
}

function InvoiceRow({ date, amount, status }: { date: string, amount: string, status: string }) {
   return (
      <div className="grid grid-cols-4 p-4 border-b border-black/5 last:border-b-0 hover:bg-neutral-50 transition-colors items-center">
         <div className="text-sm font-bold uppercase tracking-tight">{date}</div>
         <div className="text-sm font-medium text-neutral-600">{amount}</div>
         <div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-green-100 text-green-700 rounded-sm">
               {status}
            </span>
         </div>
         <div className="text-right">
            <button className="inline-flex p-2 hover:bg-black hover:text-white rounded-sm transition-colors">
               <Download size={14} />
            </button>
         </div>
      </div>
   )
}