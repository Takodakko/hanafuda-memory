<script setup lang="ts">
import { ref, onUpdated, onMounted, computed, PropType, EmitsOptions } from 'vue'
import Card from './Card.vue';
interface aCard {
    url: string;
    altText: string;
    faceUp: boolean;
    month: string;
    id: string;
}

// const monthList = {
//     'january': false,
//     'february': false,
//     'march': false,
//     'april': false,
//     'may': false,
//     'june': false,
//     'july': false,
//     'august': false,
//     'september': false,
//     'october': false,
//     'november': false,
//     'december': false,
// };

interface monthList {
    [key: string]: boolean;
}

const points = computed(() => Math.floor(matchedCards.value / 2));
const numberOfRows = 4;
const numberOfColumns = 12;
const cardList = ['january_crane', 'january_scroll', 'january_plain1', 'january_plain2', 'february_bird', 'february_scroll', 'february_plain1', 'february_plain2', 'march_curtain', 'march_scroll', 'march_plain1', 'march_plain2', 'april_bird', 'april_scroll', 'april_plain1', 'april_plain2', 'may_dock', 'may_scroll', 'may_plain1', 'may_plain2', 'june_butterfly', 'june_scroll', 'june_plain1', 'june_plain2', 'july_boar', 'july_scroll', 'july_plain1', 'july_plain2', 'august_moon', 'august_geese', 'august_plain1', 'august_plain2', 'september_sake', 'september_scroll', 'september_plain1', 'september_plain2', 'october_deer', 'october_scroll', 'october_plain1', 'october_plain2', 'november_man', 'november_bird', 'november_scroll', 'november_thunder', 'december_phoenix', 'december_plain1', 'december_plain2', 'december_plain3'];
const sampleCardName = cardList[Math.floor(Math.random() * cardList.length)];
const sampleCard = ref(`/src/assets/cards/${sampleCardName}.jpg`);
// function flipCard() {
//     return undefined;
// }

const blankMonthList = new Map();
blankMonthList.set('january', []).set('february', []).set('march', []).set('april', []).set('may', []).set('june', []).set('july', []).set('august', []).set('september', []).set('october', []).set('november', []).set('december', []);
function initializeCards() {
    console.log('initializing...');
    const deckToUse: aCard[][] = [];
    const cardListCopy = [...cardList];
    let row: aCard[] = [];
    let currentId = 1;
    while (cardListCopy.length) {
        const index = Math.floor(Math.random() * cardListCopy.length);
        const currentCard = cardListCopy[index];
        const currentCardName = currentCard.replace('_', ' ');
        const monthName = currentCardName.slice(0, currentCardName.indexOf(' '));
        row.push({
            url: `/src/assets/cards/${currentCard}.jpg`,
            altText: currentCardName,
            faceUp: false,
            month: monthName,
            id: currentId.toString()
        });
        blankMonthList.get(monthName).push(currentId.toString());
        if (currentId % numberOfColumns === 0) {
            deckToUse.push(row);
            row = [];
        }
        currentId++;
        cardListCopy.splice(index, 1);
    }
    console.log(deckToUse.length)
    return deckToUse;
}



const currentDeck = computed(initializeCards);
const faceDownCards = ref(48);
const faceUpCards = ref(0);
const matchedCards = ref(0);
const matchingMonths = ref(blankMonthList);
// const canFlipCard = computed({
//     get: () => ,
//     set: (val) => !val && faceUpCards.value < 2,
// });
// onMounted(initializeCards);
// onUpdated(initializeCards);

function listenForFlip(e: {id: string, faceUp: boolean, month: string}) {
    console.log(e.id, e.faceUp, e.month, 'child flip');
    console.log(matchingMonths.value)
    if (e.faceUp) {
        faceDownCards.value -= 1;
        faceUpCards.value += 1;
        if (matchingMonths.value.get(e.month) === true) {
          matchedCards.value += 2;
          faceUpCards.value -= 2;
          matchingMonths.value.set(e.month, false);
        } else {
            matchingMonths.value.set(e.month, true);
        }
    } else {
        faceDownCards.value += 1;
        faceUpCards.value -= 1;
    }
}

</script>

<template>
    hi
    {{ points }}
    <Card month="xanuary" :current-cards-up="faceUpCards" :image-url="sampleCard" :alt-text="sampleCardName.replace('_', ' ')" :face-up="true" id="example"/>
    <div class="card-container" v-for="row in currentDeck">
      <div v-for="card in row">
        <Card :month="card.month" :current-cards-up="faceUpCards" :image-url="card.url" :alt-text="card.altText" :key="card.id" :face-up="card.faceUp" :id="card.id" @flipped="listenForFlip"/>
      </div><br>
    </div>
</template>

<style scoped>
  .card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1px;
    margin: 5px;
  }
</style>
