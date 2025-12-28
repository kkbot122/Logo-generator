import fonts from "@/data/fonts.json";

export default function FontTester() {
  return (
    <section className="p-8 bg-neutral-100 border-t border-black/10">
      <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
        Font System Check
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fonts.map((font) => (
          <div 
            key={font.name} 
            className="bg-white p-6 border border-black/10 rounded-sm hover:shadow-lg transition-shadow"
          >
            {/* Header: Font Name & Category */}
            <div className="flex justify-between items-start mb-4 border-b border-black/5 pb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                {font.category}
              </span>
              <span className="text-xs font-mono text-neutral-300">
                {font.name}
              </span>
            </div>

            {/* The Actual Test */}
            <div 
              style={{ fontFamily: font.name }} 
              className="text-4xl leading-tight mb-2"
            >
              The quick brown fox.
            </div>
            <div 
              style={{ fontFamily: font.name }} 
              className="text-lg opacity-70"
            >
              1234567890
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}