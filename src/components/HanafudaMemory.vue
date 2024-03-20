<script setup lang="ts">
import { ref, onUpdated, onMounted, computed, PropType, EmitsOptions } from 'vue'
import Card from './Card.vue';
interface aCard {
    url: string;
    altText: string;
    faceUp: boolean | null;
    month: string;
    id: string;
}

// type months = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december';

interface MonthList {
    [key: string]: boolean;
}

const points = computed(() => Math.floor(matchedCards.value / 2));
const cardList = ['january_crane', 'january_scroll', 'january_plain1', 'january_plain2', 'february_bird', 'february_scroll', 'february_plain1', 'february_plain2', 'march_curtain', 'march_scroll', 'march_plain1', 'march_plain2', 'april_bird', 'april_scroll', 'april_plain1', 'april_plain2', 'may_dock', 'may_scroll', 'may_plain1', 'may_plain2', 'june_butterfly', 'june_scroll', 'june_plain1', 'june_plain2', 'july_boar', 'july_scroll', 'july_plain1', 'july_plain2', 'august_moon', 'august_geese', 'august_plain1', 'august_plain2', 'september_sake', 'september_scroll', 'september_plain1', 'september_plain2', 'october_deer', 'october_scroll', 'october_plain1', 'october_plain2', 'november_man', 'november_bird', 'november_scroll', 'november_thunder', 'december_phoenix', 'december_plain1', 'december_plain2', 'december_plain3'];
const sampleCardName = cardList[Math.floor(Math.random() * cardList.length)];
const sampleCard = ref(`/src/assets/cards/${sampleCardName}.jpg`);

const monthList: MonthList = {
    'january': false,
    'february': false,
    'march': false,
    'april': false,
    'may': false,
    'june': false,
    'july': false,
    'august': false,
    'september': false,
    'october': false,
    'november': false,
    'december': false,
};

function initializeCards() {
    console.log('initializing...');
    const initializedDeck = new Map();
    const cardListCopy = [...cardList];
    let currentId = 1;
    while (cardListCopy.length) {
        const index = Math.floor(Math.random() * cardListCopy.length);
        const currentCard = cardListCopy[index];
        const currentCardName = currentCard.replace('_', ' ');
        const monthName = currentCardName.slice(0, currentCardName.indexOf(' '));
        const cardId = currentId.toString();
        const newCard: aCard = {
            url: `/src/assets/cards/${currentCard}.jpg`,
            altText: currentCardName,
            faceUp: false,
            month: monthName,
            id: cardId,
        };
        initializedDeck.set(cardId, newCard);
        currentId++;
        cardListCopy.splice(index, 1);
    }
    return initializedDeck;
}

const newDeck = initializeCards();

const currentDeck = ref(newDeck);

const faceDownCards = computed(() => {
    let number = 0;
    currentDeck.value.forEach((card) => {
        if (card.faceUp === false) {
            number += 1;
        }
    });
    return number;
});

const faceUpCards = computed(() => {
    let number = 0;
    currentDeck.value.forEach((card) => {
        if (card.faceUp === true) {
            number += 1;
        }
    });
    return number;
});

const matchedCards = computed(() => {
    let number = 0;
    currentDeck.value.forEach((card) => {
        if (card.faceUp === null) {
            number += 1;
        }
    });
    return number;
});
const matchingMonths = ref(monthList);

function listenForFlip(e: {id: string, faceUp: boolean, month: string}) {
    console.log(e.id, e.faceUp, e.month, 'child flip');
    const flippedCard = currentDeck.value.get(e.id);
    const currentCardMonth = e.month;
    if (e.faceUp === false) {
        if (matchingMonths.value[currentCardMonth] === false) {
            currentDeck.value.set(e.id, {...flippedCard, faceUp: true});
            matchingMonths.value[currentCardMonth] = true;
        } else {
            currentDeck.value.set(e.id, {...flippedCard, faceUp: null});
            matchingMonths.value[currentCardMonth] = false;
            currentDeck.value.forEach((card) => {
                if (card.faceUp === true) {
                    card.faceUp = null;
                }
            });
        }
        
    } else if (e.faceUp === true) {
        currentDeck.value.set(e.id, {...flippedCard, faceUp: false});
        matchingMonths.value[currentCardMonth] = false;
    } else {
        console.log('already scored...');
    }
}

</script>

<template>
    hi
    {{ points }}
    {{ faceUpCards }} face up
    {{ faceDownCards }} face down
    {{ matchedCards }} matched cards
    <Card month="xanuary" :current-cards-up="faceUpCards" :image-url="sampleCard" :alt-text="sampleCardName.replace('_', ' ')" :face-up="true" id="example"/>
    <div class="card-container">
      <div v-for="[id, card] in currentDeck">
        <Card :month="card.month" :current-cards-up="faceUpCards" :image-url="card.url" :alt-text="card.altText" :key="id" :face-up="card.faceUp" :id="id" @flipped="listenForFlip"/>
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
    max-width: 1100px;
  }
</style>
