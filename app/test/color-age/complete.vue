<template>
  <main class="test-layout flex justify-center flex-col">
    <div v-if="!isResult">
      <h1 class="text-3xl text-center pt-4">결과를 기다리고 있습니다.</h1>
      <div v-if="isLoading" class="text-center pt-4 mb-2">
        <span class="loading loading-bars loading-lg"></span>
      </div>
      <Adsense slotId="2319178678" />
      <button
        v-if="!isLoading"
        class="btn btn-secondary mt-4 text-center w-full"
        @click="confirmResult"
      >
        확인
      </button>
    </div>
    <div v-else class="pt-4">
      <div>
        <h1 class="text-center text-2xl font-bold">당신의 정신연령 나이는?</h1>

        <div class="text-center pt-4 text-4xl">{{ age }}</div>
        <div class="text-left px-4 pt-4 pb-4 adhd-result-text">{{ text }}</div>
        <img alt="color-age-result" :src="imageUrl" />
        <Adsense slotId="4567187006" />
      </div>
      <Fshare
        title="정신연령 색상 테스트 - 마인드팡"
        imageUrl="https://f5game.s3.ap-northeast-2.amazonaws.com/color-age/color-age.webp"
        url="https://mindpang.com/test/color-age"
      />
    </div>
  </main>
</template>

<script setup>
const isLoading = ref(true);
const isResult = ref(false);
const age = ref("");
const imageUrl = ref("");
const text = ref("");

const confirmResult = () => {
  isResult.value = true;
};

onMounted(() => {
  let sum = 0;
  for (let i = 1; i <= 8; i++) {
    const score = localStorage.getItem(`color-age-score${i}`);
    if (score) {
      sum += Number(score);
    }
  }

  if (7 <= sum && sum <= 12) {
    age.value = "20세 이하";
    text.value =
      "여권에 뭐라고 쓰여있는지는 중요하지 않아요. 마음걱정 하나 없는 청소년 입니다. 실제로 스무살이 넘으셨다면 축하합니다. 지금까지 인생에 대한 끊임없는 열정과 사랑을 간직해 오셨습니다. 앞으로도 계속 빛을 내시길 바랍니다.";
    imageUrl.value =
      "https://f5game.s3.ap-northeast-2.amazonaws.com/color-age/10.webp";
  } else if (13 <= sum && sum <= 20) {
    age.value = "20 ~ 29세";
    text.value =
      "활동적이고 창의적이고 생동감이 넘치지만 어른이라고 할 수 있습니다. 어린 시절과 10대 시절은 지났지만 좋은 것만 남기고 불필요한 것들은 모두 버렸습니다. 그렇다고 해서 재미가 없다는 건 아닙니다. 여러분의 삶을 예전만큼 흥미진진 합니다.";
    imageUrl.value =
      "https://f5game.s3.ap-northeast-2.amazonaws.com/color-age/20.webp";
  } else if (21 <= sum && sum <= 28) {
    age.value = "30 ~ 39세";
    text.value =
      "여전히 활동적이고 아이디어들의 호기심이 많지만 책임감과 사려가 깊어요. 생각해보면 그건 아이들의 삶에 대한 기쁨과 어른들의 독립 사이에 완벽한 균형이에요. 전성기를 누리고 있습니다.";
    imageUrl.value =
      "https://f5game.s3.ap-northeast-2.amazonaws.com/color-age/30.webp";
  } else if (29 <= sum && sum <= 35) {
    age.value = "40 ~ 49세";
    text.value =
      "성숙하고 경험이 많고 삶을 어떻게 살아야 하는지 정확히 알고 있습니다. 쓸데없는 일을 할 시간이 없고 단호하고 열심히 일을 합니다. 무엇을 원하고 어떻게 그것을 얻는지 알고 있습니다. 계속해서 주변의 모든 사람들에게 필요한 영감을 주시길 바랍니다.";
    imageUrl.value =
      "https://f5game.s3.ap-northeast-2.amazonaws.com/color-age/40.webp";
  } else if (36 <= sum) {
    age.value = "50세 이상";
    text.value =
      "전혀 나쁜뜻이 아닙니다. 반대로 여러분은 현명하고 침착합니다. 인생이 뭔지 알고 편안함을 높이 평가하는 시기입니다. 모든 사람이 조언을 구하는 상대 입니다. 게다가 언제나 믿을만 합니다. 요즘에는 찾아보기 힘든 장점이 있기 때문에 친구들은 무슨 수를 써더라도 여러분을 지켜야 해요.";
    imageUrl.value =
      "https://f5game.s3.ap-northeast-2.amazonaws.com/color-age/50.webp";
  }

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>
