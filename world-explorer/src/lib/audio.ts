/**
 * Browser Text-to-Speech (TTS) helper for educational pronunciation.
 * NOTE: As noted in application guidelines, this uses browser speech synthesis,
 * NOT studio-recorded native speaker audio.
 */

export interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: unknown) => void;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakText(text: string, options: SpeechOptions = {}): boolean {
  if (!isSpeechSupported()) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // cancel any active utterance

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate ?? 0.85; // slightly slower for language learners
    utterance.pitch = options.pitch ?? 1.0;

    if (options.lang) {
      utterance.lang = options.lang;
    }

    if (options.onStart) {
      utterance.onstart = () => options.onStart?.();
    }
    if (options.onEnd) {
      utterance.onend = () => options.onEnd?.();
    }
    if (options.onError) {
      utterance.onerror = (e) => options.onError?.(e);
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    options.onError?.(err);
    return false;
  }
}

export const SYNTHESIZED_SPEECH_DISCLAIMER =
  'Pronunciation synthesized using your browser voice engine for educational reference.';
