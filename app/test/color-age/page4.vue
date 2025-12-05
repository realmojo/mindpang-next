<template>
  <main class="test-layout flex justify-center flex-col">
    <div class="pt-8">
      <div class="text-left pl-4">4. 일몰 사진 하나를 고르세요</div>
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
              @click="doAnswer(list.value)"
            />

            <img :src="list.text" class="ml-4 pt-2 w-full" alt="qna1" />
          </label>
        </div>
      </div>
    </div>
    <div class="text-center mt-4 pb-8">
      <NuxtLink to="/test/color-age/page5">
        <button class="btn btn-secondary mt-4 text-center w-full">NEXT</button>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
const value = ref(0);

const lists = [
  {
    text: "https://tistory.s3.ap-northeast-2.amazonaws.com/question4-a.png",
    value: 3,
  },
  {
    text: "https://tistory.s3.ap-northeast-2.amazonaws.com/question4-b.png",
    value: 2,
  },
  {
    text: "https://tistory.s3.ap-northeast-2.amazonaws.com/question4-c.png",
    value: 4,
  },
  {
    text: "https://tistory.s3.ap-northeast-2.amazonaws.com/question4-d.png",
    value: 1,
  },
];

const doAnswer = (value) => {
  localStorage.setItem("color-age-score4", value);
};
</script>
