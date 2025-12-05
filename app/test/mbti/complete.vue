<template>
  <main class="test-layout flex justify-center flex-col">
    <div v-if="!isResult">
      <h1 class="text-3xl text-center pt-4">결과를 기다리고 있습니다.</h1>
      <div v-if="isLoading" class="text-center pt-4 mb-2">
        <span class="loading loading-bars loading-lg"></span>
      </div>
      <Adsense slotId="3222294283" />
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
        <h1 class="text-center text-2xl font-bold">MBTI 결과는?</h1>

        <div class="px-4 pt-4">
          <h2 class="text-xl pb-2">나의 유형은? - {{ myMbtiText }}</h2>
          <p class="text-left">
            <span style="color: #1fa1df">{{ myMbtiItem.title }}</span>
            {{ myMbtiItem.text }}
          </p>
        </div>
        <Adsense slotId="9872834679" />
        <div class="px-4 pt-4">
          <h2 class="text-xl pb-2">상대의 유형은? - {{ yourMbtiText }}</h2>
          <p class="text-left">
            <span style="color: #1fa1df">{{ yourMbtiItem.title }}</span>
            {{ yourMbtiItem.text }}
          </p>
        </div>

        <div class="px-4 pt-4">
          <h2 class="text-xl pb-2">연애스타일</h2>
          <p class="text-left">
            {{ yourMbtiItem.loveStyle }}
          </p>
        </div>
        <div class="px-4 pt-4">
          <h2 class="text-xl pb-2">이별스타일</h2>
          <p class="text-left">
            {{ yourMbtiItem.break }}
          </p>
        </div>
        <Adsense slotId="5613175409" />
        <div class="px-4 pt-4">
          <h2 class="text-xl pb-2">유명인</h2>
          <div
            class="badge badge-ghost badge-md"
            v-for="item in yourMbtiItem.celebrity.split(',')"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
        <div class="px-4 pt-4">
          <h2 class="text-xl pb-2">천생연분 궁합</h2>
          <div
            class="badge badge-ghost badge-md"
            v-for="item in yourMbtiItem.like"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
        <div class="px-4 pt-4">
          <h2 class="text-xl pb-2">괜찮은 궁합</h2>
          <div
            class="badge badge-ghost badge-md"
            v-for="item in yourMbtiItem.soso"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
        <div class="px-4 pt-4">
          <h2 class="text-xl pb-2">나쁜 궁합</h2>
          <div
            class="badge badge-ghost badge-md"
            v-for="item in yourMbtiItem.hate"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const items = {
  ESTJ: {
    text: "사무적, 실용적, 현실적으로 일을 많이 하는 사람들",
    title: "사업가형",
    celebrity: "한채영, 이지혜, 데프콘, 김민규, 박우진, 제인, 제시카, 김립",
    break:
      "ESTJ는 이별을 겪은 후 속으로는 울고 있을지 몰라도 겉보기 에는 쿨내 나는 모습을 유지합니다. 사람들과도 잘 어울리고, 바쁘게 삶을 사는 모습을 보이기 때문입니다. 사람들 앞에서 밝은 모습을 보이는 건 좋지만, 자신의 기분을 다스릴 수 있는 방법을 찾는 것이 좋습니다. 독서나 명상 등 조용하게 스스로의 내면을 돌아볼 수 있는 방법을 써보는 것도 새로운 관계를 준비하기에 좋은 방법입니다.",
    loveStyle:
      "현실적이며 리더십이 있는 ESTJ 유형의 사람들은 연인에게 책임감 있고 헌신적인 타입입니다. 데이트를 할 때도 계획적으로 움직이며 안정적인 연애를 선호하는 편입니다. 이 때문에 ESTJ와는 결혼까지 이어질 확률이 높으며, 이들은 가정적인 배우자가 될 가능성이 높습니다. 다만 ESTJ와의 궁합이 잘 맞지 않는 사람들은 안정감 속에서도 지루함을 느낄 수 있습니다. ESTJ가 워낙 밀당이나 티키타카 없는 솔직 담백 스타일이기 때문입니다. 또한, ESTJ는 가끔 상대방을 통제하려는 성향을 보이기도 하므로 자유분방한 타입과는 잘 맞지 않습니다. ESTJ는 상대방에게 애정을 집중하는 편이라 이별 후 많이 힘들어하는 유형입니다.",
    like: ["ISFP", "ISTP"],
    soso: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
    hate: ["INFP", "ENFP", "INFJ", "ENFJ"],
  },
  ESTP: {
    text: "친구, 운동, 음식 등 다양한 활동을 선호하는 사람들",
    title: "수완좋은 활동가형",
    celebrity:
      "연정(우주소녀), 정일훈(비투비), 큐리(티아라), 김도형(잔나비), 전현무",
    break:
      "ESTP는 이별 후 말수가 좀 줄어들 수는 있지만, 전반적으로 괜찮아 보일 것입니다. 이들은 이별을 겪은 후에도 마치 아무 일도 일어나지 않은 것처럼 행동하기 때문입니다. 하지만 만약 그 이별이 자신의 선택으로 인한 게 아니었다면, ESTP는 이별의 상처를 영원히 안고 갈 가능성이 있습니다. 이런 상처는 ESTP의 자존심을 무너뜨리고, 새로운 관계에 불안을 느껴서 스스로 벽을 쌓게 만듭니다. 따라서 친구나 지인 등에게 이별에 대해 털어놓고 마음의 상처를 제대로 치료해야 미래를 위한 관계를 쌓아 나갈 수 있습니다.",
    loveStyle:
      "적응력이 강하고 문제해결능력이 뛰어난 ESTP 유형의 사람들은 무겁지 않고 즐거운 연애를 선호하는 편입니다. 자유분방하고 활동적이라 리더십도 있고 주변 사람들에게 관심이 많아서 남사친, 여사친 문제로 다툴 수 있습니다. 따라서 ESTP와 데이트를 할 때에는 함께 즐길 수 있는 운동, 맛집 탐방 등 활동적인 일을 하는 것이 좋습니다. ESTP 중에는 자유로운 영혼을 지닌 사람들이 많기 때문에, 이들을 구속하거나 소유하려 들면 관계 자체가 틀어질 위험도 있습니다. ESTP는 애정 표현이나 스킨십에도 적극적인 편입니다.",
    like: ["ISFJ", "ISTJ"],
    soso: ["INTJ", "ENTJ", "INTP", "ENTP"],
    hate: ["INFP", "ENFP", "INFJ", "ENFJ"],
  },
  ESFJ: {
    text: "친절과 현실감을 바탕으로 타인에게 봉사하는 사람들",
    title: "친선도모형",
    celebrity:
      "규현(슈퍼주니어), 혜리, 김남주(에이핑크), 박보검, 정동원, 다영(우주소녀), 여름(우주소녀), 려욱, 앤디",
    break:
      "사랑에 빠지면 올인하는 편인 ESFJ는 보통 먼저 관계를 끝내는 쪽이 아닙니다. 누군가를 사귀면 떠나기보다는 관계를 나아지게 하려고 노력하는 편입니다. 바로 이 때문에 ESFJ는 관계에서 고통을 겪기도 합니다. 그러나 어쨌든 관계를 끝내기로 결론을 내고 나면, 그다음부터는 자신의 취미에 집중하고, 외부 활동을 하며 이별을 효과적으로 극복하기 위해 노력하는 유형입니다. ESFJ는 새로운 관계를 시작할 때 이 관계가 자신에게 어떤 의미를 지니며 갑자기 이별을 하게 되면 어떤 감정을 느낄지 상대에게 알려주는 것이 좋습니다.",
    loveStyle:
      "ESFJ는 사람을 좋아하고 감정을 잘 표현하는 타입입니다. 상대방에게 관심을 가지고 표현하는 만큼 상대방도 자신에게 똑같이 해주길 원할 수 있습니다. 이들은 주변인을 잘 챙기고 고민도 잘 들어주는 편이라 연인에게도 다정한 스타일입니다. 공감도 애정 표현도 잘해주는 유형이며, 결혼 후에도 가정적인 배우자가 될 확률이 높습니다.",
    like: ["ISFP", "ISTP"],
    soso: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
    hate: ["INFP", "ENFP", "INFJ", "ENFJ"],
  },
  ESFP: {
    text: "분위기를 고조시키는 우호적인 사람들",
    title: "사교적인 유형",
    celebrity:
      "비, 윤아, 수영(소녀시대), 주이(모모랜드), 정용화, 채정안, 지석진, 강혜원, 하성운, 이한결",
    break:
      "ESFP는 MBTI 유형 중에서도 이별에 가장 최적화된 유형이라고 할 수 있습니다. 연인과 헤어지면 슬퍼하기는 하지만, 거기에 많은 시간을 쓰지 않습니다. 감정적 상태에 빠져있기보다는 새로운 사람을 만나는 데에 신경을 쓰는 편입니다. 새로운 사람을 만나기 시작할 때에는 바람기를 버리고 한 사람에게 헌신하려는 생각을 갖는 게 좋습니다. 너무 독립적으로 굴면 상대방의 마음을 다치게 할 수도 있습니다.",
    loveStyle:
      "사교적이고 낙천적인 ESFP 유형은 적극적으로 사랑을 표현하는 경우가 많습니다. 이들은 사랑꾼 기질이 다분한 타입이며, 기본적으로 연인과 함께 시간 보내는 걸 좋아합니다. 한번 사랑에 빠지면 상대방의 장점을 보기위해 꾸준히 노력하며, 로맨틱한 기질도 있어 상대방에게 깜짝 이벤트를 열어주기도 합니다. 전체적으로 재미있고 즐겁게 연애하기에 좋은 유형입니다. 대신 ESFP는 생각이 자주 바뀌는 편이라 상대방이 당황할 수도 있습니다. 또한 ESFP는 열정적으로 연애를 하는 타입이기 때문에 이별 후 미련을 남기지 않습니다.",
    like: ["ISFJ", "ISTJ"],
    soso: ["INTJ", "ENTJ", "INTP", "ENTP"],
    hate: ["INFP", "ENFP", "INFJ", "ENFJ"],
  },
  ENTJ: {
    text: "비전을 가지고 사람들을 활력적으로 이끌어가는 사람들",
    title: "지도자형",
    celebrity:
      "이특, 티파니, 서현, 키, 스윙스, 지코, 베이비소을, 김병관, 유노윤호",
    break:
      "외향형 중에서도 감수성이 풍부한 ENTJ는 미래의 가능성을 보고 상대를 선택하기 때문에 이별은 현재의 손실만을 의미하는 게 아니라 마치 미래를 잃는 것과도 같습니다. 독립적이고 씩씩한 ENTJ의 특성상 이별의 상처를 주변 지인들에게 크게 드러내는 경우는 없습니다. 하지만 내적으로는 깊은 상처를 받게 되며, 이를 스스로 치유하기 위해 계속 노력합니다.",
    loveStyle:
      "단호한 카리스마와 통솔력이 있는 ENTJ 유형의 사람들은 독립심이 강하고 리더십이 있는 편입니다. 이 때문에 다양한 사람들을 만나고, 타인에게 이상형이 될 확률이 높은 편입니다. 다만 이들은 대체로 워커홀릭 성향이 있어 연인과 관계를 지속하기 위해서는 성향을 잘 이해해줄 사람이 필요합니다. ENTJ는 연애 관계 외에도 친구, 가족, 동료, 지인 등과의 여러 관계를 동시에 지속하려 하는 타입이기 때문에 연인이 마음 고생을 할 수도 있습니다. 또한 ENTJ는 매력적인 이성에게 쉽게 사랑에 빠지는 스타일입니다.",
    like: ["INFP", "INTP"],
    soso: ["ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "ENTP"],
    hate: [],
  },
  ENTP: {
    text: "풍부한 상상력을 가지고 새로운 것에 도전하는 사람들",
    title: "발명가형",
    celebrity:
      "한예슬, 제시, 김민아, 이수민, 김동완, 라미란, 이찬혁, 육성재, 설리, 세정",
    break:
      "ENTP는 기본적으로 연인과의 이별에 크게 아파하는 MBTI 유형은 아닙니다. 연애를 지속하든, 아니면 관계를 끝내든 간에 여러 요소를 기반으로 결정을 내리기 때문에, 일이 잘 풀릴 거라고 기대하는 편입니다. 이별을 택할 경우, 어떤 이유로 관계가 어긋났는지 분석하려 하며, 같은 일을 반복하지 않기 위해 그 원인을 정확하게 파악하려고 합니다. 그리고 새로운 일 또는 다른 관계에 집중하는 편입니다.",
    loveStyle:
      "활동적이고 항상 새로운 것을 추구하는 ENTP 유형의 사람들은 이상형과 연애하길 원합니다. 이 때문에 자신과 꼭 맞는 사람을 찾기 전까지 오랫동안 솔로 생활을 할 수도 있습니다. 대신 마음에 드는 상대를 찾으면 썸도 연애도 빠르게 시작하는 추진력을 보여줍니다. 이 때문에 주변으로부터 금사빠라는 오해를 받을 수도 있습니다. 자신만의 기준이 확고한 타입이므로 이들에게 무언가를 강요하려 해서는 안 됩니다. 또한 ENTP는 인간관계에 호불호가 강해 연인에게는 다정하지만 싫은 사람에게 가차 없는 면도 있습니다. 사교적이고 외향적인 모습을 보일 때가 많지만, 가끔 혼자만의 시간도 필요한 타입입니다.",
    like: ["INFJ", "INTJ"],
    soso: ["INFP", "ENFP", "ENFJ", "ENTJ", "INTP", "ENTP"],
    hate: [],
  },
  ENFJ: {
    text: "타인의 성장을 도모하고 협동하는 사람들",
    title: "언변능숙형",
    celebrity:
      "지민(방탄소년단), 강다니엘, 찬열, 수호, 유라(걸스데이), 유리, 김재중, 이찬원, 니키, 유주, 박미선, 임시완",
    break:
      "ENFJ는 감정이 사그라들 때까지 친구, 동료, 부모님, 심지어 처음 보는 사람한테도 감정을 과하게 드러냅니다. 그리고 오히려 이러한 점 때문에 불안이 가중되고 옛 감정을 잊는데 방해가 됩니다. 따라서 ENFJ는 이별을 하고 나면 억지로라도 과거의 감정에서 벗어나기 위해 노력할 필요가 있습니다. 옛 연인의 SNS를 몰래 염탐하기보다는 빠르게 새로운 사람을 찾는 편이 낫습니다.",
    loveStyle:
      "계획적이고 사교성이 풍부한 ENFJ 유형의 사람들은 맹목적인 사랑을 하는 타입입니다. 연인에게 감정을 100% 쏟아 붓는 편이며 함께 할 미래를 자주 생각합니다. 이 때문에 관계의 속도나 방향에 대해 자주 고민하고, 상대방에게도 이에 대한 질문을 할 수 있습니다. ENFJ는 상대방의 감정을 계속 확인하고 싶어 하며, 대체로 대화가 잘 통하는 연인을 선호합니다. 눈치가 빠르고 상대방의 감정을 잘 알아주는 유형이기 때문에 연인의 감정을 잘 헤아려 줄 줄도 압니다. 이들은 사람을 좋아하고 정이 많은 편으로 관계를 맺고 끊는 것을 어려워합니다. 이 때문에 연인과의 이별을 겪으면 유난히 힘들어하는 유형입니다.",
    like: ["INFP", "ISFP"],
    soso: ["ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"],
    hate: ["ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"],
  },
  ENFP: {
    text: "열정적으로 새로운 관계를 만드는 사람들",
    title: "스파크형",
    celebrity:
      "이효리, 박준형, 전소미, 홍진영, 화사(마마무), 뷔, 버논 구준회, 오윤아 추자현, 박나래, 문별",
    break:
      "ENFP는 이별 직후에는 방에 틀어박혀 혼자 이별을 극복하려 노력합니다. 그래도 마음 정리가 어려우면 밖으로 나가 다양한 활동을 하면서 사람들과 어울리곤 합니다. 본인이 이별했다는 사실이나 그 과정의 이야기를 굳이 숨기지 않고 지인들에게 털어놓는 편입니다. 그러다가도 새로운 사람을 만나면 이전 연애에 대한 미련을 빠르게 정리하고 새 연애를 시작합니다.",
    loveStyle:
      "정열적이고 상상력이 풍부한 ENFP 유형의 사람들은 열정적으로 사랑을 하는 스타일입니다. 기본적으로 ENFP 유형은 타인에게 관심이 많고, 대화할 때 리액션이 좋아 이성의 호감을 사기 쉬운 사람들이 많습니다. 또한 이들은 이상형에 가까운 사람을 만나면 적극적으로 사랑을 어필하고 쟁취하는 특징이 있습니다. 연애를 시작하면 말하기 어려운 고민도 털어놓기 쉬운 다정다감한 연인이 될 확률이 높습니다. 다만 ENFP는 즉흥적이고 충동적인 성격을 지니고 있기 때문에 연인을 당황스럽게 하는 말이나 행동을 할 수도 있습니다.",
    like: ["INFJ", "INTJ"],
    soso: ["INFP", "ENFP", "ENFJ", "ENTJ", "INTP", "ENTP"],
    hate: ["ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"],
  },
  ISTJ: {
    text: "한번 시작한 일은 끝까지 해내는 사람들",
    title: "세상의 소금형",
    celebrity:
      "써니, 성규, 정찬우, 차태현, 홍진경, 이창헙, 김국헌, 효연, 찬미, 안소희, 성훈",
    break:
      "ISTJ는 이별로 인해 받는 감정적 상처와는 별개로, 이별에 매우 실리적인 경향이 있습니다. 마음이 아프더라도 어쨌든 끝난 관계다 싶으면 더 시간을 낭비하지 않고 극복합니다. 그리고 미래를 향해 나아감으로써 과거의 연애를 잊고자 합니다.  ISTJ는 연애에 노력을 크게 쏟는 편이기 때문에, 이전 연애에서 쓸데없이 노력을 쏟았다는 생각이 들면 고통스러워하기도 합니다. 새로운 사람을 만나기 전에는 이러한 생각이나 억누른 감정을 미리 잘 정리하는 것이 좋습니다.",
    loveStyle:
      "매사에 철저하고 신중한 성격인 ISTJ 유형의 사람들은 연인 관계에서 무엇보다도 신뢰를 중요시합니다. 이들은 상대방에게 배려심이 깊고 인내심이 강한 편입니다. 따라서 잘 맞는 유형의 사람과 사귀기 시작하면 관계를 오래 지속하는 경우가 많습니다. 연애를 시작할 때도 원칙과 계획을 따지는 타입이기 때문에 속도가 느릴 수 있습니다. 애정표현을 과하게 하는 편이 아니며, 때로는 무심해 보일 수도 있지만 연인에게만은 의외의 애교나 귀여운 면모를 보이기도 합니다. 또한 주변의 이성에게 별로 관심을 두지 않고 연인에게만 헌신을 보이는 지고지순한 타입이기도 합니다.",
    like: ["ESFP", "ESTP"],
    soso: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
    hate: ["INFP", "ENFP", "INFJ", "ENFJ"],
  },
  ISTP: {
    text: "논리적이고 뛰어난 상황 적응력을 가지고 있는 사람들",
    title: "백과사전형",
    celebrity:
      "김연아, 박명수, 김종민, 은하(여자친구), 장성규, 나연(트와이스), 홍진경, 환웅, 올리비아",
    break:
      "당신은 지나간 관계를 별로 곱씹지 않으며 어떤 감정에도 크게 집착하지 않는 타입으로 이별의 상처에 아파하기보다는 차라리 다른 사람을 찾는 쪽을 택하곤 해요. 오히려 이별 후에 해방감을 느끼고 연애 기간 동안 제쳐두었던 다른 일들에 바로 몰두하기도 한답니다. 그래도 이별의 과정과 책임에 대해 조금은 생각해 보는 것이 좋아요. 과거의 관계를 돌아봄으로써 다음 관계에 도움이 될 수 있기 때문이에요.",
    loveStyle:
      "상황 파악 능력과 손재주가 좋은 ISTP 유형의 사람들은 타인과 관계를 맺는 것을 어려워하는 편입니다. 이들은 새로운 관계를 맺기 위해 노력하기 보다는 오래된 인연을 아끼고 가꾸는 타입입니다. 좁고 깊은 인간관계를 유지해가며 내 사람에게 잘하는 편입니다. ISTP는 혼자 시간을 보낼 자유를 중시하며, 취미나 관심사가 같은 연인을 선호합니다. 운동 등의 동적인 데이트를 즐기기보다는 함께 취미생활을 즐길 수 있는 연애를 좋아합니다. ISTP는 애정 표현을 잘 못해서 무뚝뚝해 보일 수 있지만, 사실은 속이 깊고 마음이 따뜻한 사람들이 많습니다.",
    like: ["ESFJ", "ESTJ"],
    soso: ["INTJ", "ENTJ", "INTP", "ENTP"],
    hate: ["INFP", "ENFP", "INFJ", "ENFJ"],
  },
  ISFJ: {
    text: "성실하고 온화하며 협조를 잘하는 사람들",
    title: "임금 뒷편의 권력형",
    celebrity:
      "최강창민, 신비, 정연, 다현, 안영미, 셔누, 진영, 한승연, 신지, 김요한, 정찬우",
    break:
      "로맨틱한 기질이 있는 ISFJ는 사랑에 빠지면 상대방의 세계로 들어갑니다. 그래서 이별을 하게 되면 나 자신으로 돌아오는 데에 어려움을 겪을 수도 있습니다. 미련이 남는 것은 아니지만, 이별을 한 뒤에도 여전히 상대를 신경 쓰고, 과거를 회상합니다. 따라서 이별 후 ISFJ는 집안에만 있기보다 밖에 나가서 사람을 만나는 것이 좋습니다. 친구들에게 감정을 털어놓고 사람들의 의견도 들으면서 이별을 극복하는 과정이 필요합니다.",
    loveStyle:
      "책임감이 강하고 침착한 성격인 ISFJ 유형은 신뢰를 기반으로 한 연애 관계와 결혼에서 안정감을 느끼는 사람들이 많습니다. 이들은 혼자있는 것을 좋아하면서도 다른 사람과 1:1로 깊은 관계를 형성하는 것을 좋아합니다. 또한 한번 사랑을 시작하면 헌신적이고 가정적인 면모를 보여줍니다. 타인의 감정에 민감한 편이어서 대화를 할 때 상대에게 상처 주지 않도록 노력하는 타입입니다. 조용하고 안정적인 관계를 지속하기 좋은 MBTI 유형입니다.",
    like: ["ESFP", "ESTP"],
    soso: ["ISFJ", "ESFJ", "ISTJ", "ESTJ"],
    hate: ["INFP", "ENFP", "INFJ", "ENFJ"],
  },
  ISFP: {
    text: "따듯한 감성을 가지고 있는 겸손한 사람들",
    title: "성인군자형",
    celebrity:
      "유재석, 김영철, 진세연, 권정열, 슬기(레드벨벳), 은지원, 서은광, 이민혁(비투비) 쯔위 에일리",
    break:
      "ISFP는 이별을 해야 하는 걸 아는 상황에서도 스스로 관계를 끊지 못하는 경우가 많습니다. 이 때문에 상대방을 먼저 차기보다는 차이는 경우가 대부분입니다. 이별 후에도 현실을 도피하거나 부정하려는 성향이 있고, 이 과정에서 다시 상대의 마음을 돌리려 시도하기도 합니다. 그러나 끝이 보이는 관계를 억지로 끌고 가면 결국 후회할 가능성이 높습니다. 제대로 끝내고 빨리 각자의 미래를 찾아나가는 것이 좋습니다.",
    loveStyle:
      "ISFP 유형에는 다정하고 온화한 성격을 지닌 사람들이 많습니다. 이들은 타인과의 관계 중에서도 특히 연인 관계에 올인하는 스타일입니다. 마음을 열기까지 시간이 걸리지만, 한번 사랑에 빠지면 연인에게 충성하고 로맨틱한 모습을 보입니다. 상대방이 바라는 거라면 어떻게든 들어주고 싶어하는 헌신적인 면도 있습니다. 이들은 로맨틱하고 연애 지향적인 특성 때문에 이별 후유증을 크게 겪는 유형이기도 합니다.",
    like: ["ENFJ", "ESFJ", "ESTJ"],
    soso: ["INTJ", "ENTJ", "INTP", "ENTP"],
    hate: ["INFP", "ENFP", "INFJ"],
  },
  INTJ: {
    text: "전체적인 부분을 조합하여 비전을 제시하는 사람들",
    title: "과학자형",
    celebrity:
      "강동원, 구혜선, 김유정, 공민지, 지드래곤, 이수혁, 손나은, 성시경, 보아, 유준상, 엄기준, 허영생, 이경규",
    break:
      "INTJ 정확히 뭐가 잘못되었는지 파악할 때까지 고민을 계속하는 타입입니다. 생각이 많은 데다 확실한 결론을 원하는 타입이기 때문입니다. 기본적으로 INTJ는 항상 미래를 염두하고 관계를 맺기 때문에 쉽게 관계를 저버리지 못합니다. 그러나 관계에 정성을 쏟았다는 이유로 연인을 이상화하는 일은 피해야 할 것입니다. 스스로를 너무 자책하거나 이미 지나간 과거에 대해 지나치게 고민할 필요는 없습니다. 고민을 줄이고, 새로운 관계를 지향해도 괜찮습니다.",
    loveStyle:
      "논리적이고 합리적인 INTJ 유형의 사람들은 사람을 보는 기준이 높은 편입니다. 이 때문에 INTJ는 타인과 관계를 시작하거나 정을 붙이는데 시간이 오래 걸리는 편입니다. 이들은 로맨틱한 감정에 휘둘리기보다는 삶의 방향성이 같은 사람에게 더 끌리는 경향이 있습니다. 따라서 연애를 하면서도 결혼이나 육아 등 미래에 대한 계획을 그려보는 타입입니다. 때로는 지나치게 현실적인 면도 있지만, 사랑하는 사람에게는 순애보적인 모습도 보여줍니다. 또한 이들은 솔직함을 중시하며 상당히 단호한 면모도 지니고 있어서 연인 관계라면 이러한 점을 참고할 필요가 있습니다.",
    like: ["ENFP", "ENTP"],
    soso: ["INFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP"],
    hate: [],
  },
  INTP: {
    text: "비평적인 관점을 가지고 있는 뛰어난 전략가들",
    title: "아이디어 뱅크형",
    celebrity:
      "진(방탄소년단), 정은지, 타일러, 오상진, 기안84, 미료, 휘인, 안예은, 기리보이, 창모, 슈가(방탄소년단)",
    break:
      "INTP는 이별 후 감성적인 성향을 보이지만, 그것이 헤어진 연인에 대한 미련은 아닙니다. 오히려 자신에게 찾아온 감성적인 상황에 대한 개인적인 해석이라고 봐야 합니다. 한편으로는 앞으로 비슷한 문제를 겪지 않기 위해 이전 관계에서 있었던 일들을 돌아보며 냉철하게 해석하기도 합니다. 정리가 끝나면, INTP는 옛 관계에 대한 미련 없이 새로운 연인을 찾아 나설 준비를 마칩니다.",
    loveStyle:
      "INTP는 조용하고 개인주의 성향이 강한 MBTI 유형입니다. 이들은 호불호가 확실하고 자기 주관이 뚜렷하며 타인에게 대체로 관심이 적은 편입니다. 처음부터 신중하게 관계를 맺기 때문에 인간관계가 좁은 편이며, 연애를 시작할 때에도 다양한 요소를 고려하는 편입니다. 또한 자존감 높은 나르시스트 면모가 있고 남의 눈치를 잘 보지 않는 편이기 때문에 상대방을 당황시킬 수도 있습니다. 대신 일단 연애를 시작한 상대에게는 집중하는 모습을 보여줍니다. INTP는 재치 있고 지적인 상대에게 매력을 느끼며, 대화가 잘 통하는 이성을 선호합니다.",
    like: ["ENTJ", "ESTJ"],
    soso: ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "INTP", "ENTP"],
    hate: [],
  },
  INFJ: {
    text: "사람과 관련된 뛰어난 통찰력을 가지고 있는 사람들",
    title: "예언자형",
    celebrity:
      "태연, 카이, 김이나, 강승윤, 솔라, 강유미, 소진, 김새론, 원우, 우지, 이브, 루다, 류수정, 성유리, 장문복, 태양, 장예은",
    break:
      "INFJ는 자신이 힘든 상태여도 여전히 전 연인의 감정을 걱정하고 상대의 마음이 변할 수도 있지 않을까 궁금해합니다. INFJ는 관계를 시작할 때 매우 신중한 대신, 한번 관계를 시작하면 깊은 관계를 맺기 때문입니다. 하지만 그리움은 이별에 대한 고통을 가속시킬 뿐입니다. 새로운 인연을 만나고 싶다면 옛 연인에 대한 기억과 미련은 확실하게 정리하는 것이 좋습니다.",
    loveStyle:
      "이상적인 성격의 INFJ 유형은 타인과의 관계를 시작할 때 어려움을 겪는 경우가 많습니다. 이들은 마음의 상처를 잘 받고 남들에게 싫은 티를 잘 내지 못하는 경우도 많아서 관계를 맺을 때도 신중합니다. 대신 INFJ는 상대방과 깊은 관계를 추구하며 애정을 쏟는 경향이 있습니다. 또한, 떠들썩한 이벤트를 하지는 않아도 상대방을 잘 배려해주고 챙겨주는 타입입니다. 대신, 한 번 상대에게 실망을 느끼면 단호하게 인연을 정리해버리기도 합니다.",
    like: ["ENFP", "ENTP"],
    soso: ["INFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP"],
    hate: ["ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"],
  },
  INFP: {
    text: "이상적인 세상을 만들어 가는 사람들",
    title: "잔다르크형",
    celebrity:
      "아이유, 선미, 강호동, 백예린, 김숙, 정국(방탄소년단), 조이(레드벨벳), 타블로, 유아인, 신혜성, 이용진, 모모, 채영, 이준기, 배두나, 허영지",
    break:
      "감정이 풍부한 INFP는 실패한 관계에 대한 책임을 스스로에게 돌리는 경향이 있습니다. 이별 후 온갖 감정에 빠져들며, 양쪽 모두에게 이별의 책임이 있어도 자신이 뭔가를 더할 수 있었을 것 같다는 생각을 합니다. INFP는 자책을 하기도 하고 헤어진 연인을 그리워하기도 하며 감정에서 쉽게 벗어나지 못하는 편입니다. 따라서 이별 후 자꾸 혼자 있기보다는 새로운 곳에도 가보고 새로운 사람들도 만나보는 것이 좋습니다.",
    loveStyle:
      "감정이 풍부하고 배려심이 많은 INFP 유형은 로맨티시스트가 많습니다. 이들은 내면을 중시하므로 상대방과의 강렬한 정서적 교감을 추구합니다. 또한 낭만적이고 사람에 대한 책임감이 강해 헌신적인 면모를 지니고 있습니다. 창의적이고 예술적인 INFP는 이성과 영화를 보거나 전시회에 가는 등 예술적인 데이트를 즐기는 것을 좋아합니다. 한편, INFP는 상대방 비판에 민감하게 반응하거나 마음속 깊이 상처를 받기도 합니다. 따라서 INFP와 연애를 시작할 때에는 장난으로라도 심한 말을 하지 않도록 주의하고, 조심스럽게 다가가야 합니다.",
    like: ["ENFJ", "ESTJ"],
    soso: ["INFP", "ENFP", "INFJ", "INTJ", "INTP", "ENTP"],
    hate: ["ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"],
  },
};
const route = useRoute();
const isLoading = ref(true);
const isResult = ref(false);
const yourMbtiItem = ref({});
const yourMbtiText = ref("");
const myMbtiItem = ref({});
const myMbtiText = ref("");
const confirmResult = () => {
  isResult.value = true;
};

