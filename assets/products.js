/*
  Little Hands — the pieces shown on the site
  ------------------------------------------------------------
  To add a piece, copy one block { ... }, change the words, and save.

  art     which drawing to show until there is a photo:
          wall-clock, desk-clock, jar-candle, scent-pouch, favours, gift-box
  photo   a real photo, once you have one. Put the file in assets/photos/
          and write its name here, e.g. "photos/wall-clock.jpg". Leave ""
          to keep the drawing.
  swatch  background colour behind the drawing or photo
  price   a starting price in SAR, e.g. 85. Leave null to hide the price
          (people will ask on WhatsApp instead).
*/
window.LH_PRODUCTS = [
  {
    id: "wall-clock",
    art: "wall-clock",
    photo: "",
    swatch: "#E4DCF0",
    price: null,
    en: {
      name: "Wall clock",
      desc: "Every face is made by hand. Choose the colours, and Arabic or English numerals."
    },
    ar: {
      name: "ساعة حائط",
      desc: "كل وجه ساعة يُصنع يدويًا. اختاروا الألوان، والأرقام عربية أو إنجليزية."
    }
  },
  {
    id: "desk-clock",
    art: "desk-clock",
    photo: "",
    swatch: "#F3DDE1",
    price: null,
    en: {
      name: "Little desk clock",
      desc: "A small clock for a desk, a shelf or a bedside table. A lovely graduation gift."
    },
    ar: {
      name: "ساعة مكتب صغيرة",
      desc: "ساعة صغيرة للمكتب أو الرف أو بجانب السرير. هدية جميلة للتخرج."
    }
  },
  {
    id: "jar-candle",
    art: "jar-candle",
    photo: "",
    swatch: "#F7E6C4",
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
    swatch: "#DCE6D8",
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
    swatch: "#E4DCF0",
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
    swatch: "#F3DDE1",
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
