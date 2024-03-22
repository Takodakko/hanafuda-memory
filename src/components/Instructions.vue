<script setup lang="ts">

const emit = defineEmits(['close-instructions']);
function closeInstructions() {
  emit('close-instructions');
}

</script>
<template>
  <div class="instruction-modal">
    <button @click="closeInstructions" class="small-button">
        X
    </button><br>
      <header class="instruction-title">
        <b>Hanafuda Memory Game</b>
      </header><br>
      <main class="instruction-main">
        This is a memory game using Hanafuda cards.<br>
        Play it to familiarize yourself with the cards!<br>
        There are 12 sets of cards, for each of the months of the year, and each set has 4 cards.<br>
        Matching any 2 cards from a set will give you one point. Try to get the maximum (24) number of points before you run out of tries!<br>
        You can change the number of tries by switching between modes.
      </main><br>
  </div>
</template>
<style scoped>
  .instruction-modal {
    border-style: solid;
    border-radius: 8px;
    border-color: black;
    border-width: 10px;
    z-index: 1000;
    position: absolute;
    background-color: olive;
    padding: 2em;
  }
  .small-button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: .5em;
    font-weight: 300;
    font-family: inherit;
    background-color: #1b1b1b;
    position: absolute;
    right: 20px;
    top: 15px;
  }
  .instruction-title {
    font-size: 30px;
  }
  .instruction-main {
    font-size: 20px;
  }
</style>