onMounted(() => {
  let myMbti = localStorage.getItem("mindpang-my-mbti")
    ? localStorage.getItem("mindpang-my-mbti")
    : "ESTJ";
  let score1 = localStorage.getItem("mbti-score1")
    ? JSON.parse(localStorage.getItem("mbti-score1"))
    : {
        I: { score: 1 },
        E: { score: 1 },
        S: { score: 1 },
        N: { score: 1 },
        T: { score: 1 },
        F: { score: 1 },
        J: { score: 1 },
        P: { score: 1 },
      };
  let score2 = localStorage.getItem("mbti-score2")
    ? JSON.parse(localStorage.getItem("mbti-score2"))
    : {
        I: { score: 1 },
        E: { score: 1 },
        S: { score: 1 },
        N: { score: 1 },
        T: { score: 1 },
        F: { score: 1 },
        J: { score: 1 },
        P: { score: 1 },
      };
  let score3 = localStorage.getItem("mbti-score3")
    ? JSON.parse(localStorage.getItem("mbti-score3"))
    : {
        I: { score: 1 },
        E: { score: 1 },
        S: { score: 1 },
        N: { score: 1 },
        T: { score: 1 },
        F: { score: 1 },
        J: { score: 1 },
        P: { score: 1 },
      };
  let score4 = localStorage.getItem("mbti-score4")
    ? JSON.parse(localStorage.getItem("mbti-score4"))
    : {
        I: { score: 1 },
        E: { score: 1 },
        S: { score: 1 },
        N: { score: 1 },
        T: { score: 1 },
        F: { score: 1 },
        J: { score: 1 },
        P: { score: 1 },
      };

  const I_SCORE =
    score1.I.score + score2.I.score + score3.I.score + score4.I.score;
  const E_SCORE =
    score1.E.score + score2.E.score + score3.E.score + score4.E.score;
  const S_SCORE =
    score1.S.score + score2.S.score + score3.S.score + score4.S.score;
  const N_SCORE =
    score1.N.score + score2.N.score + score3.N.score + score4.N.score;
  const T_SCORE =
    score1.T.score + score2.T.score + score3.T.score + score4.T.score;
  const F_SCORE =
    score1.F.score + score2.F.score + score3.F.score + score4.F.score;
  const J_SCORE =
    score1.J.score + score2.J.score + score3.J.score + score4.J.score;
  const P_SCORE =
    score1.P.score + score2.P.score + score3.P.score + score4.P.score;

  const IE = I_SCORE >= E_SCORE ? "I" : "E";
  const SN = S_SCORE >= N_SCORE ? "S" : "N";
  const TF = T_SCORE >= F_SCORE ? "T" : "F";
  const JP = J_SCORE >= P_SCORE ? "J" : "P";

  const resMbti = route.query.type ? route.query.type : `${IE}${SN}${TF}${JP}`;
  myMbtiItem.value = items[myMbti];
  myMbtiText.value = myMbti;
  yourMbtiItem.value = items[resMbti];
  yourMbtiText.value = resMbti;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>
