import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const title = "마인드팡 - 무료 심리테스트, MBTI, 성격테스트 모음";
const description =
  "무료 심리테스트, MBTI 성격유형검사, ADHD 자가진단, 우울증 테스트 등 다양한 심리 테스트를 무료로 즐겨보세요. 1분 안에 나의 성향을 알아보는 재미있는 테스트!";
const logo = "https://mindpang.com/mindpang-opengraph-logo.png";

export const metadata: Metadata = {
  title: title,
  description: description,
  metadataBase: new URL("https://mindpang.com"),
  alternates: {
    canonical: "https://mindpang.com",
  },
  openGraph: {
    title: title,
    description: description,
    url: "https://mindpang.com",
    siteName: "마인드팡",
    images: [
      {
        url: logo,
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [logo],
    site: "@mindpang.com",
  },
  verification: {
    google: "VvMMlxDsaibrAPB29RkBlph_fkpfGw92LPRxcYC0wrA",
    other: {
      "naver-site-verification": "cfae9d48e4136a6cc0488f13e108a464fcd96305",
      "16cdf8d64fd8bf0": "16cdf8d64fd8bf0",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#E5BA73",
  other: {
    "fb:app_id": "1301107411567112",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "마인드팡",
  alternateName: "Mindpang",
  url: "https://mindpang.com",
  description:
    "무료 심리테스트, MBTI, 성격테스트, ADHD 자가진단 등 다양한 심리 테스트를 무료로 즐겨보세요",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://mindpang.com/?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "마인드팡",
    url: "https://mindpang.com",
    logo: {
      "@type": "ImageObject",
      url: "https://mindpang.com/mindpang-opengraph-logo.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.min.js"
          strategy="lazyOnload"
        />
        <Script
          id="naver-analytics"
          src="//wcs.naver.net/wcslog.js"
          strategy="lazyOnload"
        />
        <Script
          id="naver-analytics-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html:
              'if(!wcs_add) var wcs_add = {}; wcs_add["wa"] = "18cf866f0226840"; if(window.wcs) {wcs_do();}',
          }}
        />
        <Script
          id="clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html:
              '(function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt"; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", "nkbps758cn");',
          }}
        />
        <Script
          id="facebook-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html:
              '!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0"; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window, document,"script", "https://connect.facebook.net/en_US/fbevents.js"); fbq("init", "980365322047246"); fbq("track", "PageView");',
          }}
        />
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html:
              '(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-M3V3PSB");',
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
