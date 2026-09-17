import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCountryById, COUNTRIES } from '@/data/countries';
import GuidedLearnClient from './GuidedLearnClient';

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({
    slug: c.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryById(slug);
  if (!country) return { title: 'Country Not Found | World Explorer' };

  return {
    title: `Learn ${country.name} in 60 Seconds ${country.flag} | World Explorer`,
    description: `Fast 60-second micro-learning lesson on ${country.name}. Capital, flag, greeting audio pronunciation, and quick mastery quiz.`,
  };
}

export default async function GuidedLearnPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryById(slug);

  if (!country) {
    notFound();
  }

  return <GuidedLearnClient country={country} />;
}
