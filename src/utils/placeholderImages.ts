// Utility function for placeholder images
export const getPlaceholderImage = (category: string, index: number, size = 400) => {
  const categories: Record<string, string[]> = {
    paint: [
      'https://images.unsplash.com/photo-1592890288564-76628a30a657', // Blue paint
      'https://images.unsplash.com/photo-1551103782-8ab07afd45c1', // Green paint
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f', // Orange paint
      'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d', // Red paint
    ],
    wood: [
      'https://images.unsplash.com/photo-1592496007188-b8b2c81a1d67', // Light wood
      'https://images.unsplash.com/photo-1557399516-7d7d6c5f8b5c', // Dark wood
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d', // Wood grain
      'https://images.unsplash.com/photo-1545243421-89e5c9b9d0c6', // Wood panel
    ],
    stone: [
      'https://images.unsplash.com/photo-1544377193-ee5b6d17974a', // Marble
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b', // Granite
      'https://images.unsplash.com/photo-1544934027-43e0c6a7f5c6', // Stone wall
      'https://images.unsplash.com/photo-1516937941344-00b4e0337589', // Concrete
    ],
    metal: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0', // Metal texture
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176', // Brushed metal
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64', // Steel
      'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd', // Metal grid
    ],
    construction: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
    ],
    default: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
    ]
  };

  const categoryImages = categories[category] || categories.default;
  const imageIndex = index % categoryImages.length;
  return `${categoryImages[imageIndex]}?w=${size}&h=${size}&fit=crop`;
};

// Project placeholder images
export const getProjectImage = (category: string) => {
  const images: Record<string, string> = {
    painting: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
    woodwork: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    construction: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    renovation: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
    default: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd'
  };

  return images[category] || images.default;
};