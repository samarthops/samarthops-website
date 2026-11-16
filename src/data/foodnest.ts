/** FoodNest concept demo: fictional menu and prices. */

export const TAX_RATE = 0.05;
export const DELIVERY_FEE = 40;

export type MenuCategory = { id: string; label: string };

export const categories: MenuCategory[] = [
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "breads-rice", label: "Breads and rice" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  veg: boolean;
  /** Short line on the card. */
  blurb: string;
  /** Longer text in the detail view. */
  detail: string;
  contains: string;
  icon: "soup" | "salad" | "flame" | "drumstick" | "pot" | "wheat" | "cake" | "cone" | "cookie" | "milk" | "coffee" | "citrus" | "soda";
  tone: string;
};

export const menu: MenuItem[] = [
  {
    id: "corn-bhel",
    name: "Crispy Corn Bhel",
    category: "starters",
    price: 120,
    veg: true,
    blurb: "Sweet corn, onion and tangy chutneys.",
    detail: "Crunchy corn tossed with chopped onion, tomato and our tamarind and mint chutneys. A light way to start.",
    contains: "Corn, onion, tomato, tamarind, mint, gram flour sev",
    icon: "salad",
    tone: "#FDE68A",
  },
  {
    id: "paneer-tikka",
    name: "Paneer Tikka Bites",
    category: "starters",
    price: 220,
    veg: true,
    blurb: "Charred cottage cheese cubes in a spiced marinade.",
    detail: "Cubes of paneer marinated in yoghurt and spices, then grilled until lightly charred. Served with mint dip.",
    contains: "Paneer, yoghurt, capsicum, spices",
    icon: "flame",
    tone: "#FDBA74",
  },
  {
    id: "seekh-rolls",
    name: "Chicken Seekh Rolls",
    category: "starters",
    price: 260,
    veg: false,
    blurb: "Minced chicken kebab rolled in soft flatbread.",
    detail: "Juicy minced chicken kebab wrapped in a soft roomali-style flatbread with onions and green chutney.",
    contains: "Chicken, onion, spices, wheat flour",
    icon: "drumstick",
    tone: "#FCA5A5",
  },
  {
    id: "tomato-soup",
    name: "Tomato Basil Soup",
    category: "starters",
    price: 140,
    veg: true,
    blurb: "Slow-cooked tomatoes with fresh basil.",
    detail: "A smooth soup of slow-cooked tomatoes finished with basil and a little cream.",
    contains: "Tomato, basil, cream, butter",
    icon: "soup",
    tone: "#FCA5A5",
  },
  {
    id: "butter-paneer",
    name: "Butter Paneer Masala",
    category: "mains",
    price: 280,
    veg: true,
    blurb: "Paneer in a rich tomato and butter gravy.",
    detail: "Soft paneer simmered in a creamy tomato gravy with butter and mild spices. Best with naan or rice.",
    contains: "Paneer, tomato, butter, cream, cashew",
    icon: "pot",
    tone: "#FDBA74",
  },
  {
    id: "dal-tadka",
    name: "Home-style Dal Tadka",
    category: "mains",
    price: 200,
    veg: true,
    blurb: "Yellow lentils tempered with garlic and cumin.",
    detail: "Lentils cooked until soft, then finished with a sizzling tempering of garlic, cumin and dried chilli.",
    contains: "Lentils, garlic, cumin, ghee",
    icon: "soup",
    tone: "#FDE68A",
  },
  {
    id: "chicken-curry",
    name: "Chicken Curry Bowl",
    category: "mains",
    price: 320,
    veg: false,
    blurb: "Tender chicken in an onion and tomato curry.",
    detail: "Chicken pieces slow-cooked in a robust onion and tomato curry with whole spices.",
    contains: "Chicken, onion, tomato, whole spices",
    icon: "drumstick",
    tone: "#FCA5A5",
  },
  {
    id: "veg-biryani",
    name: "Veg Biryani",
    category: "mains",
    price: 260,
    veg: true,
    blurb: "Fragrant rice layered with vegetables and herbs.",
    detail: "Long-grain rice and seasonal vegetables cooked together with saffron, mint and spices. Served with raita.",
    contains: "Rice, mixed vegetables, saffron, mint, yoghurt",
    icon: "pot",
    tone: "#BBF7D0",
  },
  {
    id: "butter-naan",
    name: "Butter Naan",
    category: "breads-rice",
    price: 60,
    veg: true,
    blurb: "Soft oven-baked bread brushed with butter.",
    detail: "Leavened bread baked until puffed and brushed with butter.",
    contains: "Wheat flour, yoghurt, butter",
    icon: "wheat",
    tone: "#FDE68A",
  },
  {
    id: "garlic-naan",
    name: "Garlic Naan",
    category: "breads-rice",
    price: 80,
    veg: true,
    blurb: "Naan topped with garlic and coriander.",
    detail: "Our butter naan topped with chopped garlic and fresh coriander before baking.",
    contains: "Wheat flour, yoghurt, garlic, coriander",
    icon: "wheat",
    tone: "#FDE68A",
  },
  {
    id: "jeera-rice",
    name: "Steamed Jeera Rice",
    category: "breads-rice",
    price: 110,
    veg: true,
    blurb: "Basmati rice with toasted cumin.",
    detail: "Fluffy steamed basmati rice tossed with toasted cumin seeds and a little ghee.",
    contains: "Basmati rice, cumin, ghee",
    icon: "pot",
    tone: "#E5E7EB",
  },
  {
    id: "tandoori-roti",
    name: "Tandoori Roti",
    category: "breads-rice",
    price: 35,
    veg: true,
    blurb: "Whole wheat flatbread from the clay oven.",
    detail: "A whole wheat flatbread baked in a clay oven, lightly charred at the edges.",
    contains: "Whole wheat flour",
    icon: "wheat",
    tone: "#FED7AA",
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun (2 pieces)",
    category: "desserts",
    price: 90,
    veg: true,
    blurb: "Soft milk dumplings in cardamom syrup.",
    detail: "Two warm milk-solid dumplings soaked in a light cardamom and rose syrup.",
    contains: "Milk solids, sugar, cardamom, rose water",
    icon: "cake",
    tone: "#FDBA74",
  },
  {
    id: "brownie",
    name: "Chocolate Brownie",
    category: "desserts",
    price: 130,
    veg: true,
    blurb: "Dense, fudgy brownie with walnuts.",
    detail: "A rich, fudgy chocolate brownie with crunchy walnut pieces.",
    contains: "Chocolate, butter, eggs, walnuts, wheat flour",
    icon: "cookie",
    tone: "#D6BCA9",
  },
  {
    id: "mango-kulfi",
    name: "Mango Kulfi",
    category: "desserts",
    price: 110,
    veg: true,
    blurb: "Frozen milk dessert with ripe mango.",
    detail: "Slow-reduced milk frozen with ripe mango pulp and pistachio.",
    contains: "Milk, mango, sugar, pistachio",
    icon: "cone",
    tone: "#FDE68A",
  },
  {
    id: "sweet-lassi",
    name: "Sweet Lassi",
    category: "drinks",
    price: 90,
    veg: true,
    blurb: "Thick chilled yoghurt drink.",
    detail: "Chilled yoghurt blended with sugar and a pinch of cardamom.",
    contains: "Yoghurt, sugar, cardamom",
    icon: "milk",
    tone: "#E5E7EB",
  },
  {
    id: "masala-chai",
    name: "Masala Chai",
    category: "drinks",
    price: 50,
    veg: true,
    blurb: "Spiced milk tea.",
    detail: "Tea simmered with milk, ginger and cardamom.",
    contains: "Tea, milk, ginger, cardamom, sugar",
    icon: "coffee",
    tone: "#D6BCA9",
  },
  {
    id: "lime-soda",
    name: "Fresh Lime Soda",
    category: "drinks",
    price: 70,
    veg: true,
    blurb: "Sweet or salted, with fresh lime.",
    detail: "Fresh lime juice topped with chilled soda. Sweet or salted: tell us in the order note.",
    contains: "Lime, soda, sugar or salt",
    icon: "citrus",
    tone: "#BBF7D0",
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    category: "drinks",
    price: 110,
    veg: true,
    blurb: "Blended coffee with milk and ice.",
    detail: "Strong coffee blended with cold milk and ice, lightly sweetened.",
    contains: "Coffee, milk, sugar, ice",
    icon: "soda",
    tone: "#D6BCA9",
  },
];

export type Totals = { subtotal: number; tax: number; delivery: number; total: number };

export function priceOrder(subtotal: number): Totals {
  if (subtotal <= 0) return { subtotal: 0, tax: 0, delivery: 0, total: 0 };
  const tax = Math.round(subtotal * TAX_RATE);
  return { subtotal, tax, delivery: DELIVERY_FEE, total: subtotal + tax + DELIVERY_FEE };
}
