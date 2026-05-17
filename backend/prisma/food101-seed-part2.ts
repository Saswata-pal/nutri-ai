import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Food-101 dataset Part 2 (remaining 51 classes)
const food101DataPart2 = [
  { name: "guacamole", category: "Mexican", calories: 161, protein: 2, carbs: 9, fat: 15, fiber: 7, sugar: 1, sodium: 9, healthScore: 8, servingSize: "1/2 cup" },
  { name: "gyoza", category: "Asian", calories: 75, protein: 4, carbs: 8, fat: 3, fiber: 1, sugar: 1, sodium: 180, healthScore: 6, servingSize: "3 pieces" },
  { name: "hamburger", category: "American", calories: 354, protein: 20, carbs: 30, fat: 17, fiber: 2, sugar: 5, sodium: 497, healthScore: 5, servingSize: "1 burger" },
  { name: "hot and sour soup", category: "Asian", calories: 91, protein: 7, carbs: 8, fat: 4, fiber: 1, sugar: 2, sodium: 876, healthScore: 7, servingSize: "1 cup" },
  { name: "hot dog", category: "American", calories: 290, protein: 10, carbs: 24, fat: 17, fiber: 1, sugar: 4, sodium: 810, healthScore: 3, servingSize: "1 hot dog" },
  { name: "huevos rancheros", category: "Mexican", calories: 345, protein: 18, carbs: 28, fat: 18, fiber: 6, sugar: 4, sodium: 720, healthScore: 6, servingSize: "1 serving" },
  { name: "hummus", category: "Middle Eastern", calories: 166, protein: 5, carbs: 14, fat: 10, fiber: 4, sugar: 0, sodium: 269, healthScore: 8, servingSize: "1/4 cup" },
  { name: "ice cream", category: "Dessert", calories: 207, protein: 4, carbs: 24, fat: 11, fiber: 1, sugar: 21, sodium: 80, healthScore: 3, servingSize: "1/2 cup" },
  { name: "lasagna", category: "Italian", calories: 336, protein: 19, carbs: 30, fat: 15, fiber: 3, sugar: 6, sodium: 665, healthScore: 6, servingSize: "1 piece" },
  { name: "lobster bisque", category: "Soup", calories: 194, protein: 9, carbs: 11, fat: 12, fiber: 0, sugar: 3, sodium: 698, healthScore: 6, servingSize: "1 cup" },
  { name: "lobster roll sandwich", category: "Seafood", calories: 436, protein: 24, carbs: 36, fat: 21, fiber: 2, sugar: 5, sodium: 1092, healthScore: 6, servingSize: "1 roll" },
  { name: "macaroni and cheese", category: "American", calories: 310, protein: 11, carbs: 32, fat: 15, fiber: 1, sugar: 3, sodium: 566, healthScore: 4, servingSize: "1 cup" },
  { name: "macarons", category: "Dessert", calories: 97, protein: 2, carbs: 14, fat: 4, fiber: 0, sugar: 13, sodium: 12, healthScore: 3, servingSize: "1 macaron" },
  { name: "miso soup", category: "Asian", calories: 40, protein: 3, carbs: 5, fat: 1, fiber: 1, sugar: 2, sodium: 634, healthScore: 7, servingSize: "1 cup" },
  { name: "mussels", category: "Seafood", calories: 146, protein: 20, carbs: 6, fat: 4, fiber: 0, sugar: 0, sodium: 369, healthScore: 8, servingSize: "3 oz" },
  { name: "nachos", category: "Mexican", calories: 346, protein: 9, carbs: 36, fat: 19, fiber: 3, sugar: 2, sodium: 816, healthScore: 4, servingSize: "6-8 chips" },
  { name: "omelette", category: "Breakfast", calories: 154, protein: 11, carbs: 1, fat: 12, fiber: 0, sugar: 1, sodium: 342, healthScore: 7, servingSize: "2 eggs" },
  { name: "onion rings", category: "American", calories: 276, protein: 4, carbs: 31, fat: 16, fiber: 1, sugar: 3, sodium: 430, healthScore: 3, servingSize: "8-9 rings" },
  { name: "oysters", category: "Seafood", calories: 68, protein: 8, carbs: 4, fat: 2, fiber: 0, sugar: 0, sodium: 211, healthScore: 8, servingSize: "6 oysters" },
  { name: "pad thai", category: "Asian", calories: 429, protein: 20, carbs: 61, fat: 11, fiber: 3, sugar: 9, sodium: 1131, healthScore: 6, servingSize: "1 plate" },
  { name: "paella", category: "Spanish", calories: 345, protein: 25, carbs: 38, fat: 10, fiber: 2, sugar: 3, sodium: 890, healthScore: 7, servingSize: "1 cup" },
  { name: "pancakes", category: "Breakfast", calories: 227, protein: 6, carbs: 28, fat: 10, fiber: 1, sugar: 6, sodium: 439, healthScore: 4, servingSize: "2 pancakes" },
  { name: "panna cotta", category: "Dessert", calories: 222, protein: 3, carbs: 20, fat: 15, fiber: 0, sugar: 19, sodium: 52, healthScore: 3, servingSize: "1 serving" },
  { name: "peking duck", category: "Asian", calories: 337, protein: 19, carbs: 0, fat: 28, fiber: 0, sugar: 0, sodium: 74, healthScore: 6, servingSize: "3 oz" },
  { name: "pho", category: "Asian", calories: 367, protein: 15, carbs: 50, fat: 11, fiber: 2, sugar: 3, sodium: 1500, healthScore: 7, servingSize: "1 bowl" },
  { name: "pizza", category: "Italian", calories: 266, protein: 11, carbs: 33, fat: 10, fiber: 2, sugar: 4, sodium: 598, healthScore: 5, servingSize: "1 slice" },
  { name: "pork chop", category: "Meat", calories: 231, protein: 25, carbs: 0, fat: 14, fiber: 0, sugar: 0, sodium: 62, healthScore: 7, servingSize: "3 oz" },
  { name: "poutine", category: "Canadian", calories: 740, protein: 15, carbs: 82, fat: 38, fiber: 6, sugar: 2, sodium: 1420, healthScore: 3, servingSize: "1 serving" },
  { name: "prime rib", category: "Meat", calories: 338, protein: 25, carbs: 0, fat: 26, fiber: 0, sugar: 0, sodium: 69, healthScore: 6, servingSize: "4 oz" },
  { name: "pulled pork sandwich", category: "American", calories: 415, protein: 29, carbs: 41, fat: 14, fiber: 2, sugar: 12, sodium: 1180, healthScore: 5, servingSize: "1 sandwich" },
  { name: "ramen", category: "Asian", calories: 436, protein: 19, carbs: 54, fat: 15, fiber: 4, sugar: 3, sodium: 1820, healthScore: 5, servingSize: "1 bowl" },
  { name: "ravioli", category: "Italian", calories: 220, protein: 9, carbs: 31, fat: 7, fiber: 2, sugar: 2, sodium: 340, healthScore: 6, servingSize: "1 cup" },
  { name: "red velvet cake", category: "Dessert", calories: 478, protein: 5, carbs: 71, fat: 20, fiber: 1, sugar: 52, sodium: 373, healthScore: 2, servingSize: "1 slice" },
  { name: "risotto", category: "Italian", calories: 166, protein: 4, carbs: 20, fat: 7, fiber: 1, sugar: 1, sodium: 340, healthScore: 6, servingSize: "1 cup" },
  { name: "samosa", category: "Indian", calories: 262, protein: 6, carbs: 32, fat: 13, fiber: 3, sugar: 3, sodium: 487, healthScore: 5, servingSize: "2 pieces" },
  { name: "sashimi", category: "Asian", calories: 127, protein: 24, carbs: 0, fat: 3, fiber: 0, sugar: 0, sodium: 54, healthScore: 9, servingSize: "3 oz" },
  { name: "scallops", category: "Seafood", calories: 94, protein: 17, carbs: 3, fat: 1, fiber: 0, sugar: 0, sodium: 667, healthScore: 8, servingSize: "3 oz" },
  { name: "seaweed salad", category: "Asian", calories: 45, protein: 1, carbs: 9, fat: 1, fiber: 1, sugar: 7, sodium: 872, healthScore: 7, servingSize: "1 cup" },
  { name: "shrimp and grits", category: "American", calories: 451, protein: 25, carbs: 42, fat: 19, fiber: 2, sugar: 2, sodium: 1240, healthScore: 6, servingSize: "1 serving" },
  { name: "spaghetti bolognese", category: "Italian", calories: 350, protein: 18, carbs: 45, fat: 11, fiber: 4, sugar: 7, sodium: 520, healthScore: 6, servingSize: "1 plate" },
  { name: "spaghetti carbonara", category: "Italian", calories: 393, protein: 17, carbs: 44, fat: 16, fiber: 2, sugar: 2, sodium: 680, healthScore: 5, servingSize: "1 plate" },
  { name: "spring rolls", category: "Asian", calories: 109, protein: 3, carbs: 15, fat: 4, fiber: 2, sugar: 2, sodium: 231, healthScore: 7, servingSize: "2 rolls" },
  { name: "steak", category: "Meat", calories: 271, protein: 26, carbs: 0, fat: 18, fiber: 0, sugar: 0, sodium: 58, healthScore: 7, servingSize: "4 oz" },
  { name: "strawberry shortcake", category: "Dessert", calories: 327, protein: 4, carbs: 45, fat: 15, fiber: 2, sugar: 28, sodium: 311, healthScore: 3, servingSize: "1 serving" },
  { name: "sushi", category: "Asian", calories: 143, protein: 6, carbs: 21, fat: 4, fiber: 1, sugar: 3, sodium: 428, healthScore: 7, servingSize: "6 pieces" },
  { name: "tacos", category: "Mexican", calories: 226, protein: 9, carbs: 20, fat: 13, fiber: 3, sugar: 2, sodium: 370, healthScore: 6, servingSize: "2 tacos" },
  { name: "takoyaki", category: "Asian", calories: 112, protein: 5, carbs: 14, fat: 4, fiber: 1, sugar: 2, sodium: 421, healthScore: 6, servingSize: "4 balls" },
  { name: "tiramisu", category: "Dessert", calories: 240, protein: 4, carbs: 21, fat: 16, fiber: 0, sugar: 15, sodium: 67, healthScore: 3, servingSize: "1 piece" },
  { name: "tuna tartare", category: "Seafood", calories: 122, protein: 26, carbs: 0, fat: 1, fiber: 0, sugar: 0, sodium: 43, healthScore: 9, servingSize: "3 oz" },
  { name: "waffles", category: "Breakfast", calories: 291, protein: 8, carbs: 37, fat: 13, fiber: 2, sugar: 8, sodium: 511, healthScore: 4, servingSize: "2 waffles" }
]

async function main() {
  console.log('🌟 Seeding Food-101 database (Part 2/2)...')
  
  for (const food of food101DataPart2) {
    await prisma.food.upsert({
      where: { name: food.name },
      update: {},
      create: {
        ...food,
        region: "International",
        allergens: "[]",
        ingredients: "[]"
      }
    })
  }

  console.log(`✅ Seeded ${food101DataPart2.length} foods (Part 2)`)
  console.log(`🎉 Total: 101 Food-101 classes in database!`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
