/* ============================================
   VEDICFUELOON — PRODUCT CATALOG & SEED DATA
   All 23 products with Tamil names, descriptions
   ============================================ */

export const CATEGORIES = {
  KANJI: { 
    id: 'kanji', 
    name: 'Kanji Varieties', 
    tamilName: 'கஞ்சி வகைகள்', 
    icon: 'bowl', 
    count: 21,
    image: './images/cat_kanji_varieties.jpg',
    tagline: 'Traditional slow-cooked earthenware porridges crafted from 21 ancient grains, millets, and medicinal roots.',
    badge: '21 Heirloom Varieties',
    chips: ['Clay Pot Cooked', '21 Ancient Grains', 'Zero Chemicals'],
    accent: '#2D5E3F'
  },
  DAILY_SPL: { 
    id: 'daily-spl', 
    name: 'Daily Special', 
    tamilName: 'தினசரி சிறப்பு கஞ்சி', 
    icon: 'sparkle', 
    count: 1,
    image: './images/cat_daily_special.jpg',
    tagline: 'Master chef\'s sunrise curation brewed fresh each dawn with seasonal wild herbs and pure palm nectar.',
    badge: 'Sunrise Fresh Today',
    chips: ['Sunrise Brew', 'Seasonal Herbs', 'Limited Batches'],
    accent: '#D4A017'
  },
  SOLID: { 
    id: 'solid-eats', 
    name: 'Solid Eats', 
    tamilName: 'திட உணவுகள் (பயறுகள் & முட்டை)', 
    icon: 'salad', 
    count: 2,
    image: './images/cat_solid_eats.jpg',
    tagline: 'Nutritious sprouted pulses (முளைகட்டிய பயறுகள்) & farm-fresh boiled egg (அவித்த முட்டை) for vital stamina.',
    badge: 'Sprouts & Boiled Egg',
    chips: ['Sprouts Pulses', 'Boiled Egg', 'High Protein'],
    accent: '#8B4513'
  }
};

