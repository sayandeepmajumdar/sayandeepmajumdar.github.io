import React from 'react';
import Link from 'next/link';
import { Globe, Heart, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { METHODOLOGY_NOTE } from '@/data/countries';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                WORLD EXPLORER
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              &ldquo;Learn the world. One country at a time.&rdquo; An interactive, accessible atlas
              and geography learning platform built for curious minds and global citizens.
            </p>
            <div className="flex items-center space-x-2 text-xs text-teal-600 dark:text-teal-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offline capable • Free forever</span>
            </div>
          </div>

          {/* Quick Learning Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Explore & Discover
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/explore" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Interactive World Map
                </Link>
              </li>
              <li>
                <Link href="/continents" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  The 7 Continents
                </Link>
              </li>
              <li>
                <Link href="/countries" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  All 195 Countries
                </Link>
              </li>
              <li>
                <Link href="/flags" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Flag Symbolism Guide
                </Link>
              </li>
              <li>
                <Link href="/languages" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  World Languages & Phrases
                </Link>
              </li>
            </ul>
          </div>

          {/* Games & Practice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Games & Practice
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/games/flag-quiz" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  National Flag Quiz
                </Link>
              </li>
              <li>
                <Link href="/games/country-quiz" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Multi-Type Country Quiz
                </Link>
              </li>
              <li>
                <Link href="/games/memory" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  3D Flag Memory Match
                </Link>
              </li>
              <li>
                <Link href="/games/continents" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Continent Sorting Challenge
                </Link>
              </li>
              <li>
                <Link href="/daily-challenge" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Today&apos;s World Challenge
                </Link>
              </li>
            </ul>
          </div>

          {/* Methodology & Data Integrity Note */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Methodology & Standards
            </h4>
            <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed space-y-1.5">
              <p className="font-medium text-slate-800 dark:text-slate-200">
                195 Sovereign Countries:
              </p>
              <p>{METHODOLOGY_NOTE}</p>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800">
                Geographic borders via Natural Earth TopoJSON. Pronunciation synthesized via browser Web Speech API.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>
            © {new Date().getFullYear()} World Explorer. Part of{' '}
            <a href="https://sayandeepmajumdar.github.io/" className="font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 underline underline-offset-2">
              Sayandeep Majumdar&apos;s Portfolio
            </a>
            .
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/compare" className="hover:text-teal-600 dark:hover:text-teal-400">
              Country Comparison
            </Link>
            <Link href="/learn" className="hover:text-teal-600 dark:hover:text-teal-400">
              60s Guided Lessons
            </Link>
            <Link href="/progress" className="hover:text-teal-600 dark:hover:text-teal-400">
              Progress & Mastery
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
