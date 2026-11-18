/*
  Little Hands — workshops
  ------------------------------------------------------------
  Each class runs once `minimum` people have signed up.

  signedUp  how many people have joined so far. Update this number as
            sign-ups come in on WhatsApp; the candles on the page light up.
  when      optional, e.g. "Saturdays, 4 to 6 pm". Leave "" until the
            date is fixed.
  price     price per person in SAR, or null to hide it.
*/
window.LH_WORKSHOPS = [
  {
    id: "candle-pouring",
    art: "jar-candle",
    minimum: 4,
    signedUp: 0,
    price: null,
    en: {
      name: "Candle pouring",
      desc: "Pour, scent and decorate your own natural wax candle, then take it home. All materials included.",
      when: ""
    },
    ar: {
      name: "ورشة صبّ الشموع",
      desc: "اصنعوا شمعتكم من الشمع الطبيعي: الصبّ والرائحة والتزيين، ثم خذوها معكم. جميع المواد مشمولة.",
      when: ""
    }
  },
  {
    id: "scent-pouches",
    art: "scent-pouch",
    minimum: 4,
    signedUp: 0,
    price: null,
    en: {
      name: "Wax scent pouches",
      desc: "Press dried flowers into scented wax and make two pouches to keep or give away.",
      when: ""
    },
    ar: {
      name: "ورشة المعطّرات الشمعية",
      desc: "زيّنوا الشمع المعطّر بالورد المجفف واصنعوا معطّرين، واحد لكم وواحد للإهداء.",
      when: ""
    }
  }
];
