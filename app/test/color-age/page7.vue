<template>
  <main class="test-layout flex justify-center flex-col">
    <div class="pt-8">
      <div class="text-left pl-4">7. 맘에드는 물감색을 고르세요</div>
      <img
        src="https://tistory.s3.ap-northeast-2.amazonaws.com/question7.png"
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
      <NuxtLink to="/test/color-age/page8">
        <button class="btn btn-secondary mt-4 text-center w-full">NEXT</button>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
const value = ref(0);

const lists = [
  { text: "A", value: 2 },
  { text: "B", value: 4 },
  { text: "C", value: 5 },
  { text: "D", value: 1 },
  { text: "E", value: 6 },
  { text: "F", value: 3 },
];

const doAnswer = (value) => {
  localStorage.setItem("color-age-score7", value);
};
</script>
