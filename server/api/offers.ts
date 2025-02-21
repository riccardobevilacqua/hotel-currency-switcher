const offers = [
  {
    id: 1,
    city: "Glasgow",
    availableHotels: 1,
    totalHotels: 1,
    image: "https://images.unsplash.com/photo-1607427293702-036933bbf746",
    price: {
      currency: "£",
      amount: "63.09"
    }
  },
  {
    id: 2,
    city: "Rome",
    availableHotels: 1,
    totalHotels: 1,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    price: {
      currency: "€",
      amount: "120.95"
    }
  },
  {
    id: 3,
    city: "London",
    availableHotels: 4,
    totalHotels: 4,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    price: {
      currency: "£",
      amount: "106.53"
    }
  },
  {
    id: 4,
    city: "Rotterdam",
    availableHotels: 1,
    totalHotels: 1,
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4",
    price: {
      currency: "€",
      amount: "89.21"
    }
  },
  {
    id: 5,
    city: "Amsterdam",
    availableHotels: 3,
    totalHotels: 3,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
    price: {
      currency: "€",
      amount: "97.18"
    }
  },
  {
    id: 6,
    city: "Copenhagen",
    availableHotels: 1,
    totalHotels: 1,
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc",
    price: {
      currency: "DKK",
      amount: "761.57"
    }
  },
  {
    id: 7,
    city: "Zurich",
    availableHotels: 1,
    totalHotels: 1,
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6",
    price: {
      currency: "CHF",
      amount: "132.36"
    }
  }
]

export default defineEventHandler(() => {

  return offers
}) 