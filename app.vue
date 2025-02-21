<template>
  <NuxtRouteAnnouncer />
  <main>
    <header>
      <h1>{{ hotels.length }} available hotels in Europe</h1>
      <div class="currencySelector">
        <span>currency:</span>
        <select v-model="selectedCurrency">
          <option 
            v-for="currency in availableCurrencies" 
            :key="currency" 
            :value="currency"
          >
            {{ currency }}
          </option>
        </select>
      </div>
    </header>
    <section class="hotelGrid">
      <div v-for="hotel in hotels" :key="hotel.id" class="hotelCard">
        <div class="hotelImage">
          <span class="availabilityBadge">available</span>
          <button class="expandButton">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </button>
          <NuxtImg :src="hotel.image" :alt="`${hotel.city} view`" />
        </div>
        <div class="hotelInfo">
          <h2>{{ hotel.city }}</h2>
          <div class="availabilityText">{{ hotel.availableHotels }} out of {{ hotel.totalHotels }} hotels are available</div>
          <div class="priceRow">
            <div class="priceLabel">
              rooms available from
            </div>
            <div class="price">{{ convertPrice(hotel.price) }}</div>
          </div>
          <button class="viewRates">view rates</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
useHead({
  title: 'Hotels in Europe',
  meta: [
    { name: 'description', content: 'Hotels in Europe' }
  ],
})

const DEFAULT_CURRENCY_CODE = 'EUR'
const DEFAULT_LOCALE = 'en-US'

const locale = ref(DEFAULT_LOCALE)
const selectedCurrency = ref(DEFAULT_CURRENCY_CODE)

const { data: hotels } = await useFetch('/api/offers')
const { data: exchangeRates } = await useFetch('/api/exchange-rates')

onMounted(() => {
  locale.value = navigator.language || DEFAULT_LOCALE
})

const availableCurrencies = computed(() => {
  if (!exchangeRates.value) return []
  
  return exchangeRates.value.map(rate => rate.base).sort()
})

const convertPrice = (price) => {
  const { currency, amount } = price

  const originalAmount = parseFloat(amount)
  const originalCurrencyCode = currencySymbolToCode[currency]
  const fallbackPrice = formatPrice(locale.value, originalCurrencyCode, originalAmount)
  
  const rateData = exchangeRates.value.find(rate => rate.base === originalCurrencyCode)
  
  if (!price || !exchangeRates.value || !rateData) {
    return fallbackPrice
  }
  
  const rate = rateData.rates[selectedCurrency.value]
  const convertedAmount = originalAmount * rate

  if (!rate || !convertedAmount) {
    return fallbackPrice
  }

  return formatPrice(locale.value, selectedCurrency.value, convertedAmount)
}
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1240px;
  margin: 1rem auto 2rem;
  padding: 0 1rem;
  box-sizing: border-box;
}

header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
}

.currencySelector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.currencySelector select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.hotelGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.hotelCard {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.hotelImage {
  position: relative;
  width: 100%;
  height: 200px;
}

.hotelImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.availabilityBadge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #00dc82;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.expandButton {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
}

.hotelInfo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.hotelInfo h2 {
  margin: 0;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.availabilityText {
  font-size: 0.8rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

.priceRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  align-items: center;
}

.priceLabel {
  font-size: 0.8rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  justify-self: flex-end;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.viewRates {
  width: 100%;
  background: #ff0055;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.viewRates:hover {
  background: #e6004c;
}
</style>
