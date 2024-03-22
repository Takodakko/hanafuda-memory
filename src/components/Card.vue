<script setup lang="ts">
import { computed, defineEmits, PropType } from 'vue';

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
    return props.faceUp === true || props.faceUp === null ? props.imageUrl : '../src/assets/cards/card_back.jpg';
  });

const imageAlt = computed(() => {
    return props.faceUp === true || props.faceUp === null ? props.altText : 'back of card';
});

const cardBoxClass = computed(() => {
    return props.faceUp === null ? 'card-box scored-card' : 'card-box';
});
  
</script>
<template>
  <div :class="cardBoxClass">
    <img @click="flipCard" class="card" :src="imageSrc" :alt="imageAlt">
  </div>
</template>
<style scoped>
  .card-box {
    border-style: none;
  }
  .card {
    height: 100px;
    width: 65px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .scored-card {
    background-color: yellow;
  }
</style>