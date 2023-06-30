const restaurantDetails = {
  name: "Dzigbordi Home Cooking",
  nameEqualsLogo: false,
  shortName: "Dzigbordi",
  path: "dzigbordi",
  nameExtension: "",
  website: "https://www.dzigbordigh.com",
  backgroundPic:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  orderDuration: 5,
  branches: [
    {
      name: "dansoman",
      address: {
        description: "Dansoman High Street, Accra, near Dela",
        shortDescription: "Dansoman, Sakaman",
        googleAddress: {
          lng: -0.2706717944753955,
          lat: 5.569252300035966,
          description: "Near Dela, Dansoman High Street, Accra, Ghana",
          matched_substrings: [
            {
              length: 5,
              offset: 0,
            },
          ],
          place_id: "ChIJ9fvJ1vCZ3w8RiahloP5ZVkM",
          reference: "ChIJ9fvJ1vCZ3w8RiahloP5ZVkM",
          structured_formatting: {
            main_text: "Veggie Box",
            main_text_matched_substrings: [
              {
                length: 5,
                offset: 0,
              },
            ],
            secondary_text: "Dansoman High Street, Accra, Ghana",
          },
          terms: [
            {
              offset: 0,
              value: "Dzigbordi Dansoman",
            },
            {
              offset: 26,
              value: "Dansoman High Street",
            },
            {
              offset: 48,
              value: "Accra",
            },
            {
              offset: 55,
              value: "Ghana",
            },
          ],
          types: ["restaurant", "point_of_interest", "food", "establishment"],
        },
      },
      workingHours: [
        { day: "Monday", start: "8:30", close: "21:00" },
        { day: "Tuesday", start: "8:30", close: "21:00" },
        { day: "Wednesday", start: "8:30", close: "21:00" },
        { day: "Thursday", start: "8:30", close: "21:00" },
        { day: "Friday", start: "8:30", close: "21:00" },
        { day: "Saturday", start: "12:30", close: "21:00" },
        { day: "Sunday", start: "12:30", close: "21:00" },
      ],
      contact: {
        email: "support@dzigbordigh.com",
        phoneNumber: "+233244885739",
      },
    },
  ],

  socials: {
    facebook: {
      url: "https://www.facebook.com/chanchoman1",
      webUrl: "fb://profile/chanchoman1",
    },
    instagram: {
      webUrl: "instagram://user?username=veggiebox_gh",
      url: "https://www.instagram.com/governor_narh",
    },
    twitter: {
      webUrl: "twitter://user?screen_name=governornarh",
      url: "https://www.twitter.com/governornarh",
    },
    snapchat: {
      webUrl: "snapchat://add/wudalounge",
      url: "https://www.snapchat.com/add/chancho",
    },
    whatsapp: { number: "+233244885739" },
    boltFood: {
      url: "https://food.bolt.eu/en-US/137/p/38734-veggie-box",
    },
  },

  menu: {
    categories: [
      {
        name: "Banku",
        description: "Banku",
        dishes: [],
      },
      {
        name: "FuFu & Kokonte",
        description: "Fufu and Kokonte",
        dishes: [],
      },
      {
        name: "Rice",
        description: "Rice",
        dishes: [],
      },
      { name: "Kenkey", description: "Kenkey", dishes: [] },
      {
        name: "Rice Ball",
        description: "Rice Ball",
        dishes: [],
      },
      {
        name: "Noodles",
        description: "Noodles",
        dishes: [],
      },
      {
        name: "Beans",
        description: "Beans",
        dishes: [],
      },
      {
        name: "Yam",
        description: "Yam",
        dishes: [],
      },
    ],
  },
  about: {
    texts: [
      "At Dzigbordi Restaurant, we take pride in serving delicious and authentic Ghanaian dishes that capture the rich flavors and culinary traditions of our vibrant culture.",
      "Located in the heart of Ghana, our restaurant is a haven for food lovers seeking an unforgettable dining experience. We are passionate about showcasing the diverse range of local Ghanaian cuisine, from mouthwatering stews and soups to traditional favorites like banku, fufu, and waakye.",
      "With a focus on using high-quality ingredients sourced from local farmers and suppliers, we ensure that every dish is prepared with love and attention to detail. Our talented chefs infuse each recipe with authentic spices and seasonings, creating a symphony of flavors that will tantalize your taste buds.",
      "Beyond our delicious food, we strive to provide exceptional hospitality and a warm, welcoming atmosphere. Whether you're joining us for a family gathering, a casual lunch, or a romantic dinner, our friendly staff will ensure that your visit is nothing short of delightful.",
      "We believe that food has the power to bring people together and create cherished memories. That's why we invite you to embark on a culinary journey with us, exploring the vibrant flavors of Ghana and experiencing the true essence of our culture.",
      "Welcome to Dzigbordi Restaurant, where every bite tells a story and every meal is a celebration of Ghanaian gastronomy.",
    ],
    photos: [
      "https://res.cloudinary.com/gorillasystemsgh/image/upload/v1687096078/IMG-1601_gydrws.jpg",
    ],
  },

  theme: {
    palette: {
      mode: "light",
      primary: {
        light: "#0000d4",

        dark: "#c0392b",
        main: "#e67e22",
        contrastText: "#fff",
      },
      secondary: {
        light: "#d4d400",
        main: "  #000088",
        dark: "#888800",
        contrastText: "#000",
      },
      error: {
        main: "#ce0018",
        light: "#ff0220",
        dark: "#a50013",
        contrastText: "#fff",
      },
      info: {
        main: "#27ae60",
        light: "#8f8b6a",
        dark: "#5b5944",
        contrastText: "#fff",
      },
      highlight: "#9b59b6",

      divider: "rgba(0, 0, 0, 0.08)",
    },

    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: [
        // "Ubuntu",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      h5: {
        fontFamily: "Ubuntu",
      },
      h4: {
        fontFamily: "Ubuntu",
      },
      // body1: { fontSize: "0.9rem" },
      body2: {
        fontSize: "0.8rem",
        color: "text.secondary",
        fontWeight: "300",
      },
    },
  },
};

export default restaurantDetails;
