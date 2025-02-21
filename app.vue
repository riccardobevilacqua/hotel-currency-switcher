<template>
  <NuxtRouteAnnouncer />
  <div class="container">
    <div class="headerSection">
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
    </div>

    <div class="hotelGrid">
      <div v-for="hotel in hotels" :key="hotel.id" class="hotelCard">
        <div class="hotelImage">
          <span class="availabilityBadge">available</span>
          <button class="expandButton">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </button>
          <img :src="hotel.image" :alt="`${hotel.city} view`">
        </div>
        <div class="hotelInfo">
          <h2>{{ hotel.city }}</h2>
          <p class="availabilityText">{{ hotel.availableHotels }} out of {{ hotel.totalHotels }} hotels are available</p>
          <div class="priceRow">
            <div class="priceLabel">
              rooms available from
            </div>
            <div class="price">{{ convertPrice(hotel.price) }}</div>
          </div>
          <button class="viewRates">view rates</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const DEFAULT_CURRENCY_CODE = 'EUR'
const DEFAULT_LOCALE = 'en-NL'
const selectedCurrency = ref(DEFAULT_CURRENCY_CODE)
const { data: hotels } = await useFetch('/api/offers')
const { data: exchangeRates } = await useFetch('/api/exchange-rates')

const availableCurrencies = computed(() => {
  if (!exchangeRates.value) return []
  
  return exchangeRates.value.map(rate => rate.base).sort()
})

const currencySymbolToCode = {
  '€': 'EUR',
  '£': 'GBP',
  'DKK': 'DKK',
  'CHF': 'CHF',
  '¥': 'JPY',
  '$': 'USD'
}

const formatPrice = (currencyCode, amount) => {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  }).format(amount)
}

const convertPrice = (price) => {
  const { currency, amount } = price

  const originalAmount = parseFloat(amount)
  const originalCurrencyCode = currencySymbolToCode[currency]
  const fallbackPrice = formatPrice(originalCurrencyCode, originalAmount)
  
  const rateData = exchangeRates.value.find(rate => rate.base === originalCurrencyCode)
  
  if (!price || !exchangeRates.value || !rateData) {
    return fallbackPrice
  }
  
  const rate = rateData.rates[selectedCurrency.value]
  const convertedAmount = originalAmount * rate

  if (!rate || !convertedAmount) {
    return fallbackPrice
  }

  return formatPrice(selectedCurrency.value, convertedAmount)
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.headerSection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
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
  gap: 20px;
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
  padding: 16px;
}

.hotelInfo h2 {
  margin: 0;
  font-size: 24px;
  margin-bottom: 8px;
  font-family: 'Chalet', sans-serif;
}

.availabilityText {
  color: #666;
  margin-bottom: 16px;
  font-size: 14px;
}

.priceRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.priceLabel {
  color: #666;
  font-size: 14px;
}

.price {
  font-size: 20px;
  font-weight: bold;
}

.viewRates {
  width: 100%;
  background: #ff0055;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.viewRates:hover {
  background: #e6004c;
}
</style>
