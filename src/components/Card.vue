<script setup lang="ts">
import { computed, ref, defineEmits } from 'vue';
  const props = defineProps({
    imageUrl: {type: String, required: true},
    altText: {type: String, required: true},
    faceUp: {type: Boolean, required: true},
    id: {type: String, required: true},
    currentCardsUp: {type: Number, required: true},
    month: {type: String, required: true},
  });

  const emit = defineEmits(['flipped']);

  function flipCard() {
    console.log('flipping', props.month);
    if (isFaceUp.value === true) {
        isFaceUp.value = false;
        emit('flipped', {id: props.id, faceUp: false, month: props.month})
    } else {
        if (props.currentCardsUp < 2) {
            isFaceUp.value = true;
            emit('flipped', {id: props.id, faceUp: true, month: props.month}) 
        } else {
            console.log('not flipping')
        }
    }
  }

const isFaceUp = ref(props.faceUp);
  
</script>
<template>
  <div>
    <img @click="flipCard" class="card" :src="isFaceUp ? props.imageUrl : '../src/assets/cards/card_back.jpg'" :alt="isFaceUp ? props.altText : 'back of card'">
  </div>
</template>
<style scoped>
  .card {
    height: 100px;
    width: 65px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>