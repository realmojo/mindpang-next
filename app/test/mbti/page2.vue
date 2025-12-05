<template>
  <main class="test-layout flex justify-center flex-col">
    <div class="text-center text-2xl pt-8">
      <h1>질문을 읽고 하나를 선택해주세요</h1>
    </div>
    <div class="pt-8" v-for="(item, index) in questions" :key="index">
      <div class="text-left pl-4">{{ index + 1 }}. {{ item.question }}</div>
      <div class="pl-6 pt-3 pb-5">
        <div class="form-control">
          <label
            v-for="(list, _index) in lists"
            :key="_index"
            class="label cursor-pointer justify-start"
          >
            <input
              type="radio"
              :name="`radio-${index}`"
              class="radio checked:bg-red-500"
              @click="doAnswer(item.type, list.value)"
            />
            <span class="label-text ml-2">{{ list.text }}</span>
          </label>
        </div>
      </div>
    </div>
    <Adsense slotId="5576875750" />
    <div class="text-center mt-4 pb-8">
      <NuxtLink to="/test/mbti/page3">
        <button class="btn btn-secodary mt-4 text-center w-full">NEXT</button>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
const answer = ref({
  I: { score: 0 },
  E: { score: 0 },
  S: { score: 0 },
  N: { score: 0 },
  T: { score: 0 },
  F: { score: 0 },
  J: { score: 0 },
  P: { score: 0 },
});

const lists = [
  { text: "매우 그렇다", value: 5 },
  { text: "그렇다", value: 4 },
  { text: "보통이다", value: 3 },
  { text: "아니다", value: 2 },
  { text: "매우 아니다", value: 1 },
];

const questions = [
  { question: "대화를 먼저 시작하지 않는 편이다.", type: "I" },
  { question: "말하는 것을 좋아하며 대화가 끊임없습니다.", type: "E" },
  { question: "SF영화를 좋아하지 않습니다.", type: "S" },
  { question: "인류가 언젠가 화성에 살 것이라고 믿습니다.", type: "N" },
  { question: "타인의 감정에 공감 하기가 어렵습니다.", type: "T" },
  { question: "싫어하는 것을 거절하기 어려워 합니다.", type: "F" },
  { question: "집이나 방을 깨끗하게 유지합니다.", type: "J" },
  { question: "방안에 물건이 어질러저 있습니다.", type: "P" },
];
const doAnswer = (type, value) => {
  answer.value[type].score = value;
  localStorage.setItem("mbti-score2", JSON.stringify(answer.value));
};

onMounted(() => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});
</script>
