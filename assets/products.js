/*
  Little Hands — the pieces shown on the site
  ------------------------------------------------------------
  To add a piece, copy one block { ... }, change the words, and save.

  art     which drawing to show until there is a photo:
          wall-clock, desk-clock, jar-candle, scent-pouch, favours, gift-box
  photo   a real photo, once you have one. Put the file in assets/photos/
          and write its name here, e.g. "photos/wall-clock.jpg". Leave ""
          to keep the drawing.
  price   a starting price in SAR, e.g. 85. Leave null to hide the price
          (people will ask on WhatsApp instead).
*/
window.LH_PRODUCTS = [
  {
    id: "clock-aqua",
    art: "desk-clock",
    photo: "photos/clock-aqua.jpg",
    price: null,
    en: {
      name: "Aqua resin table clock",
      desc: "Hand-poured in two layers: aqua at the back, clear at the front with dried red gypsophila and gold leaf. Gold-rimmed face with Roman numerals."
    },
    ar: {
      name: "ساعة طاولة من الريزن الفيروزي",
      desc: "تُصب يدويًا على طبقتين: فيروزية في الخلف، وشفافة في الأمام فيها ورد الجبسوفيلا الأحمر المجفف ورقائق الذهب. وجه بإطار ذهبي وأرقام رومانية."
    }
  },
  {
    id: "clock-clear",
    art: "desk-clock",
    photo: "photos/clock-clear.jpg",
    price: null,
    en: {
      name: "Clear resin flower clock",
      desc: "Clear resin over a champagne glitter layer, filled with pressed pink blossoms, yellow daisies, lavender and gold flakes."
    },
    ar: {
      name: "ساعة طاولة من الريزن الشفاف بالورود",
      desc: "ريزن شفاف فوق طبقة لامعة بلون الشمبانيا، مليء بالأزهار الوردية المجففة والأقحوان الأصفر والخزامى ورقائق الذهب."
    }
  },
  {
    id: "jar-candle",
    art: "jar-candle",
    photo: "",
    price: null,
    en: {
      name: "Natural wax candle",
      desc: "Hand-poured into a glass jar. Ask which scents are ready this month."
    },
    ar: {
      name: "شمعة من الشمع الطبيعي",
      desc: "تُصب يدويًا في وعاء زجاجي. اسألوا عن الروائح المتوفرة هذا الشهر."
    }
  },
  {
    id: "scent-pouch",
    art: "scent-pouch",
    photo: "",
    price: null,
    en: {
      name: "Wax scent pouch",
      desc: "Scented wax set with dried flowers, for wardrobes, drawers and the car."
    },
    ar: {
      name: "معطّر شمعي",
      desc: "شمع معطّر مزيّن بالورد المجفف، للخزانة والأدراج والسيارة."
    }
  },
  {
    id: "favours",
    art: "favours",
    photo: "",
    price: null,
    en: {
      name: "Wedding and occasion favours",
      desc: "Mini candles or scent pouches in your colours, with names or a date, made in quantity."
    },
    ar: {
      name: "توزيعات المناسبات",
      desc: "شموع صغيرة أو معطّرات شمعية بألوانكم، مع الأسماء أو التاريخ، بكميات للمناسبات."
    }
  },
  {
    id: "gift-box",
    art: "gift-box",
    photo: "",
    price: null,
    en: {
      name: "Gift box",
      desc: "A candle, a scent pouch and a handwritten card, wrapped and ready to give."
    },
    ar: {
      name: "صندوق هدية",
      desc: "شمعة ومعطّر شمعي وبطاقة مكتوبة بخط اليد، مغلّفة وجاهزة للإهداء."
    }
  }
];
