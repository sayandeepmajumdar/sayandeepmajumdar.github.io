import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadText(content: string, filename: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  downloadBlob(blob, filename);
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function isExtensionEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.protocol.startsWith('chrome-extension') ||
    window.location.protocol.startsWith('moz-extension') ||
    window.location.protocol === 'file:'
  );
}

export function getToolUrl(slug: string): string {
  if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
    try {
      return chrome.runtime.getURL(`${slug}/index.html`);
    } catch (e) {}
  }
  if (typeof (window as any).browser !== 'undefined' && (window as any).browser?.runtime?.getURL) {
    try {
      return (window as any).browser.runtime.getURL(`${slug}/index.html`);
    } catch (e) {}
  }
  return `/${slug}/index.html`;
}

export function getShareableToolUrl(category: string, slug: string): string {
  if (isExtensionEnvironment()) {
    return `https://sayandeepmajumdar.github.io/tools/#/tools/${category}/${slug}`;
  }
  if (typeof window !== 'undefined' && window.location.origin.startsWith('http')) {
    return window.location.href;
  }
  return `https://sayandeepmajumdar.github.io/tools/#/tools/${category}/${slug}`;
}

