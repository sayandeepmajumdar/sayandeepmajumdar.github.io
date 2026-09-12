import React from 'react';
import { REGIONS } from '../data/recipes';
import { Sparkles, ChefHat, Heart, ShieldCheck, Flame, Compass } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onSelectRegion: (region: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onSelectRegion }) => {
  const regionalHighlights = [
    {
      region: 'North Indian & Punjabi',
      description:
        'Famous for clay-oven tandoori grills, velvety tomato-butter makhani gravies, hearty slow-cooked black lentils, and stuffed flatbreads.',
      staples: 'Ghee, Kasuri Methi, Kashmiri Mirch, Paneer, Garam Masala',
    },
    {
      region: 'South Indian',
      description:
        'Celebrated for naturally fermented rice & urad dal crepes, fragrant curry leaves, roasted mustard seeds, coconut, and tamarind-infused broths.',
      staples: 'Curry Leaves, Mustard Seeds, Asafetida (Hing), Coconut Oil, Tamarind',
    },
    {
      region: 'Bengali',
      description:
        'A cuisine of delicate balance featuring pungent cold-pressed mustard oil, sweet five-spice panch phoron, freshwater fish, and iconic sweet desserts.',
      staples: 'Mustard Oil, Nigella (Kalonji), Poppy Seeds (Posto), Turmeric, Green Chillies',
    },
    {
      region: 'Hyderabadi',
      description:
        'Born from royal Nizami kitchens, renowned for aromatic saffron-infused Kacchi Dum Biryani, roasted peanut-sesame salans, and slow-cooked meats.',
      staples: 'Shahi Jeera, Saffron, Fried Onions (Birista), Sesame, Peanuts',
    },
    {
      region: 'Maharashtrian',
      description:
        'Vibrant street foods and rustic country curries powered by nutty dry coconut, toasted peanuts, and fiery Kolhapuri red garlic-chilli masalas.',
      staples: 'Dry Coconut (Khopra), Peanuts, Goda Masala, Pav, Sprouted Beans',
    },
    {
      region: 'Gujarati & Rajasthani',
      description:
        'From sweet-tangy steamed dhoklas and travel theplas to royal desert-baked baatis drenched in pure desi ghee and spiced gatte.',
      staples: 'Besan (Gram Flour), Ajwain, Jaggery, Desi Ghee, Citric Acid',
    },
    {
      region: 'Kashmiri',
      description:
        'Aromatic, warm highland cooking centered on rich fennel seed powder (saunf), dry ginger (sonth), whole cardamoms, and saffron without onions or garlic.',
      staples: 'Fennel Powder (Saunf), Dry Ginger (Sonth), Black Cardamom, Saffron',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Heading */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Our Story & Culinary Mission</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          Celebrating India's incredible food culture
        </h1>

        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          "From the smoky tandoors of Punjab to the coconut-rich dishes of Kerala, Indian cuisine is
          incredibly diverse."
        </p>
      </div>

      {/* Mission Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-900 text-white flex items-center justify-center shadow-xs">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">What is Rasoi?</h2>
            <p className="text-xs text-stone-500 font-medium">Clear. Precise. Authentic.</p>
          </div>
        </div>

        <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
          <p>
            <strong>Rasoi</strong> is an authentic, modern frontend recipe platform dedicated to
            demystifying Indian cooking. Too often, Indian recipes online suffer from vague
            instructions like <em>"add a pinch of masala"</em> or <em>"cook until done"</em> without
            accurate quantities, heat levels, or sensory cues.
          </p>
          <p>
            Every single dish in Rasoi has been curated with authentic, realistic proportions,
            scientifically sound techniques (like ice-blanching spinach for emerald palak paneer or
            the double-marination method for tandoori chicken), and reliable cooking times.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70">
            <ShieldCheck className="w-5 h-5 text-amber-700 mb-2" />
            <h4 className="font-bold text-stone-900 text-sm">100% Client-Side</h4>
            <p className="text-xs text-stone-600 mt-1">
              Zero backend, zero tracking, and no external API delays. Everything runs in your
              browser.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/70">
            <Flame className="w-5 h-5 text-rose-700 mb-2" />
            <h4 className="font-bold text-stone-900 text-sm">Real Cooking Techniques</h4>
            <p className="text-xs text-stone-600 mt-1">
              Master authentic methods: <em>Bhunao</em>, <em>Tadka</em>, <em>Dum Pukht</em>, and
              natural fermentation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
            <Heart className="w-5 h-5 text-emerald-700 mb-2" />
            <h4 className="font-bold text-stone-900 text-sm">Cook with What You Have</h4>
            <p className="text-xs text-stone-600 mt-1">
              Input pantry ingredients you have on hand and discover immediate meal possibilities.
            </p>
          </div>
        </div>
      </div>

      {/* Regional Culinary Tapestry */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            The Regional Culinary Tapestry
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Click any region to explore its signature recipes in our collection.
          </p>
        </div>

        <div className="space-y-4">
          {regionalHighlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-2xs hover:border-amber-400 hover:shadow-md transition-all space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif font-bold text-lg text-rose-950">{item.region}</h3>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 self-start sm:self-auto">
                  Key Spices: {item.staples}
                </span>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="text-center p-8 rounded-3xl bg-gradient-to-tr from-rose-950 to-rose-900 text-white space-y-4 shadow-lg">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">Ready to start cooking?</h2>
        <p className="text-stone-300 text-sm max-w-md mx-auto">
          Explore our collection of 50 authentic dishes and recreate the magic of Indian flavors at home.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('/explore')}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Recipes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
