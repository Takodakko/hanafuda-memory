<script setup lang="ts">

const emit = defineEmits(['close-instructions']);
function closeInstructions() {
  emit('close-instructions');
}
const instructionModalCss = 'border border-solid border-black rounded-md border-8 bg-yellow-400 p-8 z-50 absolute flex flex-col content-center justify-center';
const smallButtonCss = 'border border-solid rounded-md border-transparent p-4 bg-yellow-200 absolute top-5 right-5';
</script>
<template>
  <div :class=instructionModalCss>
    <button @click="closeInstructions" :class=smallButtonCss>
        X
    </button><br>
      <header class="text-5xl">
        <b>Hanafuda Memory Game</b>
      </header><br>
      <main class="text-lg">
        This is a memory game using Hanafuda cards.<br>
        Play it to familiarize yourself with the cards!<br>
        There are 12 sets of cards, for each of the months of the year, and each set has 4 cards.<br>
        Matching any 2 cards from a set will give you one point. Try to get the maximum (24) number of points before you run out of tries!<br>
        You can change the number of tries by switching between modes.
      </main><br>
  </div>
</template>
<style scoped>
  
</style>