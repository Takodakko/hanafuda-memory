<script setup lang="ts">
import { computed, PropType } from 'vue';
import backOfCardImage from '../assets/cards/card_back.jpg';

  const props = defineProps({
    imageUrl: {type: String, required: true},
    altText: {type: String, required: true},
    faceUp: {type: null as unknown as PropType<boolean | null>, required: true, validator: (v: boolean | null) => v === true || v === null || v === false},
    id: {type: String, required: true},
    currentCardsUp: {type: Number, required: true},
    month: {type: String, required: true},
  });

  const emit = defineEmits(['flipped']);

  function flipCard() {
    console.log('flipping', props.month);
    if (props.faceUp === true) {
        emit('flipped', {id: props.id, faceUp: true, month: props.month})
    } else {
        if (props.currentCardsUp < 2 && props.faceUp === false) {
            emit('flipped', {id: props.id, faceUp: false, month: props.month}) 
        } else {
            console.log('not flipping')
        }
    }
  }

  const imageSrc = computed(() => {
    return props.faceUp === true || props.faceUp === null ? props.imageUrl : backOfCardImage;
  });

const imageAlt = computed(() => {
    return props.faceUp === true || props.faceUp === null ? props.altText : 'back of card';
});

const cardBoxClass = computed(() => {
    if (props.faceUp === null) {
      return scoredCardBoxCss;
    } else if (props.faceUp === true) {
      return cardBoxCss;
    } else {
      return cardBoxBackCss;
    }
});
const cardCss = 'max-w-65px max-h-100px px-10px py-5px';
const cardBoxCss = 'max-w-3/5 max-h-3/5 mx-10px my-5px';
const cardBoxBackCss = 'max-w-3/5 max-h-3/5 mx-10px my-5px';
const scoredCardBoxCss = 'max-w-3/5 max-h-3/5 mx-10px my-5px opacity-50';
  
</script>
<template>
  <div :class="cardBoxClass">
    <img @click="flipCard" :class=cardCss :src="imageSrc" :alt="imageAlt">
  </div>
</template>
<style scoped>
  
</style>