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
      brother: string;
      brotherKn: string;
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
      brother: "Koushik G H",
      brotherKn: "ಕೌಶಿಕ್ ಜಿ. ಎಚ್.",
      parents: "Daughter of Smt. Pankaja J C & Sri. Haruve Gowda G J",
      parentsKn: "ಶ್ರೀಮತಿ ಪಂಕಜ ಜೆ. ಸಿ. ಮತ್ತು ಶ್ರೀ ಹರುವೆ ಗೌಡ ಜಿ. ಜೆ. ಅವರ ಪ್ರೀತಿಯ ಸುಪುತ್ರಿ",
      familyTitle: "Bride's Family",
      familyTitleKn: "ವಧುವಿನ ಕುಟುಂಬ",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
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
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      bioKey: "groomBio",
    },
    monogram: "K & S",
    monogramKn: "ಕ & ಸ್ವ",
    heroImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=85",
    storyImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=85",
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
    googleMapsUrl: "https://maps.app.goo.gl/HYsMCpFWu63V42vh9?g_st=ac",
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
    src: "https://assets.mixkit.co/music/preview/mixkit-serene-indian-sitar-and-tabla-meditation-2882.mp3",
    title: "Mangala Nadaswaram & Sitar",
    artist: "Auspicious Heritage Melody",
    autoPlayPrompt: true,
  },
};
