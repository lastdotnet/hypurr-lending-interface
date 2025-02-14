'use client';

import Script from 'next/script';

export function SafariClubAnalytics() {
  return (
    <Script
      async
      crossOrigin="anonymous"
      data-name="safary-sdk"
      data-product-id="prd_Adk6A1nVnP"
      integrity="sha256-z7Q6yDsMizDd8yey+3sZkFVx8BjF98GQA6z7I3BcCJc="
      src="https://tag.safary.club/stag-0.1.8.js"
      strategy="beforeInteractive"
    />
  );
}
