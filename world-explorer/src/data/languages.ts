import { Language } from '@/lib/types';

export const LANGUAGES: Language[] = [
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語 (Nihongo)',
    family: 'Japonic',
    writingSystem: 'Kanji (Chinese characters) + Hiragana & Katakana (syllabaries)',
    officialInCountryIds: ['japan'],
    widelySpokenInCountryIds: ['japan', 'brazil', 'united-states', 'philippines'],
    speakersTotalApprox: '125 million',
    funFact:
      'Japanese features extensive honorific speech levels (keigo) that reflect the social relationship and relative seniority between speakers.',
    samplePhrases: {
      greeting: 'こんにちは (Konnichiwa) - Hello',
      thankYou: 'ありがとう (Arigatou) - Thank you',
      goodbye: 'さようなら (Sayonara) - Goodbye',
    },
  },
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español / Castellano',
    family: 'Indo-European (Romance)',
    writingSystem: 'Latin alphabet (including ñ)',
    officialInCountryIds: [
      'spain',
      'mexico',
      'argentina',
      'colombia',
      'chile',
      'peru',
      'cuba',
      'ecuador',
      'guatemala',
      'costa-rica',
      'uruguay',
    ],
    widelySpokenInCountryIds: ['united-states', 'philippines', 'equatorial-guinea', 'belize'],
    speakersTotalApprox: '550 million',
    funFact:
      'Spanish is the official language across 20 sovereign countries and the second most spoken native language in the world after Mandarin.',
    samplePhrases: {
      greeting: '¡Hola! - Hello',
      thankYou: 'Muchas gracias - Thank you very much',
      goodbye: '¡Adiós! / ¡Hasta luego! - Goodbye / See you later',
    },
  },
  {
    id: 'mandarin',
    name: 'Mandarin Chinese',
    nativeName: '普通话 (Pǔtōnghuà) / 国语 (Guóyǔ)',
    family: 'Sino-Tibetan',
    writingSystem: 'Simplified and Traditional Chinese Characters (Hanzi)',
    officialInCountryIds: ['china', 'singapore'],
    widelySpokenInCountryIds: ['malaysia', 'indonesia', 'vietnam', 'united-states', 'canada'],
    speakersTotalApprox: '1.1 billion',
    funFact:
      'Mandarin is a tonal language with four main tones and one neutral tone; the same syllable can have completely different meanings depending on pitch contour.',
    samplePhrases: {
      greeting: '你好 (Nǐ hǎo) - Hello',
      thankYou: '谢谢 (Xièxiè) - Thank you',
      goodbye: '再见 (Zàijiàn) - Goodbye',
    },
  },
  {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी (Hindī)',
    family: 'Indo-European (Indo-Aryan)',
    writingSystem: 'Devanagari script',
    officialInCountryIds: ['india', 'fiji'],
    widelySpokenInCountryIds: ['nepal', 'mauritius', 'suriname', 'united-arab-emirates'],
    speakersTotalApprox: '600 million',
    funFact:
      'Hindi uses the Devanagari script, which is written from left to right and features a horizontal line along the top linking the letters.',
    samplePhrases: {
      greeting: 'नमस्ते (Namaste) - Hello / Greetings',
      thankYou: 'धन्यवाद (Dhanyavaad) - Thank you',
      goodbye: 'फिर मिलेंगे (Phir milenge) - Until we meet again',
    },
  },
  {
    id: 'arabic',
    name: 'Arabic',
    nativeName: 'العربية (Al-ʿArabiyyah)',
    family: 'Afroasiatic (Semitic)',
    writingSystem: 'Arabic abjad (written right-to-left)',
    officialInCountryIds: ['egypt', 'saudi-arabia', 'morocco', 'jordan', 'united-arab-emirates'],
    widelySpokenInCountryIds: ['france', 'turkey', 'chad', 'sudan'],
    speakersTotalApprox: '420 million',
    funFact:
      'Arabic is written from right to left in a cursive script where letters join together. It has contributed numerous loanwords to European languages, including "algebra", "algorithm", and "coffee".',
    samplePhrases: {
      greeting: 'مرحبًا (Marhaban) / السلام عليكم (As-salamu alaykum)',
      thankYou: 'شكرًا (Shukran) - Thank you',
      goodbye: 'مع السلامة (Ma\'a as-salama) - Goodbye with peace',
    },
  },
  {
    id: 'french',
    name: 'French',
    nativeName: 'Français',
    family: 'Indo-European (Romance)',
    writingSystem: 'Latin alphabet',
    officialInCountryIds: ['france', 'canada', 'senegal', 'switzerland', 'belgium', 'morocco'],
    widelySpokenInCountryIds: ['vietnam', 'lebanon', 'cambodia', 'algeria', 'tunisia'],
    speakersTotalApprox: '310 million',
    funFact:
      'French is an official language of the United Nations, the International Olympic Committee, the Red Cross, and the European Union.',
    samplePhrases: {
      greeting: 'Bonjour - Good day / Hello',
      thankYou: 'Merci beaucoup - Thank you very much',
      goodbye: 'Au revoir - Goodbye',
    },
  },
  {
    id: 'portuguese',
    name: 'Portuguese',
    nativeName: 'Português',
    family: 'Indo-European (Romance)',
    writingSystem: 'Latin alphabet',
    officialInCountryIds: ['portugal', 'brazil', 'angola', 'mozambique'],
    widelySpokenInCountryIds: ['united-states', 'switzerland', 'luxembourg', 'japan'],
    speakersTotalApprox: '260 million',
    funFact:
      'Over 80% of native Portuguese speakers reside in Brazil rather than Portugal.',
    samplePhrases: {
      greeting: 'Olá - Hello',
      thankYou: 'Obrigado (male) / Obrigada (female) - Thank you',
      goodbye: 'Tchau / Adeus - Bye / Goodbye',
    },
  },
  {
    id: 'swahili',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    family: 'Niger-Congo (Bantu)',
    writingSystem: 'Latin alphabet (historically Arabic)',
    officialInCountryIds: ['kenya', 'tanzania', 'uganda', 'rwanda'],
    widelySpokenInCountryIds: ['democratic-republic-of-the-congo', 'burundi', 'mozambique', 'malawi'],
    speakersTotalApprox: '150 million',
    funFact:
      'Swahili developed as a coastal trade lingua franca between Bantu populations and Arab merchants over a thousand years ago.',
    samplePhrases: {
      greeting: 'Jambo / Habari - Hello / How are you',
      thankYou: 'Asante sana - Thank you very much',
      goodbye: 'Kwaheri - Goodbye',
    },
  },
  {
    id: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    family: 'Indo-European (Germanic)',
    writingSystem: 'Latin alphabet (with ä, ö, ü, and ß)',
    officialInCountryIds: ['germany', 'switzerland', 'austria'],
    widelySpokenInCountryIds: ['italy', 'luxembourg', 'belgium', 'poland'],
    speakersTotalApprox: '135 million',
    funFact:
      'German is known for compound nouns where words can be joined together to create highly specific new words, and all nouns are capitalized.',
    samplePhrases: {
      greeting: 'Guten Tag / Hallo - Good day / Hello',
      thankYou: 'Vielen Dank / Danke - Thank you very much',
      goodbye: 'Auf Wiedersehen / Tschüss - Goodbye / Bye',
    },
  },
  {
    id: 'english',
    name: 'English',
    nativeName: 'English',
    family: 'Indo-European (Germanic)',
    writingSystem: 'Latin alphabet',
    officialInCountryIds: [
      'united-kingdom',
      'united-states',
      'canada',
      'australia',
      'new-zealand',
      'india',
      'south-africa',
      'singapore',
      'kenya',
    ],
    widelySpokenInCountryIds: ['germany', 'netherlands', 'sweden', 'japan', 'global'],
    speakersTotalApprox: '1.5 billion (native and second language)',
    funFact:
      'English is the primary international lingua franca for civil aviation, maritime navigation, scientific publishing, and the World Wide Web.',
    samplePhrases: {
      greeting: 'Hello / Good morning',
      thankYou: 'Thank you very much',
      goodbye: 'Goodbye / See you soon',
    },
  },
  {
    id: 'italian',
    name: 'Italian',
    nativeName: 'Italiano',
    family: 'Indo-European (Romance)',
    writingSystem: 'Latin alphabet',
    officialInCountryIds: ['italy', 'switzerland'],
    widelySpokenInCountryIds: ['san-marino', 'vatican-city', 'argentina', 'united-states'],
    speakersTotalApprox: '85 million',
    funFact:
      'Italian is closely aligned with classical Latin and is the international vocabulary of musical notation (forte, piano, allegro, crescendo).',
    samplePhrases: {
      greeting: 'Ciao / Buongiorno - Hi / Good morning',
      thankYou: 'Grazie mille - Thank you very much',
      goodbye: 'Arrivederci / Ciao - Goodbye / Bye',
    },
  },
];

export function getLanguageById(id: string): Language | undefined {
  return LANGUAGES.find((l) => l.id === id);
}
