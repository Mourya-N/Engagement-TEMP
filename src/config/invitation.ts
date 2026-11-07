export interface ScheduleItem {
  time: string;
  titleKey: string;
  descKey: string;
  iconName: string;
}

export interface InvitationConfig {
  couple: {
    bride: {
      firstName: string;
      fullName: string;
      firstNameKn: string;
      fullNameKn: string;
      father: string;
      fatherKn: string;
      mother: string;
      motherKn: string;
      brother?: string;
      brotherKn?: string;
      parents: string;
      parentsKn: string;
      familyTitle: string;
      familyTitleKn: string;
      image: string;
      bioKey: string;
    };
    groom: {
      firstName: string;
      fullName: string;
      firstNameKn: string;
      fullNameKn: string;
      father: string;
      fatherKn: string;
      mother: string;
      motherKn: string;
      parents: string;
      parentsKn: string;
      familyTitle: string;
      familyTitleKn: string;
      image: string;
      bioKey: string;
    };
    monogram: string;
    monogramKn: string;
    heroImage: string;
    storyImage: string;
    childhood?: {
      brideImage: string;
      groomImage: string;
      brideAgeText: string;
      brideAgeTextKn: string;
      groomAgeText: string;
      groomAgeTextKn: string;
    };
  };
  event: {
    title: string;
    titleKn: string;
    dateISO: string; // 2027-01-24T10:30:00+05:30
    dateFormatted: string;
    dateFormattedKn: string;
    day: string;
    dayKn: string;
    time: string;
    timeKn: string;
    muhurtham: string;
    muhurthamKn: string;
    timezone: string;
    venueName: string;
    venueNameKn: string;
    address: string;
    addressKn: string;
    city: string;
    cityKn: string;
    googleMapsUrl: string;
    googleMapsSearchUrl?: string;
    googleMapsDirectionsUrl?: string;
    embedMapUrl?: string;
    dressCode: string;
    dressCodeKn: string;
    schedule: ScheduleItem[];
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  rsvp: {
    maxGuestsAllowed: number;
    defaultGuests: number;
    deadlineDate: string;
    deadlineDateKn: string;
    enableDemoMode: boolean;
    whatsappPrefillText: string;
    whatsappPrefillTextKn: string;
  };
  audio: {
    src: string;
    title: string;
    artist: string;
    autoPlayPrompt: boolean;
  };
}

export const INVITATION_CONFIG: InvitationConfig = {
  couple: {
    bride: {
      firstName: "Kavana",
      fullName: "Kavana G H",
      firstNameKn: "ಕವನ",
      fullNameKn: "ಕವನ ಜಿ. ಎಚ್.",
      father: "Sri. Haruve Gowda G J",
      fatherKn: "ಶ್ರೀ ಹರುವೆ ಗೌಡ ಜಿ. ಜೆ.",
      mother: "Smt. Pankaja J C",
      motherKn: "ಶ್ರೀಮತಿ ಪಂಕಜ ಜೆ. ಸಿ.",
      parents: "Daughter of Smt. Pankaja J C & Sri. Haruve Gowda G J",
      parentsKn: "ಶ್ರೀಮತಿ ಪಂಕಜ ಜೆ. ಸಿ. ಮತ್ತು ಶ್ರೀ ಹರುವೆ ಗೌಡ ಜಿ. ಜೆ. ಅವರ ಪ್ರೀತಿಯ ಸುಪುತ್ರಿ",
      familyTitle: "Bride's Family",
      familyTitleKn: "ವಧುವಿನ ಕುಟುಂಬ",
      image: "/images/kavana-portrait.jpg",
      bioKey: "brideBio",
    },
    groom: {
      firstName: "Sweekar",
      fullName: "Sweekar L",
      firstNameKn: "ಸ್ವೀಕಾರ್",
      fullNameKn: "ಸ್ವೀಕಾರ್ ಎಲ್.",
      father: "Sri. Lakshman G D",
      fatherKn: "ಶ್ರೀ ಲಕ್ಷ್ಮಣ್ ಜಿ. ಡಿ.",
      mother: "Smt. Komala D S",
      motherKn: "ಶ್ರೀಮತಿ ಕೋಮಲ ಡಿ. ಎಸ್.",
      parents: "Son of Smt. Komala D S & Sri. Lakshman G D",
      parentsKn: "ಶ್ರೀಮತಿ ಕೋಮಲ ಡಿ. ಎಸ್. ಮತ್ತು ಶ್ರೀ ಲಕ್ಷ್ಮಣ್ ಜಿ. ಡಿ. ಅವರ ಪ್ರೀತಿಯ ಸುಪುತ್ರ",
      familyTitle: "Groom's Family",
      familyTitleKn: "ವರನ ಕುಟುಂಬ",
      image: "/images/sweekar-portrait.jpg",
      bioKey: "groomBio",
    },
    monogram: "K & S",
    monogramKn: "ಕ & ಸ್ವ",
    heroImage: "/images/couple-hero.jpg",
    storyImage: "/images/couple-hero.jpg",
    childhood: {
      brideImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=85",
      groomImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=85",
      brideAgeText: "Sweet Childhood Memories",
      brideAgeTextKn: "ಮುದ್ದು ಬಾಲ್ಯದ ಸವಿನೆನಪು",
      groomAgeText: "Golden Childhood Days",
      groomAgeTextKn: "ಬಂಗಾರದ ಬಾಲ್ಯದ ದಿನಗಳು",
    },
  },
  event: {
    title: "Engagement Ceremony",
    titleKn: "ನಿಶ್ಚಿತಾರ್ಥ ಮಹೋತ್ಸವ",
    dateISO: "2027-01-24T10:30:00+05:30",
    dateFormatted: "January 24, 2027",
    dateFormattedKn: "೨೪ ಜನವರಿ ೨೦೨೭",
    day: "Sunday",
    dayKn: "ಭಾನುವಾರ",
    time: "10:30 AM onwards",
    timeKn: "ಮುಂಜಾನೆ ೧೦:೩೦ ರಿಂದ",
    muhurtham: "Shubha Muhurtham: 10:45 AM - 11:45 AM",
    muhurthamKn: "ಶುಭ ಮುಹೂರ್ತ: ಬೆಳಿಗ್ಗೆ ೧೦:೪೫ ರಿಂದ ೧೧:೪೫",
    timezone: "Asia/Kolkata",
    venueName: "Nandagokula Party Hall",
    venueNameKn: "ನಂದಗೋಕುಲ ಪಾರ್ಟಿ ಹಾಲ್",
    address: "Channarayapatna, Hassan, Karnataka",
    addressKn: "ಚನ್ನರಾಯಪಟ್ಟಣ, ಹಾಸನ, ಕರ್ನಾಟಕ",
    city: "Channarayapatna, Hassan",
    cityKn: "ಚನ್ನರಾಯಪಟ್ಟಣ, ಹಾಸನ",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nandagokula+Party+Hall+Channarayapatna",
    googleMapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=Nandagokula+Party+Hall+Channarayapatna",
    googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=12.898681,76.391895",
    embedMapUrl: "https://maps.google.com/maps?q=Nandagokula%20Party%20Hall%2C%20Channarayapatna%2C%20Karnataka&t=&z=15&ie=UTF8&iwloc=&output=embed",
    dressCode: "Traditional Indian / Festive Ethnic",
    dressCodeKn: "ಭವ್ಯ ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪು / ರೇಷ್ಮೆ ವಸ್ತ್ರ",
    schedule: [
      {
        time: "10:00 AM",
        titleKey: "scheduleArrivalTitle",
        descKey: "scheduleArrivalDesc",
        iconName: "Music",
      },
      {
        time: "10:45 AM",
        titleKey: "scheduleMuhurthamTitle",
        descKey: "scheduleMuhurthamDesc",
        iconName: "Sparkles",
      },
      {
        time: "11:45 AM",
        titleKey: "scheduleBlessingsTitle",
        descKey: "scheduleBlessingsDesc",
        iconName: "Heart",
      },
      {
        time: "12:30 PM",
        titleKey: "scheduleFeastTitle",
        descKey: "scheduleFeastDesc",
        iconName: "Utensils",
      },
    ],
  },
  contact: {
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "celebration@kavana-sweekar.in",
  },
  rsvp: {
    maxGuestsAllowed: 6,
    defaultGuests: 2,
    deadlineDate: "January 15, 2027",
    deadlineDateKn: "೧೫ ಜನವರಿ ೨೦೨೭",
    enableDemoMode: true,
    whatsappPrefillText: "Namaskara, I am pleased to RSVP for the Engagement Ceremony of Kavana & Sweekar.",
    whatsappPrefillTextKn: "ನಮಸ್ಕಾರ, ಕವನ ಮತ್ತು ಸ್ವೀಕಾರ್ ಅವರ ನಿಶ್ಚಿತಾರ್ಥ ಸಮಾರಂಭಕ್ಕೆ ನಾನು ಸಂತೋಷದಿಂದ RSVP ದೃಢೀಕರಿಸುತ್ತಿದ್ದೇನೆ.",
  },
  audio: {
    src: "/audio/radhe-wedding-song.m4a",
    title: "Radhe - The Wedding Song",
    artist: "Ibbani Tabbida Ileyali (Gagan Baderiya)",
    autoPlayPrompt: true,
  },
};
