import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Complete Food-101 dataset with nutrition data for all 101 classes
const food101Data = [
  { name: "apple pie", category: "Dessert", calories: 296, protein: 2.4, carbs: 43, fat: 14, fiber: 2, sugar: 20, sodium: 266, healthScore: 4, servingSize: "1 slice" },
  { name: "baby back ribs", category: "Meat", calories: 361, protein: 27, carbs: 0, fat: 28, fiber: 0, sugar: 0, sodium: 791, healthScore: 6, servingSize: "4 ribs" },
  { name: "baklava", category: "Dessert", calories: 334, protein: 4.5, carbs: 29, fat: 23, fiber: 2, sugar: 17, sodium: 246, healthScore: 4, servingSize: "1 piece" },
  { name: "beef carpaccio", category: "Meat", calories: 127, protein: 22, carbs: 1, fat: 4, fiber: 0, sugar: 0, sodium: 54, healthScore: 8, servingSize: "3 oz" },
  { name: "beef tartare", category: "Meat", calories: 220, protein: 20, carbs: 2, fat: 14, fiber: 0, sugar: 1, sodium: 380, healthScore: 7, servingSize: "4 oz" },
  { name: "beet salad", category: "Salad", calories: 89, protein: 2, carbs: 16, fat: 2, fiber: 3, sugar: 12, sodium: 201, healthScore: 9, servingSize: "1 cup" },
  { name: "beignets", category: "Dessert", calories: 196, protein: 3, carbs: 23, fat: 10, fiber: 1, sugar: 8, sodium: 187, healthScore: 3, servingSize: "3 pieces" },
  { name: "bibimbap", category: "Asian", calories: 490, protein: 22, carbs: 75, fat: 12, fiber: 6, sugar: 8, sodium: 1200, healthScore: 7, servingSize: "1 bowl" },
  { name: "bread pudding", category: "Dessert", calories: 291, protein: 6, carbs: 41, fat: 12, fiber: 1, sugar: 25, sodium: 291, healthScore: 4, servingSize: "1 cup" },
  { name: "breakfast burrito", category: "Mexican", calories: 326, protein: 15, carbs: 36, fat: 13, fiber: 4, sugar: 2, sodium: 746, healthScore: 6, servingSize: "1 burrito" },
  { name: "bruschetta", category: "Italian", calories: 106, protein: 3, carbs: 15, fat: 4, fiber: 2, sugar: 2, sodium: 214, healthScore: 7, servingSize: "2 pieces" },
  { name: "caesar salad", category: "Salad", calories: 184, protein: 7, carbs: 8, fat: 15, fiber: 2, sugar: 2, sodium: 470, healthScore: 6, servingSize: "1 bowl" },
  { name: "cannoli", category: "Dessert", calories: 369, protein: 7, carbs: 42, fat: 20, fiber: 1, sugar: 24, sodium: 137, healthScore: 3, servingSize: "1 piece" },
  { name: "caprese salad", category: "Salad", calories: 240, protein: 12, carbs: 6, fat: 18, fiber: 1, sugar: 4, sodium: 520, healthScore: 8, servingSize: "1 plate" },
  { name: "carrot cake", category: "Dessert", calories: 415, protein: 4, carbs: 51, fat: 22, fiber: 2, sugar: 35, sodium: 348, healthScore: 3, servingSize: "1 slice" },
  { name: "ceviche", category: "Seafood", calories: 139, protein: 20, carbs: 9, fat: 2, fiber: 2, sugar: 4, sodium: 387, healthScore: 9, servingSize: "1 cup" },
  { name: "cheese plate", category: "Appetizer", calories: 368, protein: 23, carbs: 3, fat: 30, fiber: 0, sugar: 1, sodium: 621, healthScore: 5, servingSize: "3 oz" },
  { name: "cheesecake", category: "Dessert", calories: 321, protein: 5, carbs: 26, fat: 23, fiber: 0, sugar: 22, sodium: 326, healthScore: 3, servingSize: "1 slice" },
  { name: "chicken curry", category: "Asian", calories: 217, protein: 24, carbs: 12, fat: 8, fiber: 3, sugar: 5, sodium: 687, healthScore: 7, servingSize: "1 cup" },
  { name: "chicken quesadilla", category: "Mexican", calories: 529, protein: 32, carbs: 40, fat: 26, fiber: 3, sugar: 3, sodium: 1134, healthScore: 5, servingSize: "1 quesadilla" },
  { name: "chicken wings", category: "American", calories: 290, protein: 27, carbs: 0, fat: 20, fiber: 0, sugar: 0, sodium: 740, healthScore: 5, servingSize: "4 wings" },
  { name: "chocolate cake", category: "Dessert", calories: 352, protein: 5, carbs: 51, fat: 15, fiber: 2, sugar: 35, sodium: 299, healthScore: 3, servingSize: "1 slice" },
  { name: "chocolate mousse", category: "Dessert", calories: 302, protein: 4, carbs: 26, fat: 21, fiber: 2, sugar: 22, sodium: 71, healthScore: 3, servingSize: "1 cup" },
  { name: "churros", category: "Dessert", calories: 237, protein: 3, carbs: 29, fat: 12, fiber: 1, sugar: 12, sodium: 201, healthScore: 3, servingSize: "3 pieces" },
  { name: "clam chowder", category: "Soup", calories: 154, protein: 8, carbs: 17, fat: 6, fiber: 1, sugar: 2, sodium: 914, healthScore: 6, servingSize: "1 cup" },
  { name: "club sandwich", category: "American", calories: 590, protein: 38, carbs: 48, fat: 27, fiber: 4, sugar: 7, sodium: 1651, healthScore: 5, servingSize: "1 sandwich" },
  { name: "crab cakes", category: "Seafood", calories: 160, protein: 11, carbs: 5, fat: 10, fiber: 0, sugar: 1, sodium: 491, healthScore: 7, servingSize: "1 cake" },
  { name: "creme brulee", category: "Dessert", calories: 296, protein: 5, carbs: 26, fat: 19, fiber: 0, sugar: 24, sodium: 82, healthScore: 3, servingSize: "1 serving" },
  { name: "croque madame", category: "French", calories: 512, protein: 28, carbs: 35, fat: 28, fiber: 2, sugar: 5, sodium: 1165, healthScore: 5, servingSize: "1 sandwich" },
  { name: "cup cakes", category: "Dessert", calories: 305, protein: 3, carbs: 45, fat: 13, fiber: 1, sugar: 30, sodium: 220, healthScore: 2, servingSize: "1 cupcake" },
  { name: "deviled eggs", category: "Appetizer", calories: 124, protein: 6, carbs: 1, fat: 11, fiber: 0, sugar: 0, sodium: 133, healthScore: 6, servingSize: "2 halves" },
  { name: "donuts", category: "Dessert", calories: 269, protein: 3, carbs: 31, fat: 15, fiber: 1, sugar: 12, sodium: 257, healthScore: 2, servingSize: "1 donut" },
  { name: "dumplings", category: "Asian", calories: 41, protein: 2, carbs: 4, fat: 2, fiber: 0, sugar: 0, sodium: 93, healthScore: 6, servingSize: "1 dumpling" },
  { name: "edamame", category: "Asian", calories: 122, protein: 11, carbs: 10, fat: 5, fiber: 5, sugar: 2, sodium: 6, healthScore: 9, servingSize: "1 cup" },
  { name: "eggs benedict", category: "Breakfast", calories: 428, protein: 20, carbs: 25, fat: 28, fiber: 1, sugar: 3, sodium: 1010, healthScore: 5, servingSize: "1 serving" },
  { name: "escargots", category: "French", calories: 82, protein: 14, carbs: 2, fat: 2, fiber: 0, sugar: 0, sodium: 307, healthScore: 7, servingSize: "6 pieces" },
  { name: "falafel", category: "Middle Eastern", calories: 333, protein: 13, carbs: 32, fat: 18, fiber: 6, sugar: 3, sodium: 585, healthScore: 7, servingSize: "4 pieces" },
  { name: "filet mignon", category: "Meat", calories: 227, protein: 30, carbs: 0, fat: 11, fiber: 0, sugar: 0, sodium: 66, healthScore: 7, servingSize: "4 oz" },
  { name: "fish and chips", category: "British", calories: 585, protein: 32, carbs: 52, fat: 28, fiber: 4, sugar: 2, sodium: 882, healthScore: 4, servingSize: "1 serving" },
  { name: "foie gras", category: "French", calories: 462, protein: 11, carbs: 4, fat: 44, fiber: 0, sugar: 0, sodium: 697, healthScore: 4, servingSize: "2 oz" },
  { name: "french fries", category: "American", calories: 312, protein: 4, carbs: 41, fat: 15, fiber: 4, sugar: 0, sodium: 210, healthScore: 3, servingSize: "1 medium" },
  { name: "french onion soup", category: "Soup", calories: 218, protein: 8, carbs: 21, fat: 11, fiber: 2, sugar: 7, sodium: 1053, healthScore: 6, servingSize: "1 bowl" },
  { name: "french toast", category: "Breakfast", calories: 216, protein: 8, carbs: 28, fat: 8, fiber: 1, sugar: 10, sodium: 311, healthScore: 5, servingSize: "2 slices" },
  { name: "fried calamari", category: "Seafood", calories: 175, protein: 15, carbs: 8, fat: 9, fiber: 0, sugar: 0, sodium: 370, healthScore: 6, servingSize: "3 oz" },
  { name: "fried rice", category: "Asian", calories: 228, protein: 5, carbs: 35, fat: 8, fiber: 1, sugar: 1, sodium: 460, healthScore: 5, servingSize: "1 cup" },
  { name: "frozen yogurt", category: "Dessert", calories: 127, protein: 3, carbs: 24, fat: 2, fiber: 0, sugar: 20, sodium: 71, healthScore: 5, servingSize: "1/2 cup" },
  { name: "garlic bread", category: "Appetizer", calories: 186, protein: 4, carbs: 21, fat: 9, fiber: 1, sugar: 1, sodium: 320, healthScore: 4, servingSize: "1 slice" },
  { name: "gnocchi", category: "Italian", calories: 250, protein: 6, carbs: 48, fat: 3, fiber: 2, sugar: 2, sodium: 460, healthScore: 6, servingSize: "1 cup" },
  { name: "greek salad", category: "Salad", calories: 106, protein: 4, carbs: 8, fat: 7, fiber: 3, sugar: 5, sodium: 407, healthScore: 8, servingSize: "1 bowl" },
  { name: "grilled cheese sandwich", category: "American", calories: 366, protein: 15, carbs: 28, fat: 22, fiber: 1, sugar: 4, sodium: 763, healthScore: 4, servingSize: "1 sandwich" },
  { name: "grilled salmon", category: "Seafood", calories: 206, protein: 28, carbs: 0, fat: 10, fiber: 0, sugar: 0, sodium: 75, healthScore: 9, servingSize: "4 oz" }
]

async function main() {
  console.log('🌟 Seeding Food-101 database (Part 1/2)...')
  
  for (const food of food101Data) {
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

  console.log(`✅ Seeded ${food101Data.length} foods (Part 1)`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
