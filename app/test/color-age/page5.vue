<template>
  <main class="test-layout flex justify-center flex-col">
    <div class="pt-8">
      <div class="text-left pl-4">5. 어느색이 가장 마음에 드시나요?</div>
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
      <NuxtLink to="/test/color-age/page6">
        <button class="btn btn-secondary mt-4 text-center w-full">NEXT</button>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
const value = ref(0);

const lists = [
  { text: "#2264e6", value: 2 },
  { text: "#90b8ff", value: 4 },
  { text: "#1936ac", value: 3 },
  { text: "#4775cb", value: 5 },
  { text: "#3640f3", value: 1 },
];

const doAnswer = (value) => {
  localStorage.setItem("color-age-score5", value);
};
</script>
