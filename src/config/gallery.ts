export interface GalleryPhoto {
  id: string;
  url: string;
  thumbnail: string;
  captionKey: string;
  category: "all" | "couple" | "traditional" | "candid" | "individual";
  aspectRatio: "portrait" | "landscape" | "square";
  altText: string;
}

export const GALLERY_CONFIG: {
  categories: { id: string; labelKey: string }[];
  photos: GalleryPhoto[];
} = {
  categories: [
    { id: "all", labelKey: "galleryAll" },
    { id: "couple", labelKey: "galleryCouple" },
    { id: "traditional", labelKey: "galleryTraditional" },
    { id: "candid", labelKey: "galleryCandid" },
    { id: "individual", labelKey: "galleryIndividual" },
  ],
  photos: [
    {
      id: "photo-1",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      captionKey: "galleryPhoto1Caption",
      category: "couple",
      aspectRatio: "portrait",
      altText: "Traditional Indian Engagement Couple in Royal Attire",
    },
    {
      id: "photo-2",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      captionKey: "galleryPhoto2Caption",
      category: "individual",
      aspectRatio: "portrait",
      altText: "Kavana in Elegant Royal Silk Saree and Gold Ornaments",
    },
    {
      id: "photo-3",
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      captionKey: "galleryPhoto3Caption",
      category: "traditional",
      aspectRatio: "landscape",
      altText: "Traditional Ring Ceremony and Floral Garland Details",
    },
    {
      id: "photo-4",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      captionKey: "galleryPhoto4Caption",
      category: "individual",
      aspectRatio: "portrait",
      altText: "Sweekar in Traditional Ivory and Gold Kurta",
    },
    {
      id: "photo-5",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      captionKey: "galleryPhoto5Caption",
      category: "candid",
      aspectRatio: "landscape",
      altText: "Joyful Shared Smiles and Palace Courtyard Moments",
    },
    {
      id: "photo-6",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      captionKey: "galleryPhoto6Caption",
      category: "couple",
      aspectRatio: "square",
      altText: "Auspicious Heritage Ring Exchange",
    },
    {
      id: "photo-7",
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      captionKey: "galleryPhoto7Caption",
      category: "candid",
      aspectRatio: "portrait",
      altText: "Golden Hour Palace Garden Memories",
    },
    {
      id: "photo-8",
      url: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1600&q=85",
      thumbnail: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80",
      captionKey: "galleryPhoto8Caption",
      category: "traditional",
      aspectRatio: "landscape",
      altText: "Jasmine Floral Mandap and Traditional Brass Diya Setup",
    },
  ],
};

