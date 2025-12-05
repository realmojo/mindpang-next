<template>
  <main class="test-layout flex justify-center flex-col">
    <div class="pt-8">
      <div class="text-left pl-4">6. 어느색이 가장 먼저 보이시나요?</div>
      <img
        src="https://tistory.s3.ap-northeast-2.amazonaws.com/question6.png"
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
            <div
              class="ml-4"
              :style="`width: 200px; height: 40px; background: ${list.text}`"
            ></div>
          </label>
        </div>
      </div>
    </div>
    <div class="text-center mt-4 pb-8">
      <NuxtLink to="/test/color-age/page7">
        <button class="btn btn-secondary mt-4 text-center w-full">NEXT</button>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
const value = ref(0);

const lists = [
  { text: "#fdf3eb", value: 1 },
  { text: "#587eb1", value: 4 },
  { text: "#3c4974", value: 5 },
  { text: "#a2cffa", value: 3 },
  { text: "#445537", value: 2 },
];

const doAnswer = (value) => {
  localStorage.setItem("color-age-score6", value);
};
</script>
