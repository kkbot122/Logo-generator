/* src/components/MockupGallery.tsx */
import Image from "next/image";

type MockupGalleryProps = {
  logoUrl: string;
  palette: string[];
  brandName?: string;
};

export default function MockupGallery({ 
  logoUrl, 
  palette,
  brandName = "Brand"
}: MockupGalleryProps) {
  const [primary, secondary, accent, neutral, highlight] = palette;
  
  // Create gradient backgrounds from palette
  const heroGradient = `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`;
  const accentGradient = `linear-gradient(45deg, ${accent} 0%, ${highlight || accent} 100%)`;

  return (
    <section className="space-y-12 p-4">
      {/* Desktop Website Mockup */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Browser Window */}
        <div className="h-10 bg-gray-100 flex items-center gap-2 px-4 border-b border-gray-300">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 mx-8 bg-gray-200 h-5 rounded-full"></div>
        </div>
        
        {/* Hero Section */}
        <div 
          className="h-64 flex items-center justify-center relative overflow-hidden"
          style={{ background: heroGradient }}
        >
          {/* Animated background elements */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full mix-blend-overlay opacity-20 blur-3xl" style={{ backgroundColor: accent }}></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full mix-blend-overlay opacity-20 blur-3xl" style={{ backgroundColor: neutral }}></div>
          
          <div className="text-center space-y-6 z-10 px-8">
            <div className="relative w-24 h-24 mx-auto bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <Image 
                src={logoUrl} 
                alt={`${brandName} Logo`} 
                fill 
                className="object-contain p-2" 
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                {brandName}
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Redefining excellence through innovative design and exceptional quality
              </p>
            </div>
            <button 
              className="px-8 py-3 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
              style={{ color: primary }}
            >
              Explore More
            </button>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="space-y-4">
              <div className="h-40 rounded-xl" style={{ backgroundColor: primary }}></div>
              <div className="h-3 w-24 rounded-full bg-gray-200"></div>
              <div className="h-2 w-16 rounded-full bg-gray-200"></div>
            </div>
            <div className="space-y-4">
              <div className="h-40 rounded-xl" style={{ backgroundColor: secondary }}></div>
              <div className="h-3 w-24 rounded-full bg-gray-200"></div>
              <div className="h-2 w-16 rounded-full bg-gray-200"></div>
            </div>
            <div className="space-y-4">
              <div className="h-40 rounded-xl" style={{ backgroundColor: accent }}></div>
              <div className="h-3 w-24 rounded-full bg-gray-200"></div>
              <div className="h-2 w-16 rounded-full bg-gray-200"></div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
            <div className="relative w-12 h-12">
              <Image src={logoUrl} alt="Logo" fill className="object-contain" />
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <span>Home</span>
              <span>Services</span>
              <span>About</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App & Social Media Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Mobile App Mockup */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="text-white text-sm font-bold">9:41</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/60"></div>
              <div className="w-8 h-2 rounded-full bg-white/60"></div>
              <div className="w-2 h-2 rounded-full bg-white/60"></div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-white/10 p-2">
                <Image 
                  src={logoUrl} 
                  alt="App Icon" 
                  fill 
                  className="object-contain" 
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <div>
                <div className="text-white font-bold text-lg">{brandName}</div>
                <div className="text-white/60 text-sm">Premium Experience</div>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-4">
              <div className="h-3 w-full rounded-full" style={{ backgroundColor: primary }}></div>
              <div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: secondary }}></div>
              <div className="h-3 w-2/3 rounded-full" style={{ backgroundColor: accent }}></div>
            </div>
            
            {/* Action Button */}
            <div className="h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-lg" style={{ background: accentGradient }}>
              Continue
            </div>
          </div>
          
          {/* Navigation Bar */}
          <div className="flex justify-around mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <div className="w-6 h-6 mx-auto mb-1 rounded-full" style={{ backgroundColor: primary }}></div>
              <div className="text-white/60 text-xs">Home</div>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 mx-auto mb-1 rounded-full" style={{ backgroundColor: secondary }}></div>
              <div className="text-white/60 text-xs">Discover</div>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full" style={{ background: heroGradient }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 mx-auto mb-1 rounded-full" style={{ backgroundColor: accent }}></div>
              <div className="text-white/60 text-xs">Messages</div>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 mx-auto mb-1 rounded-full" style={{ backgroundColor: neutral }}></div>
              <div className="text-white/60 text-xs">Profile</div>
            </div>
          </div>
        </div>

        {/* Social Media Post */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image 
                  src={logoUrl} 
                  alt="Profile" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold">{brandName}</div>
                <div className="text-sm text-gray-500">2h ago</div>
              </div>
            </div>
            <div className="text-gray-400">•••</div>
          </div>
          
          <div className="p-4">
            <p className="mb-4">
              Introducing our latest innovation! We're excited to share what we've been working on to enhance your experience. ✨
            </p>
            
            <div className="rounded-xl overflow-hidden mb-4 h-48 relative" style={{ backgroundColor: secondary }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <Image 
                    src={logoUrl} 
                    alt="Post Content" 
                    fill 
                    className="object-contain opacity-80"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between text-gray-500">
              <button className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: primary }}></div>
                <span>1.2K</span>
              </button>
              <button className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: secondary }}></div>
                <span>42</span>
              </button>
              <button className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: accent }}></div>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Business Card */}
        <div className="relative">
          <div className="absolute top-4 right-4 text-xs font-bold uppercase tracking-widest text-gray-400">Stationery</div>
          
          <div className="h-full rounded-2xl shadow-2xl overflow-hidden transform hover:-rotate-2 transition-transform duration-500">
            {/* Card Front */}
            <div 
              className="h-64 bg-white p-8 flex flex-col justify-between"
              style={{ 
                background: `linear-gradient(45deg, white 60%, ${primary}15 100%)`,
                borderTop: `8px solid ${primary}`
              }}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image src={logoUrl} alt="Logo" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{brandName}</h3>
                  <div className="text-sm text-gray-600">Premium Solutions</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="h-1 w-full" style={{ backgroundColor: primary }}></div>
                <div className="h-1 w-3/4" style={{ backgroundColor: secondary }}></div>
                <div className="h-1 w-1/2" style={{ backgroundColor: accent }}></div>
              </div>
              
              <div className="text-sm space-y-1">
                <div className="font-bold" style={{ color: primary }}>hello@{brandName.toLowerCase().replace(/\s+/g, '')}.com</div>
                <div className="text-gray-600">+1 (555) 123-4567</div>
              </div>
            </div>
            
            {/* Card Back */}
            <div 
              className="h-24 p-8 flex items-center justify-center"
              style={{ backgroundColor: primary }}
            >
              <div className="text-white/80 text-sm text-center">
                Elevating experiences through innovative design
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products & Packaging */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Packaging Mockup */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Product Packaging</h3>
          
          <div className="flex items-center justify-center h-64 relative">
            {/* Box */}
            <div 
              className="w-48 h-48 rounded-lg shadow-2xl transform rotate-12 relative"
              style={{ backgroundColor: neutral }}
            >
              {/* Front Face */}
              <div className="absolute inset-2 rounded bg-white p-4">
                <div className="relative w-full h-20 mb-4">
                  <Image src={logoUrl} alt="Logo" fill className="object-contain" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg" style={{ color: primary }}>{brandName}</div>
                  <div className="text-sm text-gray-600 mt-1">Premium Edition</div>
                </div>
              </div>
              
              {/* Side Face */}
              <div 
                className="absolute -right-4 top-4 w-4 h-48 rounded-r"
                style={{ backgroundColor: secondary }}
              ></div>
              
              {/* Top Face */}
              <div 
                className="absolute -top-4 left-4 w-48 h-4 rounded-t"
                style={{ backgroundColor: accent }}
              ></div>
            </div>
            
            {/* Floating Elements */}
            <div 
              className="absolute -top-2 -right-2 w-16 h-16 rounded-full opacity-30"
              style={{ backgroundColor: primary }}
            ></div>
            <div 
              className="absolute -bottom-2 -left-2 w-20 h-20 rounded-full opacity-30"
              style={{ backgroundColor: secondary }}
            ></div>
          </div>
        </div>

        {/* App Icon Grid */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <h3 className="text-lg font-bold mb-6 text-gray-800">App Icons</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {[primary, secondary, accent, highlight || neutral, primary, secondary].map((color, index) => (
              <div 
                key={index}
                className="aspect-square rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: color }}
              >
                <div className="relative w-12 h-12">
                  <Image 
                    src={logoUrl} 
                    alt="App Icon" 
                    fill 
                    className="object-contain p-2"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Available on iOS and Android
          </div>
        </div>
      </div>
    </section>
  );
}