export const PRODUCTS = [
  // ── KANJI VARIETIES ──
  {
    id: 1,
    name: 'Karupu Kauvni Kanji',
    tamilName: 'கருப்பு கவுணி கஞ்சி',
    category: 'kanji',
    price: 89,
    originalPrice: 120,
    description: 'Ancient black rice porridge, rich in anthocyanins and antioxidants. A royal delicacy from Tamil heritage, slow-cooked to perfection with jaggery and coconut milk.',
    nutrition: { calories: '185', protein: '4.2g', fiber: '3.1g', iron: '12%', calcium: '8%', vitB: '15%' },
    rating: 4.9,
    reviews: 342,
    badge: 'bestseller',
    inStock: true,
    stock: 45,
    image: './images/karupu_kauvni_kanji.jpg'
  },
  {
    id: 2,
    name: 'Ulunda Kanji',
    tamilName: 'உளுந்த கஞ்சி',
    category: 'kanji',
    price: 79,
    originalPrice: 110,
    description: 'Traditional urad dal porridge, known for its warming properties and rich protein content. Perfect for cold mornings, prepared the authentic Tamil way.',
    nutrition: { calories: '170', protein: '8.5g', fiber: '2.8g', iron: '15%', calcium: '10%', vitB: '18%' },
    rating: 4.8,
    reviews: 218,
    badge: 'bestseller',
    inStock: true,
    stock: 38,
    image: './images/ulunda_kanji.jpg'
  },
  {
    id: 3,
    name: 'Sprouted Ragi Kanji',
    tamilName: 'முளைகட்டிய ராகி கஞ்சி',
    category: 'kanji',
    price: 99,
    originalPrice: 140,
    description: 'Nutrient-dense sprouted finger millet porridge. Sprouting increases bioavailability of calcium and iron. A superfood from grandmother\'s kitchen.',
    nutrition: { calories: '160', protein: '5.8g', fiber: '4.5g', iron: '18%', calcium: '22%', vitB: '20%' },
    rating: 4.9,
    reviews: 456,
    badge: 'bestseller',
    inStock: true,
    stock: 52,
    image: './images/sprouted_ragi_kanji.jpg'
  },
  {
    id: 4,
    name: 'Kulakar Kollu Kanji',
    tamilName: 'குளகர் கொள்ளு கஞ்சி',
    category: 'kanji',
    price: 85,
    originalPrice: 115,
    description: 'Horse gram porridge — a powerful weight-management superfood. Stone-ground and slow-cooked with traditional spices for authentic flavor.',
    nutrition: { calories: '145', protein: '9.2g', fiber: '5.1g', iron: '20%', calcium: '6%', vitB: '12%' },
    rating: 4.7,
    reviews: 167,
    badge: null,
    inStock: true,
    stock: 30,
    image: './images/kollu_kanji.jpg'
  },
  {
    id: 5,
    name: 'Moringa Kanji',
    tamilName: 'முருங்கை கஞ்சி',
    category: 'kanji',
    price: 95,
    originalPrice: 130,
    description: 'Drumstick leaf-infused kanji, packed with vitamins and minerals. The "miracle tree" porridge for immunity and vitality.',
    nutrition: { calories: '135', protein: '6.1g', fiber: '3.8g', iron: '25%', calcium: '15%', vitB: '22%' },
    rating: 4.8,
    reviews: 203,
    badge: 'new',
    inStock: true,
    stock: 42,
    image: './images/moringa_kanji.jpg'
  },
  {
    id: 6,
    name: 'Poondu Kanji',
    tamilName: 'பூண்டு கஞ்சி',
    category: 'kanji',
    price: 75,
    originalPrice: 100,
    description: 'Garlic-infused healing porridge, a traditional remedy for cold and flu. Known for its immunity-boosting and heart-healthy properties.',
    nutrition: { calories: '155', protein: '3.8g', fiber: '2.5g', iron: '10%', calcium: '5%', vitB: '14%' },
    rating: 4.6,
    reviews: 145,
    badge: null,
    inStock: true,
    stock: 25,
    image: './images/poondu_kanji.jpg'
  },
  {
    id: 7,
    name: 'Kerala Kanji',
    tamilName: 'கேரளா கஞ்சி',
    category: 'kanji',
    price: 89,
    originalPrice: 125,
    description: 'Inspired by Kerala\'s traditional rice gruel, enriched with coconut milk and spices. A comforting, wholesome porridge.',
    nutrition: { calories: '175', protein: '4.0g', fiber: '2.2g', iron: '8%', calcium: '12%', vitB: '10%' },
    rating: 4.7,
    reviews: 178,
    badge: null,
    inStock: true,
    stock: 35,
    image: './images/kerala_kanji.jpg'
  },
  {
    id: 8,
    name: 'Millet Kanji',
    tamilName: 'சிறுதானிய கஞ்சி',
    category: 'kanji',
    price: 85,
    originalPrice: 120,
    description: 'Multi-millet porridge combining foxtail, barnyard, and little millet. A nutritional powerhouse that fuels your day naturally.',
    nutrition: { calories: '165', protein: '5.5g', fiber: '4.8g', iron: '16%', calcium: '14%', vitB: '18%' },
    rating: 4.8,
    reviews: 289,
    badge: 'bestseller',
    inStock: true,
    stock: 60,
    image: './images/millet_kanji.jpg'
  },
  {
    id: 9,
    name: 'Pumpkin Kanji',
    tamilName: 'பூசணி கஞ்சி',
    category: 'kanji',
    price: 79,
    originalPrice: 105,
    description: 'Sweet pumpkin porridge with jaggery and cardamom. Rich in beta-carotene, this golden kanji is both delicious and nutritious.',
    nutrition: { calories: '140', protein: '3.2g', fiber: '3.5g', iron: '8%', calcium: '6%', vitB: '25%' },
    rating: 4.5,
    reviews: 112,
    badge: null,
    inStock: true,
    stock: 28,
    image: './images/pumpkin_kanji.jpg'
  },
  {
    id: 10,
    name: 'Mashroom Kanji',
    tamilName: 'காளான் கஞ்சி',
    category: 'kanji',
    price: 109,
    originalPrice: 150,
    description: 'Exotic mushroom porridge with earthy flavors. Packed with vitamin D and antioxidants for immune system support.',
    nutrition: { calories: '130', protein: '7.0g', fiber: '2.8g', iron: '10%', calcium: '4%', vitB: '30%' },
    rating: 4.6,
    reviews: 89,
    badge: 'new',
    inStock: true,
    stock: 20,
    image: './images/mashroom_kanji.jpg'
  },
  {
    id: 11,
    name: 'Wheat Kanji',
    tamilName: 'கோதுமை கஞ்சி',
    category: 'kanji',
    price: 69,
    originalPrice: 95,
    description: 'Wholesome broken wheat porridge, a staple comfort food. Light on the stomach and filling for the soul.',
    nutrition: { calories: '180', protein: '5.2g', fiber: '4.0g', iron: '12%', calcium: '6%', vitB: '16%' },
    rating: 4.5,
    reviews: 156,
    badge: null,
    inStock: true,
    stock: 50,
    image: './images/wheat_kanji.jpg'
  },
  {
    id: 12,
    name: 'Bamboo Kanji',
    tamilName: 'மூங்கில் கஞ்சி',
    category: 'kanji',
    price: 119,
    originalPrice: 160,
    description: 'Rare bamboo rice porridge from tribal recipes. A unique delicacy with nutty flavor, harvested once in decades.',
    nutrition: { calories: '155', protein: '4.8g', fiber: '3.2g', iron: '14%', calcium: '8%', vitB: '12%' },
    rating: 4.9,
    reviews: 67,
    badge: 'bestseller',
    inStock: true,
    stock: 15,
    image: './images/bamboo_kanji.jpg'
  },
  {
    id: 13,
    name: 'Kolakandha',
    tamilName: 'கோலாகண்டா',
    category: 'kanji',
    price: 95,
    originalPrice: 130,
    description: 'Heritage recipe kolakandha — fermented rice porridge with cumin and ginger. A probiotic-rich traditional Tamil drink.',
    nutrition: { calories: '125', protein: '3.5g', fiber: '2.0g', iron: '8%', calcium: '10%', vitB: '14%' },
    rating: 4.7,
    reviews: 198,
    badge: null,
    inStock: true,
    stock: 40,
    image: './images/kolakandha.jpg'
  },
  {
    id: 14,
    name: 'Vegetable Kanji',
    tamilName: 'காய்கறி கஞ்சி',
    category: 'kanji',
    price: 85,
    originalPrice: 115,
    description: 'Garden-fresh vegetable porridge with seasonal greens. A rainbow of nutrition in every spoonful.',
    nutrition: { calories: '120', protein: '4.5g', fiber: '5.2g', iron: '15%', calcium: '12%', vitB: '20%' },
    rating: 4.6,
    reviews: 134,
    badge: null,
    inStock: true,
    stock: 35,
    image: './images/vegetable_kanji.jpg'
  },
  {
    id: 15,
    name: 'Navar Nava Pire Kanji',
    tamilName: 'நாவர் நவ பிரே கஞ்சி',
    category: 'kanji',
    price: 129,
    originalPrice: 175,
    description: 'Nine-grain traditional porridge combining ancient grains. The ultimate nutrition blend from Siddha medicine traditions.',
    nutrition: { calories: '190', protein: '7.8g', fiber: '5.5g', iron: '22%', calcium: '18%', vitB: '25%' },
    rating: 4.9,
    reviews: 312,
    badge: 'bestseller',
    inStock: true,
    stock: 25,
    image: './images/navar_kanji.jpg'
  },
  {
    id: 16,
    name: 'Keerai Kanji',
    tamilName: 'கீரை கஞ்சி',
    category: 'kanji',
    price: 79,
    originalPrice: 110,
    description: 'Fresh spinach and amaranth greens porridge. Iron-rich superfood kanji for strength and vitality.',
    nutrition: { calories: '115', protein: '5.0g', fiber: '4.2g', iron: '28%', calcium: '15%', vitB: '18%' },
    rating: 4.7,
    reviews: 167,
    badge: null,
    inStock: true,
    stock: 32,
    image: './images/keerai_kanji.jpg'
  },
  {
    id: 17,
    name: 'Quinoa Kanji',
    tamilName: 'கினோவா கஞ்சி',
    category: 'kanji',
    price: 139,
    originalPrice: 190,
    description: 'Modern superfood meets Tamil tradition. Quinoa cooked the kanji way with coconut milk and palm jaggery.',
    nutrition: { calories: '175', protein: '8.5g', fiber: '4.0g', iron: '15%', calcium: '8%', vitB: '20%' },
    rating: 4.6,
    reviews: 98,
    badge: 'new',
    inStock: true,
    stock: 22,
    image: './images/quinoa_kanji.jpg'
  },
  {
    id: 18,
    name: 'Barli Kanji',
    tamilName: 'பார்லி கஞ்சி',
    category: 'kanji',
    price: 75,
    originalPrice: 100,
    description: 'Cooling barley porridge, perfect for summer. Known for its kidney-friendly properties and soothing taste.',
    nutrition: { calories: '150', protein: '4.2g', fiber: '6.0g', iron: '10%', calcium: '6%', vitB: '12%' },
    rating: 4.5,
    reviews: 123,
    badge: null,
    inStock: true,
    stock: 40,
    image: './images/barli_kanji.jpg'
  },
  {
    id: 19,
    name: 'Chola Kanji',
    tamilName: 'சோளக் கஞ்சி',
    category: 'kanji',
    price: 79,
    originalPrice: 105,
    description: 'Sorghum porridge — the drought-resistant supergrain of Tamil Nadu. Gluten-free and packed with energy.',
    nutrition: { calories: '170', protein: '5.0g', fiber: '3.8g', iron: '14%', calcium: '8%', vitB: '16%' },
    rating: 4.6,
    reviews: 145,
    badge: null,
    inStock: true,
    stock: 38,
    image: './images/chola_kanji.jpg'
  },

  // ── DAILY SPECIAL ──
  {
    id: 20,
    name: 'Daily SPL 1',
    tamilName: 'தினசரி சிறப்பு 1',
    category: 'daily-spl',
    price: 99,
    originalPrice: 149,
    description: 'Chef\'s daily special kanji — a unique blend that changes daily. Today\'s pick combines seasonal ingredients with traditional recipes.',
    nutrition: { calories: '165', protein: '6.0g', fiber: '4.0g', iron: '15%', calcium: '10%', vitB: '18%' },
    rating: 4.8,
    reviews: 567,
    badge: 'daily',
    inStock: true,
    stock: 100,
    image: './images/daily_spl_kanji.jpg'
  },

  // ── SOLID EATS ──
  {
    id: 21,
    name: 'Sprouts Pulses',
    tamilName: 'முளை கட்டிய பருப்புகள்',
    category: 'solid-eats',
    price: 69,
    originalPrice: 95,
    description: 'Fresh multi-sprout bowl with green gram, black gram, and horse gram. Tossed with lime, onion, and curry leaves.',
    nutrition: { calories: '120', protein: '10.5g', fiber: '6.0g', iron: '18%', calcium: '8%', vitB: '22%' },
    rating: 4.7,
    reviews: 234,
    badge: null,
    inStock: true,
    stock: 45,
    image: './images/sprouts_pulses.jpg'
  },
  {
    id: 22,
    name: 'Boiled Egg',
    tamilName: 'வேக வைத்த முட்டை',
    category: 'solid-eats',
    price: 29,
    originalPrice: 40,
    description: 'Farm-fresh country eggs, perfectly boiled. Served with a side of spiced salt and pepper. Pure protein power.',
    nutrition: { calories: '78', protein: '6.3g', fiber: '0g', iron: '5%', calcium: '3%', vitB: '10%' },
    rating: 4.5,
    reviews: 456,
    badge: null,
    inStock: true,
    stock: 80,
    image: './images/egg.jpg'
  },
  {
    id: 23,
    name: 'Poitha Bath',
    tamilName: 'பொய்த்த பாத்',
    category: 'kanji',
    price: 89,
    originalPrice: 120,
    description: 'Traditional fermented rice bath — a probiotic powerhouse. Left overnight and served cold with raw onion and green chilli.',
    nutrition: { calories: '145', protein: '3.8g', fiber: '2.0g', iron: '8%', calcium: '12%', vitB: '35%' },
    rating: 4.8,
    reviews: 289,
    badge: 'bestseller',
    inStock: true,
    stock: 35,
    image: './images/poitha_bath.jpg'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    text: 'The Sprouted Ragi Kanji takes me back to my grandmother\'s kitchen in Madurai. Authentic taste, pure ingredients. My whole family starts the day with VedicFueloon!',
    name: 'Priya Shankar',
    tamilName: 'பிரியா சங்கர்',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    initial: 'P'
  },
  {
    id: 2,
    text: 'I\'ve been ordering Karupu Kauvni Kanji for 3 months. My blood sugar levels have improved significantly. This is not just food — it\'s medicine from nature.',
    name: 'Dr. Ramesh Kumar',
    tamilName: 'டாக்டர் ரமேஷ் குமார்',
    location: 'Coimbatore, Tamil Nadu',
    rating: 5,
    initial: 'R'
  },
  {
    id: 3,
    text: 'As a fitness enthusiast, I love the Sprouts Pulses bowl. High protein, clean ingredients, and the taste is absolutely incredible. Best health food brand!',
    name: 'Karthik Vel',
    tamilName: 'கார்த்திக் வேல்',
    location: 'Madurai, Tamil Nadu',
    rating: 5,
    initial: 'K'
  },
  {
    id: 4,
    text: 'The Bamboo Kanji is a rare find! I\'ve never tasted anything like it. VedicFueloon brings forgotten Tamil recipes back to our dining table. Absolutely brilliant!',
    name: 'Lakshmi Devi',
    tamilName: 'லட்சுமி தேவி',
    location: 'Trichy, Tamil Nadu',
    rating: 5,
    initial: 'L'
  }
];

