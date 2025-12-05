<template>
  <main class="test-layout flex justify-center flex-col">
    <div class="pt-8">
      <div class="text-left pl-4">3. 이 사진은 흑백인가요?</div>
      <img
        src="https://tistory.s3.ap-northeast-2.amazonaws.com/question3.png"
        class="pt-2 w-full"
        alt="qna1"
      />
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
            <div class="ml-4">{{ list.text }}</div>
          </label>
        </div>
      </div>
    </div>
    <div class="text-center mt-4 pb-8">
      <NuxtLink to="/test/color-age/page4">
        <button class="btn btn-secondary mt-4 text-center w-full">NEXT</button>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
const value = ref(0);

const lists = [
  { text: "예", value: 5 },
  { text: "아니요", value: 0 },
];

const doAnswer = (value) => {
  localStorage.setItem("color-age-score3", value);
};
</script>
