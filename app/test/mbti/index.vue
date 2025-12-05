<template>
  <main class="test-main site-layout flex justify-center flex-col">
    <h1 class="text-3xl text-center text-black mt-8 font-bold">
      MBTI 검사 성격 이상형 테스트
    </h1>
    <p class="text-center mb-2 text-gray-800">
      내가 좋아하는 상대방의 MBTI는 무엇일까? <br />본인의 MBTI 유형을 선택하여
      주세요.
    </p>
    <select
      class="select select-bordered w-full"
      v-model="value"
      @change="handleChange(value)"
    >
      <option v-for="(option, index) in options" :key="index">
        {{ option.value }}
      </option>
    </select>
    <Adsense slotId="7740004665" />
    <div class="mt-2 input-button-wrap">
      <div class="text-center px-2">
        <a href="/test/mbti/page1" target="_self">
          <button class="btn btn-secondary text-xl w-full">시작하기</button>
        </a>
      </div>
    </div>

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
  </main>
</template>

<script setup>
import axios from "axios";
const value = ref("ESTJ");

const options = ref([
  {
    value: "ESTJ",
    label: "ESTJ",
  },
  {
    value: "ESTP",
    label: "ESTP",
  },
  {
    value: "ESFJ",
    label: "ESFJ",
  },
  {
    value: "ESFP",
    label: "ESFP",
  },
  {
    value: "ENTJ",
    label: "ENTJ",
  },
  {
    value: "ENTP",
    label: "ENTP",
  },
  {
    value: "ENFJ",
    label: "ENFJ",
  },
  {
    value: "ENFP",
    label: "ENFP",
  },
  {
    value: "ISTJ",
    label: "ISTJ",
  },
  {
    value: "ISTP",
    label: "ISTP",
  },
  {
    value: "ISFJ",
    label: "ISFJ",
  },
  {
    value: "ISFP",
    label: "ISFP",
  },
  {
    value: "INTJ",
    label: "INTJ",
  },
  {
    value: "INTP",
    label: "INTP",
  },
  {
    value: "INFJ",
    label: "INFJ",
  },
  {
    value: "INFP",
    label: "INFP",
  },
]);

const handleChange = (value) => {
  if (process.client) {
    localStorage.setItem("mindpang-my-mbti", value);
  }
};

onMounted(() => {
  if (process.client) {
    localStorage.removeItem("mbti-score1");
    localStorage.removeItem("mbti-score2");
    localStorage.removeItem("mbti-score3");
    localStorage.removeItem("mbti-score4");
    setTimeout(() => {
      localStorage.setItem("mindpang-my-mbti", "ESTJ");
    }, 100);
  }
});

const route = useRoute();
const metaUrl = `https://mingpang.com${route.path}`;
const title = "MBTI 검사 이상형 궁합 테스트 - 마인드팡";
const description =
  "MBTI(Myers-Briggs Type Indicator)는 성격 유형을 분류하는 심리검사로, 개인의 선호 및 성향에 기반하여 16가지 성격 유형 중 하나를 부여합니다.";
const logo = "https://mindpang-image.s3.ap-northeast-2.amazonaws.com/mbti.png";

const articles = [
  {
    title: "MBTI 검사에 대해서",
    description:
      "첫째, MBTI는 특정한 4가지 차원에서 개인의 성격을 평가합니다. 이는 성격의 방향성, 정보 수집과 판단에 대한 선호도, 의사 결정 방식, 생활 방식 등을 포함합니다. 결과로 나온 4개의 알파벳은 각각 Extraversion(E) 또는 Introversion(I), Sensing(S) 또는 Intuition(N), Thinking(T) 또는 Feeling(F), Judging(J) 또는 Perceiving(P)로 표시됩니다.",
  },
  {
    title: "활용 방안",
    description:
      "둘째, MBTI는 직업 상담, 팀 빌딩, 커뮤니케이션 개발 등 다양한 분야에서 활용됩니다. 각 유형은 고유한 강점과 약점을 가지고 있어, 직업적 성향을 이해하고 효과적인 협업 및 리더십을 위해 활용됩니다.",
  },
  {
    title: "도움 요소",
    description:
      "셋째, MBTI는 개인의 성격을 이해하고 자아 인식을 증진시키는 데 도움이 됩니다. 이는 자기 개발 및 대인관계에서 타인과의 원활한 소통과 이해를 높일 수 있는 가이드로 활용됩니다. 그러나 MBTI는 과학적으로 근거가 있는 신뢰성에 대한 논란이 있으므로, 결과를 절대적인 진리로 받아들이는 것이 아니라 참고 자료로 활용하는 것이 권장됩니다.",
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
      content: "@mindpang.com",
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
