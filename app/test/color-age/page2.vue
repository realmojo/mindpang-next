<template>
  <main class="test-layout flex justify-center flex-col">
    <div class="pt-8">
      <div class="text-left pl-4">2. 어느색이 가장 마음에 드시나요?</div>
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
      <NuxtLink to="/test/color-age/page3">
        <button class="btn btn-secondary mt-4 text-center w-full">NEXT</button>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
const value = ref(0);

const lists = [
  { text: "#d829a9", value: 3 },
  { text: "#df548e", value: 2 },
  { text: "#d732b0", value: 1 },
  { text: "#aa2a9a", value: 5 },
  { text: "#e590d3", value: 4 },
];

const doAnswer = (value) => {
  localStorage.setItem("color-age-score2", value);
};
</script>
