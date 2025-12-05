<template>
  <main class="test-main site-layout flex justify-center flex-col">
    <h1 class="text-3xl text-center text-black mt-8 font-bold">
      정신연령 색상 테스트
    </h1>
    <p class="text-center mb-2 text-gray-800">
      색상으로 알아보는 정신연령 테스트 입니다.
    </p>
    <Adsense slotId="2441578931" />

    <article class="mt-8" v-if="articles.length > 0">
      <section
        class="text-black"
        v-for="(article, index) in articles"
        :key="index"
      >
        <h2 class="text-2xl py-4" v-html="article.title" />
        <p v-html="article.description" />
      </section>
    </article>
    <div class="mt-2 input-button-wrap">
      <div class="text-center px-2">
        <a href="/test/color-age/page1" target="_self">
          <button class="btn btn-secondary text-xl w-full">START</button>
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
const route = useRoute();
const metaUrl = `https://mindpang.com${route.path}`;
const title = "정신연령 색상 테스트 - 마인드팡";
const description =
  "정신연령은 개인이 사회적, 감정적, 인지적으로 성숙해가는 과정을 나타냅니다. 이는 생물학적 나이와는 별개로, 각 개인이 환경과 경험에 따라 형성되는 것입니다. 정신연령은 자아 인식, 감정 조절, 대인관계 형성 등과 관련이 있으며, 이는 개인의 삶 전반에 영향을 미칩니다. 어린 시기의 정신연령 발달이 적절하게 이루어지면, 더 건강하고 안정된 성인으로 성장할 수 있습니다.";
const logo =
  "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/color-age.png";

const articles = [
  {
    title: "정신연령 테스트란",
    description:
      "정신연령은 개인이 사회적, 감정적, 인지적으로 성숙해가는 과정을 나타냅니다. 이는 생물학적 나이와는 별개로, 각 개인이 환경과 경험에 따라 형성되는 것입니다. 정신연령은 자아 인식, 감정 조절, 대인관계 형성 등과 관련이 있으며, 이는 개인의 삶 전반에 영향을 미칩니다. 어린 시기의 정신연령 발달이 적절하게 이루어지면, 더 건강하고 안정된 성인으로 성장할 수 있습니다.",
  },
  {
    title: "정신연령 특징",
    description:
      "정신연령은 주로 어린 시기, 청소년기, 성인기로 나뉩니다. 어린 시기에는 기본적인 인지 능력과 감정 표현 능력이 발달하며, 사회적 기술과 기본적인 도덕적 가치를 형성합니다. 청소년기에는 독립성과 정체성 형성이 강조되며, 성인기에는 직업, 가족, 대인관계에서의 책임과 안정성이 중요해집니다. 이러한 단계는 각 개인의 경험과 환경에 따라 다양하게나타날 수 있습니다.",
  },
  {
    title: "정신연령 발달의 영향",
    description:
      "정신연령 발달은 유전적인 요인과 환경적인 영향에 모두 영향을 받습니다. 건강한 가정 환경, 교육, 문화적 배경 등이 정신연령 발달에 긍정적인 영향을 미칩니다. 부정적인 영향 요인으로는 가정 내 폭력, 정서적 인과관계 부재 등이 있을 수 있습니다. 정신건강 전문가의 도움과 교육적인 지원은 어려움을 겪는 개인들의 정신연령 발달을 지원하는데 도움이 될 수 있습니다. 개인과 사회적 차원에서의 이해와 지원은 모든 사람이 건강하게 성장하고 발전할 수 있도록 도울 수 있습니다.",
  },
];

const jsonld = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: metaUrl,
  name: `${title}`,
  description: description,
  logo: logo,
  mainEntity: {
    "@type": "Article",
    headline: `${title}`,
    description: description,
    author: {
      "@type": "Person",
      name: "Tedev",
    },
    publisher: {
      "@type": "Organization",
      name: "MindPang",
      logo: {
        "@type": "ImageObject",
        url: "https://mindpang.com/mindpang-trans-logo.png",
      },
    },
    image: logo,
  },
};

const url = `https://api.mindpang.com/api/mind/count.php?link=${
  route.path.split("/")[2]
}`;
await axios.get(url);

useHead({
  title: title,
  link: [
    {
      rel: "canonical",
      href: metaUrl,
    },
  ],
  meta: [
    {
      name: "description",
      content: description,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: metaUrl,
    },
    {
      property: "og:article:author",
      content: "Mindpang",
    },
    {
      property: "og:site_name",
      content: "Mindpang",
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:image",
      content: logo,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: "@f5game.co.kr",
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:image",
      content: logo,
    },
    {
      name: "apple-touch-icon",
      content: logo,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(jsonld),
    },
  ],
});
</script>