// Color assignments for product card backgrounds when no image
export const PRODUCT_COLORS = [
  'linear-gradient(135deg, #2D5E3F 0%, #1B3A2D 100%)',
  'linear-gradient(135deg, #D4A017 0%, #B8880F 100%)',
  'linear-gradient(135deg, #8B4513 0%, #654321 100%)',
  'linear-gradient(135deg, #556B2F 0%, #3B4F1E 100%)',
  'linear-gradient(135deg, #CD853F 0%, #A0522D 100%)',
  'linear-gradient(135deg, #6B8E23 0%, #4F6B1A 100%)',
  'linear-gradient(135deg, #8B7355 0%, #6B5B3E 100%)',
  'linear-gradient(135deg, #2E8B57 0%, #1E6B42 100%)',
];

export function getProductColor(id) {
  return PRODUCT_COLORS[(id - 1) % PRODUCT_COLORS.length];
}

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

export function getProductsByCategory(categoryId) {
  if (categoryId === 'all') return PRODUCTS;
  if (categoryId === 'daily-spl') {
    const spl = getDailySpecialProduct();
    return [{ ...spl, category: 'daily-spl', badge: 'daily' }];
  }
  if (categoryId === 'kanji') return PRODUCTS.filter(p => p.category === 'kanji' || p.category === 'daily-spl');
  return PRODUCTS.filter(p => p.category === categoryId);
}

export function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.tamilName.includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

export function getDailySpecialProduct() {
  const currentId = localStorage.getItem('vf_daily_special_id');
  if (currentId) {
    const found = PRODUCTS.find(p => p.id === parseInt(currentId));
    if (found) return found;
  }
  return PRODUCTS.find(p => p.id === 20) || PRODUCTS[0];
}
