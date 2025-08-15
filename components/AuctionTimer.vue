<template>
  <div class="details">
    <h6 v-if="props.showTimer" :class="[props.isComing ? 'coming' : 'current']">{{ statusText }}</h6>
    <div class="timer">
      <div class="digit">
        <span>{{ formattedDays }}</span>
        <span>{{globalStore?.lang == 'ar' ? 'ي' : 'd'}}</span>
      </div>
      <div class="digit">
        <span>{{ formattedHours }}</span>
        <span>{{globalStore?.lang == 'ar' ? 'س' : 'h'}}</span>
      </div>
      <div class="digit">
        <span>{{ formattedMinutes }}</span>
        <span>{{globalStore?.lang == 'ar' ? 'د' : 'm'}}</span>
      </div>
      <!-- <div class="digit">
        <span>{{ formattedSeconds }}</span>
        <span>{{globalStore?.lang == 'ar' ? 'ث' : 's'}}</span>
      </div> -->
    </div>
  </div>
</template>

<script setup>
  // define global store 
  const globalStore = useGlobalStore()

  // define props
  const props = defineProps({
    showTimer : Boolean,
    isComing : Boolean,
    timeNow : String,
    startedAt : String,
    endedAt : String
  })

  // ################################################################################
  // ############################# HANDLE AUCTION TIMER #############################
  // ################################################################################
  const now = ref(new Date(props.timeNow));
  const endTime = ref(new Date(props.endedAt));
  const startTime = ref(new Date(props.startedAt));

  const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const statusText = ref('');

  // Formatted values with leading zeros
  const formattedDays = computed(() => String(timeLeft.value.days).padStart(2, '0'));
  const formattedHours = computed(() => String(timeLeft.value.hours).padStart(2, '0'));
  const formattedMinutes = computed(() => String(timeLeft.value.minutes).padStart(2, '0'));
  const formattedSeconds = computed(() => String(timeLeft.value.seconds).padStart(2, '0'));

  const updateTimer = () => {
    now.value = new Date();
    
    let targetTime;
    if (now.value < startTime.value) {
      // Auction hasn't started yet
      statusText.value = globalStore?.lang == 'ar' ? 'باقي على بدء المزاد' : 'Auction starts in';
      targetTime = startTime.value;
    } else if (now.value < endTime.value) {
      // Auction is running
      statusText.value = globalStore?.lang == 'ar' ? 'باقي على انتهاء المزاد' : 'Auction ends in';
      targetTime = endTime.value;
    } else {
      // Auction has ended
      statusText.value = globalStore?.lang == 'ar' ? 'انتهى المزاد' : 'Auction ended';
      timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }

    const diff = targetTime - now.value;
    
    timeLeft.value = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };
  };

  let timer;

  onMounted(() => {
    updateTimer();
    timer = setInterval(updateTimer, 1000);
    // timer = setInterval(updateTimer, 1000);

  });

  onBeforeUnmount(() => {
    clearInterval(timer);
  });

</script>

<style lang="scss">
  .details{
    @include displayFlex($justify : space-between , $align : center);
    width: 100%;
    margin-top: 16px;
    h6{
      font-size: 12px;
      font-weight: 400 ;
      &.coming{
        color: #F3AB23;
      }
      &.current{
        color: $dangerColor;
      }
    }
    .timer{
      @include displayFlex($direction : row-reverse ,$gap : 4px);
      .digit{
        position: relative;
        span{
          border-radius: 4px;
          padding: 5px;
          font-size: 12px;
          &:first-of-type{
            background: $mainColor;
            color: #fff;
          }
        }
        &:not(:last-of-type)::after{
          content: ':';
        }
      }
    }
  }
</style>

<!-- HOW TO USE THE COMPONENT -->

<!-- 
  <AuctionTimer 
    v-if="props.auction.showTimer"
    :showTimer = "props.auction.showTimer"
    :isComing = "props.auction.isComing"
    :timeNow = "props.auction.timeNow"
    :startedAt = "props.auction.startedAt"
    :endedAt  = "props.auction.endedAt"
  />
-->