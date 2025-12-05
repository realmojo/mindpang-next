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
      <NuxtLink to="/test/mbti/complete">
        <button class="btn btn-secodary mt-4 text-center w-full">
          결과보기
        </button>
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
  { question: "책과 게임이 사람들의 모임보다 좋다.", type: "I" },
  { question: "사람들이 많은 곳을 좋아합니다.", type: "E" },
  { question: "우주여행은 말도 안되는 생각입니다.", type: "S" },
  {
    question: "책, 영화 등의 결말을 새롭게 해석하는 것을 좋아합니다.",
    type: "N",
  },
  {
    question: "같이 일을 하는 경우 협동 보다는 올바른 방향이 더 중요합니다.",
    type: "T",
  },
  {
    question: "사실보다는 사람들의 생각이 더 중요합니다.",
    type: "F",
  },
  { question: "즉흥적인 것보다 체계적인 것을 더 선호합니다.", type: "J" },
  { question: "한 번에 몰아서 하는 스타일 입니다.", type: "P" },
];
const doAnswer = (type, value) => {
  answer.value[type].score = value;
  localStorage.setItem("mbti-score4", JSON.stringify(answer.value));
};

onMounted(() => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});
</script>
