import { NextResponse } from 'next/server'

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  category: string;
  material: string;
  description: string;
  seller: {
    name: string;
    rating: number;
    totalSales: number;
  };
  reviews: Review[];
}

const products: Product[] = [
  {
    id: '1',
    name: 'Gold Necklace',
    image: '/products/necklace1.jpg',
    price: 999.99,
    oldPrice: 1299.99,
    rating: 4.5,
    category: 'Necklaces',
    material: 'Gold',
    description: 'Elegant 18k gold necklace with a delicate pendant. Perfect for both casual and formal occasions.',
    seller: {
      name: 'Luxury Jewels Inc.',
      rating: 4.8,
      totalSales: 1520,
    },
    reviews: [
      {
        id: 'r1',
        reviewerName: 'Emily S.',
        rating: 5,
        comment: 'Absolutely stunning! The quality is exceptional, and it looks even better in person.',
        likes: 24,
        dislikes: 1,
      },
      {
        id: 'r2',
        reviewerName: 'Michael T.',
        rating: 4,
        comment: 'Beautiful necklace, but the clasp is a bit difficult to handle. Overall, I\'m satisfied with the purchase.',
        likes: 10,
        dislikes: 2,
      },
    ],
  },
  { id: '2', name: 'Diamond Ring', image: '/products/ring1.jpg', price: 1499.99, oldPrice: 1799.99, rating: 5, category: 'Rings', material: 'Diamond', description: 'A dazzling diamond ring with a solitaire setting. Perfect for an engagement or anniversary.', seller: { name: 'Gemstone Gallery', rating: 4.7, totalSales: 850 }, reviews: [] },
  { id: '3', name: 'Silver Bracelet', image: '/products/bracelet1.jpg', price: 299.99, oldPrice: 349.99, rating: 4, category: 'Bracelets', material: 'Silver', description: 'A classic silver bracelet with a delicate chain. Perfect for everyday wear.', seller: { name: 'Silver Treasures', rating: 4.2, totalSales: 1200 }, reviews: [] },
  { id: '4', name: 'Pearl Earrings', image: '/products/earrings1.jpg', price: 249.99, oldPrice: 299.99, rating: 4.2, category: 'Earrings', material: 'Pearl', description: 'Elegant pearl earrings with a classic design. Perfect for any occasion.', seller: { name: 'Pearl Paradise', rating: 4.5, totalSales: 780 }, reviews: [] },
  { id: '5', name: 'Platinum Watch', image: '/products/watch1.jpg', price: 2999.99, oldPrice: 3499.99, rating: 4.8, category: 'Watches', material: 'Platinum', description: 'A luxurious platinum watch with a sophisticated design. Perfect for the discerning gentleman.', seller: { name: 'Timeless Classics', rating: 4.9, totalSales: 620 }, reviews: [] },
  { id: '6', name: 'Ruby Pendant', image: '/products/pendant1.jpg', price: 799.99, oldPrice: 999.99, rating: 4.3, category: 'Pendants', material: 'Ruby', description: 'A stunning ruby pendant with a brilliant cut. Perfect for adding a touch of elegance to any outfit.', seller: { name: 'Precious Gems', rating: 4.6, totalSales: 910 }, reviews: [] },
  { id: '7', name: 'Sapphire Earrings', image: '/products/earrings2.jpg', price: 1299.99, oldPrice: 1599.99, rating: 4.7, category: 'Earrings', material: 'Sapphire', description: 'Elegant sapphire earrings with a classic design. Perfect for any occasion.', seller: { name: 'Sapphire Dreams', rating: 4.8, totalSales: 1150 }, reviews: [] },
  { id: '8', name: 'Gold Bangle', image: '/products/bangle1.jpg', price: 599.99, oldPrice: 699.99, rating: 4.1, category: 'Bracelets', material: 'Gold', description: 'A classic gold bangle with a simple design. Perfect for everyday wear.', seller: { name: 'Golden Moments', rating: 4.3, totalSales: 1380 }, reviews: [] },
  { id: '9', name: 'Diamond Tennis Bracelet', image: '/products/bracelet2.jpg', price: 2499.99, oldPrice: 2999.99, rating: 4.9, category: 'Bracelets', material: 'Diamond', description: 'A luxurious diamond tennis bracelet with a classic design. Perfect for any occasion.', seller: { name: 'Diamond Delights', rating: 4.7, totalSales: 750 }, reviews: [] },
  { id: '10', name: 'Silver Anklet', image: '/products/anklet1.jpg', price: 149.99, oldPrice: 179.99, rating: 3.8, category: 'Anklets', material: 'Silver', description: 'A delicate silver anklet with a simple design. Perfect for summer wear.', seller: { name: 'Silver Linings', rating: 4.1, totalSales: 1020 }, reviews: [] },
  { id: '11', name: 'Emerald Necklace', image: '/products/necklace2.jpg', price: 1799.99, oldPrice: 2199.99, rating: 4.6, category: 'Necklaces', material: 'Emerald', description: 'A stunning emerald necklace with a brilliant cut. Perfect for adding a touch of elegance to any outfit.', seller: { name: 'Emerald Enchantment', rating: 4.9, totalSales: 880 }, reviews: [] },
  { id: '12', name: 'Rose Gold Ring', image: '/products/ring2.jpg', price: 699.99, oldPrice: 849.99, rating: 4.4, category: 'Rings', material: 'Rose Gold', description: 'A beautiful rose gold ring with a delicate design. Perfect for everyday wear.', seller: { name: 'Rose Gold Romance', rating: 4.5, totalSales: 1100 }, reviews: [] },
  { id: '13', name: 'Opal Stud Earrings', image: '/products/earrings3.jpg', price: 399.99, oldPrice: 499.99, rating: 4.2, category: 'Earrings', material: 'Opal', description: 'Elegant opal stud earrings with a classic design. Perfect for any occasion.', seller: { name: 'Opal Oasis', rating: 4.4, totalSales: 950 }, reviews: [] },
  { id: '14', name: 'Titanium Men\'s Band', image: '/products/ring3.jpg', price: 349.99, oldPrice: 399.99, rating: 4.3, category: 'Rings', material: 'Titanium', description: 'A durable titanium men\'s band with a simple design. Perfect for everyday wear.', seller: { name: 'Titanium Titans', rating: 4.6, totalSales: 1250 }, reviews: [] },
  { id: '15', name: 'Amethyst Pendant', image: '/products/pendant2.jpg', price: 279.99, oldPrice: 329.99, rating: 4.0, category: 'Pendants', material: 'Amethyst', description: 'A beautiful amethyst pendant with a delicate design. Perfect for everyday wear.', seller: { name: 'Amethyst Allure', rating: 4.3, totalSales: 1080 }, reviews: [] },
  { id: '16', name: 'Pearl Necklace', image: '/products/necklace3.jpg', price: 899.99, oldPrice: 1099.99, rating: 4.7, category: 'Necklaces', material: 'Pearl', description: 'An elegant pearl necklace with a classic design. Perfect for any occasion.', seller: { name: 'Pearl Perfection', rating: 4.8, totalSales: 990 }, reviews: [] },
  { id: '17', name: 'Topaz Bracelet', image: '/products/bracelet3.jpg', price: 449.99, oldPrice: 549.99, rating: 4.1, category: 'Bracelets', material: 'Topaz', description: 'A beautiful topaz bracelet with a delicate design. Perfect for everyday wear.', seller: { name: 'Topaz Treasures', rating: 4.2, totalSales: 1180 }, reviews: [] },
  { id: '18', name: 'Diamond Stud Earrings', image: '/products/earrings4.jpg', price: 999.99, oldPrice: 1299.99, rating: 4.8, category: 'Earrings', material: 'Diamond', description: 'Elegant diamond stud earrings with a classic design. Perfect for any occasion.', seller: { name: 'Diamond Dreams', rating: 4.9, totalSales: 820 }, reviews: [] },
  { id: '19', name: 'Gold Chain', image: '/products/chain1.jpg', price: 799.99, oldPrice: 999.99, rating: 4.5, category: 'Chains', material: 'Gold', description: 'A classic gold chain with a simple design. Perfect for everyday wear.', seller: { name: 'Gold Standard', rating: 4.6, totalSales: 1320 }, reviews: [] },
  { id: '20', name: 'Citrine Ring', image: '/products/ring4.jpg', price: 379.99, oldPrice: 449.99, rating: 3.9, category: 'Rings', material: 'Citrine', description: 'A beautiful citrine ring with a delicate design. Perfect for everyday wear.', seller: { name: 'Citrine Sparkle', rating: 4.2, totalSales: 1050 }, reviews: [] },
  { id: '21', name: 'Platinum Cufflinks', image: '/products/cufflinks1.jpg', price: 599.99, oldPrice: 699.99, rating: 4.2, category: 'Accessories', material: 'Platinum', description: 'Elegant platinum cufflinks with a classic design. Perfect for adding a touch of sophistication to any outfit.', seller: { name: 'Platinum Perfection', rating: 4.7, totalSales: 700 }, reviews: [] },
  { id: '22', name: 'Silver Toe Ring', image: '/products/toering1.jpg', price: 79.99, oldPrice: 99.99, rating: 3.7, category: 'Rings', material: 'Silver', description: 'A delicate silver toe ring with a simple design. Perfect for summer wear.', seller: { name: 'Silver Slippers', rating: 4.0, totalSales: 1280 }, reviews: [] },
  { id: '23', name: 'Gold Waist Chain', image: '/products/waistchain1.jpg', price: 1299.99, oldPrice: 1599.99, rating: 4.4, category: 'Body Jewelry', material: 'Gold', description: 'A stylish gold waist chain with a unique design. Perfect for adding a touch of glamour to any outfit.', seller: { name: 'Gold Goddess', rating: 4.5, totalSales: 930 }, reviews: [] },
  { id: '24', name: 'Diamond Nose Stud', image: '/products/nosestud1.jpg', price: 199.99, oldPrice: 249.99, rating: 4.0, category: 'Body Jewelry', material: 'Diamond', description: 'A delicate diamond nose stud with a classic design. Perfect for adding a touch of sparkle to your look.', seller: { name: 'Diamond Diva', rating: 4.3, totalSales: 1120 }, reviews: [] },
  { id: '25', name: 'Emerald Brooch', image: '/products/brooch1.jpg', price: 899.99, oldPrice: 1099.99, rating: 4.6, category: 'Accessories', material: 'Emerald', description: 'A stunning emerald brooch with a brilliant cut. Perfect for adding a touch of elegance to any outfit.', seller: { name: 'Emerald Elegance', rating: 4.8, totalSales: 800 }, reviews: [] }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const minPrice = Number(searchParams.get('minPrice') || 0)
  const maxPrice = Number(searchParams.get('maxPrice') || Infinity)
  const minRating = Number(searchParams.get('minRating') || 0)
  const sortBy = searchParams.get('sortBy') || 'featured'
  const category = searchParams.get('category') || ''
  const material = searchParams.get('material') || ''

  if (id) {
    const product = products.find(p => p.id === id)
    return product ? NextResponse.json(product) : NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  let filteredProducts = products.filter(
    (product) => 
      product.price >= minPrice && 
      product.price <= maxPrice && 
      product.rating >= minRating &&
      (category ? product.category === category : true) &&
      (material ? product.material === material : true)
  )

  switch (sortBy) {
    case 'price_asc':
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    default:
      // 'featured' - no sorting needed
      break
  }

  return NextResponse.json(filteredProducts)
}

