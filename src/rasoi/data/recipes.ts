import { Recipe, Region, Category, DietType } from '../types';

export const RECIPES: Recipe[] = [
  {
    "id": "butter-chicken",
    "name": "Butter Chicken (Murgh Makhani)",
    "slug": "butter-chicken",
    "description": "Tender chicken marinated in aromatic yogurt and spices, grilled to smoky perfection and simmered in a velvety, rich tomato, butter, and cashew gravy scented with kasuri methi.",
    "region": "North Indian",
    "cuisine": "Mughlai / North Indian",
    "category": "Main Course",
    "diet": [
      "Non-Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 20,
    "cookTime": 35,
    "totalTime": 55,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 1420,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Chicken Marinade",
        "items": [
          {
            "name": "boneless chicken thighs",
            "amount": 600,
            "unit": "g",
            "notes": "cut into 1.5-inch bite-sized cubes"
          },
          {
            "name": "hung curd (Greek yogurt)",
            "amount": 150,
            "unit": "g",
            "notes": "whisked until smooth"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "freshly ground"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "gives vibrant red color without harsh heat"
          },
          {
            "name": "garam masala",
            "amount": 1,
            "unit": "tsp",
            "notes": "freshly blended"
          },
          {
            "name": "lemon juice",
            "amount": 1,
            "unit": "tbsp",
            "notes": "freshly squeezed"
          },
          {
            "name": "mustard oil",
            "amount": 1,
            "unit": "tbsp",
            "notes": "smoked slightly for authentic tandoor aroma"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "adjust to taste"
          }
        ]
      },
      {
        "name": "For the Makhani Gravy",
        "items": [
          {
            "name": "unsalted butter",
            "amount": 40,
            "unit": "g",
            "notes": "divided into two batches"
          },
          {
            "name": "cooking oil",
            "amount": 1,
            "unit": "tbsp",
            "notes": "prevents butter from browning too quickly"
          },
          {
            "name": "ripe plum tomatoes",
            "amount": 500,
            "unit": "g",
            "notes": "roughly chopped and pureed"
          },
          {
            "name": "whole cashew nuts",
            "amount": 25,
            "unit": "g",
            "notes": "soaked in warm water for 15 mins"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "green cardamom pods",
            "amount": 4,
            "unit": "whole",
            "notes": "lightly bruised"
          },
          {
            "name": "cinnamon stick",
            "amount": 1,
            "unit": "inch",
            "notes": "whole"
          },
          {
            "name": "cloves",
            "amount": 3,
            "unit": "whole",
            "notes": "fragrant"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1,
            "unit": "tbsp",
            "notes": "for silky gravy color"
          },
          {
            "name": "kasuri methi (dried fenugreek leaves)",
            "amount": 1.5,
            "unit": "tsp",
            "notes": "lightly toasted and crushed between palms"
          },
          {
            "name": "honey or sugar",
            "amount": 1,
            "unit": "tsp",
            "notes": "to balance tomato acidity"
          },
          {
            "name": "fresh heavy cream",
            "amount": 80,
            "unit": "ml",
            "notes": "dairy cream for final silkiness"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Marinate the Chicken",
        "instruction": "In a mixing bowl, thoroughly whisk hung yogurt, ginger-garlic paste, Kashmiri red chilli powder, garam masala, lemon juice, mustard oil, and salt. Coat chicken pieces evenly. Cover and refrigerate for at least 30 minutes, preferably 2 hours.",
        "timeMinutes": 30,
        "cue": "The chicken pieces should be glossy and thoroughly coated in spiced yogurt"
      },
      {
        "step": 2,
        "title": "Char the Chicken",
        "instruction": "Heat 1 tbsp oil in a heavy grill pan or skillet over medium-high heat. Place chicken pieces in a single layer without overcrowding. Sear for 4-5 minutes per side until nicely charred on edges and 80% cooked through. Remove and set aside.",
        "timeMinutes": 10,
        "cue": "Look for distinct charred brown speckles replicating tandoor smoking"
      },
      {
        "step": 3,
        "title": "Prepare Tomato-Cashew Puree Base",
        "instruction": "In a pot, combine chopped tomatoes, soaked cashews, cardamom pods, cinnamon, cloves, ginger-garlic paste, and 1/2 cup water. Simmer covered for 12-15 minutes until tomatoes soften completely. Let cool slightly, remove whole cinnamon stick, and blend into an ultra-smooth velvety puree. Strain through a fine mesh sieve.",
        "timeMinutes": 15,
        "cue": "Straining yields the signature silk-smooth restaurant finish"
      },
      {
        "step": 4,
        "title": "Simmer the Makhani Gravy",
        "instruction": "Melt 20g butter with 1 tsp oil in a wide pan over medium flame. Add Kashmiri red chilli powder and immediately pour in the strained tomato-cashew puree. Cook on medium heat for 8-10 minutes, stirring occasionally until gravy thickens and oil begins separating on sides.",
        "timeMinutes": 10,
        "cue": "Gravy turns deep ruby-orange and glossy around the perimeter"
      },
      {
        "step": 5,
        "title": "Combine and Finish with Cream & Kasuri Methi",
        "instruction": "Slide the seared chicken pieces into the bubbling makhani sauce along with any resting juices. Simmer gently for 5 minutes until chicken is completely tender. Stir in honey, remaining 20g butter, crushed kasuri methi, and fresh cream. Turn off the heat and rest 2 minutes before serving.",
        "timeMinutes": 7,
        "cue": "A gorgeous swirling sheen appears on top with an irresistible herbal butter aroma"
      }
    ],
    "tips": [
      "Always use dark meat (boneless chicken thighs) rather than breast meat so the chicken remains juicy during grilling and simmering.",
      "Rubbing kasuri methi between your palms releases the fragrant essential oils right as it touches the hot sauce.",
      "Straining the tomato-cashew puree is the true secret behind restaurant-quality silky makhani gravy."
    ],
    "substitutions": [
      "For a vegetarian twist, replace chicken with 400g cubed paneer or roasted button mushrooms.",
      "Heavy cream can be replaced with full-fat coconut cream for a dairy-light adaptation."
    ],
    "servingSuggestions": [
      "Serve steaming hot with freshly baked garlic butter naan, tandoori roti, or jeera basmati rice.",
      "Garnish with a swirl of fresh cream and crisp pickled julienned ginger."
    ],
    "nutrition": {
      "calories": 480,
      "protein": 36,
      "carbs": 14,
      "fat": 32,
      "fiber": 3
    },
    "tags": [
      "butter chicken",
      "murgh makhani",
      "chicken",
      "north indian",
      "mughlai",
      "curry",
      "popular",
      "tandoori",
      "creamy"
    ]
  },
  {
    "id": "palak-paneer",
    "name": "Palak Paneer",
    "slug": "palak-paneer",
    "description": "Succulent cubes of fresh cottage cheese simmered in a vibrant, spiced pureed spinach gravy infused with garlic, cumin, and finished with a splash of fresh cream.",
    "region": "North Indian",
    "cuisine": "North Indian",
    "category": "Main Course",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 20,
    "totalTime": 35,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.8,
    "ratingCount": 980,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Spinach Puree",
        "items": [
          {
            "name": "fresh spinach leaves (palak)",
            "amount": 500,
            "unit": "g",
            "notes": "washed thoroughly and thick stems trimmed"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "slit lengthwise"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "inch",
            "notes": "peeled"
          },
          {
            "name": "ice cold water",
            "amount": 2,
            "unit": "cups",
            "notes": "for ice bath blanching to retain bright green color"
          }
        ]
      },
      {
        "name": "For the Paneer Gravy",
        "items": [
          {
            "name": "fresh paneer",
            "amount": 300,
            "unit": "g",
            "notes": "cubed into bite-sized pieces"
          },
          {
            "name": "ghee or cooking oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "divided"
          },
          {
            "name": "cumin seeds (jeera)",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "garlic",
            "amount": 6,
            "unit": "cloves",
            "notes": "finely minced"
          },
          {
            "name": "onion",
            "amount": 1,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "tomato",
            "amount": 1,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "coriander powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "fresh"
          },
          {
            "name": "garam masala",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "aromatic blend"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "fresh cream",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for rich finish"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Blanch the Spinach",
        "instruction": "Bring a large pot of salted water to a rolling boil. Add spinach leaves, green chillies, and ginger. Blanch for exactly 2 minutes until wilted. Immediately transfer the spinach into an ice bath using tongs. Once cooled, drain and blend into a smooth vibrant green puree without adding extra water.",
        "timeMinutes": 5,
        "cue": "Ice bath shock locks in chlorophyll for an emerald green hue"
      },
      {
        "step": 2,
        "title": "Saut\u00e9 Aromatics",
        "instruction": "Heat ghee in a pan over medium heat. Crackle cumin seeds, then add minced garlic. Saut\u00e9 for 1 minute until garlic is light golden and fragrant. Add finely chopped onion and cook until translucent and lightly golden.",
        "timeMinutes": 6,
        "cue": "Garlic turns aromatic without burning"
      },
      {
        "step": 3,
        "title": "Cook Spices and Tomatoes",
        "instruction": "Stir in chopped tomato, coriander powder, and salt. Cook for 4-5 minutes, mashing tomatoes with the back of your spoon until soft and ghee starts to leave the edges.",
        "timeMinutes": 5,
        "cue": "The onion-tomato masala looks jammy and fragrant"
      },
      {
        "step": 4,
        "title": "Simmer Pureed Spinach and Paneer",
        "instruction": "Pour in the smooth spinach puree and stir well. Reduce heat to low-medium and let simmer gently for 4-5 minutes (do not cover tightly or spinach will darken). Gently slide in the raw or lightly pan-seared paneer cubes.",
        "timeMinutes": 5,
        "cue": "Small gentle bubbles rise through the silky green gravy"
      },
      {
        "step": 5,
        "title": "Finish and Garnish",
        "instruction": "Sprinkle garam masala and crushed kasuri methi. Drizzle 2 tablespoons of fresh cream, fold gently once so paneer cubes remain intact, and turn off heat.",
        "timeMinutes": 2,
        "cue": "Rich creamy swirls against glowing emerald greens"
      }
    ],
    "tips": [
      "Never over-boil spinach beyond 2 minutes; ice shocking immediately preserves the restaurant-bright emerald color.",
      "If paneer is store-bought and firm, soak cubes in warm salted water for 10 minutes before adding to make them pillowy soft."
    ],
    "substitutions": [
      "Tofu makes an outstanding vegan substitute for paneer; omit cream or substitute with cashew cream.",
      "Can substitute 1/4 of spinach with fresh fenugreek (methi) or mustard greens for earthier bitterness."
    ],
    "servingSuggestions": [
      "Serve piping hot with makki di roti, garlic naan, or steamed basmati rice.",
      "Accompany with sliced red onions and lemon wedges."
    ],
    "nutrition": {
      "calories": 310,
      "protein": 18,
      "carbs": 11,
      "fat": 22,
      "fiber": 4
    },
    "tags": [
      "palak paneer",
      "paneer",
      "spinach",
      "vegetarian",
      "healthy",
      "north indian",
      "curry",
      "gluten-free"
    ]
  },
  {
    "id": "paneer-tikka",
    "name": "Paneer Tikka",
    "slug": "paneer-tikka",
    "description": "Marinated firm cottage cheese cubes, bell peppers, and red onions skewered and roasted until charred and blistered, sprinkled with tangy chaat masala.",
    "region": "North Indian",
    "cuisine": "North Indian / Tandoori",
    "category": "Snack",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 25,
    "cookTime": 15,
    "totalTime": 40,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 1120,
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Paneer and Veggies",
        "items": [
          {
            "name": "firm paneer",
            "amount": 400,
            "unit": "g",
            "notes": "cut into thick 1-inch squares"
          },
          {
            "name": "green bell pepper",
            "amount": 1,
            "unit": "large",
            "notes": "cut into 1-inch squares"
          },
          {
            "name": "red bell pepper",
            "amount": 1,
            "unit": "large",
            "notes": "cut into 1-inch squares"
          },
          {
            "name": "red onion",
            "amount": 1,
            "unit": "large",
            "notes": "layers separated into petals"
          }
        ]
      },
      {
        "name": "For the Tandoori Tikka Marinade",
        "items": [
          {
            "name": "hung curd (Greek yogurt)",
            "amount": 150,
            "unit": "g",
            "notes": "thick and strained"
          },
          {
            "name": "roasted gram flour (besan)",
            "amount": 2,
            "unit": "tbsp",
            "notes": "lightly toasted in a dry pan until aromatic"
          },
          {
            "name": "mustard oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "heated until smoking, then cooled slightly"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "freshly made"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "vibrant natural red"
          },
          {
            "name": "ajwain (carom seeds)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "crushed between palms"
          },
          {
            "name": "garam masala",
            "amount": 1,
            "unit": "tsp",
            "notes": "warm ground spice"
          },
          {
            "name": "chaat masala",
            "amount": 1,
            "unit": "tsp",
            "notes": "tangy finish"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "crushed dried fenugreek"
          },
          {
            "name": "lemon juice",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "black salt (kala namak)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "imparts authentic tandoor punch"
          },
          {
            "name": "salt",
            "amount": 0.75,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Roast Besan & Smoke Mustard Oil",
        "instruction": "Dry roast besan in a small pan on low heat for 2 minutes until nutty and light fawn. Heat mustard oil until it reaches smoking point, remove from heat and let cool 1 minute. Add Kashmiri chilli powder directly into the warm mustard oil to unleash brilliant ruby red color.",
        "timeMinutes": 4,
        "cue": "A rich nutty roasted besan aroma and vibrant red oil base"
      },
      {
        "step": 2,
        "title": "Prepare Tikka Marinade",
        "instruction": "In a wide mixing bowl, combine hung curd, the infused warm red mustard oil, roasted besan, ginger-garlic paste, ajwain, garam masala, chaat masala, kasuri methi, lemon juice, black salt, and regular salt. Whisk until silky and lump-free.",
        "timeMinutes": 5,
        "cue": "Thick clinging paste that coats the back of a spoon"
      },
      {
        "step": 3,
        "title": "Coat Paneer & Skewer",
        "instruction": "Gently add paneer cubes, bell peppers, and onion petals to the marinade. Coat each piece carefully using clean hands to avoid breaking the paneer. Marinate for 20-30 minutes. Thread alternatively (onion, pepper, paneer, pepper) onto soaked wooden or metal skewers.",
        "timeMinutes": 20,
        "cue": "Pieces should have a generous blanket of marinade"
      },
      {
        "step": 4,
        "title": "Grill or Bake to Blistering",
        "instruction": "Preheat oven to 220\u00b0C (430\u00b0F) or heat a stovetop cast iron grill pan with 1 tbsp oil. Cook skewers for 10-12 minutes, turning halfway and brushing with melted butter, until edges are blistered and lightly charred.",
        "timeMinutes": 12,
        "cue": "Smoky char marks appear on paneer corners while core remains juicy"
      },
      {
        "step": 5,
        "title": "Dust & Serve",
        "instruction": "Transfer skewers to a platter, dust generously with tangy chaat masala, and drizzle fresh lemon juice.",
        "timeMinutes": 2,
        "cue": "Mouthwatering sizzle and spicy tangy fragrance"
      }
    ],
    "tips": [
      "Roasted besan acts as a binder, preventing the yogurt marinade from dripping off into the pan during grilling.",
      "Smoked mustard oil combined with ajwain delivers that unmistakable authentic Delhi street dhaba flavor."
    ],
    "substitutions": [
      "Firm extra pressed tofu can be substituted for a 100% vegan tikka.",
      "Can also add button mushrooms and baby corn to the skewers."
    ],
    "servingSuggestions": [
      "Serve hot with spicy mint-coriander chutney, thinly sliced onion rings (laccha pyaz), and lemon wedges."
    ],
    "nutrition": {
      "calories": 340,
      "protein": 21,
      "carbs": 14,
      "fat": 23,
      "fiber": 3
    },
    "tags": [
      "paneer tikka",
      "tandoori",
      "starter",
      "appetizer",
      "vegetarian",
      "snack",
      "north indian",
      "high protein"
    ]
  },
  {
    "id": "shahi-paneer",
    "name": "Shahi Paneer",
    "slug": "shahi-paneer",
    "description": "Royal Mughlai preparation of cottage cheese in a luxurious, creamy, aromatic gravy made with cashew nuts, melon seeds, mild spices, and scented with saffron.",
    "region": "North Indian",
    "cuisine": "Mughlai",
    "category": "Main Course",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 15,
    "cookTime": 25,
    "totalTime": 40,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.7,
    "ratingCount": 790,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Paneer",
        "items": [
          {
            "name": "fresh paneer",
            "amount": 350,
            "unit": "g",
            "notes": "cut into triangles or thick cubes"
          }
        ]
      },
      {
        "name": "For the Royal White-Golden Paste",
        "items": [
          {
            "name": "onions",
            "amount": 2,
            "unit": "medium",
            "notes": "boiled in water with 1 cardamom for 8 mins, then drained and pureed"
          },
          {
            "name": "cashews",
            "amount": 20,
            "unit": "g",
            "notes": "soaked in warm water"
          },
          {
            "name": "magaz (melon seeds)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "soaked with cashews"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1,
            "unit": "tbsp",
            "notes": "smooth"
          }
        ]
      },
      {
        "name": "For the Shahi Gravy",
        "items": [
          {
            "name": "pure ghee",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for royal fragrance"
          },
          {
            "name": "green cardamom",
            "amount": 3,
            "unit": "whole",
            "notes": "crushed"
          },
          {
            "name": "shahi jeera (caraway seeds)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "fine royal cumin"
          },
          {
            "name": "tomato puree",
            "amount": 150,
            "unit": "ml",
            "notes": "strained for mild tang and color"
          },
          {
            "name": "coriander powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 0.75,
            "unit": "tsp",
            "notes": "for mild warmth"
          },
          {
            "name": "saffron strands",
            "amount": 15,
            "unit": "threads",
            "notes": "steeped in 2 tbsp warm milk"
          },
          {
            "name": "whisked curd (yogurt)",
            "amount": 3,
            "unit": "tbsp",
            "notes": "room temperature"
          },
          {
            "name": "fresh cream",
            "amount": 60,
            "unit": "ml",
            "notes": "heavy cream"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "sugar or honey",
            "amount": 0.75,
            "unit": "tsp",
            "notes": "delicate sweetness"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Boil Aromatics & Puree",
        "instruction": "Boil roughly diced onions in 1 cup water with a pinch of salt and 1 cardamom pod for 8 minutes until translucent. Drain well, cool, and blend along with soaked cashews and melon seeds into a velvety smooth pale paste.",
        "timeMinutes": 10,
        "cue": "Boiling removes raw pungent sulfur, producing a mild naturally sweet base"
      },
      {
        "step": 2,
        "title": "Cook the Paste in Ghee",
        "instruction": "Heat ghee in a pan over medium heat. Crackle shahi jeera and crushed cardamoms. Add ginger-garlic paste and saut\u00e9 for 1 minute. Add the onion-cashew paste and cook on medium-low heat for 6-8 minutes, stirring continuously so cashews do not stick.",
        "timeMinutes": 8,
        "cue": "The paste becomes glossy and leaves the pan sides"
      },
      {
        "step": 3,
        "title": "Add Spices, Tomato & Curd",
        "instruction": "Lower flame, stir in tomato puree, coriander powder, Kashmiri chilli, and whisked yogurt. Stir vigorously to prevent yogurt curdling. Cook for 5 minutes until gravy turns pale orange and aromatic.",
        "timeMinutes": 5,
        "cue": "Tiny beads of golden ghee appear along the surface"
      },
      {
        "step": 4,
        "title": "Add Saffron & Paneer",
        "instruction": "Pour in saffron infused milk and 1/2 cup warm water to achieve velvety gravy consistency. Slide in paneer pieces, salt, and sugar. Simmer covered on low heat for 4 minutes so paneer absorbs the regal sauce.",
        "timeMinutes": 4,
        "cue": "Gravy takes on a lovely delicate golden glow"
      },
      {
        "step": 5,
        "title": "Enrich with Cream & Kasuri Methi",
        "instruction": "Stir in crushed kasuri methi and fresh cream. Give one gentle stir, turn off heat, and let rest 2 minutes before serving.",
        "timeMinutes": 2,
        "cue": "Unbelievably silky texture scented with saffron and cardamom"
      }
    ],
    "tips": [
      "Boiling onions rather than frying them raw is essential for authentic Shahi gravy\u2014it keeps the flavor mild, creamy, and sweet.",
      "Use shahi jeera (caraway seeds) rather than regular cumin for an authentic Mughlai aroma."
    ],
    "substitutions": [
      "If melon seeds (magaz) are unavailable, increase cashews by 10g or use blanched peeled almonds."
    ],
    "servingSuggestions": [
      "Garnish with slivered toasted almonds and saffron strands.",
      "Serve with sheermal, butter naan, or saffron pulao."
    ],
    "nutrition": {
      "calories": 420,
      "protein": 17,
      "carbs": 18,
      "fat": 32,
      "fiber": 2
    },
    "tags": [
      "shahi paneer",
      "mughlai",
      "royal",
      "mild",
      "paneer",
      "vegetarian",
      "north indian",
      "creamy"
    ]
  },
  {
    "id": "kadai-paneer",
    "name": "Kadai Paneer",
    "slug": "kadai-paneer",
    "description": "Cottage cheese, crunchy bell peppers, and onions tossed in a spicy, freshly ground Kadai masala made of roasted coriander seeds, cumin, and dry red chillies.",
    "region": "North Indian",
    "cuisine": "North Indian",
    "category": "Main Course",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 20,
    "totalTime": 35,
    "servings": 4,
    "spiceLevel": "Spicy",
    "rating": 4.8,
    "ratingCount": 870,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Fresh Kadai Masala",
        "items": [
          {
            "name": "coriander seeds",
            "amount": 2,
            "unit": "tbsp",
            "notes": "whole"
          },
          {
            "name": "cumin seeds",
            "amount": 1,
            "unit": "tbsp",
            "notes": "whole"
          },
          {
            "name": "black peppercorns",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "dry Kashmiri red chillies",
            "amount": 3,
            "unit": "whole",
            "notes": "stalks removed"
          },
          {
            "name": "fennel seeds (saunf)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "whole"
          }
        ]
      },
      {
        "name": "For the Main Dish",
        "items": [
          {
            "name": "fresh paneer",
            "amount": 350,
            "unit": "g",
            "notes": "cubed"
          },
          {
            "name": "green capsicum (bell pepper)",
            "amount": 1,
            "unit": "medium",
            "notes": "cubed into 1-inch squares"
          },
          {
            "name": "red onion",
            "amount": 1,
            "unit": "medium",
            "notes": "petals separated into chunks"
          },
          {
            "name": "cooking oil or ghee",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for kadai frying"
          },
          {
            "name": "onions",
            "amount": 2,
            "unit": "medium",
            "notes": "finely chopped for base"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "ripe tomatoes",
            "amount": 3,
            "unit": "medium",
            "notes": "pureed"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "ginger juliennes",
            "amount": 1,
            "unit": "tbsp",
            "notes": "for garnish"
          },
          {
            "name": "fresh coriander leaves",
            "amount": 2,
            "unit": "tbsp",
            "notes": "chopped"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Dry Roast & Coarsely Grind Kadai Masala",
        "instruction": "In a dry pan on low heat, roast coriander seeds, cumin, black peppercorns, dry red chillies, and fennel seeds for 2-3 minutes until deeply aromatic and fragrant. Cool and pulse in a spice grinder to a coarse powder. (Do not make it fine powder; the coarse texture is key).",
        "timeMinutes": 5,
        "cue": "The roasted coriander and pepper aroma fills the kitchen"
      },
      {
        "step": 2,
        "title": "Saut\u00e9 Crunchy Veggies",
        "instruction": "Heat 1 tbsp oil in an iron wok or kadai. Flash-fry cubed bell peppers and onion petals on high flame for 2 minutes so they blister slightly while retaining their crunch. Remove and set aside.",
        "timeMinutes": 3,
        "cue": "Veggies stay vibrant and crisp-tender"
      },
      {
        "step": 3,
        "title": "Cook Onion-Tomato Masala",
        "instruction": "In the same kadai, add remaining 1 tbsp oil. Add finely chopped onions and cook until golden brown (6-7 mins). Add ginger-garlic paste and saut\u00e9 for 1 minute. Add tomato puree, turmeric, salt, and 1.5 tbsp of the freshly ground Kadai masala. Bhunao (saut\u00e9) on medium flame for 6-8 minutes until oil separates from the masala.",
        "timeMinutes": 10,
        "cue": "Thick, dark masala base with oil glistening on edges"
      },
      {
        "step": 4,
        "title": "Toss Paneer and Crunchy Veggies",
        "instruction": "Add 1/4 cup warm water to loosen gravy slightly. Add the paneer cubes, saut\u00e9ed bell peppers, and onion petals. Toss gently to coat every cube in the robust spiced masala without crushing the paneer.",
        "timeMinutes": 4,
        "cue": "Rich semi-dry masala clings tightly to paneer and peppers"
      },
      {
        "step": 5,
        "title": "Finish & Garnish",
        "instruction": "Sprinkle the remaining Kadai masala, crushed kasuri methi, fresh ginger juliennes, and chopped coriander leaves. Cook for 1 more minute and remove from heat.",
        "timeMinutes": 2,
        "cue": "Vibrant contrast of green bell peppers, white paneer, and rustic spiced masala"
      }
    ],
    "tips": [
      "Coarsely grinding roasted coriander seeds rather than blending into a fine powder provides the signature kadai crunch.",
      "High-heat flash-frying keeps capsicum and onion crunchy rather than soggy."
    ],
    "substitutions": [
      "Can replace paneer with baby corn and mushrooms for a Kadai Veggie feast."
    ],
    "servingSuggestions": [
      "Serve directly in an iron or copper kadai with hot tandoori roti, butter naan, or laccha paratha."
    ],
    "nutrition": {
      "calories": 360,
      "protein": 19,
      "carbs": 16,
      "fat": 25,
      "fiber": 4
    },
    "tags": [
      "kadai paneer",
      "spicy",
      "semi-dry",
      "paneer",
      "capsicum",
      "north indian",
      "dhaba style"
    ]
  },
  {
    "id": "dal-makhani",
    "name": "Dal Makhani",
    "slug": "dal-makhani",
    "description": "Slow-cooked black lentils (sabut urad) and kidney beans simmered overnight on low flame with butter, cream, tomatoes, and subtle spices until incredibly creamy and luscious.",
    "region": "North Indian",
    "cuisine": "Punjabi / North Indian",
    "category": "Dal",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 20,
    "cookTime": 60,
    "totalTime": 80,
    "servings": 6,
    "spiceLevel": "Mild",
    "rating": 4.9,
    "ratingCount": 1650,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Boiling the Lentils",
        "items": [
          {
            "name": "whole black lentils (sabut urad)",
            "amount": 200,
            "unit": "g",
            "notes": "washed in 4-5 changes of water, soaked 8-10 hours"
          },
          {
            "name": "kidney beans (rajma)",
            "amount": 50,
            "unit": "g",
            "notes": "soaked with urad dal"
          },
          {
            "name": "black cardamom pod",
            "amount": 1,
            "unit": "whole",
            "notes": "lightly bruised"
          },
          {
            "name": "bay leaf (tej patta)",
            "amount": 1,
            "unit": "leaf",
            "notes": "whole"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "for pressure cooking"
          },
          {
            "name": "water",
            "amount": 4,
            "unit": "cups",
            "notes": "for boiling"
          }
        ]
      },
      {
        "name": "For the Makhani Simmer",
        "items": [
          {
            "name": "white butter or salted butter",
            "amount": 60,
            "unit": "g",
            "notes": "divided; white makkhan preferred"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "freshly crushed"
          },
          {
            "name": "fresh tomato puree",
            "amount": 250,
            "unit": "g",
            "notes": "from ripe plum tomatoes"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "for rich red color"
          },
          {
            "name": "garam masala",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "fresh"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "roasted and crushed"
          },
          {
            "name": "fresh heavy cream",
            "amount": 80,
            "unit": "ml",
            "notes": "heavy dairy cream"
          },
          {
            "name": "salt",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "adjust to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Soak & Pressure Cook Lentils",
        "instruction": "Rinse whole urad and rajma thoroughly under running water until water runs clear. Soak in plenty of water overnight. Drain and pressure cook with 4 cups water, black cardamom, bay leaf, and 1 tsp salt for 1 whistle on high, then 20 minutes on low heat until lentils can be easily mashed between fingertips.",
        "timeMinutes": 25,
        "cue": "Lentils and beans are completely tender and buttery soft"
      },
      {
        "step": 2,
        "title": "Mash to Release Starch",
        "instruction": "Discard the bay leaf and black cardamom. Using the back of a potato masher or wooden ladle, gently mash about 25% of the cooked lentils against the pan side. This releases natural starches creating the signature creamy texture without flour.",
        "timeMinutes": 5,
        "cue": "The broth turns cloudy, thick, and velvety"
      },
      {
        "step": 3,
        "title": "Prepare Tomato & Ginger-Garlic Base",
        "instruction": "In a heavy-bottomed pot, melt 30g butter with 1 tsp oil. Add ginger-garlic paste and saut\u00e9 for 1 minute until fragrant. Add tomato puree and Kashmiri chilli powder. Simmer for 8-10 minutes on medium heat until tomato reduces into a thick paste and butter leaves the edges.",
        "timeMinutes": 10,
        "cue": "Glossy crimson tomato base with sweet cooked aroma"
      },
      {
        "step": 4,
        "title": "The Slow Simmer (Mukhya Paka)",
        "instruction": "Pour the cooked lentils and their cooking liquor into the tomato base. Stir well and bring to a boil. Reduce flame to low and let it simmer uncovered for 35-45 minutes, stirring every few minutes and scraping the bottom. Add 1/2 cup warm water as needed to maintain a creamy pouring consistency.",
        "timeMinutes": 40,
        "cue": "The color shifts from black to rich dark mahogany with immense depth"
      },
      {
        "step": 5,
        "title": "Finish with Cream & Kasuri Methi",
        "instruction": "Stir in remaining 30g butter, garam masala, and crushed kasuri methi. Pour in fresh heavy cream while gently stirring. Simmer for 3 final minutes on low flame. Remove from heat and rest 10 minutes before serving.",
        "timeMinutes": 5,
        "cue": "Sumptuous, velvety dal makhani with a luxurious glossy sheen"
      }
    ],
    "tips": [
      "The magic of Dal Makhani lies in slow simmering. The longer it cooks on gentle heat, the richer and more cohesive it becomes.",
      "Washing whole urad dal 4-5 times removes excess black skin tannins, avoiding bitterness."
    ],
    "substitutions": [
      "For a vegan alternative, substitute dairy butter and cream with coconut cream and cold-pressed mustard oil or vegan butter."
    ],
    "servingSuggestions": [
      "Pair with crispy garlic butter naan, laccha paratha, and sliced red onions sprinkled with lemon juice."
    ],
    "nutrition": {
      "calories": 390,
      "protein": 16,
      "carbs": 38,
      "fat": 20,
      "fiber": 10
    },
    "tags": [
      "dal makhani",
      "dal",
      "punjabi",
      "north indian",
      "creamy",
      "lentils",
      "slow cooked",
      "comfort food"
    ]
  },
  {
    "id": "dal-tadka",
    "name": "Dal Tadka",
    "slug": "dal-tadka",
    "description": "Comforting yellow pigeon pea lentils cooked with turmeric and ginger, finished with a sizzling double tadka of ghee, cumin seeds, garlic, hing, and whole dry red chillies.",
    "region": "North Indian",
    "cuisine": "North Indian",
    "category": "Dal",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 10,
    "cookTime": 25,
    "totalTime": 35,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.8,
    "ratingCount": 1340,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Cooking the Dal",
        "items": [
          {
            "name": "toor dal (split pigeon peas)",
            "amount": 150,
            "unit": "g",
            "notes": "washed and soaked 30 mins"
          },
          {
            "name": "yellow moong dal (split mung)",
            "amount": 50,
            "unit": "g",
            "notes": "washed and soaked with toor dal for creaminess"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "bright yellow"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          },
          {
            "name": "water",
            "amount": 3.5,
            "unit": "cups",
            "notes": "for boiling"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "tsp",
            "notes": "finely grated"
          }
        ]
      },
      {
        "name": "For the Base Masala",
        "items": [
          {
            "name": "ghee or oil",
            "amount": 1,
            "unit": "tbsp",
            "notes": "for saut\u00e9ing"
          },
          {
            "name": "onion",
            "amount": 1,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "tomatoes",
            "amount": 2,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "slit"
          },
          {
            "name": "coriander powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "ground"
          }
        ]
      },
      {
        "name": "For the Sizzling Royal Tadka (Tempering)",
        "items": [
          {
            "name": "pure desi ghee",
            "amount": 2,
            "unit": "tbsp",
            "notes": "essential for authentic aroma"
          },
          {
            "name": "cumin seeds (jeera)",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "garlic",
            "amount": 5,
            "unit": "cloves",
            "notes": "thinly sliced"
          },
          {
            "name": "dry Kashmiri red chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "stalks on"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "digestive and aromatic"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "added off the flame for color"
          },
          {
            "name": "fresh coriander leaves",
            "amount": 2,
            "unit": "tbsp",
            "notes": "finely chopped"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Boil the Lentils",
        "instruction": "Pressure cook soaked toor dal and moong dal with 3.5 cups water, turmeric, grated ginger, and salt for 4-5 whistles until soft and mushy. Whisk with a wire whisk to a smooth, uniform soup consistency.",
        "timeMinutes": 15,
        "cue": "Smooth golden yellow lentils with no hard grains"
      },
      {
        "step": 2,
        "title": "Cook Onion-Tomato Masala",
        "instruction": "Heat 1 tbsp ghee in a pot. Add chopped onions and green chillies. Saut\u00e9 until light golden (4-5 mins). Add chopped tomatoes and coriander powder. Cook until tomatoes turn mushy and release juices.",
        "timeMinutes": 6,
        "cue": "Onions and tomatoes blend into a fragrant soft masala"
      },
      {
        "step": 3,
        "title": "Combine Dal and Simmer",
        "instruction": "Pour the whisked dal into the pot with the tomato masala. Stir well and bring to a gentle rolling simmer for 5 minutes. Adjust salt and water consistency.",
        "timeMinutes": 5,
        "cue": "The dal bubbles gently and absorbs the tomato-onion essence"
      },
      {
        "step": 4,
        "title": "Prepare Sizzling Ghee Tadka",
        "instruction": "In a small tadka pan, heat 2 tbsp desi ghee over medium flame until smoking slightly. Add cumin seeds and let them sizzle. Add sliced garlic and fry until golden brown and crispy. Add whole dry red chillies and hing. Turn off heat and quickly stir in Kashmiri chilli powder.",
        "timeMinutes": 3,
        "cue": "Garlic turns crunchy golden and releasing irresistible nutty aroma"
      },
      {
        "step": 5,
        "title": "The Dramatic Pour & Garnish",
        "instruction": "Immediately pour the sizzling ghee tadka over the hot dal. Cover the pot with a lid for 2 minutes to trap the fragrant vapors. Garnish with chopped coriander and serve.",
        "timeMinutes": 2,
        "cue": "The tadka sizzles loudly and creates a crimson ring on golden dal"
      }
    ],
    "tips": [
      "Mixing 25% moong dal with toor dal gives dal tadka a smooth, creamy body that keeps water from separating.",
      "Always add Kashmiri chilli powder to the tadka AFTER turning off heat so it doesn't burn."
    ],
    "substitutions": [
      "Use coconut oil or mustard oil in place of ghee for a 100% vegan Dal Tadka."
    ],
    "servingSuggestions": [
      "Serve hot with steamed jeera rice, crisp papad, mixed vegetable pickle, and rotis."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 13,
      "carbs": 32,
      "fat": 9,
      "fiber": 7
    },
    "tags": [
      "dal tadka",
      "yellow dal",
      "comfort food",
      "healthy",
      "vegetarian",
      "quick",
      "protein",
      "north indian"
    ]
  },
  {
    "id": "rajma-masala",
    "name": "Rajma Masala",
    "slug": "rajma-masala",
    "description": "Hearty red kidney beans simmered in a robust, spiced onion-tomato gravy with ginger, garlic, and whole spices. The ultimate Punjabi Sunday comfort meal.",
    "region": "North Indian",
    "cuisine": "Punjabi",
    "category": "Main Course",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 45,
    "totalTime": 60,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 1410,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Boiling Rajma",
        "items": [
          {
            "name": "red kidney beans (rajma)",
            "amount": 250,
            "unit": "g",
            "notes": "Chitra or Kashmiri rajma, soaked 8 hours"
          },
          {
            "name": "black cardamom",
            "amount": 1,
            "unit": "whole",
            "notes": "bruised"
          },
          {
            "name": "bay leaf",
            "amount": 1,
            "unit": "leaf",
            "notes": "whole"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "for boiling"
          },
          {
            "name": "water",
            "amount": 4,
            "unit": "cups",
            "notes": "for pressure cooking"
          }
        ]
      },
      {
        "name": "For the Gravy",
        "items": [
          {
            "name": "ghee or oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for tempering"
          },
          {
            "name": "cumin seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "onions",
            "amount": 2,
            "unit": "large",
            "notes": "finely chopped"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "tomatoes",
            "amount": 3,
            "unit": "medium",
            "notes": "finely pureed"
          },
          {
            "name": "coriander powder",
            "amount": 1.5,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1,
            "unit": "tbsp",
            "notes": "vibrant color"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "golden"
          },
          {
            "name": "garam masala",
            "amount": 1,
            "unit": "tsp",
            "notes": "freshly blended"
          },
          {
            "name": "amchur (dry mango powder)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "subtle tang"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "fresh coriander",
            "amount": 2,
            "unit": "tbsp",
            "notes": "chopped"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Soak & Pressure Cook Rajma",
        "instruction": "Soak kidney beans in plenty of water for at least 8 hours. Drain and transfer to a pressure cooker with 4 cups fresh water, black cardamom, bay leaf, and 1 tsp salt. Cook for 1 whistle on high, then 20 minutes on low heat until rajma is melt-in-mouth soft.",
        "timeMinutes": 25,
        "cue": "A bean should smash effortlessly when pressed between thumb and forefinger"
      },
      {
        "step": 2,
        "title": "Bhunao the Onion Masala",
        "instruction": "Heat ghee or oil in a deep heavy pan. Crackle cumin seeds, then add finely chopped onions. Saut\u00e9 on medium flame for 8-10 minutes until deep golden brown. Stir in ginger-garlic paste and saut\u00e9 for 1 minute.",
        "timeMinutes": 10,
        "cue": "Deeply caramelized onions provide richness and dark color"
      },
      {
        "step": 3,
        "title": "Cook Spices and Tomatoes",
        "instruction": "Add tomato puree, coriander powder, Kashmiri chilli, turmeric, and 1/2 tsp salt. Cook on medium-low flame for 7-8 minutes, stirring frequently until oil releases from the glossy masala paste.",
        "timeMinutes": 8,
        "cue": "Oil separates and bubbles cleanly around the edges of the paste"
      },
      {
        "step": 4,
        "title": "Simmer and Mash for Thick Gravy",
        "instruction": "Add the boiled rajma along with its flavorful cooking liquid to the pan. Mix well and bring to a boil. Take a ladle-full of beans, mash them against the side of the pot, and stir back in. Simmer on low heat for 15 minutes to allow flavors to penetrate the beans.",
        "timeMinutes": 15,
        "cue": "Gravy thickens naturally into a hearty, cohesive consistency"
      },
      {
        "step": 5,
        "title": "Finish with Aromatics",
        "instruction": "Stir in garam masala, amchur powder, and crushed kasuri methi. Simmer for 2 minutes. Garnish with chopped fresh coriander leaves and a drizzle of desi ghee.",
        "timeMinutes": 2,
        "cue": "Warm, earthy fragrance with a subtle appetizing tang"
      }
    ],
    "tips": [
      "Mashing 10% of the boiled beans creates a naturally thick and creamy gravy without needing cornstarch or cream.",
      "Kashmiri or Chitra rajma cooks faster and has a creamier, softer texture than dark red kidney beans."
    ],
    "substitutions": [
      "Can substitute canned red kidney beans (rinsed) if pressed for time; reduce simmering time by 10 minutes."
    ],
    "servingSuggestions": [
      "Serve hot as iconic 'Rajma Chawal' over steaming basmati rice with sliced raw onions, green chillies, and mango pickle."
    ],
    "nutrition": {
      "calories": 330,
      "protein": 15,
      "carbs": 48,
      "fat": 8,
      "fiber": 12
    },
    "tags": [
      "rajma masala",
      "rajma chawal",
      "punjabi",
      "comfort food",
      "healthy",
      "vegan",
      "gluten-free",
      "north indian"
    ]
  },
  {
    "id": "chole",
    "name": "Amritsari Chole",
    "slug": "chole",
    "description": "Dark, tangy, and robust chickpeas simmered with whole spices, tea bag infusion for authentic dark color, dried pomegranate seeds (anardana), and ginger.",
    "region": "North Indian",
    "cuisine": "Punjabi",
    "category": "Main Course",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Medium",
    "prepTime": 15,
    "cookTime": 40,
    "totalTime": 55,
    "servings": 4,
    "spiceLevel": "Spicy",
    "rating": 4.9,
    "ratingCount": 1520,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Boiling Chickpeas",
        "items": [
          {
            "name": "white chickpeas (kabuli chana)",
            "amount": 250,
            "unit": "g",
            "notes": "soaked overnight in water"
          },
          {
            "name": "black tea bags",
            "amount": 2,
            "unit": "bags",
            "notes": "infuses deep dark traditional color"
          },
          {
            "name": "cinnamon stick",
            "amount": 1,
            "unit": "inch",
            "notes": "whole"
          },
          {
            "name": "black cardamom",
            "amount": 1,
            "unit": "whole",
            "notes": "bruised"
          },
          {
            "name": "cloves",
            "amount": 3,
            "unit": "whole",
            "notes": "whole"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "for boiling"
          },
          {
            "name": "water",
            "amount": 4,
            "unit": "cups",
            "notes": "for pressure cooking"
          }
        ]
      },
      {
        "name": "For the Chole Masala Gravy",
        "items": [
          {
            "name": "mustard oil or ghee",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for deep flavor"
          },
          {
            "name": "onions",
            "amount": 2,
            "unit": "medium",
            "notes": "finely pureed"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "tomatoes",
            "amount": 3,
            "unit": "medium",
            "notes": "pureed"
          },
          {
            "name": "dried pomegranate seeds (anardana)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "roasted and powdered for signature tang"
          },
          {
            "name": "coriander powder",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "ground"
          },
          {
            "name": "chana masala powder",
            "amount": 1,
            "unit": "tbsp",
            "notes": "aromatic blend"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1,
            "unit": "tbsp",
            "notes": "rich warmth"
          },
          {
            "name": "amchur (dry mango powder)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "tartness"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "green chillies",
            "amount": 3,
            "unit": "whole",
            "notes": "slit for finishing tadka"
          },
          {
            "name": "ginger juliennes",
            "amount": 1,
            "unit": "tbsp",
            "notes": "for garnish"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Boil Chickpeas with Tea Bags & Spices",
        "instruction": "Drain soaked chickpeas. Transfer to a pressure cooker with 4 cups water, 2 black tea bags, cinnamon, black cardamom, cloves, and 1 tsp salt. Pressure cook for 5 whistles until chickpeas are completely soft. Discard tea bags and whole spices; reserve the dark broth.",
        "timeMinutes": 20,
        "cue": "Chickpeas turn dark mahogany and mash smoothly"
      },
      {
        "step": 2,
        "title": "Saut\u00e9 Onion & Ginger-Garlic Base",
        "instruction": "Heat mustard oil to smoking point in a heavy iron or stainless steel pot, then reduce heat. Add pureed onion and cook for 8-10 minutes until deep brown and caramelized. Stir in ginger-garlic paste and saut\u00e9 for 1 minute.",
        "timeMinutes": 10,
        "cue": "Onions darken and release pleasant caramelized aroma"
      },
      {
        "step": 3,
        "title": "Cook Spices, Tomatoes & Anardana",
        "instruction": "Add pureed tomatoes, ground anardana powder, coriander powder, chana masala, Kashmiri chilli, and amchur. Bhunao (saut\u00e9) on medium flame for 7-8 minutes until thick and oil separates completely.",
        "timeMinutes": 8,
        "cue": "A rich, dark spicy paste with deep sour undertones"
      },
      {
        "step": 4,
        "title": "Simmer Chickpeas in Dark Broth",
        "instruction": "Add boiled chickpeas along with their dark tea-infused broth to the masala. Stir well and bring to a vigorous boil. Mash 2 tablespoons of chickpeas with a wooden ladle against the pot wall to thicken the gravy. Simmer on low heat for 15 minutes.",
        "timeMinutes": 15,
        "cue": "Thick, dark restaurant-style gravy coating the chickpeas"
      },
      {
        "step": 5,
        "title": "Top with Ginger-Chilli Tadka",
        "instruction": "Heat 1 tbsp ghee in a small pan, flash fry slit green chillies and ginger juliennes for 30 seconds. Pour over the bubbling chole. Sprinkle crushed kasuri methi and rest covered for 5 minutes.",
        "timeMinutes": 2,
        "cue": "Irresistible sizzling aroma of fried ginger and pungent green chillies"
      }
    ],
    "tips": [
      "Boiling chickpeas with black tea bags is the authentic Amritsari secret for that iconic deep dark shade and subtle earthy depth.",
      "Anardana (dried pomegranate seed powder) gives chole its distinct street-style tanginess that tomatoes alone cannot provide."
    ],
    "substitutions": [
      "If anardana is unavailable, increase amchur powder to 1 full teaspoon and squeeze fresh lemon juice at the end."
    ],
    "servingSuggestions": [
      "Serve with piping hot puffed bhature, pickled green chillies, sliced onions, and a cold glass of sweet lassi."
    ],
    "nutrition": {
      "calories": 360,
      "protein": 16,
      "carbs": 52,
      "fat": 11,
      "fiber": 13
    },
    "tags": [
      "chole",
      "chana masala",
      "punjabi",
      "spicy",
      "vegan",
      "north indian",
      "high fiber"
    ]
  },
  {
    "id": "aloo-gobi",
    "name": "Aloo Gobi",
    "slug": "aloo-gobi",
    "description": "Homestyle dry curry of tender potatoes and crisp-tender cauliflower florets tossed with ginger, turmeric, green chillies, cumin, and fresh coriander.",
    "region": "North Indian",
    "cuisine": "North Indian",
    "category": "Main Course",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 20,
    "totalTime": 35,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.7,
    "ratingCount": 910,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Vegetables",
        "items": [
          {
            "name": "cauliflower (gobi)",
            "amount": 400,
            "unit": "g",
            "notes": "cut into medium bite-sized florets, soaked in salted warm water 5 mins"
          },
          {
            "name": "potatoes (aloo)",
            "amount": 250,
            "unit": "g",
            "notes": "peeled and cut into uniform 1-inch cubes"
          },
          {
            "name": "cooking oil",
            "amount": 2.5,
            "unit": "tbsp",
            "notes": "divided"
          }
        ]
      },
      {
        "name": "For the Spices and Aromatics",
        "items": [
          {
            "name": "cumin seeds (jeera)",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "pinch"
          },
          {
            "name": "ginger",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "finely shredded into juliennes"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "slit lengthwise"
          },
          {
            "name": "onion",
            "amount": 1,
            "unit": "medium",
            "notes": "finely chopped (optional for Punjabi style)"
          },
          {
            "name": "tomato",
            "amount": 1,
            "unit": "large",
            "notes": "finely chopped"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "bright yellow"
          },
          {
            "name": "coriander powder",
            "amount": 1.5,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "mild color"
          },
          {
            "name": "garam masala",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "finishing spice"
          },
          {
            "name": "amchur (dry mango powder)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "pleasant tang"
          },
          {
            "name": "fresh coriander leaves",
            "amount": 3,
            "unit": "tbsp",
            "notes": "chopped"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Shallow Fry Aloo and Gobi",
        "instruction": "Heat 1.5 tbsp oil in a wide pan or wok. Add potato cubes and cauliflower florets. Saut\u00e9 on medium-high flame for 5-6 minutes until golden brown spots form on edges. Remove onto a plate (this prevents cauliflower from becoming soggy and mushy later).",
        "timeMinutes": 6,
        "cue": "Florets and potatoes develop lightly crisped golden edges"
      },
      {
        "step": 2,
        "title": "Saut\u00e9 Aromatics & Spices",
        "instruction": "In the same pan, add remaining 1 tbsp oil. Crackle cumin seeds and hing. Add chopped onion, half the ginger juliennes, and green chillies. Saut\u00e9 until onions turn golden (4-5 mins). Add chopped tomato, turmeric, coriander powder, Kashmiri chilli, and salt.",
        "timeMinutes": 6,
        "cue": "Tomatoes break down into a fragrant, spicy moist coating"
      },
      {
        "step": 3,
        "title": "Steam-Cook Vegetables (Dum Style)",
        "instruction": "Return the saut\u00e9ed potatoes and cauliflower back to the pan. Toss gently so the spices coat every floret. Sprinkle 2 tablespoons of water, cover tightly with a lid, and cook on low heat for 10-12 minutes until potatoes and cauliflower are tender but firm.",
        "timeMinutes": 12,
        "cue": "A knife glides through a potato cube easily without breaking the floret"
      },
      {
        "step": 4,
        "title": "Roast & Evaporate Moisture",
        "instruction": "Remove lid, turn heat to medium-high, and stir-fry gently for 2 minutes to evaporate any residual surface moisture, creating a rustic dry roast texture.",
        "timeMinutes": 2,
        "cue": "Dry, aromatic curry with spices clinging tightly to vegetables"
      },
      {
        "step": 5,
        "title": "Season & Garnish",
        "instruction": "Sprinkle garam masala, amchur powder, remaining ginger juliennes, and plenty of fresh coriander. Toss once and serve hot.",
        "timeMinutes": 1,
        "cue": "Vibrant contrast of golden potatoes and fresh green coriander"
      }
    ],
    "tips": [
      "Shallow frying cauliflower and potato first seals their outer layer so they never turn mushy when steaming.",
      "Do not add excess water; cooking covered on low flame lets the vegetables cook in their own natural steam."
    ],
    "substitutions": [
      "Add 1/2 cup fresh green peas (matar) to transform this into Aloo Gobi Matar."
    ],
    "servingSuggestions": [
      "Serve hot with warm phulkas, parathas, and a bowl of chilled cucumber raita."
    ],
    "nutrition": {
      "calories": 210,
      "protein": 5,
      "carbs": 28,
      "fat": 9,
      "fiber": 5
    },
    "tags": [
      "aloo gobi",
      "vegetarian",
      "vegan",
      "dry curry",
      "comfort food",
      "healthy",
      "north indian"
    ]
  },
  {
    "id": "baingan-bharta",
    "name": "Baingan Bharta",
    "slug": "baingan-bharta",
    "description": "Smoky, roasted whole eggplant mashed and stir-fried with mustard oil, garlic, green chillies, onions, tomatoes, and fresh green peas.",
    "region": "North Indian",
    "cuisine": "Punjabi / North Indian",
    "category": "Main Course",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 25,
    "totalTime": 40,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.7,
    "ratingCount": 680,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Roasting the Eggplant",
        "items": [
          {
            "name": "large purple eggplant (bharta baingan)",
            "amount": 600,
            "unit": "g",
            "notes": "glossy skin, slit in 3-4 places"
          },
          {
            "name": "garlic cloves",
            "amount": 4,
            "unit": "whole",
            "notes": "stuffed inside the slits"
          },
          {
            "name": "mustard oil",
            "amount": 1,
            "unit": "tsp",
            "notes": "brushed on skin before roasting"
          }
        ]
      },
      {
        "name": "For the Bharta Masala",
        "items": [
          {
            "name": "mustard oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "heated to smoking point"
          },
          {
            "name": "cumin seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "onions",
            "amount": 2,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "tbsp",
            "notes": "finely grated"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "finely chopped"
          },
          {
            "name": "tomatoes",
            "amount": 2,
            "unit": "large",
            "notes": "finely chopped"
          },
          {
            "name": "fresh green peas (matar)",
            "amount": 60,
            "unit": "g",
            "notes": "steamed or fresh"
          },
          {
            "name": "coriander powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "mild"
          },
          {
            "name": "garam masala",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "aromatic"
          },
          {
            "name": "fresh coriander leaves",
            "amount": 3,
            "unit": "tbsp",
            "notes": "chopped"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Roast Eggplant on Open Flame",
        "instruction": "Slit the eggplant lengthwise in 3 places and insert peeled garlic cloves into the slits. Brush skin with mustard oil. Roast directly over an open gas flame or barbecue on medium heat for 12-15 minutes, turning with tongs until the skin is completely charred black and flesh is tender.",
        "timeMinutes": 15,
        "cue": "Skin is papery black and the eggplant collapses when pressed"
      },
      {
        "step": 2,
        "title": "Peel and Mash",
        "instruction": "Transfer roasted eggplant into a bowl and cover with a plate for 5 minutes (steam helps loosen skin). Peel away charred skin under a light stream of water if needed, without washing away the smoky roasted flavor. Mash flesh and roasted garlic coarsely with a fork.",
        "timeMinutes": 5,
        "cue": "Coarse, smoky pulp with tender roasted garlic mixed in"
      },
      {
        "step": 3,
        "title": "Saut\u00e9 Aromatics",
        "instruction": "Heat mustard oil in a pan until lightly smoking. Add cumin seeds. Saut\u00e9 finely chopped onions on medium heat for 6 minutes until translucent and light golden. Stir in grated ginger and green chillies.",
        "timeMinutes": 7,
        "cue": "Mustard oil pungency mellows into sweet caramelized onion aroma"
      },
      {
        "step": 4,
        "title": "Cook Tomatoes & Peas",
        "instruction": "Add chopped tomatoes, green peas, coriander powder, Kashmiri chilli, and salt. Cook for 5-6 minutes until tomatoes soften completely and oil starts leaving the masala.",
        "timeMinutes": 6,
        "cue": "A juicy, fragrant tomato-pea sauce forms"
      },
      {
        "step": 5,
        "title": "Bhunao (Roast) with Mashed Baingan",
        "instruction": "Add the mashed eggplant to the pan. Cook on medium-high heat, stirring constantly for 7-8 minutes to roast the bharta and evaporate excess moisture. Finish with garam masala and chopped fresh coriander.",
        "timeMinutes": 8,
        "cue": "The bharta thickens, glistening with oil and emitting deep smoky aroma"
      }
    ],
    "tips": [
      "Stuffing whole garlic cloves into the eggplant slits before roasting imparts an incomparable mellow roasted garlic flavor.",
      "Always use a light purple large bharta eggplant (it has fewer seeds and sweet flesh)."
    ],
    "substitutions": [
      "If an open flame is unavailable, roast in an oven at 220\u00b0C (430\u00b0F) for 35 minutes until completely tender."
    ],
    "servingSuggestions": [
      "Serve hot with piping hot makki di roti or phulkas slathered with white butter (makkhan)."
    ],
    "nutrition": {
      "calories": 180,
      "protein": 4,
      "carbs": 20,
      "fat": 10,
      "fiber": 7
    },
    "tags": [
      "baingan bharta",
      "eggplant",
      "smoky",
      "punjabi",
      "vegan",
      "gluten-free",
      "healthy",
      "comfort food"
    ]
  },
  {
    "id": "tandoori-chicken",
    "name": "Tandoori Chicken",
    "slug": "tandoori-chicken",
    "description": "Iconic Indian clay-oven roasted chicken on the bone, steeped in a double marinade of mustard oil, hung curd, Kashmiri chillies, and crushed spices, roasted with charred edges.",
    "region": "North Indian",
    "cuisine": "Punjabi / Tandoori",
    "category": "Main Course",
    "diet": [
      "Non-Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 30,
    "cookTime": 30,
    "totalTime": 60,
    "servings": 4,
    "spiceLevel": "Spicy",
    "rating": 4.9,
    "ratingCount": 1850,
    "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "First Marinade (Tenderizing)",
        "items": [
          {
            "name": "whole chicken legs (thigh and drumstick)",
            "amount": 800,
            "unit": "g",
            "notes": "skinless, with 3 deep diagonal slashes to the bone"
          },
          {
            "name": "lemon juice",
            "amount": 2,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1,
            "unit": "tbsp",
            "notes": "freshly crushed"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1,
            "unit": "tbsp",
            "notes": "for deep ruby color"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "rubbed into incisions"
          }
        ]
      },
      {
        "name": "Second Marinade (Flavor Cling)",
        "items": [
          {
            "name": "hung curd (strained thick yogurt)",
            "amount": 200,
            "unit": "g",
            "notes": "creamy and thick"
          },
          {
            "name": "mustard oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "smoked and cooled"
          },
          {
            "name": "roasted besan (chickpea flour)",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "binds marinade"
          },
          {
            "name": "garam masala",
            "amount": 1,
            "unit": "tsp",
            "notes": "warm blend"
          },
          {
            "name": "chaat masala",
            "amount": 1,
            "unit": "tsp",
            "notes": "plus extra for dusting"
          },
          {
            "name": "kasuri methi",
            "amount": 1.5,
            "unit": "tsp",
            "notes": "crushed into powder"
          },
          {
            "name": "black pepper",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "freshly cracked"
          },
          {
            "name": "melted butter",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for basting"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Slash & First Marinade",
        "instruction": "Make 3 deep diagonal incisions on the fleshy parts of the chicken legs right down to the bone. Rub vigorously with lemon juice, ginger-garlic paste, Kashmiri chilli powder, and salt. Set aside for 20 minutes to tenderize.",
        "timeMinutes": 20,
        "cue": "Chicken absorbs the bright red acidic rub into its deep cuts"
      },
      {
        "step": 2,
        "title": "Prepare Second Marinade",
        "instruction": "In a bowl, whisk hung curd, smoked mustard oil, roasted besan, garam masala, chaat masala, kasuri methi, and black pepper until completely smooth.",
        "timeMinutes": 5,
        "cue": "Thick velvet-smooth spiced paste that clings to your finger"
      },
      {
        "step": 3,
        "title": "Second Marinade Application",
        "instruction": "Coat the chicken legs generously with the second marinade, working the spiced yogurt deep into every cut. Refrigerate for at least 2 hours (ideally 6-8 hours).",
        "timeMinutes": 120,
        "cue": "Thick, fragrant coating seals around the meat"
      },
      {
        "step": 4,
        "title": "Roast at High Heat",
        "instruction": "Preheat oven to 240\u00b0C (460\u00b0F) or prepare a screaming hot grill. Place chicken on an elevated wire rack over a baking tray. Roast for 18-20 minutes until edges char. Baste liberally with melted butter and turn pieces.",
        "timeMinutes": 20,
        "cue": "Sizzling butter and dark blistering char marks on chicken edges"
      },
      {
        "step": 5,
        "title": "Final Char & Rest",
        "instruction": "Roast for an additional 8-10 minutes until internal temperature hits 75\u00b0C (165\u00b0F) and juices run clear. Rest for 5 minutes, sprinkle generously with chaat masala and fresh lemon juice.",
        "timeMinutes": 10,
        "cue": "Juicy tender interior enclosed in smoky, crisp charred exterior"
      }
    ],
    "tips": [
      "The double marination technique is crucial: lemon juice first tenderizes meat muscle fibers; hung curd adds flavor and seals juices.",
      "Elevating chicken on a wire rack ensures dry convection heat circulates 360 degrees for true tandoor-style crispness."
    ],
    "substitutions": [
      "Can use bone-in chicken thighs or whole drumsticks with the same cooking method."
    ],
    "servingSuggestions": [
      "Serve on a sizzling platter with crisp onion rings, mint chutney, and fresh lemon wedges."
    ],
    "nutrition": {
      "calories": 420,
      "protein": 42,
      "carbs": 6,
      "fat": 25,
      "fiber": 1
    },
    "tags": [
      "tandoori chicken",
      "chicken",
      "high protein",
      "low carb",
      "tandoori",
      "punjabi",
      "north indian",
      "bbq"
    ]
  },
  {
    "id": "chicken-curry",
    "name": "Homestyle Chicken Curry (Tariwala)",
    "slug": "chicken-curry",
    "description": "Rustic North Indian chicken curry simmered in a spiced onion, tomato, and whole spice broth, tender bone-in chicken infused with warm cinnamon, cardamom, and coriander.",
    "region": "North Indian",
    "cuisine": "North Indian",
    "category": "Main Course",
    "diet": [
      "Non-Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 35,
    "totalTime": 50,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.8,
    "ratingCount": 920,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Chicken",
        "items": [
          {
            "name": "bone-in chicken pieces (curry cut)",
            "amount": 750,
            "unit": "g",
            "notes": "washed and patted dry"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "for initial toss"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "divided"
          }
        ]
      },
      {
        "name": "For the Curry Sauce",
        "items": [
          {
            "name": "mustard oil or ghee",
            "amount": 3,
            "unit": "tbsp",
            "notes": "for authentic homestyle depth"
          },
          {
            "name": "bay leaf",
            "amount": 1,
            "unit": "leaf",
            "notes": "whole"
          },
          {
            "name": "black cardamom",
            "amount": 1,
            "unit": "whole",
            "notes": "cracked"
          },
          {
            "name": "cinnamon stick",
            "amount": 1,
            "unit": "inch",
            "notes": "whole"
          },
          {
            "name": "onions",
            "amount": 3,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 2,
            "unit": "tbsp",
            "notes": "freshly pounded"
          },
          {
            "name": "tomatoes",
            "amount": 3,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "coriander powder",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "ground"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fragrant color"
          },
          {
            "name": "garam masala",
            "amount": 1,
            "unit": "tsp",
            "notes": "fresh"
          },
          {
            "name": "warm water",
            "amount": 2,
            "unit": "cups",
            "notes": "for tari (broth)"
          },
          {
            "name": "fresh coriander",
            "amount": 3,
            "unit": "tbsp",
            "notes": "finely chopped"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Saut\u00e9 Whole Spices & Onions",
        "instruction": "Heat mustard oil in a heavy pot until lightly smoking. Add bay leaf, black cardamom, and cinnamon. Saut\u00e9 for 30 seconds. Add finely chopped onions and cook on medium flame for 10-12 minutes until rich golden brown.",
        "timeMinutes": 12,
        "cue": "Deeply browned onions give the curry its robust rustic base"
      },
      {
        "step": 2,
        "title": "Add Aromatics and Chicken (Bhunao)",
        "instruction": "Add ginger-garlic paste and saut\u00e9 for 1 minute until raw aroma dissipates. Add chicken pieces, turmeric, and 1/2 tsp salt. Fry (bhunao) the chicken on high heat for 6-8 minutes until chicken turns white and sealed.",
        "timeMinutes": 8,
        "cue": "Chicken seals and absorbs the aromatic browned onion flavor"
      },
      {
        "step": 3,
        "title": "Cook Spices & Tomatoes",
        "instruction": "Lower heat to medium, add chopped tomatoes, coriander powder, and Kashmiri chilli powder. Cook for 7-8 minutes, stirring well, until tomatoes break down completely and oil starts separating.",
        "timeMinutes": 8,
        "cue": "Masala turns glossy, deep reddish-brown and clings to chicken pieces"
      },
      {
        "step": 4,
        "title": "Simmer the Tari (Broth)",
        "instruction": "Pour in 2 cups of hot warm water (never use cold water as it toughens meat). Bring to a boil, cover tightly, and simmer on low heat for 15-18 minutes until chicken is bone-tender and gravy is rich and flavorful.",
        "timeMinutes": 18,
        "cue": "A glossy red layer of rogan (seasoned oil) floats gently on the surface"
      },
      {
        "step": 5,
        "title": "Garnish & Rest",
        "instruction": "Sprinkle garam masala and fresh coriander leaves. Rest covered for 5 minutes before serving.",
        "timeMinutes": 5,
        "cue": "Aroma of comforting home-cooked Indian Sunday meal"
      }
    ],
    "tips": [
      "Always cook bone-in chicken for curries; the marrow inside bones infuses incredible richness into the simmering broth.",
      "Pour hot water rather than room-temperature water when making the gravy to keep meat tender."
    ],
    "substitutions": [
      "You can use boneless skinless chicken thighs if preferred, reducing simmering time by 5 minutes."
    ],
    "servingSuggestions": [
      "Serve hot in deep bowls alongside steamed basmati rice or hot layered tawa parathas."
    ],
    "nutrition": {
      "calories": 380,
      "protein": 34,
      "carbs": 12,
      "fat": 21,
      "fiber": 3
    },
    "tags": [
      "chicken curry",
      "tariwala chicken",
      "homestyle",
      "comfort food",
      "north indian",
      "curry",
      "popular"
    ]
  },
  {
    "id": "chicken-tikka-masala",
    "name": "Chicken Tikka Masala",
    "slug": "chicken-tikka-masala",
    "description": "Char-grilled boneless marinated chicken tikka pieces folded into a rich, robustly spiced, creamy tomato and onion sauce with roasted capsicum.",
    "region": "North Indian",
    "cuisine": "North Indian / Mughlai",
    "category": "Main Course",
    "diet": [
      "Non-Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 25,
    "cookTime": 30,
    "totalTime": 55,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 1720,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Chicken Tikka",
        "items": [
          {
            "name": "boneless chicken breast or thigh",
            "amount": 600,
            "unit": "g",
            "notes": "cut into 1.5-inch chunks"
          },
          {
            "name": "thick yogurt",
            "amount": 100,
            "unit": "g",
            "notes": "whisked"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1,
            "unit": "tbsp",
            "notes": "ruby color"
          },
          {
            "name": "garam masala",
            "amount": 1,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "lemon juice",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fresh"
          }
        ]
      },
      {
        "name": "For the Masala Gravy",
        "items": [
          {
            "name": "butter",
            "amount": 2,
            "unit": "tbsp",
            "notes": "divided"
          },
          {
            "name": "oil",
            "amount": 1,
            "unit": "tbsp",
            "notes": "cooking"
          },
          {
            "name": "onions",
            "amount": 2,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "green bell pepper",
            "amount": 1,
            "unit": "medium",
            "notes": "diced into 1-inch squares"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "crushed canned tomatoes or puree",
            "amount": 400,
            "unit": "g",
            "notes": "rich tomato base"
          },
          {
            "name": "coriander powder",
            "amount": 1,
            "unit": "tbsp",
            "notes": "ground"
          },
          {
            "name": "cumin powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "roasted"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "heavy cream",
            "amount": 60,
            "unit": "ml",
            "notes": "for finish"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Marinate & Grill Chicken Tikka",
        "instruction": "Toss chicken with yogurt, ginger-garlic paste, Kashmiri chilli, garam masala, lemon juice, and 1/2 tsp salt. Marinate 30 mins. Sear in a hot grill pan with 1 tbsp oil for 4-5 mins each side until charred. Set aside.",
        "timeMinutes": 12,
        "cue": "Smoky charred exterior on chicken chunks"
      },
      {
        "step": 2,
        "title": "Saut\u00e9 Base Masala",
        "instruction": "In a wide pan, melt 1 tbsp butter with 1 tsp oil. Add chopped onions and cook until golden brown. Stir in ginger-garlic paste and saut\u00e9 for 1 minute.",
        "timeMinutes": 8,
        "cue": "Onions become sweet, deep golden and fragrant"
      },
      {
        "step": 3,
        "title": "Simmer Rich Tomato Sauce",
        "instruction": "Add pureed tomatoes, coriander powder, cumin powder, and 1/2 tsp salt. Simmer on medium heat for 8-10 minutes until thick and glossy with oil separating at edges.",
        "timeMinutes": 10,
        "cue": "Sauce thickens into a rich, deep red blanket"
      },
      {
        "step": 4,
        "title": "Fold in Tikka and Capsicum",
        "instruction": "Add diced green bell pepper and the grilled chicken tikka along with any pan juices. Simmer for 5-6 minutes so flavors meld together.",
        "timeMinutes": 6,
        "cue": "Peppers turn tender-crisp while chicken absorbs spicy tomato sauce"
      },
      {
        "step": 5,
        "title": "Finish with Cream and Kasuri Methi",
        "instruction": "Stir in remaining 1 tbsp butter, crushed kasuri methi, and fresh cream. Simmer for 2 minutes and turn off flame.",
        "timeMinutes": 2,
        "cue": "Lush orange-red gravy enveloping tender chicken"
      }
    ],
    "tips": [
      "Charring chicken before adding to gravy brings a critical smoky contrast to the creamy spiced sauce.",
      "Adding diced bell peppers at the end maintains a juicy bite."
    ],
    "substitutions": [
      "Use grilled paneer cubes to make Paneer Tikka Masala."
    ],
    "servingSuggestions": [
      "Serve hot with buttery garlic naan, tandoori roti, or jeera rice."
    ],
    "nutrition": {
      "calories": 440,
      "protein": 38,
      "carbs": 15,
      "fat": 26,
      "fiber": 3
    },
    "tags": [
      "chicken tikka masala",
      "tandoori",
      "curry",
      "popular",
      "north indian",
      "restaurant style"
    ]
  },
  {
    "id": "samosa",
    "name": "Crispy Punjabi Samosa",
    "slug": "samosa",
    "description": "Flaky, golden-fried pyramid pastries stuffed with a savory filling of spiced potatoes, green peas, toasted cashews, raisins, and crushed coriander seeds.",
    "region": "North Indian",
    "cuisine": "North Indian / Punjabi",
    "category": "Snack",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Medium",
    "prepTime": 30,
    "cookTime": 25,
    "totalTime": 55,
    "servings": 6,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 1950,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Flaky Crust (Ajwain Dough)",
        "items": [
          {
            "name": "all-purpose flour (maida)",
            "amount": 250,
            "unit": "g",
            "notes": "sifted"
          },
          {
            "name": "ajwain (carom seeds)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "ghee or warm oil (moyen)",
            "amount": 4,
            "unit": "tbsp",
            "notes": "essential for flaky khasta texture"
          },
          {
            "name": "chilled water",
            "amount": 0.5,
            "unit": "cup",
            "notes": "to knead a stiff dough"
          },
          {
            "name": "salt",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "fine"
          }
        ]
      },
      {
        "name": "For the Spiced Aloo Filling",
        "items": [
          {
            "name": "potatoes",
            "amount": 400,
            "unit": "g",
            "notes": "boiled, peeled, and crumbled by hand (never mashed into paste)"
          },
          {
            "name": "green peas",
            "amount": 60,
            "unit": "g",
            "notes": "steamed"
          },
          {
            "name": "cooking oil",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "for saut\u00e9ing filling"
          },
          {
            "name": "coriander seeds",
            "amount": 1,
            "unit": "tbsp",
            "notes": "coarsely crushed"
          },
          {
            "name": "fennel seeds (saunf)",
            "amount": 1,
            "unit": "tsp",
            "notes": "coarsely crushed"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "tbsp",
            "notes": "finely grated"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "finely minced"
          },
          {
            "name": "amchur (dry mango powder)",
            "amount": 1,
            "unit": "tsp",
            "notes": "tartness"
          },
          {
            "name": "garam masala",
            "amount": 1,
            "unit": "tsp",
            "notes": "warm spice"
          },
          {
            "name": "cashews & raisins",
            "amount": 2,
            "unit": "tbsp",
            "notes": "roughly chopped for rich bite"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Knead the Stiff Samosa Dough",
        "instruction": "In a wide bowl, mix flour, ajwain, and salt. Rub ghee into the flour with fingertips for 3-4 minutes until it resembles breadcrumbs and holds shape when pressed. Gradually add chilled water and knead into a very stiff, firm dough. Cover with damp cloth and rest 30 mins.",
        "timeMinutes": 10,
        "cue": "A firm, smooth dough that is much stiffer than roti dough"
      },
      {
        "step": 2,
        "title": "Cook the Fragrant Potato Filling",
        "instruction": "Heat 1.5 tbsp oil in a pan. Add crushed coriander seeds and fennel seeds; let them crackle. Add ginger and green chillies. Saut\u00e9 1 minute. Add hand-crumbled potatoes, green peas, cashews, raisins, amchur, garam masala, and salt. Saut\u00e9 on medium flame for 5 minutes. Cool completely.",
        "timeMinutes": 8,
        "cue": "Chunky potato stuffing fragrant with fennel and roasted coriander"
      },
      {
        "step": 3,
        "title": "Roll & Shape Samosa Cones",
        "instruction": "Divide dough into 6 equal balls. Roll each into an oval sheet (about 1 mm thick). Cut across the middle to make two semi-circles. Brush water along straight edge, overlap into a hollow cone, and seal seam firmly.",
        "timeMinutes": 12,
        "cue": "A sturdy cone pocket ready to be filled"
      },
      {
        "step": 4,
        "title": "Stuff & Pleat Seal",
        "instruction": "Stuff 2 tablespoons of cooled potato filling into the cone. Moisten top inner edges with water, make a tiny pleat on the back fold, and press edges tightly together to seal. Samosa should stand upright on flat base.",
        "timeMinutes": 8,
        "cue": "Neat triangular pyramid standing upright"
      },
      {
        "step": 5,
        "title": "Slow Deep Fry to Golden Flakiness",
        "instruction": "Heat oil in a kadai over low flame (oil must be only gently warm, not smoking hot). Drop samosas in batches. Fry on gentle low heat for 15-18 minutes until crust turns pale golden and crisp, then raise flame slightly for 2 minutes for deep golden hue.",
        "timeMinutes": 20,
        "cue": "Blister-free, perfectly crisp, flaky golden crust"
      }
    ],
    "tips": [
      "Frying in low-temperature oil is the non-negotiable secret for crisp, blister-free pastry.",
      "Hand-crumbling the potatoes rather than grating gives the authentic chunky dhaba texture."
    ],
    "substitutions": [
      "Can bake at 190\u00b0C (375\u00b0F) for 25-30 minutes brushed with oil, though deep frying yields traditional flakiness."
    ],
    "servingSuggestions": [
      "Serve piping hot with sweet tamarind-date chutney, spicy green mint chutney, and fried salted green chillies."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 5,
      "carbs": 34,
      "fat": 14,
      "fiber": 3
    },
    "tags": [
      "samosa",
      "punjabi samosa",
      "street food",
      "snack",
      "crispy",
      "vegetarian",
      "vegan",
      "tea time"
    ]
  },
  {
    "id": "naan",
    "name": "Garlic Butter Naan",
    "slug": "naan",
    "description": "Soft, pillowy, blistered flatbread cooked on high heat, brushed with melted butter, minced garlic, and fresh coriander.",
    "region": "North Indian",
    "cuisine": "North Indian / Tandoori",
    "category": "Bread",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 20,
    "cookTime": 15,
    "totalTime": 35,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.9,
    "ratingCount": 1390,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Naan Dough",
        "items": [
          {
            "name": "all-purpose flour (maida)",
            "amount": 300,
            "unit": "g",
            "notes": "sifted"
          },
          {
            "name": "baking powder",
            "amount": 0.75,
            "unit": "tsp",
            "notes": "leavening"
          },
          {
            "name": "baking soda",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "tenderizer"
          },
          {
            "name": "sugar",
            "amount": 1,
            "unit": "tsp",
            "notes": "feeds yeast / assists browning"
          },
          {
            "name": "yogurt (curd)",
            "amount": 3,
            "unit": "tbsp",
            "notes": "gives soft crumb"
          },
          {
            "name": "milk or lukewarm water",
            "amount": 150,
            "unit": "ml",
            "notes": "for kneading"
          },
          {
            "name": "oil",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "vegetable"
          },
          {
            "name": "salt",
            "amount": 0.75,
            "unit": "tsp",
            "notes": "fine"
          }
        ]
      },
      {
        "name": "For the Garlic Butter Topping",
        "items": [
          {
            "name": "garlic",
            "amount": 6,
            "unit": "cloves",
            "notes": "very finely minced"
          },
          {
            "name": "unsalted butter",
            "amount": 40,
            "unit": "g",
            "notes": "melted"
          },
          {
            "name": "fresh coriander",
            "amount": 2,
            "unit": "tbsp",
            "notes": "finely chopped"
          },
          {
            "name": "nigella seeds (kalonji)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "optional aromatic sprinkle"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Knead Soft Elastic Dough",
        "instruction": "Whisk flour, baking powder, baking soda, sugar, and salt in a bowl. Add yogurt and oil. Gradually mix in lukewarm milk and knead for 6-8 minutes until soft, pliable, and slightly tacky. Grease with 1 tsp oil, cover, and rest in a warm spot for 1-2 hours.",
        "timeMinutes": 10,
        "cue": "Dough springs back gently when pressed with a finger"
      },
      {
        "step": 2,
        "title": "Roll & Top with Garlic",
        "instruction": "Divide dough into 6 equal balls. Roll one ball into a teardrop shape on a lightly floured surface. Sprinkle minced garlic, chopped coriander, and kalonji on top. Roll gently once more with the rolling pin to embed garlic into the dough.",
        "timeMinutes": 6,
        "cue": "Teardrop flatbread speckled with fresh green coriander and garlic"
      },
      {
        "step": 3,
        "title": "Water the Underside",
        "instruction": "Flip the rolled naan over. Generously brush the backside with water using your fingers or a pastry brush (this allows the naan to stick to the cast-iron tawa, replicating a clay tandoor wall).",
        "timeMinutes": 1,
        "cue": "Wet surface looks glistening"
      },
      {
        "step": 4,
        "title": "Tawa Cook & Inverted Flame Blistering",
        "instruction": "Heat a heavy iron tawa (not non-stick) on high flame until very hot. Slap wet side onto tawa. In 30-40 seconds, large bubbles will puff up. Invert tawa directly upside down over the open flame, swirling it 2 inches above the fire to roast the top until charred and blistered.",
        "timeMinutes": 3,
        "cue": "Spectacular smoky charred bubbles puff up all over the surface"
      },
      {
        "step": 5,
        "title": "Butter & Serve",
        "instruction": "Scrape naan off tawa with a flat spatula. Immediately brush generously with melted butter and serve hot.",
        "timeMinutes": 1,
        "cue": "Buttery sheen soaking into crispy, tender blisters"
      }
    ],
    "tips": [
      "You must use an iron tawa (never non-stick); the dough will slip right off non-stick when you invert it over the flame!",
      "Kneading with warm milk and yogurt yields soft bread that stays tender even after cooling."
    ],
    "substitutions": [
      "Omit garlic for classic butter naan, or top with grated cheddar cheese for cheese naan."
    ],
    "servingSuggestions": [
      "Serve steaming hot with Butter Chicken, Dal Makhani, or Paneer Tikka Masala."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 6,
      "carbs": 38,
      "fat": 7,
      "fiber": 2
    },
    "tags": [
      "naan",
      "garlic naan",
      "flatbread",
      "tandoori",
      "north indian",
      "bread",
      "popular"
    ]
  },
  {
    "id": "chole-bhature",
    "name": "Amritsari Chole Bhature",
    "slug": "chole-bhature",
    "description": "The quintessential Punjabi weekend feast: gigantic, golden, balloon-puffed fried bread (bhature) paired with rich, tangy, dark spiced chickpeas.",
    "region": "Punjabi",
    "cuisine": "Punjabi",
    "category": "Main Course",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 30,
    "cookTime": 30,
    "totalTime": 60,
    "servings": 4,
    "spiceLevel": "Spicy",
    "rating": 4.9,
    "ratingCount": 2100,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Balloon-Puffed Bhature Dough",
        "items": [
          {
            "name": "all-purpose flour (maida)",
            "amount": 350,
            "unit": "g",
            "notes": "sifted"
          },
          {
            "name": "semolina (fine sooji)",
            "amount": 50,
            "unit": "g",
            "notes": "provides crispness"
          },
          {
            "name": "sour yogurt (curd)",
            "amount": 0.5,
            "unit": "cup",
            "notes": "acts as natural fermenter"
          },
          {
            "name": "baking powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "for quick lift"
          },
          {
            "name": "baking soda",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "fine"
          },
          {
            "name": "sugar",
            "amount": 1,
            "unit": "tsp",
            "notes": "for golden crust"
          },
          {
            "name": "oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "plus extra for deep frying"
          },
          {
            "name": "warm water",
            "amount": 0.75,
            "unit": "cup",
            "notes": "to knead"
          }
        ]
      },
      {
        "name": "For the Dark Pindi Chole",
        "items": [
          {
            "name": "soaked chickpeas (boiled dark with tea leaves)",
            "amount": 300,
            "unit": "g",
            "notes": "as per Chole recipe"
          },
          {
            "name": "anardana (pomegranate seed powder)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "roasted and crushed"
          },
          {
            "name": "chana masala",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "fragrant blend"
          },
          {
            "name": "ghee",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for finishing tadka"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Knead & Ferment Bhatura Dough",
        "instruction": "In a large bowl, mix maida, sooji, baking powder, baking soda, sugar, and salt. Add yogurt and 2 tbsp oil. Knead into a soft, smooth dough using warm water. Slap dough onto counter 10 times to develop gluten. Coat with oil, cover with damp cloth, rest in a warm place for 2 hours.",
        "timeMinutes": 15,
        "cue": "Dough becomes soft, stretchy, and aerated"
      },
      {
        "step": 2,
        "title": "Roll into Oval Bhature",
        "instruction": "Grease rolling surface with oil (do not dust dry flour, as dry flour burns in frying oil). Roll a golf-ball sized portion of dough into a thick oval sheet (about 7 inches long).",
        "timeMinutes": 8,
        "cue": "Smooth elastic sheet with no tears"
      },
      {
        "step": 3,
        "title": "Deep Fry with Spoon Press",
        "instruction": "Heat oil in a wide kadai until smoking hot. Gently slide rolled bhatura into hot oil. Immediately press down gently with the back of a slotted skimmer spoon. The bhatura will instantly balloon up into a round ball.",
        "timeMinutes": 3,
        "cue": "Instant dramatic puffing into a golden balloon"
      },
      {
        "step": 4,
        "title": "Flip & Drain",
        "instruction": "Flip bhatura once puffed and fry for 20-30 seconds until golden brown and crispy on both sides. Drain on paper towels.",
        "timeMinutes": 2,
        "cue": "Crispy on outside, cloud-soft and hollow on inside"
      },
      {
        "step": 5,
        "title": "Serve with Dark Chole",
        "instruction": "Plate steaming hot puffed bhature immediately alongside dark tangy chole, pickled green chillies, and sliced onions.",
        "timeMinutes": 2,
        "cue": "The king of North Indian breakfasts!"
      }
    ],
    "tips": [
      "Adding fine semolina (sooji) keeps the puffed bhatura from deflating immediately after taking it out of hot oil.",
      "Oil MUST be smoking hot; gently pressing with the skimmer spoon forces steam inside to balloon the dough."
    ],
    "substitutions": [
      "Can prepare whole wheat bhature by replacing half the maida with atta, though texture will be denser."
    ],
    "servingSuggestions": [
      "Serve hot with spicy carrot-chilli pickle, raw onion rings soaked in vinegar, and a tall steel glass of sweet mango lassi."
    ],
    "nutrition": {
      "calories": 540,
      "protein": 14,
      "carbs": 68,
      "fat": 24,
      "fiber": 8
    },
    "tags": [
      "chole bhature",
      "punjabi",
      "street food",
      "weekend brunch",
      "fried",
      "comfort food",
      "popular"
    ]
  },
  {
    "id": "amritsari-kulcha",
    "name": "Amritsari Kulcha",
    "slug": "amritsari-kulcha",
    "description": "Crisp, flaky, layered flatbread stuffed with a spiced mashed potato and onion filling, baked to charred perfection and crushed by hand with a dollop of butter.",
    "region": "Punjabi",
    "cuisine": "Punjabi",
    "category": "Bread",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 30,
    "cookTime": 20,
    "totalTime": 50,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 890,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Laminated Dough",
        "items": [
          {
            "name": "all-purpose flour (maida)",
            "amount": 300,
            "unit": "g",
            "notes": "sifted"
          },
          {
            "name": "butter / ghee",
            "amount": 50,
            "unit": "g",
            "notes": "softened, for lamination"
          },
          {
            "name": "baking powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "leavening"
          },
          {
            "name": "salt",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "fine"
          },
          {
            "name": "water",
            "amount": 160,
            "unit": "ml",
            "notes": "for kneading"
          }
        ]
      },
      {
        "name": "For the Spiced Aloo-Pyaz Stuffing",
        "items": [
          {
            "name": "boiled potatoes",
            "amount": 300,
            "unit": "g",
            "notes": "grated finely"
          },
          {
            "name": "red onion",
            "amount": 1,
            "unit": "medium",
            "notes": "very finely minced"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "finely chopped"
          },
          {
            "name": "anardana (pomegranate seed powder)",
            "amount": 1,
            "unit": "tsp",
            "notes": "key tang"
          },
          {
            "name": "coriander seeds",
            "amount": 1,
            "unit": "tbsp",
            "notes": "coarsely crushed"
          },
          {
            "name": "ajwain",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "carom seeds"
          },
          {
            "name": "fresh coriander",
            "amount": 3,
            "unit": "tbsp",
            "notes": "chopped"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Laminate Dough Layers",
        "instruction": "Knead flour, baking powder, salt, and water into a smooth dough. Roll into a large rectangle. Smear softened butter across surface, fold like a letter into thirds, roll and fold again. Rest chilled for 30 minutes to set butter layers.",
        "timeMinutes": 15,
        "cue": "Laminated layers create the incredible puff-pastry-like flakiness"
      },
      {
        "step": 2,
        "title": "Prepare Spiced Filling",
        "instruction": "Mix grated potatoes, minced onion, green chillies, anardana, crushed coriander seeds, ajwain, fresh coriander, and salt in a bowl.",
        "timeMinutes": 5,
        "cue": "Uniform, tangy, aromatic potato mixture"
      },
      {
        "step": 3,
        "title": "Stuff & Shape",
        "instruction": "Cut dough into 4 parts. Flatten each into a cup, fill with 3 tablespoons potato mixture, pinch closed into a dumpling. Gently flatten with hands into an 8-inch disk. Top with coriander seeds and press gently.",
        "timeMinutes": 8,
        "cue": "Flat disk with spiced potato securely enclosed inside flaky layers"
      },
      {
        "step": 4,
        "title": "Tandoor Bake on Iron Tawa",
        "instruction": "Apply water to one side and place onto a smoking hot iron tawa. Let cook 1 minute until bubbles form. Invert tawa over open flame to roast the top until blistered with charred spots.",
        "timeMinutes": 4,
        "cue": "Charred blisters with crispy crackling sound"
      },
      {
        "step": 5,
        "title": "The Signature Amritsari Crush",
        "instruction": "Remove kulcha from tawa. While piping hot, crush gently between both palms to shatter the crispy layers, top with a generous knob of butter, and serve.",
        "timeMinutes": 1,
        "cue": "Audible flaky crunch as steam escapes and butter melts"
      }
    ],
    "tips": [
      "Crushing the hot kulcha with your hands shatters the crispy laminated layers, releasing the fragrant steam.",
      "Coarsely crushed whole coriander seeds and anardana are essential for true Amritsari flavor."
    ],
    "substitutions": [
      "Can add crumbled paneer to the potato filling for an Amritsari Paneer Kulcha."
    ],
    "servingSuggestions": [
      "Serve with pindi chole, tangy imli-pyaz chutney, and fresh churned white butter."
    ],
    "nutrition": {
      "calories": 360,
      "protein": 8,
      "carbs": 52,
      "fat": 14,
      "fiber": 4
    },
    "tags": [
      "amritsari kulcha",
      "punjabi",
      "crispy",
      "stuffed bread",
      "vegetarian",
      "dhaba"
    ]
  },
  {
    "id": "sarson-ka-saag",
    "name": "Sarson Ka Saag",
    "slug": "sarson-ka-saag",
    "description": "Traditional winter mustard greens slow-cooked with spinach, bathua, ginger, garlic, and coarse cornmeal (makki ka atta), finished with a sizzling desi ghee tadka.",
    "region": "Punjabi",
    "cuisine": "Punjabi",
    "category": "Main Course",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 25,
    "cookTime": 45,
    "totalTime": 70,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 1180,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Cooking the Greens",
        "items": [
          {
            "name": "mustard greens (sarson)",
            "amount": 500,
            "unit": "g",
            "notes": "washed in 4 changes of water, thick stems peeled"
          },
          {
            "name": "spinach (palak)",
            "amount": 250,
            "unit": "g",
            "notes": "balances mustard bitterness"
          },
          {
            "name": "chenopodium (bathua) or methi",
            "amount": 150,
            "unit": "g",
            "notes": "adds earthiness"
          },
          {
            "name": "ginger",
            "amount": 2,
            "unit": "tbsp",
            "notes": "chopped"
          },
          {
            "name": "garlic",
            "amount": 8,
            "unit": "cloves",
            "notes": "peeled"
          },
          {
            "name": "green chillies",
            "amount": 4,
            "unit": "whole",
            "notes": "chopped"
          },
          {
            "name": "water",
            "amount": 1.5,
            "unit": "cups",
            "notes": "for simmering"
          },
          {
            "name": "makki ka atta (maize flour)",
            "amount": 2.5,
            "unit": "tbsp",
            "notes": "dissolved in 3 tbsp warm water (alhan)"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For the Fragrant Ghee Tadka",
        "items": [
          {
            "name": "desi ghee",
            "amount": 3,
            "unit": "tbsp",
            "notes": "rich"
          },
          {
            "name": "onions",
            "amount": 1,
            "unit": "large",
            "notes": "finely chopped"
          },
          {
            "name": "tomatoes",
            "amount": 1,
            "unit": "medium",
            "notes": "finely chopped (optional)"
          },
          {
            "name": "garlic",
            "amount": 4,
            "unit": "cloves",
            "notes": "thinly sliced"
          },
          {
            "name": "ginger juliennes",
            "amount": 1,
            "unit": "tbsp",
            "notes": "for garnish"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Wash & Simmer the Greens",
        "instruction": "Chop sarson, palak, and bathua greens. Place in a deep pressure cooker or heavy pot with water, ginger, garlic cloves, green chillies, and salt. Cook for 2 whistles or simmer uncovered for 30 minutes until soft.",
        "timeMinutes": 25,
        "cue": "Greens collapse into a fragrant dark forest green mash"
      },
      {
        "step": 2,
        "title": "The Traditional Churn (Ghotna)",
        "instruction": "Using a traditional wooden churner (mathani) or pulse mode on a blender, coarsely mash the cooked greens. Do not blend into a baby-food puree; keep rustic coarse texture.",
        "timeMinutes": 5,
        "cue": "Coarse, hearty texture with bits of tender greens visible"
      },
      {
        "step": 3,
        "title": "Add Makki Ka Atta (Alhan)",
        "instruction": "Return mashed greens to the stove on low flame. Slowly whisk in the maize flour slurry (makki ka atta mixed with warm water). Cook on low heat for 12-15 minutes, stirring continuously to prevent scorching.",
        "timeMinutes": 15,
        "cue": "Cornmeal thickens the saag into a creamy, cohesive texture"
      },
      {
        "step": 4,
        "title": "Saut\u00e9 the Desi Ghee Tadka",
        "instruction": "In a separate pan, melt ghee. Add sliced garlic and fry until golden. Add chopped onions and cook until golden brown. Stir in chopped tomatoes and cook until soft and ghee separates.",
        "timeMinutes": 6,
        "cue": "Sizzling ghee turns golden and fragrant"
      },
      {
        "step": 5,
        "title": "Combine & Top with Butter",
        "instruction": "Pour the simmering saag into the tadka. Stir well, simmer for 3 minutes, and serve piping hot crowned with a generous slab of fresh white butter (makkhan).",
        "timeMinutes": 3,
        "cue": "Rich golden white butter melting over warm dark green saag"
      }
    ],
    "tips": [
      "Balancing 2 parts sarson with 1 part palak and bathua softens the natural peppery bite of mustard leaves.",
      "Adding cornmeal (makki ka atta) is the secret that binds the saag together so water doesn't separate."
    ],
    "substitutions": [
      "If bathua is unavailable, use fresh methi (fenugreek leaves) or increase spinach."
    ],
    "servingSuggestions": [
      "Serve steaming hot with fresh Makki Di Roti, white butter, and a chunk of pure jaggery (gud)."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 9,
      "carbs": 22,
      "fat": 16,
      "fiber": 8
    },
    "tags": [
      "sarson ka saag",
      "punjabi",
      "winter special",
      "healthy",
      "vegetarian",
      "comfort food",
      "iron rich"
    ]
  },
  {
    "id": "makki-di-roti",
    "name": "Makki Di Roti",
    "slug": "makki-di-roti",
    "description": "Rustic, gluten-free flatbread made from yellow cornmeal flour, hand-patted onto tawa and roasted with ghee until crisp and golden brown.",
    "region": "Punjabi",
    "cuisine": "Punjabi",
    "category": "Bread",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 15,
    "cookTime": 15,
    "totalTime": 30,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.8,
    "ratingCount": 780,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Cornmeal Dough",
        "items": [
          {
            "name": "yellow maize flour (makki ka atta)",
            "amount": 250,
            "unit": "g",
            "notes": "freshly ground"
          },
          {
            "name": "carom seeds (ajwain)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "salt",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "fine"
          },
          {
            "name": "hot boiling water",
            "amount": 200,
            "unit": "ml",
            "notes": "essential for activating maize starches"
          },
          {
            "name": "ghee",
            "amount": 3,
            "unit": "tbsp",
            "notes": "for roasting and spreading"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Knead with Boiling Water",
        "instruction": "In a wide parat (kneading tray), mix makki ka atta, ajwain, and salt. Pour boiling hot water in batches, mixing with a wooden spoon. Once warm enough to handle, knead with the heel of your palm for 5 minutes until soft and pliable.",
        "timeMinutes": 8,
        "cue": "Hot water activates starch, making gluten-free dough pliable without breaking"
      },
      {
        "step": 2,
        "title": "Hand-Pat between Sheets",
        "instruction": "Take a tennis-ball sized portion of dough. Place between two sheets of parchment paper or plastic wrap. Gently pat with fingers into an even 6-inch round circle (about 3 mm thick).",
        "timeMinutes": 4,
        "cue": "Uniform yellow disk with clean round edges"
      },
      {
        "step": 3,
        "title": "Roast on Tawa",
        "instruction": "Heat a heavy cast iron tawa over medium heat. Peel top parchment and flip roti onto the palm of your hand, then gently slide onto hot tawa. Cook for 1.5 minutes until light brown specks appear on the underside.",
        "timeMinutes": 3,
        "cue": "Roti releases easily from the tawa"
      },
      {
        "step": 4,
        "title": "Flip and Baste with Ghee",
        "instruction": "Flip roti, brush 1 tsp ghee over top. Cook other side for 2 minutes, pressing gently with a clean cloth so it puffs slightly. Flip once more until both sides are speckled golden.",
        "timeMinutes": 4,
        "cue": "Crispy golden crust with soft sweet corn interior"
      },
      {
        "step": 5,
        "title": "Butter & Serve",
        "instruction": "Remove onto a plate and spread a generous spoon of homemade desi ghee or butter on top.",
        "timeMinutes": 1,
        "cue": "Warm nutty corn fragrance mingling with melted ghee"
      }
    ],
    "tips": [
      "Always use boiling hot water to knead makki ka atta; cold water leaves the dough brittle and impossible to roll.",
      "Kneading with the heel of your palm brings maximum pliability to the gluten-free dough."
    ],
    "substitutions": [
      "Can mix in 2 tbsp finely chopped fresh fenugreek (methi) leaves into dough for Makki Methi Roti."
    ],
    "servingSuggestions": [
      "Serve hot directly off the tawa with steaming Sarson Ka Saag, raw onion, and jaggery."
    ],
    "nutrition": {
      "calories": 210,
      "protein": 4,
      "carbs": 36,
      "fat": 7,
      "fiber": 5
    },
    "tags": [
      "makki di roti",
      "cornbread",
      "gluten-free",
      "punjabi",
      "winter food",
      "healthy"
    ]
  },
  {
    "id": "masala-dosa",
    "name": "Crispy Masala Dosa",
    "slug": "masala-dosa",
    "description": "Paper-thin, golden-brown crispy fermented rice and lentil crepe stuffed with a spiced potato and onion bhaji, served with coconut chutney and piping hot sambar.",
    "region": "South Indian",
    "cuisine": "South Indian",
    "category": "Breakfast",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Medium",
    "prepTime": 20,
    "cookTime": 25,
    "totalTime": 45,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 2450,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Fermented Dosa Batter",
        "items": [
          {
            "name": "idli / parboiled rice",
            "amount": 300,
            "unit": "g",
            "notes": "soaked 4 hours"
          },
          {
            "name": "whole skinned urad dal (black gram)",
            "amount": 100,
            "unit": "g",
            "notes": "soaked with 1 tsp fenugreek seeds"
          },
          {
            "name": "poha (flattened rice)",
            "amount": 30,
            "unit": "g",
            "notes": "soaked for 15 mins, gives golden crispness"
          },
          {
            "name": "chana dal (bengal gram)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "soaked with rice for golden color"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "added before fermentation"
          }
        ]
      },
      {
        "name": "For the Potato Masala (Aloo Palya)",
        "items": [
          {
            "name": "potatoes",
            "amount": 400,
            "unit": "g",
            "notes": "boiled, peeled, and coarsely mashed"
          },
          {
            "name": "mustard seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "black"
          },
          {
            "name": "urad dal & chana dal",
            "amount": 1,
            "unit": "tsp",
            "notes": "each, for crunchy tadka"
          },
          {
            "name": "curry leaves",
            "amount": 12,
            "unit": "leaves",
            "notes": "fresh"
          },
          {
            "name": "green chillies",
            "amount": 3,
            "unit": "whole",
            "notes": "chopped"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "tbsp",
            "notes": "finely grated"
          },
          {
            "name": "onion",
            "amount": 2,
            "unit": "medium",
            "notes": "thinly sliced"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "vibrant yellow"
          },
          {
            "name": "lemon juice",
            "amount": 1,
            "unit": "tbsp",
            "notes": "tangy finish"
          },
          {
            "name": "fresh coriander",
            "amount": 2,
            "unit": "tbsp",
            "notes": "chopped"
          },
          {
            "name": "oil or ghee",
            "amount": 4,
            "unit": "tbsp",
            "notes": "for cooking dosas"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Grind and Ferment Batter",
        "instruction": "Grind soaked urad dal with minimal cold water until light and fluffy like whipped cream. Grind soaked rice, chana dal, and poha into a very fine batter. Mix both batters with salt using clean hands. Ferment overnight (8-12 hours) in a warm place until doubled with pleasant sour aroma.",
        "timeMinutes": 15,
        "cue": "Batter turns airy, bubbly, and increases by 50-80% in volume"
      },
      {
        "step": 2,
        "title": "Cook the Potato Masala",
        "instruction": "Heat 1.5 tbsp oil in a pan. Splutter mustard seeds, urad dal, chana dal, and curry leaves. Add green chillies, ginger, and sliced onions. Saut\u00e9 until onions are soft and translucent (do not brown). Add turmeric, salt, mashed potatoes, and 1/4 cup water. Simmer 4 minutes until moist and soft. Stir in lemon juice and coriander.",
        "timeMinutes": 10,
        "cue": "Moist, fragrant golden yellow potato stuffing"
      },
      {
        "step": 3,
        "title": "Spread Thin Dosa Crepe",
        "instruction": "Heat a heavy cast iron dosa tawa. Splash cold water to regulate temperature and wipe clean with a cloth. Pour a large ladle of batter in the center. Using the bottom of the ladle, spread outwards in swift spiral circular motions to form a thin, even circle.",
        "timeMinutes": 2,
        "cue": "Smooth spiraled crepe adhering tightly to the tawa"
      },
      {
        "step": 4,
        "title": "Roast with Ghee to Golden Crisp",
        "instruction": "Drizzle 1 tsp melted butter or ghee around edges and center. Cook on medium-high heat until underside turns deep golden brown and edges naturally release from tawa.",
        "timeMinutes": 3,
        "cue": "Underbelly turns crispy mahogany while top turns glassy"
      },
      {
        "step": 5,
        "title": "Place Masala & Roll",
        "instruction": "Place 3 tablespoons of warm potato masala across the center. Fold over into a half-moon or cylinder roll and slide onto a plate.",
        "timeMinutes": 1,
        "cue": "Crackle of the wafer-crisp crepe with steaming soft potato core"
      }
    ],
    "tips": [
      "Adding a tablespoon of chana dal and a handful of soaked poha to the rice ensures restaurant-style golden crispness.",
      "Wiping the hot pan with a water-splashed cloth drops the surface temperature so the batter spreads evenly without clumping."
    ],
    "substitutions": [
      "Use coconut oil instead of ghee for an authentic 100% vegan Kerala-style roast."
    ],
    "servingSuggestions": [
      "Serve immediately with fresh coconut chutney, spicy red tomato-onion chutney, and piping hot drumstick sambar."
    ],
    "nutrition": {
      "calories": 320,
      "protein": 7,
      "carbs": 48,
      "fat": 11,
      "fiber": 4
    },
    "tags": [
      "masala dosa",
      "dosa",
      "south indian",
      "breakfast",
      "crispy",
      "vegetarian",
      "vegan",
      "popular"
    ]
  },
  {
    "id": "plain-dosa",
    "name": "Plain Dosa (Sada Dosa)",
    "slug": "plain-dosa",
    "description": "Ultra-thin, golden, lace-crisp fermented crepe roasted with pure desi ghee. Light, airy, and delicately tangy.",
    "region": "South Indian",
    "cuisine": "South Indian",
    "category": "Breakfast",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 10,
    "cookTime": 15,
    "totalTime": 25,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.8,
    "ratingCount": 850,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Dosa",
        "items": [
          {
            "name": "fermented dosa batter",
            "amount": 500,
            "unit": "ml",
            "notes": "properly fermented, pouring consistency"
          },
          {
            "name": "pure desi ghee or sesame oil",
            "amount": 3,
            "unit": "tbsp",
            "notes": "for roasting to crispness"
          },
          {
            "name": "water",
            "amount": 3,
            "unit": "tbsp",
            "notes": "for adjusting batter to flowing ribbon consistency"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Check Batter Consistency",
        "instruction": "Whisk fermented batter gently. It should have a smooth, pourable ribbon consistency that coats the ladle lightly.",
        "timeMinutes": 2,
        "cue": "A smooth, aerated, slightly bubbly batter"
      },
      {
        "step": 2,
        "title": "Heat & Season Tawa",
        "instruction": "Heat a heavy cast iron tawa until a drop of water sizzles and dances. Wipe with half an onion dipped in oil to create a natural non-stick patina.",
        "timeMinutes": 2,
        "cue": "Water drops vaporize instantly with a crisp hiss"
      },
      {
        "step": 3,
        "title": "Spread Thin Spiral",
        "instruction": "Pour a ladle of batter into the center. Immediately spiral outwards with the back of the ladle in one smooth continuous circular motion.",
        "timeMinutes": 1,
        "cue": "Paper-thin translucent batter sheet covers tawa"
      },
      {
        "step": 4,
        "title": "Roast to Golden Perfection",
        "instruction": "Drizzle ghee along the circumference. Cook on medium heat for 2-3 minutes. Watch as tiny holes form and the underside turns deeply bronzed and crispy.",
        "timeMinutes": 3,
        "cue": "Edges naturally curl upwards away from the tawa"
      },
      {
        "step": 5,
        "title": "Cone Fold & Serve",
        "instruction": "Make a slit from center to edge with a spatula and roll into a dramatic cone. Serve immediately while piping hot.",
        "timeMinutes": 1,
        "cue": "Feather-light golden cone that crackles with each bite"
      }
    ],
    "tips": [
      "Rubbing the hot iron tawa with half a cut onion prevents sticking without needing chemical non-stick coatings.",
      "Pour ghee only after the batter has set slightly so it crisps the underside without making it heavy."
    ],
    "substitutions": [
      "Use cold-pressed gingelly (sesame) oil for a traditional Tamil Nadu roadside flavor."
    ],
    "servingSuggestions": [
      "Pair with traditional gun powder (milagai podi mixed with warm sesame oil) and coconut chutney."
    ],
    "nutrition": {
      "calories": 190,
      "protein": 4,
      "carbs": 32,
      "fat": 6,
      "fiber": 2
    },
    "tags": [
      "plain dosa",
      "sada dosa",
      "south indian",
      "breakfast",
      "gluten-free",
      "crispy",
      "quick"
    ]
  },
  {
    "id": "idli",
    "name": "Pillowy Soft Idli",
    "slug": "idli",
    "description": "Steamed, fermented savoury rice and black lentil cakes. Cloud-soft, healthy, naturally gluten-free, and melt-in-mouth tender.",
    "region": "South Indian",
    "cuisine": "South Indian",
    "category": "Breakfast",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 15,
    "totalTime": 30,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.9,
    "ratingCount": 1620,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Authentic Idli Batter",
        "items": [
          {
            "name": "idli rice (parboiled short grain)",
            "amount": 300,
            "unit": "g",
            "notes": "soaked 5 hours"
          },
          {
            "name": "whole skinned urad dal (gota urad)",
            "amount": 100,
            "unit": "g",
            "notes": "soaked 4 hours with 1/2 tsp fenugreek seeds"
          },
          {
            "name": "cold ice water",
            "amount": 200,
            "unit": "ml",
            "notes": "keeps grinder cool so urad dal aerates into cloud foam"
          },
          {
            "name": "rock salt (non-iodized)",
            "amount": 1,
            "unit": "tsp",
            "notes": "added before fermentation"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Aerate Urad Dal to Foam",
        "instruction": "Grind soaked urad dal with ice-cold water in small increments for 18-20 minutes until it transforms into an ultra-fluffy, snow-white cloud. Test by dropping a spoonful into a cup of water\u2014it should float buoyant on top.",
        "timeMinutes": 20,
        "cue": "Whipped foam that floats effortlessly on water"
      },
      {
        "step": 2,
        "title": "Grind Rice Coarsely",
        "instruction": "Grind soaked idli rice with cold water to a slightly grainy rava-like consistency. Mix whipped urad dal and ground rice together with rock salt using clean hands for 2 minutes to introduce beneficial lactobacillus microbes.",
        "timeMinutes": 10,
        "cue": "Uniform batter with micro bubbles throughout"
      },
      {
        "step": 3,
        "title": "Ferment in Warmth",
        "instruction": "Cover loosely and ferment in a warm area (28-32\u00b0C / 82-90\u00b0F) for 8-12 hours until doubled in volume with a light honeycomb aeration.",
        "timeMinutes": 480,
        "cue": "Light, fluffy batter with pleasant mild tangy scent"
      },
      {
        "step": 4,
        "title": "Steam in Idli Plates",
        "instruction": "Gently ladle batter into lightly greased idli molds without over-mixing (do not knock out the precious air bubbles). Steam in a steamer on high flame for exactly 10-12 minutes.",
        "timeMinutes": 12,
        "cue": "A toothpick inserted in the center comes out clean and moist"
      },
      {
        "step": 5,
        "title": "Rest & Demold with Wet Spoon",
        "instruction": "Remove idli stand and let rest 2 minutes. Dip a spoon or butter knife in cold water and scoop out the idlis cleanly in one circular swoop.",
        "timeMinutes": 3,
        "cue": "Snow-white, feather-soft, pillow-like idlis"
      }
    ],
    "tips": [
      "Using ice-cold water while grinding urad dal prevents the motor heat from denaturing the proteins, allowing maximum fluffiness.",
      "Never vigorously stir the fermented batter; gentle scooping preserves delicate air pockets for cloud-soft idlis."
    ],
    "substitutions": [
      "Can prepare Rava Idli instantly using roasted semolina, yogurt, and a fruit salt leavener."
    ],
    "servingSuggestions": [
      "Dip in piping hot sambar and serve with creamy white coconut chutney and spicy tomato-onion chutney."
    ],
    "nutrition": {
      "calories": 160,
      "protein": 6,
      "carbs": 33,
      "fat": 1,
      "fiber": 2
    },
    "tags": [
      "idli",
      "south indian",
      "steamed",
      "healthy",
      "breakfast",
      "gluten-free",
      "oil free",
      "vegan"
    ]
  },
  {
    "id": "medu-vada",
    "name": "Crispy Medu Vada",
    "slug": "medu-vada",
    "description": "Golden-brown, crispy on the outside, fluffy and spongy on the inside lentil doughnut fritters infused with crushed peppercorns, curry leaves, and fresh coconut bits.",
    "region": "South Indian",
    "cuisine": "South Indian",
    "category": "Breakfast",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Medium",
    "prepTime": 20,
    "cookTime": 20,
    "totalTime": 40,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.8,
    "ratingCount": 1150,
    "image": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Vada Batter",
        "items": [
          {
            "name": "whole black gram lentils (urad dal)",
            "amount": 200,
            "unit": "g",
            "notes": "washed and soaked 3 hours"
          },
          {
            "name": "chilled water",
            "amount": 3,
            "unit": "tbsp",
            "notes": "use absolute minimum water when grinding"
          },
          {
            "name": "black peppercorns",
            "amount": 1,
            "unit": "tsp",
            "notes": "coarsely crushed"
          },
          {
            "name": "cumin seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "tbsp",
            "notes": "finely chopped"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "finely chopped"
          },
          {
            "name": "curry leaves",
            "amount": 10,
            "unit": "leaves",
            "notes": "finely torn"
          },
          {
            "name": "fresh coconut pieces",
            "amount": 2,
            "unit": "tbsp",
            "notes": "tiny diced bits for delicious crunch"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "digestive and fragrant"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          },
          {
            "name": "oil",
            "amount": 500,
            "unit": "ml",
            "notes": "for deep frying"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Grind Thick Fluffy Batter",
        "instruction": "Drain soaked urad dal thoroughly. Grind in a wet grinder or food processor with only 2-3 tablespoons of chilled water. Grind until thick, pale, and fluffy (batter must not be runny).",
        "timeMinutes": 10,
        "cue": "Thick batter holds its shape on an inverted spoon"
      },
      {
        "step": 2,
        "title": "Aerate by Whisking",
        "instruction": "Beat the batter vigorously in one direction with your hand or whisk for 3-4 minutes to incorporate air. Drop a tiny ball in a cup of water\u2014it must float instantly.",
        "timeMinutes": 4,
        "cue": "The batter feels light as a mousse and floats on water"
      },
      {
        "step": 3,
        "title": "Fold in Aromatics",
        "instruction": "Fold in crushed peppercorns, cumin seeds, chopped ginger, green chillies, curry leaves, fresh coconut bits, hing, and salt.",
        "timeMinutes": 3,
        "cue": "Evenly dispersed aromatics with crisp coconut bits"
      },
      {
        "step": 4,
        "title": "Shape the Doughnut with Wet Hands",
        "instruction": "Heat oil in a kadai over medium flame. Wet both palms thoroughly with water. Scoop a lemon-sized ball of batter onto fingers, flatten slightly, and poke a hole in the center with your wet thumb to create a doughnut shape.",
        "timeMinutes": 5,
        "cue": "Neat ring shape that slips effortlessly off wet fingers"
      },
      {
        "step": 5,
        "title": "Deep Fry to Golden Crunch",
        "instruction": "Slide gently into hot oil. Fry on medium heat for 4-5 minutes, turning occasionally, until crust turns evenly golden brown and crisp. Drain on paper towels.",
        "timeMinutes": 6,
        "cue": "Deep golden, crispy ring with airy white porous center"
      }
    ],
    "tips": [
      "Use minimal water while grinding; too much water causes vadas to absorb excess oil and lose their shape.",
      "Adding tiny fresh coconut cubes provides a delightful sweet crunch in every savory bite."
    ],
    "substitutions": [
      "Add 1 tbsp of rice flour to the batter if it becomes slightly loose; it also enhances outer crispness."
    ],
    "servingSuggestions": [
      "Dip hot crispy vadas directly in a bowl of steaming spicy sambar (Sambar Vada) and serve with coconut chutney."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 9,
      "carbs": 26,
      "fat": 11,
      "fiber": 4
    },
    "tags": [
      "medu vada",
      "vada",
      "south indian",
      "breakfast",
      "crispy",
      "snack",
      "gluten-free",
      "vegan"
    ]
  },
  {
    "id": "sambar",
    "name": "Traditional South Indian Sambar",
    "slug": "sambar",
    "description": "Tangy, spicy, and aromatic lentil and vegetable stew made with toor dal, drumsticks, shallots, tamarind pulp, and freshly roasted homemade sambar powder.",
    "region": "South Indian",
    "cuisine": "South Indian",
    "category": "Dal",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 25,
    "totalTime": 40,
    "servings": 6,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 1820,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Boiling Lentils & Veggies",
        "items": [
          {
            "name": "toor dal (split pigeon peas)",
            "amount": 150,
            "unit": "g",
            "notes": "pressure cooked with turmeric and mashed smooth"
          },
          {
            "name": "shallots (pearl sambar onions)",
            "amount": 12,
            "unit": "whole",
            "notes": "peeled"
          },
          {
            "name": "drumstick (murungakkai)",
            "amount": 1,
            "unit": "whole",
            "notes": "cut into 2-inch segments"
          },
          {
            "name": "carrots & beans",
            "amount": 100,
            "unit": "g",
            "notes": "diced"
          },
          {
            "name": "tomatoes",
            "amount": 2,
            "unit": "medium",
            "notes": "chopped"
          },
          {
            "name": "tamarind pulp",
            "amount": 3,
            "unit": "tbsp",
            "notes": "extracted from lemon-sized ball of tamarind in warm water"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "ground"
          }
        ]
      },
      {
        "name": "For Spices and Seasoning",
        "items": [
          {
            "name": "sambar powder",
            "amount": 2,
            "unit": "tbsp",
            "notes": "authentic freshly ground"
          },
          {
            "name": "salt",
            "amount": 1.5,
            "unit": "tsp",
            "notes": "to taste"
          },
          {
            "name": "jaggery (gud)",
            "amount": 1,
            "unit": "tsp",
            "notes": "balances tamarind tartness"
          }
        ]
      },
      {
        "name": "For the Fragrant Tadka",
        "items": [
          {
            "name": "sesame oil or coconut oil",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "cold pressed"
          },
          {
            "name": "mustard seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "black"
          },
          {
            "name": "fenugreek seeds (methi)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "aromatic bitterness"
          },
          {
            "name": "dry red chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "broken"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "essential for sambar aroma"
          },
          {
            "name": "curry leaves",
            "amount": 12,
            "unit": "leaves",
            "notes": "fresh"
          },
          {
            "name": "fresh coriander",
            "amount": 3,
            "unit": "tbsp",
            "notes": "chopped"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Cook Vegetables in Tamarind Water",
        "instruction": "In a deep pot, combine drumstick pieces, shallots, carrots, tomatoes, tamarind pulp, 2 cups water, turmeric, and 1 tsp salt. Boil for 10-12 minutes until vegetables are tender but retain their shape.",
        "timeMinutes": 12,
        "cue": "Drumsticks soften and raw tamarind tang transforms into mellow aroma"
      },
      {
        "step": 2,
        "title": "Add Sambar Powder & Dal",
        "instruction": "Stir sambar powder and jaggery into the vegetables. Add the mashed cooked toor dal along with 1 cup water to adjust consistency. Bring to a gentle rolling boil for 6-8 minutes.",
        "timeMinutes": 8,
        "cue": "Flavors meld and the broth takes on a rich golden-orange color"
      },
      {
        "step": 3,
        "title": "Prepare the Sizzling Tadka",
        "instruction": "Heat sesame or coconut oil in a small tadka pan. Add mustard seeds and fenugreek seeds; let them splutter. Add dry red chillies, hing, and curry leaves. Saut\u00e9 for 30 seconds.",
        "timeMinutes": 2,
        "cue": "Pungent hing and roasted fenugreek aroma wafts into the air"
      },
      {
        "step": 4,
        "title": "Pour & Cover (Aroma Lock)",
        "instruction": "Pour the sizzling tadka directly into the bubbling sambar. Immediately place a tight lid on the pot and turn off the heat. Let steep for 5 minutes.",
        "timeMinutes": 5,
        "cue": "Aroma is trapped inside the pot"
      },
      {
        "step": 5,
        "title": "Garnish & Serve",
        "instruction": "Stir in freshly chopped coriander leaves. Serve hot.",
        "timeMinutes": 1,
        "cue": "Irresistible fragrant South Indian classic"
      }
    ],
    "tips": [
      "Pearl shallots (sambar onions) are essential; their natural sweetness cuts through the tart tamarind.",
      "Adding a tiny pinch of jaggery rounds out the sour and spicy flavors into harmonious balance."
    ],
    "substitutions": [
      "Can use radishes, okra (bhindi), or pumpkin (pooshnikai) for delicious seasonal variations."
    ],
    "servingSuggestions": [
      "Serve hot poured over steamed idlis, crispy dosas, medu vadas, or with piping hot steamed rice and ghee."
    ],
    "nutrition": {
      "calories": 180,
      "protein": 8,
      "carbs": 28,
      "fat": 4,
      "fiber": 6
    },
    "tags": [
      "sambar",
      "south indian",
      "dal",
      "drumstick",
      "healthy",
      "vegan",
      "gluten-free",
      "comfort food"
    ]
  },
  {
    "id": "rasam",
    "name": "Pepper Tomato Rasam",
    "slug": "rasam",
    "description": "Tangy, spicy, warming South Indian soup brewed with ripe tomatoes, tamarind, crushed black peppercorns, cumin, garlic, and fresh curry leaves.",
    "region": "South Indian",
    "cuisine": "South Indian / Tamil",
    "category": "Dal",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 10,
    "cookTime": 15,
    "totalTime": 25,
    "servings": 4,
    "spiceLevel": "Spicy",
    "rating": 4.8,
    "ratingCount": 940,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Fresh Rasam Powder (Crushed)",
        "items": [
          {
            "name": "black peppercorns",
            "amount": 1.5,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "cumin seeds (jeera)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "whole"
          },
          {
            "name": "garlic cloves",
            "amount": 5,
            "unit": "whole",
            "notes": "crushed with peel on"
          },
          {
            "name": "coriander seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          }
        ]
      },
      {
        "name": "For the Rasam Broth",
        "items": [
          {
            "name": "ripe tomatoes",
            "amount": 3,
            "unit": "medium",
            "notes": "mashed by hand in water"
          },
          {
            "name": "tamarind pulp",
            "amount": 2,
            "unit": "tbsp",
            "notes": "extracted in 1 cup warm water"
          },
          {
            "name": "cooked toor dal water",
            "amount": 1,
            "unit": "cup",
            "notes": "adds subtle body"
          },
          {
            "name": "water",
            "amount": 2,
            "unit": "cups",
            "notes": "for broth"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "fine"
          },
          {
            "name": "fresh coriander leaves & stems",
            "amount": 3,
            "unit": "tbsp",
            "notes": "finely chopped"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For the Ghee Tadka",
        "items": [
          {
            "name": "desi ghee",
            "amount": 1,
            "unit": "tbsp",
            "notes": "for tempering"
          },
          {
            "name": "mustard seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "black"
          },
          {
            "name": "dry red chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "broken"
          },
          {
            "name": "curry leaves",
            "amount": 10,
            "unit": "leaves",
            "notes": "fresh"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Coarsely Pound Pepper & Cumin",
        "instruction": "In a mortar and pestle, coarsely crush black peppercorns, cumin seeds, coriander seeds, and garlic with skins on. Do not make a fine powder; keep coarse.",
        "timeMinutes": 3,
        "cue": "Pungent garlic and zesty crushed black pepper aroma"
      },
      {
        "step": 2,
        "title": "Hand-Crush Tomatoes & Tamarind",
        "instruction": "In a pot, combine chopped ripe tomatoes, tamarind water, turmeric, salt, hing, and chopped coriander stems. Squeeze tomatoes thoroughly by hand to release pulp into the water.",
        "timeMinutes": 3,
        "cue": "Rich rustic tomato broth base"
      },
      {
        "step": 3,
        "title": "Simmer Broth",
        "instruction": "Bring the tomato-tamarind water to a boil. Simmer for 8 minutes until raw smell of tamarind vanishes and tomatoes are completely soft.",
        "timeMinutes": 8,
        "cue": "Broth turns fragrant and slightly reduced"
      },
      {
        "step": 4,
        "title": "Add Crushed Pepper-Cumin & Dal Water",
        "instruction": "Add the freshly crushed pepper-cumin-garlic mixture and cooked dal water. Bring back to gentle heat. As soon as frothy bubbles begin to gather on the surface (never let rasam boil rapidly after adding spices), turn off heat immediately.",
        "timeMinutes": 4,
        "cue": "A thick creamy foam carpets the top of the pot"
      },
      {
        "step": 5,
        "title": "Sizzle Ghee Tadka & Cover",
        "instruction": "Heat ghee in a tadka pan. Crackle mustard seeds, red chillies, and curry leaves. Pour immediately into rasam, cover with lid, and let steep 5 minutes before sipping.",
        "timeMinutes": 2,
        "cue": "A deeply restorative, soothing herbal aroma"
      }
    ],
    "tips": [
      "Never allow rasam to boil vigorously after adding the pepper-cumin spice mix; gentle simmering until frothy preserves the delicate volatile oils.",
      "Crushing garlic with its skin on gives a much deeper rustic flavor."
    ],
    "substitutions": [
      "Use coconut oil instead of ghee for a 100% vegan preparation."
    ],
    "servingSuggestions": [
      "Drink hot from a tumbler as a soothing appetizer soup, or mix with hot steamed rice, ghee, and roasted appalam."
    ],
    "nutrition": {
      "calories": 95,
      "protein": 3,
      "carbs": 14,
      "fat": 4,
      "fiber": 3
    },
    "tags": [
      "rasam",
      "south indian",
      "soup",
      "immunity booster",
      "healthy",
      "vegan",
      "digestive",
      "pepper"
    ]
  },
  {
    "id": "vegetable-upma",
    "name": "South Indian Vegetable Upma",
    "slug": "vegetable-upma",
    "description": "Savory, fluffy semolina porridge tempered with mustard seeds, crunchy lentils, curry leaves, ginger, and colorful diced vegetables.",
    "region": "South Indian",
    "cuisine": "South Indian",
    "category": "Breakfast",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 10,
    "cookTime": 15,
    "totalTime": 25,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.7,
    "ratingCount": 670,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Sooji",
        "items": [
          {
            "name": "semolina (bombay rava / sooji)",
            "amount": 200,
            "unit": "g",
            "notes": "roasted dry until fragrant and sandy"
          },
          {
            "name": "water",
            "amount": 3,
            "unit": "cups",
            "notes": "heated until boiling (3:1 water to rava ratio)"
          }
        ]
      },
      {
        "name": "For the Tempering & Veggies",
        "items": [
          {
            "name": "ghee or oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "divided"
          },
          {
            "name": "mustard seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "black"
          },
          {
            "name": "urad dal",
            "amount": 1,
            "unit": "tsp",
            "notes": "for crunch"
          },
          {
            "name": "chana dal",
            "amount": 1,
            "unit": "tsp",
            "notes": "for crunch"
          },
          {
            "name": "cashews",
            "amount": 10,
            "unit": "whole",
            "notes": "halved and toasted golden"
          },
          {
            "name": "curry leaves",
            "amount": 10,
            "unit": "leaves",
            "notes": "fresh"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "chopped"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "tbsp",
            "notes": "finely minced"
          },
          {
            "name": "onion",
            "amount": 1,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "carrots, peas & green beans",
            "amount": 120,
            "unit": "g",
            "notes": "finely diced"
          },
          {
            "name": "fresh grated coconut",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for topping"
          },
          {
            "name": "fresh coriander",
            "amount": 2,
            "unit": "tbsp",
            "notes": "chopped"
          },
          {
            "name": "lemon juice",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Dry Roast Semolina (Rava)",
        "instruction": "In a wide pan on medium-low heat, dry roast rava for 4-5 minutes until warm, sandy, and aromatic (do not brown). Transfer to a plate to cool.",
        "timeMinutes": 5,
        "cue": "Rava grains feel separate and release a pleasant toasted aroma"
      },
      {
        "step": 2,
        "title": "Saut\u00e9 Crunchy Tempering & Aromatics",
        "instruction": "Heat 1.5 tbsp ghee or oil in the pan. Splutter mustard seeds. Add urad dal, chana dal, and cashews. Fry until golden brown. Add ginger, green chillies, curry leaves, and chopped onions. Saut\u00e9 until onions soften.",
        "timeMinutes": 5,
        "cue": "Lentils and cashews turn nutty golden"
      },
      {
        "step": 3,
        "title": "Simmer Vegetables in Boiling Water",
        "instruction": "Add finely diced carrots, beans, and green peas. Saut\u00e9 2 minutes. Pour in 3 cups of water and add salt. Bring to a rolling boil and cook for 3-4 minutes until vegetables are tender-crisp.",
        "timeMinutes": 5,
        "cue": "Water boils vigorously with bright colorful vegetables"
      },
      {
        "step": 4,
        "title": "Stream in Rava to Avoid Lumps",
        "instruction": "Reduce heat to low. While continuously stirring the water with one hand, slowly stream in the roasted rava with the other hand. Stir constantly to prevent any lumps from forming.",
        "timeMinutes": 3,
        "cue": "Rava absorbs water quickly into a smooth, thick porridge"
      },
      {
        "step": 5,
        "title": "Cover, Steam & Garnish",
        "instruction": "Cover with a tight lid and steam on the lowest heat for 3 minutes. Turn off heat. Drizzle 1 tsp ghee, fresh lemon juice, grated coconut, and chopped coriander. Fluff with a fork.",
        "timeMinutes": 4,
        "cue": "Fluffy, moist grains that separate cleanly with a fork"
      }
    ],
    "tips": [
      "Roasting the rava beforehand and using a 3:1 boiling water-to-rava ratio guarantees fluffy, non-sticky upma.",
      "Pouring rava in a slow stream while whisking continuously prevents lumps entirely."
    ],
    "substitutions": [
      "Can substitute semolina with broken wheat (dalia) or rolled oats for higher fiber."
    ],
    "servingSuggestions": [
      "Serve hot with coconut chutney, lemon pickle, or a sprinkle of spicy podi."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 6,
      "carbs": 38,
      "fat": 9,
      "fiber": 4
    },
    "tags": [
      "upma",
      "south indian",
      "breakfast",
      "quick",
      "healthy",
      "semolina",
      "vegetarian"
    ]
  },
  {
    "id": "pongal",
    "name": "Ven Pongal (Ghee Pongal)",
    "slug": "pongal",
    "description": "Comforting South Indian rice and yellow moong dal porridge infused with cracked black pepper, cumin seeds, fresh ginger, curry leaves, and crunchy golden cashews fried in pure desi ghee.",
    "region": "South Indian",
    "cuisine": "Tamil Nadu / South Indian",
    "category": "Breakfast",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 10,
    "cookTime": 20,
    "totalTime": 30,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 1120,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Boiling Rice & Dal",
        "items": [
          {
            "name": "raw short-grain rice (sona masoori or raw ponni)",
            "amount": 150,
            "unit": "g",
            "notes": "washed and drained"
          },
          {
            "name": "yellow moong dal (split mung)",
            "amount": 75,
            "unit": "g",
            "notes": "dry roasted until fragrant and light golden"
          },
          {
            "name": "water",
            "amount": 4,
            "unit": "cups",
            "notes": "for meltingly soft texture"
          },
          {
            "name": "milk",
            "amount": 0.5,
            "unit": "cup",
            "notes": "optional, creates rich temple-style finish"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "tbsp",
            "notes": "crushed or finely grated"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "pinch"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For the Decadent Ghee Tadka",
        "items": [
          {
            "name": "pure desi ghee",
            "amount": 3,
            "unit": "tbsp",
            "notes": "generous amount"
          },
          {
            "name": "whole black peppercorns",
            "amount": 1,
            "unit": "tsp",
            "notes": "lightly bruised"
          },
          {
            "name": "cumin seeds (jeera)",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "raw cashew nuts",
            "amount": 15,
            "unit": "whole",
            "notes": "halved"
          },
          {
            "name": "curry leaves",
            "amount": 12,
            "unit": "leaves",
            "notes": "fresh"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Roast Moong Dal",
        "instruction": "Dry roast yellow moong dal in a pan on low flame for 3 minutes until aromatic and light golden. Wash roasted dal and rice together under water.",
        "timeMinutes": 4,
        "cue": "A rich nutty roasted lentil fragrance emerges"
      },
      {
        "step": 2,
        "title": "Pressure Cook to Melting Softness",
        "instruction": "Add drained rice, roasted dal, 4 cups water, 1/2 cup milk, grated ginger, hing, and salt into a pressure cooker. Cook on medium heat for 4-5 whistles. Allow pressure to release naturally, then mash gently with a ladle.",
        "timeMinutes": 15,
        "cue": "Grains and lentils meld into a creamy, luscious porridge"
      },
      {
        "step": 3,
        "title": "Fry Cashews & Spices in Ghee",
        "instruction": "Heat desi ghee in a tadka pan. Add cashew halves and fry on low heat until golden brown. Add cumin seeds, lightly bruised peppercorns, and fresh curry leaves. Fry for 30 seconds until curry leaves turn crisp.",
        "timeMinutes": 4,
        "cue": "Cashews turn amber-gold while pepper crackles gently in hot ghee"
      },
      {
        "step": 4,
        "title": "Fold Tadka into Pongal",
        "instruction": "Pour the sizzling ghee, crunchy cashews, and aromatic spices directly into the mashed warm pongal. Stir thoroughly until the ghee is absorbed.",
        "timeMinutes": 2,
        "cue": "Glossy sheen envelopes the velvety rice-lentil porridge"
      },
      {
        "step": 5,
        "title": "Serve Steaming Hot",
        "instruction": "Serve immediately in a mound with an extra teaspoon of ghee on top.",
        "timeMinutes": 1,
        "cue": "Soul-satisfying South Indian temple aroma"
      }
    ],
    "tips": [
      "Roasting moong dal before cooking prevents it from becoming slimy and imparts a heavenly toasted aroma.",
      "Ven Pongal should be creamy and loose when hot; it thickens naturally as it cools."
    ],
    "substitutions": [
      "Substitute white rice with proso millet or foxtail millet for a diabetic-friendly Millet Pongal."
    ],
    "servingSuggestions": [
      "Traditionally served piping hot with South Indian coconut chutney and spicy vegetable sambar."
    ],
    "nutrition": {
      "calories": 310,
      "protein": 9,
      "carbs": 44,
      "fat": 12,
      "fiber": 3
    },
    "tags": [
      "pongal",
      "ven pongal",
      "south indian",
      "breakfast",
      "comfort food",
      "gluten-free",
      "healthy",
      "ghee"
    ]
  },
  {
    "id": "lemon-rice",
    "name": "Tangy Lemon Rice (Chitranna)",
    "slug": "lemon-rice",
    "description": "Vibrant yellow rice infused with freshly squeezed lemon juice, tempered with crunchy peanuts, roasted lentils, mustard seeds, curry leaves, and green chillies.",
    "region": "South Indian",
    "cuisine": "Karnataka / South Indian",
    "category": "Rice",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 10,
    "cookTime": 15,
    "totalTime": 25,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.8,
    "ratingCount": 1040,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Rice Base",
        "items": [
          {
            "name": "cooked basmati or sona masoori rice",
            "amount": 500,
            "unit": "g",
            "notes": "fluffed and completely cooled, grains separate"
          },
          {
            "name": "sesame oil or peanut oil",
            "amount": 1,
            "unit": "tsp",
            "notes": "drizzled over cooled rice"
          }
        ]
      },
      {
        "name": "For the Crunchy Tempering",
        "items": [
          {
            "name": "sesame oil or peanut oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for authentic flavor"
          },
          {
            "name": "mustard seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "black"
          },
          {
            "name": "raw peanuts",
            "amount": 3,
            "unit": "tbsp",
            "notes": "shelled"
          },
          {
            "name": "chana dal",
            "amount": 1,
            "unit": "tbsp",
            "notes": "bengal gram"
          },
          {
            "name": "urad dal",
            "amount": 1,
            "unit": "tsp",
            "notes": "black gram"
          },
          {
            "name": "dry red chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "broken"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "slit"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "tbsp",
            "notes": "finely grated"
          },
          {
            "name": "curry leaves",
            "amount": 12,
            "unit": "leaves",
            "notes": "fresh"
          },
          {
            "name": "turmeric powder",
            "amount": 0.75,
            "unit": "tsp",
            "notes": "bright yellow"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "pinch"
          },
          {
            "name": "fresh lemon juice",
            "amount": 3,
            "unit": "tbsp",
            "notes": "freshly squeezed (do not cook lemon juice directly)"
          },
          {
            "name": "fresh coriander",
            "amount": 2,
            "unit": "tbsp",
            "notes": "chopped"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Spread & Cool Cooked Rice",
        "instruction": "Spread cooked rice onto a wide plate or tray. Drizzle 1 tsp oil and let cool completely so grains remain distinct and firm.",
        "timeMinutes": 5,
        "cue": "Individual dry, fluffy grains of rice"
      },
      {
        "step": 2,
        "title": "Fry Peanuts & Lentils",
        "instruction": "Heat 2 tbsp oil in a wide kadai over medium heat. Splutter mustard seeds. Add raw peanuts, chana dal, and urad dal. Fry on low flame for 3 minutes until peanuts are crunchy and dals are golden brown.",
        "timeMinutes": 4,
        "cue": "Peanuts crackle and turn fragrant golden amber"
      },
      {
        "step": 3,
        "title": "Saut\u00e9 Aromatics & Turmeric",
        "instruction": "Add dry red chillies, slit green chillies, grated ginger, curry leaves, and hing. Saut\u00e9 for 30 seconds. Add turmeric powder and salt, stirring quickly for 10 seconds before removing the pan from direct heat.",
        "timeMinutes": 2,
        "cue": "Vibrant golden oil sizzling with aromatics"
      },
      {
        "step": 4,
        "title": "Add Lemon Juice Off Heat",
        "instruction": "Turn off heat. Pour freshly squeezed lemon juice into the hot seasoned oil. Swirl to combine.",
        "timeMinutes": 1,
        "cue": "Adding lemon off the heat prevents bitterness"
      },
      {
        "step": 5,
        "title": "Toss Rice Gently & Garnish",
        "instruction": "Add cooled rice to the pan. Toss gently with a flat wooden spatula until every grain is coated in bright sunny yellow dressing without breaking the rice grains. Garnish with chopped coriander.",
        "timeMinutes": 3,
        "cue": "Glorious sunny yellow grains speckled with red chillies and green curry leaves"
      }
    ],
    "tips": [
      "Always cool the rice completely before mixing; warm rice becomes mushy when tossed.",
      "Never cook lemon juice over high heat, as it turns bitter; always add it off the flame."
    ],
    "substitutions": [
      "Can add 2 tbsp grated raw green mango during mango season for Raw Mango Rice (Mamidikaya Pulihora)."
    ],
    "servingSuggestions": [
      "Perfect picnic and lunchbox dish; pair with crispy potato chips, roasted papad, and coconut chutney."
    ],
    "nutrition": {
      "calories": 290,
      "protein": 6,
      "carbs": 46,
      "fat": 10,
      "fiber": 3
    },
    "tags": [
      "lemon rice",
      "chitranna",
      "south indian",
      "quick",
      "vegan",
      "gluten-free",
      "lunchbox",
      "rice"
    ]
  },
  {
    "id": "coconut-rice",
    "name": "Fragrant Coconut Rice (Thengai Sadam)",
    "slug": "coconut-rice",
    "description": "Fluffy basmati rice tossed with freshly grated coconut, crunchy cashews, ginger, green chillies, and aromatic curry leaves tempered in virgin coconut oil.",
    "region": "South Indian",
    "cuisine": "South Indian / Tamil",
    "category": "Rice",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 10,
    "cookTime": 15,
    "totalTime": 25,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.8,
    "ratingCount": 710,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Rice Base",
        "items": [
          {
            "name": "cooked long-grain or sona masoori rice",
            "amount": 500,
            "unit": "g",
            "notes": "cooled, separated grains"
          },
          {
            "name": "freshly grated coconut",
            "amount": 150,
            "unit": "g",
            "notes": "use fresh juicy coconut, not dry desiccated"
          }
        ]
      },
      {
        "name": "For the Coconut Oil Tadka",
        "items": [
          {
            "name": "virgin coconut oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "cold pressed"
          },
          {
            "name": "mustard seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "black"
          },
          {
            "name": "urad dal",
            "amount": 1,
            "unit": "tsp",
            "notes": "for crunch"
          },
          {
            "name": "chana dal",
            "amount": 1,
            "unit": "tsp",
            "notes": "for crunch"
          },
          {
            "name": "cashews",
            "amount": 12,
            "unit": "whole",
            "notes": "halved"
          },
          {
            "name": "dry red chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "broken"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "finely chopped"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "tbsp",
            "notes": "finely shredded"
          },
          {
            "name": "curry leaves",
            "amount": 12,
            "unit": "leaves",
            "notes": "fresh"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "fine"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Heat Coconut Oil & Fry Crunchies",
        "instruction": "Heat cold-pressed coconut oil in a wide pan over medium flame. Splutter mustard seeds. Add urad dal, chana dal, and cashew halves. Fry on low flame for 2-3 minutes until nuts and lentils turn golden.",
        "timeMinutes": 4,
        "cue": "Sweet, tropical aroma of coconut oil and toasted cashews"
      },
      {
        "step": 2,
        "title": "Saut\u00e9 Aromatics",
        "instruction": "Add dry red chillies, chopped green chillies, shredded ginger, curry leaves, and hing. Saut\u00e9 for 30-40 seconds until curry leaves turn crisp.",
        "timeMinutes": 2,
        "cue": "Ginger and curry leaves release fragrant oils"
      },
      {
        "step": 3,
        "title": "Gently Toast Fresh Coconut",
        "instruction": "Add freshly grated coconut and salt. Saut\u00e9 on low flame for exactly 2-3 minutes just to warm through and release natural coconut milk oils (do NOT allow coconut to brown).",
        "timeMinutes": 3,
        "cue": "Grated coconut becomes aromatic and moist without discoloring"
      },
      {
        "step": 4,
        "title": "Fold in Cooled Rice",
        "instruction": "Gently tip in the cooled rice. Using a silicone spatula, fold the coconut seasoning through the rice until evenly combined without mashing.",
        "timeMinutes": 3,
        "cue": "Glistening white rice interspersed with golden cashews and dark green curry leaves"
      },
      {
        "step": 5,
        "title": "Steam & Serve",
        "instruction": "Cover and warm through on lowest heat for 2 minutes. Rest 2 minutes and serve.",
        "timeMinutes": 2,
        "cue": "Delicately sweet, nutty, and savory aroma"
      }
    ],
    "tips": [
      "Use fresh grated coconut; dried desiccated coconut lacks natural moisture and sweet dairy-like flavor.",
      "Do not fry coconut till brown\u2014gentle warming preserves its pristine snow-white color and delicate sweetness."
    ],
    "substitutions": [
      "Can add a pinch of green cardamom powder for festive temple-style coconut rice."
    ],
    "servingSuggestions": [
      "Pair with spicy potato roast (Urulai Kizhangu Varuval), appalam, or vegetable kurma."
    ],
    "nutrition": {
      "calories": 320,
      "protein": 5,
      "carbs": 42,
      "fat": 15,
      "fiber": 4
    },
    "tags": [
      "coconut rice",
      "south indian",
      "vegan",
      "gluten-free",
      "healthy",
      "temple food",
      "rice"
    ]
  },
  {
    "id": "macher-jhol",
    "name": "Bengali Macher Jhol",
    "slug": "macher-jhol",
    "description": "Light, comforting Bengali fish curry made with carp (Rohu or Katla), potatoes, and cauliflower florets in a golden cumin and ginger broth cooked in cold-pressed mustard oil.",
    "region": "Bengali",
    "cuisine": "Bengali",
    "category": "Main Course",
    "diet": [
      "Non-Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 25,
    "totalTime": 40,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 1150,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Fish",
        "items": [
          {
            "name": "Rohu or Katla fish steaks",
            "amount": 500,
            "unit": "g",
            "notes": "fresh water carp steaks, washed"
          },
          {
            "name": "turmeric powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "for fish marination"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "rubbed into fish"
          },
          {
            "name": "mustard oil",
            "amount": 3,
            "unit": "tbsp",
            "notes": "for frying fish and cooking curry"
          }
        ]
      },
      {
        "name": "For the Vegetables & Gravy (Jhol)",
        "items": [
          {
            "name": "potatoes",
            "amount": 2,
            "unit": "medium",
            "notes": "peeled and sliced into long wedges"
          },
          {
            "name": "cauliflower florets or pointed gourd (potol)",
            "amount": 100,
            "unit": "g",
            "notes": "optional seasonal addition"
          },
          {
            "name": "kalonji (nigella seeds)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "traditional Bengali tempering"
          },
          {
            "name": "green chillies",
            "amount": 4,
            "unit": "whole",
            "notes": "slit"
          },
          {
            "name": "cumin powder (jeera)",
            "amount": 1.5,
            "unit": "tsp",
            "notes": "ground in water paste"
          },
          {
            "name": "coriander powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "ginger paste",
            "amount": 1,
            "unit": "tbsp",
            "notes": "freshly grated"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 0.75,
            "unit": "tsp",
            "notes": "for golden hue"
          },
          {
            "name": "warm water",
            "amount": 2.5,
            "unit": "cups",
            "notes": "for light jhol (broth)"
          },
          {
            "name": "fresh coriander leaves",
            "amount": 2,
            "unit": "tbsp",
            "notes": "chopped"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Marinate & Shallow Fry Fish",
        "instruction": "Rub fish steaks with turmeric and salt. Heat mustard oil in a kadai to smoking point. Fry fish pieces for 2-3 minutes per side until lightly golden (do not over-fry, or fresh carp turns tough). Remove and set aside.",
        "timeMinutes": 8,
        "cue": "Fish turns light golden with delicate crisp crust"
      },
      {
        "step": 2,
        "title": "Fry Potatoes & Vegetables",
        "instruction": "In the same mustard oil, fry potato wedges and cauliflower florets with a pinch of turmeric and salt for 4-5 minutes until golden on edges. Drain and remove.",
        "timeMinutes": 5,
        "cue": "Potato wedges develop a golden skin"
      },
      {
        "step": 3,
        "title": "Temper Kalonji & Saut\u00e9 Spices",
        "instruction": "In remaining oil, add kalonji (nigella seeds) and 2 slit green chillies. Add ginger paste, cumin powder, coriander powder, Kashmiri chilli, and 2 tbsp water to prevent scorching. Cook on medium-low for 3 minutes until oil separates.",
        "timeMinutes": 4,
        "cue": "Aromatic nigella seeds crackle in mustard oil"
      },
      {
        "step": 4,
        "title": "Simmer the Light Broth (Jhol)",
        "instruction": "Add 2.5 cups warm water, salt, and the fried potatoes. Bring to a rolling boil. Reduce heat, cover, and cook for 8 minutes until potatoes are completely tender.",
        "timeMinutes": 8,
        "cue": "Potatoes become soft and broth turns golden yellow"
      },
      {
        "step": 5,
        "title": "Slide in Fish & Rest",
        "instruction": "Gently slide the fried fish steaks into the bubbling jhol along with remaining slit green chillies. Simmer for 4-5 minutes so fish absorbs the light spiced broth. Garnish with fresh coriander and rest covered 5 minutes.",
        "timeMinutes": 5,
        "cue": "Light golden aromatic curry with tender, flaky fish"
      }
    ],
    "tips": [
      "Frying fish in smoking hot mustard oil prevents it from sticking and eliminates raw freshwater fish odors.",
      "Authentic Macher Jhol is a light soupy broth (jhol), not a thick heavy gravy."
    ],
    "substitutions": [
      "Can use salmon, sea bass, tilapia, or cod steaks if Rohu or Katla is unavailable."
    ],
    "servingSuggestions": [
      "Serve hot over a bed of fragrant steamed Gobindobhog or basmati rice with a fresh green chilli and a wedge of Gondhoraj lebu (king lemon)."
    ],
    "nutrition": {
      "calories": 310,
      "protein": 28,
      "carbs": 18,
      "fat": 14,
      "fiber": 3
    },
    "tags": [
      "macher jhol",
      "bengali",
      "fish curry",
      "mustard oil",
      "healthy",
      "light curry",
      "comfort food"
    ]
  },
  {
    "id": "shorshe-ilish",
    "name": "Shorshe Ilish (Hilsa in Mustard Sauce)",
    "slug": "shorshe-ilish",
    "description": "Regal Bengali delicacy of prized Hilsa fish steaks simmered in a sharp, pungent mustard seed paste and green chilli gravy cooked in pure mustard oil.",
    "region": "Bengali",
    "cuisine": "Bengali",
    "category": "Main Course",
    "diet": [
      "Non-Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 15,
    "totalTime": 30,
    "servings": 4,
    "spiceLevel": "Spicy",
    "rating": 5.0,
    "ratingCount": 1280,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Ilish (Hilsa)",
        "items": [
          {
            "name": "Ilish (Hilsa) fish steaks",
            "amount": 500,
            "unit": "g",
            "notes": "washed gently and patted dry"
          },
          {
            "name": "turmeric powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "for seasoning"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "rubbed into fish"
          }
        ]
      },
      {
        "name": "For the Pungent Mustard Paste",
        "items": [
          {
            "name": "yellow mustard seeds (shorshe)",
            "amount": 2,
            "unit": "tbsp",
            "notes": "provides mellow sweet tang"
          },
          {
            "name": "black mustard seeds (rai)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "provides sharp pungent kick"
          },
          {
            "name": "green chillies",
            "amount": 6,
            "unit": "whole",
            "notes": "2 ground with mustard, 4 slit for finishing"
          },
          {
            "name": "salt",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "ground with mustard to prevent bitterness"
          },
          {
            "name": "water",
            "amount": 0.5,
            "unit": "cup",
            "notes": "for smooth blending"
          }
        ]
      },
      {
        "name": "For the Gravy Base",
        "items": [
          {
            "name": "cold-pressed mustard oil (shorsher tel)",
            "amount": 3,
            "unit": "tbsp",
            "notes": "unrefined for authentic jhaal aroma"
          },
          {
            "name": "kalonji (nigella seeds)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "warm water",
            "amount": 1,
            "unit": "cup",
            "notes": "for gravy"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Grind Mustard Paste with Salt & Chilli",
        "instruction": "Soak yellow and black mustard seeds in warm water for 15 minutes. Drain and grind in a blender with 2 green chillies, 1/2 tsp salt, and 1/4 cup water until completely smooth. Strain through a sieve to discard seeds coats for a silk-smooth paste.",
        "timeMinutes": 8,
        "cue": "Straining prevents any throat-irritating seed bitterness"
      },
      {
        "step": 2,
        "title": "Marinate Ilish Steaks",
        "instruction": "Rub the delicate Hilsa fish steaks with 1/2 tsp turmeric powder and 1/2 tsp salt. Set aside for 10 minutes.",
        "timeMinutes": 10,
        "cue": "Glossy silver fish steaks stained with golden turmeric"
      },
      {
        "step": 3,
        "title": "Temper Mustard Oil",
        "instruction": "Heat 2 tbsp mustard oil in a wide pan until smoking, then reduce flame. Add nigella seeds (kalonji) and 2 slit green chillies; let them sizzle for 20 seconds.",
        "timeMinutes": 2,
        "cue": "Pungent mustard oil mingles with aromatic nigella seeds"
      },
      {
        "step": 4,
        "title": "Simmer Raw Hilsa in Mustard Sauce",
        "instruction": "Add the strained mustard paste, 1 cup warm water, remaining turmeric, and salt. Bring to a gentle simmer. Slide the raw Hilsa steaks gently into the sauce. (Authentic Shorshe Ilish uses raw fish; the delicate fat renders directly into the sauce). Simmer covered on low heat for 5 minutes.",
        "timeMinutes": 6,
        "cue": "Rich Hilsa fish oil renders into the mustard sauce"
      },
      {
        "step": 5,
        "title": "Flip, Finish with Raw Mustard Oil & Chillies",
        "instruction": "Carefully flip the fish steaks. Scatter remaining slit green chillies and drizzle 1 tbsp of raw pungent mustard oil on top. Cover tightly, turn off heat, and let rest in steam for 5 minutes.",
        "timeMinutes": 4,
        "cue": "Unbeatable nasal-clearing pungent mustard aroma and meltingly rich fish"
      }
    ],
    "tips": [
      "Always grind mustard seeds with a pinch of salt and a green chilli; this chemically prevents the enzyme myrosinase from turning bitter.",
      "A final drizzle of raw cold-pressed mustard oil right at the end (Kancha Tel) is the soul of authentic Bengali cooking."
    ],
    "substitutions": [
      "If Hilsa is unavailable, salmon or trout with their natural high fat content make the closest substitute."
    ],
    "servingSuggestions": [
      "Serve steaming hot with hot basmati rice; drizzle the golden mustard sauce over the rice and savor each bite."
    ],
    "nutrition": {
      "calories": 390,
      "protein": 26,
      "carbs": 6,
      "fat": 29,
      "fiber": 2
    },
    "tags": [
      "shorshe ilish",
      "bengali",
      "hilsa",
      "mustard fish",
      "spicy",
      "delicacy",
      "seafood"
    ]
  },
  {
    "id": "aloo-posto",
    "name": "Traditional Aloo Posto",
    "slug": "aloo-posto",
    "description": "Classic Bengali comfort dish of tender diced potatoes cooked in a velvety, nutty white poppy seed (posto) paste with green chillies and finished with cold-pressed mustard oil.",
    "region": "Bengali",
    "cuisine": "Bengali",
    "category": "Side Dish",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 20,
    "totalTime": 35,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.9,
    "ratingCount": 870,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the White Poppy Seed Paste (Posto Bata)",
        "items": [
          {
            "name": "white poppy seeds (posto / khus khus)",
            "amount": 50,
            "unit": "g",
            "notes": "soaked in warm water for 30 mins"
          },
          {
            "name": "green chillies",
            "amount": 3,
            "unit": "whole",
            "notes": "ground with poppy seeds"
          },
          {
            "name": "water",
            "amount": 4,
            "unit": "tbsp",
            "notes": "for grinding to a thick paste"
          }
        ]
      },
      {
        "name": "For the Potatoes & Cooking",
        "items": [
          {
            "name": "potatoes",
            "amount": 400,
            "unit": "g",
            "notes": "peeled and cut into neat 3/4-inch cubes"
          },
          {
            "name": "kalonji (nigella seeds)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "tempering"
          },
          {
            "name": "green chillies",
            "amount": 3,
            "unit": "whole",
            "notes": "slit lengthwise"
          },
          {
            "name": "pure mustard oil",
            "amount": 2.5,
            "unit": "tbsp",
            "notes": "divided"
          },
          {
            "name": "turmeric powder",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "optional, keep very pale yellow"
          },
          {
            "name": "sugar",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "subtle balance"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Grind Poppy Seeds (Posto Bata)",
        "instruction": "Drain soaked poppy seeds and grind with 3 green chillies and minimal water in a small jar or traditional sil-nora into a thick, gritty, snow-white paste.",
        "timeMinutes": 5,
        "cue": "Thick, aromatic white paste with flecks of green chilli"
      },
      {
        "step": 2,
        "title": "Temper Mustard Oil with Kalonji",
        "instruction": "Heat 1.5 tbsp mustard oil in a pan until lightly smoking. Add nigella seeds (kalonji) and let them crackle. Add the diced potatoes and saut\u00e9 on medium heat for 4-5 minutes until potatoes are lightly glossy.",
        "timeMinutes": 5,
        "cue": "Aromatic nigella seeds crackle in mustard oil"
      },
      {
        "step": 3,
        "title": "Cook Potatoes Tender",
        "instruction": "Add salt, sugar, a tiny pinch of turmeric, and 3/4 cup water. Cover tightly and cook on medium-low flame for 8-10 minutes until potatoes are completely fork-tender and water has mostly evaporated.",
        "timeMinutes": 10,
        "cue": "Potatoes are tender and lightly glazed with moisture"
      },
      {
        "step": 4,
        "title": "Fold in Posto Paste",
        "instruction": "Add the thick poppy seed paste and 3 slit green chillies. Mix gently to coat every potato cube. Cook uncovered on low heat for 3-4 minutes until the paste thickens and clings to the potatoes.",
        "timeMinutes": 4,
        "cue": "Thick, creamy poppy seed coating hugs the tender potatoes"
      },
      {
        "step": 5,
        "title": "The Raw Mustard Oil Finish (Kancha Tel)",
        "instruction": "Turn off the heat. Drizzle 1 tablespoon of raw mustard oil over the hot potatoes. Cover and rest for 5 minutes before serving.",
        "timeMinutes": 2,
        "cue": "Head-clearing, earthy, nutty fragrance fills the room"
      }
    ],
    "tips": [
      "Grinding poppy seeds finely requires soaking in warm water first so seeds soften.",
      "Do not overcook the posto paste; gentle heating preserves its delicate nutty freshness."
    ],
    "substitutions": [
      "Can add diced ridge gourd (jhinge) to make the famous Jhinge Aloo Posto."
    ],
    "servingSuggestions": [
      "Pair with simple Biulir Dal (fennel-tempered urad dal), hot steamed rice, and crispy fried bitter gourd (uchhe bhaja)."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 6,
      "carbs": 29,
      "fat": 12,
      "fiber": 4
    },
    "tags": [
      "aloo posto",
      "bengali",
      "comfort food",
      "poppy seeds",
      "vegetarian",
      "vegan",
      "gluten-free"
    ]
  },
  {
    "id": "mishti-doi",
    "name": "Classic Bengali Mishti Doi",
    "slug": "mishti-doi",
    "description": "Rich, creamy, caramelized sweetened yogurt fermented in unglazed earthen clay pots that absorb excess moisture for a thick, velvety custard texture.",
    "region": "Bengali",
    "cuisine": "Bengali",
    "category": "Dessert",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 25,
    "totalTime": 40,
    "servings": 6,
    "spiceLevel": "Mild",
    "rating": 4.9,
    "ratingCount": 1460,
    "image": "https://images.unsplash.com/photo-1605197144883-9b87f9d0c64b?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Sweet Caramelized Milk",
        "items": [
          {
            "name": "full cream whole milk",
            "amount": 1000,
            "unit": "ml",
            "notes": "rich cow or buffalo milk"
          },
          {
            "name": "sugar",
            "amount": 150,
            "unit": "g",
            "notes": "divided into two batches"
          },
          {
            "name": "green cardamom powder",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "freshly crushed"
          },
          {
            "name": "water",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for melting caramel"
          }
        ]
      },
      {
        "name": "For the Culture Starter",
        "items": [
          {
            "name": "thick hung curd / Greek yogurt",
            "amount": 3,
            "unit": "tbsp",
            "notes": "strained of whey, whisked smooth"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Reduce Milk by 30%",
        "instruction": "Bring whole milk to a boil in a heavy pot with 75g sugar and cardamom powder. Simmer on medium-low for 15 minutes, stirring frequently and scraping cream off sides until reduced to approximately 700ml.",
        "timeMinutes": 15,
        "cue": "Milk turns thick, creamy, and slightly ivory in color"
      },
      {
        "step": 2,
        "title": "Caramelize Sugar for Golden Color",
        "instruction": "In a dry pan on low heat, add remaining 75g sugar and 2 tbsp water without stirring. Let sugar dissolve and bubble into a deep amber-golden caramel. Immediately pour 1/2 cup of warm milk into the caramel while stirring vigorously to combine.",
        "timeMinutes": 6,
        "cue": "Rich bubbling amber caramel dissolves into golden syrup"
      },
      {
        "step": 3,
        "title": "Mix Caramel into Reduced Milk & Cool",
        "instruction": "Pour the caramel syrup into the reduced hot milk. Stir well until uniform toffee color. Let cool down to lukewarm temperature (around 40-42\u00b0C / 105\u00b0F, comfortable when dipping your pinky finger).",
        "timeMinutes": 10,
        "cue": "Milk is warm (not hot!) with an enticing butterscotch hue"
      },
      {
        "step": 4,
        "title": "Whisk in Culture & Pour in Clay Pots",
        "instruction": "Whisk smooth hung curd in a small bowl, add 2 tablespoons of warm milk to temper, then whisk back into the lukewarm milk. Pour into unglazed terracotta clay pots (matka).",
        "timeMinutes": 4,
        "cue": "Foamy bubbles settle in the earthen pots"
      },
      {
        "step": 5,
        "title": "Ferment & Chill",
        "instruction": "Cover pots with aluminum foil. Place in a warm spot (like an unheated oven with light on) for 6-8 hours until set firmly. Chill in refrigerator for 3 hours before serving.",
        "timeMinutes": 480,
        "cue": "Thick, spoonable, wobble-free sweet yogurt"
      }
    ],
    "tips": [
      "Fermenting in unglazed earthenware (matka) is the secret: porous clay absorbs excess whey, yielding dense, custard-like texture.",
      "Make sure the milk is only lukewarm when adding the yogurt culture; hot milk will kill the lactobacillus bacteria."
    ],
    "substitutions": [
      "Can use palm jaggery (nolen gur) in winter instead of caramelized sugar for authentic Nolen Gurer Mishti Doi."
    ],
    "servingSuggestions": [
      "Serve chilled straight out of the clay pot after a rich Bengali lunch."
    ],
    "nutrition": {
      "calories": 210,
      "protein": 6,
      "carbs": 28,
      "fat": 8,
      "fiber": 0
    },
    "tags": [
      "mishti doi",
      "bengali",
      "dessert",
      "sweet yogurt",
      "fermented",
      "probiotic",
      "clay pot"
    ]
  },
  {
    "id": "hyderabadi-chicken-biryani",
    "name": "Hyderabadi Chicken Dum Biryani",
    "slug": "hyderabadi-chicken-biryani",
    "description": "The crown jewel of Nizami cuisine: fragrant aged basmati rice and raw marinated bone-in chicken slow-cooked together in a sealed 'dum' vessel with saffron, mint, and caramelized onions.",
    "region": "Hyderabadi",
    "cuisine": "Hyderabadi / Mughlai",
    "category": "Rice",
    "diet": [
      "Non-Vegetarian"
    ],
    "difficulty": "Hard",
    "prepTime": 40,
    "cookTime": 45,
    "totalTime": 85,
    "servings": 6,
    "spiceLevel": "Spicy",
    "rating": 5.0,
    "ratingCount": 2850,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Raw Chicken Marinade (Kacchi Marination)",
        "items": [
          {
            "name": "bone-in chicken (biryani cut pieces)",
            "amount": 800,
            "unit": "g",
            "notes": "washed and deeply slashed"
          },
          {
            "name": "thick whisked yogurt (curd)",
            "amount": 200,
            "unit": "g",
            "notes": "room temperature"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 2.5,
            "unit": "tbsp",
            "notes": "freshly ground"
          },
          {
            "name": "birista (crispy fried brown onions)",
            "amount": 150,
            "unit": "g",
            "notes": "divided, hand-crumbled into marinade"
          },
          {
            "name": "fresh mint leaves (pudina)",
            "amount": 1,
            "unit": "cup",
            "notes": "torn"
          },
          {
            "name": "fresh coriander leaves",
            "amount": 1,
            "unit": "cup",
            "notes": "chopped"
          },
          {
            "name": "green chillies",
            "amount": 5,
            "unit": "whole",
            "notes": "slit lengthwise"
          },
          {
            "name": "shahi jeera (caraway seeds)",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "green cardamom",
            "amount": 6,
            "unit": "whole",
            "notes": "crushed"
          },
          {
            "name": "cinnamon stick",
            "amount": 2,
            "unit": "inch",
            "notes": "whole"
          },
          {
            "name": "cloves",
            "amount": 5,
            "unit": "whole",
            "notes": "whole"
          },
          {
            "name": "mace (javitri) & nutmeg",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "freshly powdered royal spice"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "vibrant heat"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "golden"
          },
          {
            "name": "garam masala",
            "amount": 1,
            "unit": "tsp",
            "notes": "aromatic"
          },
          {
            "name": "lemon juice",
            "amount": 2,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "oil from frying onions",
            "amount": 3,
            "unit": "tbsp",
            "notes": "infused with rich caramelized onion essence"
          },
          {
            "name": "salt",
            "amount": 1.5,
            "unit": "tsp",
            "notes": "generous"
          }
        ]
      },
      {
        "name": "For Parboiling the Basmati Rice",
        "items": [
          {
            "name": "aged long-grain Basmati rice",
            "amount": 500,
            "unit": "g",
            "notes": "washed and soaked 45 mins"
          },
          {
            "name": "water",
            "amount": 3,
            "unit": "liters",
            "notes": "plenty of rolling boiling water"
          },
          {
            "name": "whole spices (bay leaf, star anise, cardamom)",
            "amount": 1,
            "unit": "batch",
            "notes": "tied in muslin or dropped whole"
          },
          {
            "name": "salt",
            "amount": 2,
            "unit": "tbsp",
            "notes": "water must taste like seawater"
          }
        ]
      },
      {
        "name": "For the Dum Layering & Aromatics",
        "items": [
          {
            "name": "pure desi ghee",
            "amount": 3,
            "unit": "tbsp",
            "notes": "melted"
          },
          {
            "name": "saffron strands",
            "amount": 20,
            "unit": "threads",
            "notes": "soaked in 1/4 cup warm milk"
          },
          {
            "name": "kewra water or rose water",
            "amount": 1,
            "unit": "tsp",
            "notes": "subtle royal essence"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Marinate Chicken (Overnight or 2 Hours)",
        "instruction": "In a heavy-bottomed biryani handi, mix chicken with yogurt, ginger-garlic paste, 2/3 of crushed fried onions (birista), half of chopped mint and coriander, slit green chillies, shahi jeera, whole and ground spices, lemon juice, onion-frying oil, and salt. Marinate for at least 2 hours.",
        "timeMinutes": 120,
        "cue": "Meat is thoroughly coated in thick aromatic spiced yogurt"
      },
      {
        "step": 2,
        "title": "Cook Rice to 70% Parboiled",
        "instruction": "Bring 3 liters of water to a rolling boil with whole spices and 2 tbsp salt. Add drained soaked basmati rice. Cook on high heat for exactly 5-6 minutes until 70% cooked (rice grain has elongated, but has a firm bite and breaks into 3 pieces when pressed).",
        "timeMinutes": 6,
        "cue": "Long elegant grains with firm center core"
      },
      {
        "step": 3,
        "title": "Layer Rice Over Raw Chicken",
        "instruction": "Using a slotted skimmer, scoop the 70% parboiled hot rice directly over the raw marinated chicken layer in the handi. Spread evenly. Scatter remaining birista, mint, coriander, saffron milk, kewra water, and 3 tbsp desi ghee across the top.",
        "timeMinutes": 5,
        "cue": "Layer of snow-white and saffron-streaked rice crowned with herbs"
      },
      {
        "step": 4,
        "title": "Seal Handi with Dough (Dum Pukht)",
        "instruction": "Roll a snake of whole wheat dough around the rim of the handi. Press the lid tightly to form an airtight seal. Place handi on high heat for 8 minutes until steam builds up inside, then transfer handi onto a preheated heavy cast iron tawa on low heat. Cook on gentle dum for 30 minutes.",
        "timeMinutes": 38,
        "cue": "Steam is pressurized inside the pot, cooking the chicken in its own juices"
      },
      {
        "step": 5,
        "title": "Rest & Fluff with Flat Ladle",
        "instruction": "Turn off heat and let rest unopened for 15 minutes. Cut open the dough seal. Dig a flat plate or ladle vertically down to lift all layers together without breaking long rice grains.",
        "timeMinutes": 15,
        "cue": "Incomparable burst of saffron, mint, and tender juicy chicken aroma"
      }
    ],
    "tips": [
      "Salting the boiling rice water until it tastes like seawater ensures the rice itself is flavorful.",
      "Cooking over a heavy tawa on low heat prevents the bottom layer of chicken from burning while creating a rich masala crust (tahdig)."
    ],
    "substitutions": [
      "For a vegetarian version, substitute chicken with mixed veggies, paneer, and soya chunks marinated similarly."
    ],
    "servingSuggestions": [
      "Serve with Mirchi Ka Salan (spicy chili-peanut gravy) and chilled onion-cucumber raita."
    ],
    "nutrition": {
      "calories": 580,
      "protein": 38,
      "carbs": 62,
      "fat": 22,
      "fiber": 4
    },
    "tags": [
      "hyderabadi biryani",
      "biryani",
      "chicken biryani",
      "dum pukht",
      "mughlai",
      "nizami",
      "special",
      "popular"
    ]
  },
  {
    "id": "hyderabadi-mutton-biryani",
    "name": "Hyderabadi Mutton Dum Biryani",
    "slug": "hyderabadi-mutton-biryani",
    "description": "Tender young goat meat marinated with raw papaya tenderizer, yogurt, fried onions, and Nizami spices, layered with saffron basmati rice and slow-cooked in a sealed dum pot.",
    "region": "Hyderabadi",
    "cuisine": "Hyderabadi",
    "category": "Rice",
    "diet": [
      "Non-Vegetarian"
    ],
    "difficulty": "Hard",
    "prepTime": 45,
    "cookTime": 60,
    "totalTime": 105,
    "servings": 6,
    "spiceLevel": "Spicy",
    "rating": 5.0,
    "ratingCount": 1920,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Mutton Marination (Kacchi Gosht)",
        "items": [
          {
            "name": "tender goat meat (mutton, mix of ribs and shank)",
            "amount": 800,
            "unit": "g",
            "notes": "bone-in, cut into chunks"
          },
          {
            "name": "raw papaya paste (with skin)",
            "amount": 2,
            "unit": "tbsp",
            "notes": "natural enzyme tenderizer for mutton"
          },
          {
            "name": "whisked thick curd",
            "amount": 250,
            "unit": "g",
            "notes": "full fat"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 3,
            "unit": "tbsp",
            "notes": "freshly pounded"
          },
          {
            "name": "fried onions (birista)",
            "amount": 150,
            "unit": "g",
            "notes": "crushed"
          },
          {
            "name": "fresh mint & coriander",
            "amount": 1.5,
            "unit": "cups",
            "notes": "chopped"
          },
          {
            "name": "shahi jeera",
            "amount": 1,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "cardamom, cloves, cinnamon, mace",
            "amount": 1,
            "unit": "batch",
            "notes": "freshly ground"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 2,
            "unit": "tbsp",
            "notes": "deep color"
          },
          {
            "name": "ghee & onion oil",
            "amount": 4,
            "unit": "tbsp",
            "notes": "richness"
          },
          {
            "name": "salt",
            "amount": 2,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For Basmati Rice & Aromatics",
        "items": [
          {
            "name": "aged long-grain Basmati rice",
            "amount": 500,
            "unit": "g",
            "notes": "soaked 1 hour"
          },
          {
            "name": "saffron strands",
            "amount": 25,
            "unit": "threads",
            "notes": "steeped in warm milk"
          },
          {
            "name": "pure ghee",
            "amount": 3,
            "unit": "tbsp",
            "notes": "for top layer"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Marinate Mutton with Raw Papaya",
        "instruction": "Toss bone-in mutton with raw papaya paste, ginger-garlic paste, yogurt, crushed fried onions, ground spices, mint, coriander, ghee, and salt. Refrigerate for at least 4 hours (ideally overnight). The papain enzymes tenderize the meat fibers.",
        "timeMinutes": 240,
        "cue": "Mutton softens and absorbs deep spiced aroma"
      },
      {
        "step": 2,
        "title": "Parboil Rice to 70%",
        "instruction": "Cook soaked basmati rice in salted boiling water with whole spices for 5-6 minutes until 70% cooked. Drain well.",
        "timeMinutes": 6,
        "cue": "Rice has elongated fully with a firm bite"
      },
      {
        "step": 3,
        "title": "Layer Over Mutton in Handi",
        "instruction": "Layer the hot rice over the marinated mutton. Drizzle saffron milk, melted ghee, fried onions, and fresh mint leaves.",
        "timeMinutes": 5,
        "cue": "Glistening royal layers ready for slow steaming"
      },
      {
        "step": 4,
        "title": "Slow Dum on Tawa",
        "instruction": "Seal handi tightly with dough and lid. Cook on high heat for 10 minutes, then transfer over a heavy iron tawa on low heat for 45-50 minutes to cook the mutton through.",
        "timeMinutes": 55,
        "cue": "The lid swells with intense pressure and heavenly aroma escapes the seal"
      },
      {
        "step": 5,
        "title": "Rest & Serve",
        "instruction": "Rest for 15 minutes before opening. Gently uncover and scoop mutton pieces and saffron rice onto platters.",
        "timeMinutes": 15,
        "cue": "Mutton falls off the bone with melting tenderness"
      }
    ],
    "tips": [
      "Raw papaya paste is indispensable for Kacchi Mutton Biryani; without it, mutton will remain tough during dum cooking.",
      "Use a mix of chops, ribs, and marrow bones for ultimate richness."
    ],
    "substitutions": [
      "Can use lamb if goat meat is unavailable, reducing marination by 1 hour."
    ],
    "servingSuggestions": [
      "Serve hot with Mirchi Ka Salan, boiled eggs, and burani raita (garlic yogurt)."
    ],
    "nutrition": {
      "calories": 640,
      "protein": 42,
      "carbs": 58,
      "fat": 28,
      "fiber": 3
    },
    "tags": [
      "mutton biryani",
      "hyderabadi biryani",
      "goat meat",
      "dum pukht",
      "special",
      "royal"
    ]
  },
  {
    "id": "mirchi-ka-salan",
    "name": "Hyderabadi Mirchi Ka Salan",
    "slug": "mirchi-ka-salan",
    "description": "Tangy, nutty, and mildly spicy Hyderabadi curry made with roasted bhavnagri banana chillies simmered in a sesame, peanut, and coconut gravy with tamarind.",
    "region": "Hyderabadi",
    "cuisine": "Hyderabadi",
    "category": "Side Dish",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Medium",
    "prepTime": 15,
    "cookTime": 25,
    "totalTime": 40,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.8,
    "ratingCount": 780,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Roasted Nut Paste (Salan Masala)",
        "items": [
          {
            "name": "peanuts",
            "amount": 3,
            "unit": "tbsp",
            "notes": "roasted and skinned"
          },
          {
            "name": "white sesame seeds (til)",
            "amount": 2,
            "unit": "tbsp",
            "notes": "lightly toasted"
          },
          {
            "name": "dry desiccated coconut (khopra)",
            "amount": 2,
            "unit": "tbsp",
            "notes": "toasted golden"
          },
          {
            "name": "coriander seeds",
            "amount": 1,
            "unit": "tbsp",
            "notes": "roasted"
          },
          {
            "name": "cumin seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "roasted"
          },
          {
            "name": "onions",
            "amount": 1,
            "unit": "large",
            "notes": "sliced and fried golden brown"
          }
        ]
      },
      {
        "name": "For the Chillies and Gravy",
        "items": [
          {
            "name": "mild long green chillies (bhavnagri / banana chillies)",
            "amount": 8,
            "unit": "whole",
            "notes": "slit lengthwise, seeds removed"
          },
          {
            "name": "cooking oil",
            "amount": 3,
            "unit": "tbsp",
            "notes": "for frying chillies and masala"
          },
          {
            "name": "mustard seeds & kalonji",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "each"
          },
          {
            "name": "curry leaves",
            "amount": 12,
            "unit": "leaves",
            "notes": "fresh"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "tamarind pulp",
            "amount": 3,
            "unit": "tbsp",
            "notes": "extracted in warm water"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1,
            "unit": "tsp",
            "notes": "color"
          },
          {
            "name": "jaggery",
            "amount": 1,
            "unit": "tsp",
            "notes": "balances tamarind tang"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Roast & Grind Salan Masala",
        "instruction": "Dry roast peanuts, sesame seeds, dry coconut, coriander seeds, and cumin seeds separately until fragrant. Blend together with fried brown onions and water into a smooth, thick nutty paste.",
        "timeMinutes": 8,
        "cue": "A thick, fragrant hazel-colored paste with rich sesame-peanut aroma"
      },
      {
        "step": 2,
        "title": "Blister the Long Chillies",
        "instruction": "Slit green banana chillies lengthwise and deseed. Heat 2 tbsp oil in a pan. Shallow fry chillies on medium flame for 3-4 minutes until white blisters appear on their skin. Remove and drain.",
        "timeMinutes": 4,
        "cue": "Chillies turn tender-crisp with blistered white speckles"
      },
      {
        "step": 3,
        "title": "Temper & Cook Salan Masala",
        "instruction": "In the same oil, crackle mustard seeds, kalonji, and curry leaves. Add ginger-garlic paste and saut\u00e9 for 1 minute. Pour in the ground peanut-sesame paste, turmeric, Kashmiri chilli, and salt. Cook on medium-low flame for 8-10 minutes until oil separates from the sides.",
        "timeMinutes": 10,
        "cue": "Masala darkens and fragrant oil beads coat the surface"
      },
      {
        "step": 4,
        "title": "Simmer with Tamarind & Chillies",
        "instruction": "Stir in tamarind pulp, jaggery, and 1.5 cups water to create a creamy gravy. Slide the blistered green chillies into the gravy. Simmer on low heat covered for 10 minutes.",
        "timeMinutes": 10,
        "cue": "A thick, nutty, savory-tangy sauce clinging to tender chillies"
      },
      {
        "step": 5,
        "title": "Finish & Rest",
        "instruction": "Turn off flame and let rest for 5 minutes before serving alongside biryani.",
        "timeMinutes": 5,
        "cue": "Glossy rogan floats on top of the golden-brown salan"
      }
    ],
    "tips": [
      "Use large mild chillies (bhavnagri or banana peppers) and deseed them so the dish is full of flavor rather than burning heat.",
      "Roasting sesame and peanuts slowly brings out natural oils that thicken the salan."
    ],
    "substitutions": [
      "Can replace chillies with small eggplants (baingan) for Bagara Baingan."
    ],
    "servingSuggestions": [
      "The traditional companion to Hyderabadi Chicken or Mutton Biryani."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 6,
      "carbs": 16,
      "fat": 18,
      "fiber": 4
    },
    "tags": [
      "mirchi ka salan",
      "hyderabadi",
      "biryani accompaniment",
      "peanut curry",
      "tamarind",
      "spicy"
    ]
  },
  {
    "id": "pav-bhaji",
    "name": "Mumbai Street-Style Pav Bhaji",
    "slug": "pav-bhaji",
    "description": "Mumbai's legendary street food: a buttery, spiced vegetable mash cooked on a huge flat iron tawa with tomatoes, potatoes, peas, and pav bhaji masala, served with warm butter-toasted pav rolls.",
    "region": "Maharashtrian",
    "cuisine": "Maharashtrian / Mumbai Street Food",
    "category": "Street Food",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 20,
    "cookTime": 25,
    "totalTime": 45,
    "servings": 4,
    "spiceLevel": "Spicy",
    "rating": 4.9,
    "ratingCount": 2340,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Boiling & Mashing Vegetables",
        "items": [
          {
            "name": "potatoes",
            "amount": 350,
            "unit": "g",
            "notes": "peeled, boiled, and mashed"
          },
          {
            "name": "cauliflower",
            "amount": 150,
            "unit": "g",
            "notes": "boiled soft"
          },
          {
            "name": "green peas",
            "amount": 100,
            "unit": "g",
            "notes": "boiled soft"
          },
          {
            "name": "beetroot",
            "amount": 0.5,
            "unit": "small",
            "notes": "boiled and pureed for natural vibrant ruby color"
          }
        ]
      },
      {
        "name": "For the Bhaji Masala",
        "items": [
          {
            "name": "salted butter (Amul butter)",
            "amount": 80,
            "unit": "g",
            "notes": "divided generously"
          },
          {
            "name": "cooking oil",
            "amount": 1,
            "unit": "tbsp",
            "notes": "prevents butter burning"
          },
          {
            "name": "onions",
            "amount": 2,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "capsicum (green bell pepper)",
            "amount": 1,
            "unit": "large",
            "notes": "very finely minced"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 2,
            "unit": "tbsp",
            "notes": "freshly pounded"
          },
          {
            "name": "ripe tomatoes",
            "amount": 4,
            "unit": "large",
            "notes": "finely chopped"
          },
          {
            "name": "pav bhaji masala",
            "amount": 2,
            "unit": "tbsp",
            "notes": "authentic street blend"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "for deep red color"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "lemon juice",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "fresh coriander",
            "amount": 4,
            "unit": "tbsp",
            "notes": "chopped"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For Toasty Pav Rolls",
        "items": [
          {
            "name": "ladi pav rolls",
            "amount": 8,
            "unit": "buns",
            "notes": "soft fresh bakery pav"
          },
          {
            "name": "butter",
            "amount": 40,
            "unit": "g",
            "notes": "for toasting"
          },
          {
            "name": "pav bhaji masala & coriander",
            "amount": 1,
            "unit": "tsp",
            "notes": "sprinkled on tawa while toasting"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Boil & Mash Vegetables with Beetroot",
        "instruction": "Pressure cook potatoes, cauliflower, green peas, and beetroot with 1 cup water until completely soft. Mash thoroughly with a potato masher until smooth with no large chunks.",
        "timeMinutes": 15,
        "cue": "A vibrant red, silky vegetable puree"
      },
      {
        "step": 2,
        "title": "Saut\u00e9 Aromatics & Capsicum",
        "instruction": "Melt 40g butter with 1 tbsp oil on a wide tawa or flat skillet. Add finely chopped onions and cook for 4-5 minutes until soft. Add finely minced green bell pepper and ginger-garlic paste. Saut\u00e9 for 3 minutes.",
        "timeMinutes": 7,
        "cue": "Crunchy bell peppers blend into the rich melting butter"
      },
      {
        "step": 3,
        "title": "Cook Tomatoes & Pav Bhaji Masala",
        "instruction": "Add chopped tomatoes, pav bhaji masala, Kashmiri chilli powder, and salt. Cook on medium heat for 6-8 minutes, mashing tomatoes continuously with the back of the masher until soft and butter starts oozing from edges.",
        "timeMinutes": 8,
        "cue": "Glossy crimson paste bubbling on the tawa"
      },
      {
        "step": 4,
        "title": "Tawa Mash (The Street Technique)",
        "instruction": "Pour the mashed vegetable puree onto the tawa. Add 1/2 cup warm water. Using a metal potato masher, mash the mixture continuously on the sizzling tawa for 6-8 minutes until glossy and cohesive. Stir in crushed kasuri methi, lemon juice, and chopped coriander.",
        "timeMinutes": 8,
        "cue": "A luscious, buttery, red bhaji that bubbles thick on the tawa"
      },
      {
        "step": 5,
        "title": "Toast Pav with Butter & Masala",
        "instruction": "Slice pav rolls in half. Melt 2 tbsp butter on the tawa, sprinkle a pinch of pav bhaji masala and coriander leaves. Press pav buns cut-side down onto the sizzling butter, toast until crisp and golden.",
        "timeMinutes": 3,
        "cue": "Golden toasted pav buns dripping with aromatic spiced butter"
      }
    ],
    "tips": [
      "Adding a tiny piece of boiled beetroot gives the iconic vibrant crimson street color naturally without artificial food dyes.",
      "Continuous vigorous mashing on a wide flat tawa is what creates the signature velvety street texture."
    ],
    "substitutions": [
      "Can use burger buns or dinner rolls if Mumbai ladi pav is unavailable."
    ],
    "servingSuggestions": [
      "Top the bhaji with a melting square of butter, finely diced red onions, chopped coriander, and a fat lemon wedge alongside toasty pav."
    ],
    "nutrition": {
      "calories": 480,
      "protein": 10,
      "carbs": 64,
      "fat": 22,
      "fiber": 7
    },
    "tags": [
      "pav bhaji",
      "mumbai street food",
      "street food",
      "comfort food",
      "vegetarian",
      "popular"
    ]
  },
  {
    "id": "vada-pav",
    "name": "Mumbai Vada Pav",
    "slug": "vada-pav",
    "description": "Mumbai's beloved street burger: golden, crispy, spiced potato batata vada tucked inside a soft pav, layered with fiery dry garlic chutney and zesty green coriander chutney.",
    "region": "Maharashtrian",
    "cuisine": "Maharashtrian / Street Food",
    "category": "Street Food",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 20,
    "cookTime": 20,
    "totalTime": 40,
    "servings": 4,
    "spiceLevel": "Spicy",
    "rating": 4.9,
    "ratingCount": 2150,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Batata Vada Filling",
        "items": [
          {
            "name": "potatoes",
            "amount": 400,
            "unit": "g",
            "notes": "boiled, peeled, and crumbled coarsely"
          },
          {
            "name": "mustard seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "black"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "pinch"
          },
          {
            "name": "curry leaves",
            "amount": 12,
            "unit": "leaves",
            "notes": "finely chopped"
          },
          {
            "name": "green chillies",
            "amount": 3,
            "unit": "whole",
            "notes": "crushed with garlic and ginger into thecha paste"
          },
          {
            "name": "garlic",
            "amount": 6,
            "unit": "cloves",
            "notes": "crushed"
          },
          {
            "name": "ginger",
            "amount": 1,
            "unit": "inch",
            "notes": "crushed"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "bright yellow"
          },
          {
            "name": "fresh coriander",
            "amount": 3,
            "unit": "tbsp",
            "notes": "finely chopped"
          },
          {
            "name": "lemon juice",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For the Crispy Besan Batter",
        "items": [
          {
            "name": "gram flour (besan)",
            "amount": 150,
            "unit": "g",
            "notes": "sifted"
          },
          {
            "name": "rice flour",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "for extra crispness"
          },
          {
            "name": "turmeric powder & chilli powder",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "each"
          },
          {
            "name": "baking soda",
            "amount": 1,
            "unit": "pinch",
            "notes": "for light puff"
          },
          {
            "name": "hot oil (mohun)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "whisked into batter"
          },
          {
            "name": "water",
            "amount": 120,
            "unit": "ml",
            "notes": "for smooth coating consistency"
          }
        ]
      },
      {
        "name": "For Assembly & Fiery Chutneys",
        "items": [
          {
            "name": "fresh ladi pav",
            "amount": 6,
            "unit": "buns",
            "notes": "slit in half"
          },
          {
            "name": "dry garlic coconut chutney (lasun chutney)",
            "amount": 4,
            "unit": "tbsp",
            "notes": "the signature red chutney"
          },
          {
            "name": "spicy green chutney & sweet tamarind chutney",
            "amount": 4,
            "unit": "tbsp",
            "notes": "each"
          },
          {
            "name": "salted fried green chillies",
            "amount": 6,
            "unit": "whole",
            "notes": "for authentic garnish"
          },
          {
            "name": "oil",
            "amount": 500,
            "unit": "ml",
            "notes": "for deep frying"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Cook the Aromatic Potato Masala",
        "instruction": "Heat 1 tbsp oil. Splutter mustard seeds, hing, and curry leaves. Add crushed ginger-garlic-chilli paste (thecha). Saut\u00e9 for 1 minute until fragrant. Add turmeric and salt, then fold in crumbled potatoes, lemon juice, and coriander. Mix well, cook 2 minutes, and cool.",
        "timeMinutes": 7,
        "cue": "Bright yellow, fragrant potato mixture with distinct mustard specks"
      },
      {
        "step": 2,
        "title": "Shape Potato Balls",
        "instruction": "Divide cooled potato mixture into 6 equal round balls (about the size of a golf ball).",
        "timeMinutes": 3,
        "cue": "Smooth, round balls ready for batter dipping"
      },
      {
        "step": 3,
        "title": "Whisk Silky Besan Batter",
        "instruction": "Whisk besan, rice flour, turmeric, chilli, pinch of baking soda, salt, 1 tbsp hot oil, and water into a smooth batter that coats the back of a spoon cleanly.",
        "timeMinutes": 4,
        "cue": "Lump-free, smooth ribbon-consistency batter"
      },
      {
        "step": 4,
        "title": "Dip & Deep Fry Batata Vada",
        "instruction": "Heat oil in a kadai over medium flame. Dip each potato ball into batter to coat completely. Drop gently into hot oil. Fry in batches for 4-5 minutes, turning occasionally until golden and crispy.",
        "timeMinutes": 6,
        "cue": "Evenly golden, puffed, crisp batter shell"
      },
      {
        "step": 5,
        "title": "Assemble the Iconic Vada Pav",
        "instruction": "Slit a pav bun. Smear green chutney on one side, tamarind chutney on the other, and dust generously with fiery dry red garlic chutney. Place a hot batata vada inside and press down gently. Serve with a salted fried green chilli.",
        "timeMinutes": 2,
        "cue": "Pungent garlic chutney, pillowy soft pav, and hot crunchy vada"
      }
    ],
    "tips": [
      "Pounding fresh garlic, ginger, and green chillies into a coarse paste (thecha) is the real flavor secret of Mumbai vendors.",
      "Adding 1 tbsp of hot smoking oil to the besan batter creates a crispier coating that absorbs less oil."
    ],
    "substitutions": [
      "Can use dinner rolls or slider buns if ladi pav is unavailable."
    ],
    "servingSuggestions": [
      "Serve hot with a steaming cup of cutting masala chai."
    ],
    "nutrition": {
      "calories": 310,
      "protein": 7,
      "carbs": 46,
      "fat": 11,
      "fiber": 4
    },
    "tags": [
      "vada pav",
      "batata vada",
      "mumbai street food",
      "snack",
      "street food",
      "vegetarian",
      "vegan",
      "spicy"
    ]
  },
  {
    "id": "poha",
    "name": "Maharashtrian Kanda Poha",
    "slug": "poha",
    "description": "Light, fluffy flattened rice seasoned with mustard seeds, turmeric, crunchy roasted peanuts, green chillies, curry leaves, and sweet softened onions.",
    "region": "Maharashtrian",
    "cuisine": "Maharashtrian",
    "category": "Breakfast",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 10,
    "cookTime": 10,
    "totalTime": 20,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.8,
    "ratingCount": 1140,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Rinsing Poha",
        "items": [
          {
            "name": "thick flattened rice (jada poha)",
            "amount": 250,
            "unit": "g",
            "notes": "thick variety, rinsed gently in colander and drained"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "tossed with rinsed poha for even sunny color"
          },
          {
            "name": "sugar",
            "amount": 1,
            "unit": "tsp",
            "notes": "tossed with poha"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For the Tempering & Veggies",
        "items": [
          {
            "name": "peanut oil or cooking oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "peanut oil adds authentic aroma"
          },
          {
            "name": "raw peanuts",
            "amount": 3,
            "unit": "tbsp",
            "notes": "fried crisp"
          },
          {
            "name": "mustard seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "black"
          },
          {
            "name": "cumin seeds",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "whole"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "pinch"
          },
          {
            "name": "curry leaves",
            "amount": 12,
            "unit": "leaves",
            "notes": "fresh"
          },
          {
            "name": "green chillies",
            "amount": 3,
            "unit": "whole",
            "notes": "finely chopped"
          },
          {
            "name": "onions (kanda)",
            "amount": 2,
            "unit": "medium",
            "notes": "finely chopped"
          },
          {
            "name": "potatoes (batata)",
            "amount": 1,
            "unit": "medium",
            "notes": "peeled and finely diced"
          },
          {
            "name": "fresh lemon juice",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "fresh grated coconut & coriander",
            "amount": 3,
            "unit": "tbsp",
            "notes": "for topping"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Rinse & Season Poha",
        "instruction": "Place thick poha in a colander and rinse gently under running water for 30 seconds. Drain completely. Sprinkle turmeric, sugar, and salt over the damp poha; toss gently with fingers so every flake is coated.",
        "timeMinutes": 4,
        "cue": "Poha softens into fluffy individual flakes without turning into paste"
      },
      {
        "step": 2,
        "title": "Fry Peanuts Crisp",
        "instruction": "Heat 2 tbsp oil in a wide kadai. Add raw peanuts and fry on low flame until crunchy and golden brown. Drain half the peanuts for topping.",
        "timeMinutes": 3,
        "cue": "Peanuts crackle and turn aromatic amber"
      },
      {
        "step": 3,
        "title": "Saut\u00e9 Aromatics & Potatoes",
        "instruction": "In the same oil, crackle mustard seeds, cumin, hing, and curry leaves. Add diced potatoes. Cover and cook for 4-5 minutes until potatoes are tender. Add chopped onions and green chillies; cook for 3 minutes until onions turn soft and translucent.",
        "timeMinutes": 7,
        "cue": "Sweet softened onions and crisp-tender potato cubes"
      },
      {
        "step": 4,
        "title": "Steam-Heat Poha",
        "instruction": "Tip the seasoned, fluffy poha into the pan. Toss gently from the bottom with a flat spatula to distribute onions and spices. Sprinkle 1 tbsp water, cover tightly with a lid, and steam on lowest flame for 2-3 minutes.",
        "timeMinutes": 3,
        "cue": "Poha warms through thoroughly, becoming light and cloud-soft"
      },
      {
        "step": 5,
        "title": "Garnish & Serve",
        "instruction": "Remove lid, drizzle fresh lemon juice, reserved crunchy peanuts, fresh grated coconut, and chopped coriander leaves. Serve hot.",
        "timeMinutes": 1,
        "cue": "Vibrant sunny yellow breakfast crowned with green herbs and white coconut"
      }
    ],
    "tips": [
      "Use thick poha (jada poha), never thin poha; thin poha disintegrates into mush when rinsed.",
      "Tossing salt, sugar, and turmeric with the damp poha before cooking ensures uniform color without vigorous stirring."
    ],
    "substitutions": [
      "Omit potatoes for classic Kanda Poha, or add boiled green peas for Matar Poha."
    ],
    "servingSuggestions": [
      "Serve hot with a wedge of lemon, crisp sev, and hot masala chai."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 6,
      "carbs": 42,
      "fat": 9,
      "fiber": 3
    },
    "tags": [
      "poha",
      "kanda poha",
      "maharashtrian",
      "breakfast",
      "quick",
      "vegan",
      "gluten-free",
      "healthy"
    ]
  },
  {
    "id": "misal-pav",
    "name": "Kolhapuri Misal Pav",
    "slug": "misal-pav",
    "description": "Fiery Maharashtrian curry made with sprouted moth beans (matki) in a dark, aromatic spicy coconut gravy (kat/rassa), topped with crunchy farsan, raw onions, and served with pav.",
    "region": "Maharashtrian",
    "cuisine": "Maharashtrian / Kolhapuri",
    "category": "Street Food",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Medium",
    "prepTime": 25,
    "cookTime": 30,
    "totalTime": 55,
    "servings": 4,
    "spiceLevel": "Spicy",
    "rating": 4.9,
    "ratingCount": 1380,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For Sprouted Matki (Moth Beans)",
        "items": [
          {
            "name": "sprouted moth beans (matki)",
            "amount": 250,
            "unit": "g",
            "notes": "rinsed and boiled with turmeric and salt until tender"
          },
          {
            "name": "potatoes",
            "amount": 1,
            "unit": "medium",
            "notes": "boiled and diced"
          }
        ]
      },
      {
        "name": "For the Roasted Coconut-Onion Paste (Vatan)",
        "items": [
          {
            "name": "dry coconut (sukha khopra)",
            "amount": 40,
            "unit": "g",
            "notes": "thinly sliced and roasted dark brown"
          },
          {
            "name": "onions",
            "amount": 2,
            "unit": "medium",
            "notes": "sliced and roasted in oil until deep golden brown"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "coriander seeds",
            "amount": 1,
            "unit": "tbsp",
            "notes": "roasted"
          }
        ]
      },
      {
        "name": "For the Fiery Kat (Rassa)",
        "items": [
          {
            "name": "oil",
            "amount": 3,
            "unit": "tbsp",
            "notes": "generous amount is needed for authentic fiery red rogan (tarri)"
          },
          {
            "name": "mustard seeds & cumin",
            "amount": 1,
            "unit": "tsp",
            "notes": "each"
          },
          {
            "name": "curry leaves",
            "amount": 12,
            "unit": "leaves",
            "notes": "fresh"
          },
          {
            "name": "Kolhapuri kanda lasun masala or goda masala",
            "amount": 2,
            "unit": "tbsp",
            "notes": "traditional spiced blend"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "for brilliant red oil layer"
          },
          {
            "name": "warm water",
            "amount": 3,
            "unit": "cups",
            "notes": "for thin fiery broth (kat)"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For Plating & Assembly",
        "items": [
          {
            "name": "crunchy farsan / chivda",
            "amount": 1.5,
            "unit": "cups",
            "notes": "spicy mixed farsan"
          },
          {
            "name": "finely chopped red onion",
            "amount": 1,
            "unit": "large",
            "notes": "fresh"
          },
          {
            "name": "fresh coriander",
            "amount": 3,
            "unit": "tbsp",
            "notes": "chopped"
          },
          {
            "name": "lemon wedges",
            "amount": 4,
            "unit": "pieces",
            "notes": "juicy"
          },
          {
            "name": "soft pav buns",
            "amount": 8,
            "unit": "buns",
            "notes": "warmed with butter"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Roast Vatan Paste",
        "instruction": "In a pan, roast sliced dry coconut and coriander seeds until deeply browned. Remove. In the same pan, fry sliced onions in 1 tsp oil until dark brown. Cool and blend together with ginger-garlic paste and water into a smooth, dark brown paste (vatan).",
        "timeMinutes": 10,
        "cue": "Deep mahogany paste with smoky toasted coconut aroma"
      },
      {
        "step": 2,
        "title": "Boil Sprouted Matki",
        "instruction": "Boil sprouted moth beans and diced potato with 1/2 tsp turmeric and salt in 2 cups water for 8 minutes until tender but not mushy.",
        "timeMinutes": 8,
        "cue": "Sprouted beans retain their delicate tender shape"
      },
      {
        "step": 3,
        "title": "Bhunao Vatan for Tarri (Rogan)",
        "instruction": "Heat 3 tbsp oil in a deep pot. Crackle mustard seeds, cumin, and curry leaves. Add the ground vatan paste, kanda lasun masala, and Kashmiri chilli powder. Saut\u00e9 on medium-low heat for 6-8 minutes until oil separates generously.",
        "timeMinutes": 8,
        "cue": "A gorgeous crimson-red oil (tarri) separates on top of the dark masala"
      },
      {
        "step": 4,
        "title": "Simmer the Fiery Kat (Broth)",
        "instruction": "Add the boiled matki, potatoes, their cooking water, and an additional 1.5 cups warm water. Simmer on low flame for 12-15 minutes. The spicy red oil will float dramatically to the surface.",
        "timeMinutes": 15,
        "cue": "Thin, fiery, fragrant red broth with oil floating on top"
      },
      {
        "step": 5,
        "title": "The Layered Plating",
        "instruction": "In a deep bowl, ladle 2 spoons of cooked matki. Top generously with crunchy farsan, diced raw onion, and fresh coriander. Pour a ladle of the spicy red kat (tarri) over the farsan. Serve with warm pav and lemon wedges.",
        "timeMinutes": 3,
        "cue": "Fiery, crunchy, soupy, and utterly addictive street sensation"
      }
    ],
    "tips": [
      "Roasting the dry coconut and onions until deeply browned is what gives Kolhapuri kat its dark mahogany complexity.",
      "Never mix the farsan into the pot; assemble right before eating to preserve maximum crunch."
    ],
    "substitutions": [
      "Can use sprouted green moong beans if moth beans (matki) are not available."
    ],
    "servingSuggestions": [
      "Serve hot with buttered pav, extra bowls of red tarri (kat), chopped onions, and lemon."
    ],
    "nutrition": {
      "calories": 420,
      "protein": 14,
      "carbs": 56,
      "fat": 17,
      "fiber": 9
    },
    "tags": [
      "misal pav",
      "kolhapuri",
      "maharashtrian",
      "spicy",
      "street food",
      "sprouted beans",
      "vegan"
    ]
  },
  {
    "id": "dhokla",
    "name": "Khaman Dhokla",
    "slug": "dhokla",
    "description": "Soft, spongy, golden steamed chickpea flour cakes soaked in a sweet, tangy, and mildly spiced tempering of mustard seeds, green chillies, curry leaves, and asafoetida.",
    "region": "Gujarati",
    "cuisine": "Gujarati",
    "category": "Snack",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Easy",
    "prepTime": 10,
    "cookTime": 20,
    "totalTime": 30,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.9,
    "ratingCount": 1610,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Spongy Batter",
        "items": [
          {
            "name": "besan (fine gram flour)",
            "amount": 200,
            "unit": "g",
            "notes": "sifted twice for fluffiness"
          },
          {
            "name": "semolina (rava)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "adds subtle structure"
          },
          {
            "name": "ginger-green chilli paste",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fine"
          },
          {
            "name": "citric acid (nimbu ka phool) or lemon juice",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "gives airy lift"
          },
          {
            "name": "sugar",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "essential for Gujarati sweet-tart profile"
          },
          {
            "name": "turmeric powder",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "only a tiny pinch (excess turmeric turns red with soda)"
          },
          {
            "name": "cooking oil",
            "amount": 1,
            "unit": "tbsp",
            "notes": "keeps dhokla moist and prevents dry throat"
          },
          {
            "name": "water",
            "amount": 200,
            "unit": "ml",
            "notes": "for smooth flowing batter"
          },
          {
            "name": "eno fruit salt (or baking soda)",
            "amount": 1,
            "unit": "tsp",
            "notes": "active leavener, added right before steaming"
          },
          {
            "name": "salt",
            "amount": 0.75,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For the Sweet-Tangy Tempering Water",
        "items": [
          {
            "name": "oil",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "for tempering"
          },
          {
            "name": "mustard seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "black"
          },
          {
            "name": "white sesame seeds (til)",
            "amount": 1,
            "unit": "tsp",
            "notes": "toasted"
          },
          {
            "name": "green chillies",
            "amount": 4,
            "unit": "whole",
            "notes": "slit lengthwise"
          },
          {
            "name": "curry leaves",
            "amount": 12,
            "unit": "leaves",
            "notes": "fresh"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "pinch"
          },
          {
            "name": "water",
            "amount": 0.75,
            "unit": "cup",
            "notes": "to create juicy soaking syrup"
          },
          {
            "name": "sugar",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "dissolved in water"
          },
          {
            "name": "lemon juice",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "fresh grated coconut & coriander",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for garnish"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Whisk Smooth Besan Batter",
        "instruction": "In a bowl, whisk sifted besan, semolina, sugar, salt, a tiny pinch of turmeric, citric acid, ginger-chilli paste, 1 tbsp oil, and 200ml water for 3 minutes until smooth and lump-free. Rest batter for 10 minutes.",
        "timeMinutes": 10,
        "cue": "A smooth, pale yellow, glossy flowing batter"
      },
      {
        "step": 2,
        "title": "Activate with Eno Fruit Salt",
        "instruction": "Preheat steamer with water boiling. Grease a round cake pan with oil. Sprinkle 1 tsp Eno fruit salt over the batter, add 1 tsp water to activate, and whisk vigorously in ONE direction for 30 seconds. The batter will instantly froth and double in volume.",
        "timeMinutes": 2,
        "cue": "Batter transforms into an airy, cloud-like mousse"
      },
      {
        "step": 3,
        "title": "Steam on High Heat",
        "instruction": "Immediately pour the frothed batter into the greased pan. Place in the steamer and steam on high flame for exactly 15 minutes. Test with a toothpick\u2014it must emerge clean.",
        "timeMinutes": 15,
        "cue": "Risen evenly with a spongy honeycomb spring when pressed"
      },
      {
        "step": 4,
        "title": "Cook Sweet-Tangy Tempering Water",
        "instruction": "Heat oil in a pan. Splutter mustard seeds, sesame seeds, hing, curry leaves, and slit green chillies. Pour in 3/4 cup water, sugar, and lemon juice. Bring to a boil until sugar dissolves completely.",
        "timeMinutes": 4,
        "cue": "Warm sweet, sour, and mildly pungent spiced liquid"
      },
      {
        "step": 5,
        "title": "Soak, Cut & Garnish",
        "instruction": "Cool dhokla for 5 minutes, then slice into neat squares. Slowly ladle the warm tempering water all over the sliced dhokla so every sponge square absorbs the juicy syrup. Garnish with fresh coconut and coriander.",
        "timeMinutes": 4,
        "cue": "Melt-in-mouth juicy, springy golden cubes"
      }
    ],
    "tips": [
      "Use only a tiny pinch of turmeric; baking soda reacts with excess turmeric to produce unsightly red specks.",
      "Adding 1 tbsp of oil into the batter and pouring the tempering water over the sliced cake ensures the dhokla is juicy and never dry in the throat."
    ],
    "substitutions": [
      "Can replace citric acid with 1.5 tbsp fresh lemon juice in the batter."
    ],
    "servingSuggestions": [
      "Serve at room temperature with spicy green mint-coriander chutney and sweet papaya sambharo."
    ],
    "nutrition": {
      "calories": 180,
      "protein": 7,
      "carbs": 26,
      "fat": 6,
      "fiber": 3
    },
    "tags": [
      "dhokla",
      "khaman dhokla",
      "gujarati",
      "steamed",
      "healthy",
      "vegan",
      "snack",
      "gluten-free"
    ]
  },
  {
    "id": "khandvi",
    "name": "Gujarati Khandvi",
    "slug": "khandvi",
    "description": "Silky, delicate, melt-in-mouth rolls made of cooked chickpea flour and sour buttermilk, tempered with mustard seeds, sesame, curry leaves, and fresh grated coconut.",
    "region": "Gujarati",
    "cuisine": "Gujarati",
    "category": "Snack",
    "diet": [
      "Vegetarian",
      "Vegan"
    ],
    "difficulty": "Hard",
    "prepTime": 15,
    "cookTime": 15,
    "totalTime": 30,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.8,
    "ratingCount": 680,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Khandvi Batter",
        "items": [
          {
            "name": "besan (gram flour)",
            "amount": 100,
            "unit": "g",
            "notes": "sifted"
          },
          {
            "name": "sour curd (yogurt)",
            "amount": 100,
            "unit": "g",
            "notes": "whisked with 1 cup water into thin buttermilk (chaas)"
          },
          {
            "name": "ginger-green chilli paste",
            "amount": 1,
            "unit": "tsp",
            "notes": "strained so batter is lump-free"
          },
          {
            "name": "turmeric powder",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "pale golden hue"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 1,
            "unit": "pinch",
            "notes": "fine"
          },
          {
            "name": "salt",
            "amount": 0.75,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For the Tempering & Filling",
        "items": [
          {
            "name": "oil",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "for tadka"
          },
          {
            "name": "mustard seeds",
            "amount": 1,
            "unit": "tsp",
            "notes": "black"
          },
          {
            "name": "white sesame seeds (til)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "nutty"
          },
          {
            "name": "green chillies",
            "amount": 2,
            "unit": "whole",
            "notes": "finely chopped"
          },
          {
            "name": "curry leaves",
            "amount": 10,
            "unit": "leaves",
            "notes": "finely chopped"
          },
          {
            "name": "fresh grated coconut",
            "amount": 3,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "fresh coriander",
            "amount": 2,
            "unit": "tbsp",
            "notes": "chopped"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Whisk Lump-Free Batter",
        "instruction": "In a heavy-bottomed non-stick pan, whisk besan, sour buttermilk, strained ginger-chilli paste, turmeric, hing, and salt until completely smooth without a single lump.",
        "timeMinutes": 4,
        "cue": "Uniform pale-yellow watery mixture"
      },
      {
        "step": 2,
        "title": "Cook & Thicken on Low Heat",
        "instruction": "Place pan on medium-low flame. Stir continuously with a wooden spatula for 8-10 minutes. The mixture will rapidly thicken and become glossy. Test doneness by spreading a spoonful on the back of a stainless steel plate; wait 1 minute. If it peels off smoothly into a roll, it is done.",
        "timeMinutes": 10,
        "cue": "Thick, glossy paste that leaves the sides of the pan"
      },
      {
        "step": 3,
        "title": "Spread Thin on Greased Plates (Swiftly)",
        "instruction": "Working very quickly while the paste is screaming hot, spread thin, translucent layers on the reverse side of greased large stainless steel thalis (plates) or a clean granite countertop using a flat spatula.",
        "timeMinutes": 5,
        "cue": "Paper-thin, glossy yellow sheets"
      },
      {
        "step": 4,
        "title": "Cool, Cut & Roll",
        "instruction": "Let cool for 5 minutes. Sprinkle with grated coconut and chopped coriander. Cut into 2-inch wide strips with a knife. Gently roll each strip tightly from bottom to top into neat cylinder spirals.",
        "timeMinutes": 6,
        "cue": "Neat, tight yellow rolls resembling mini Swiss rolls"
      },
      {
        "step": 5,
        "title": "Sizzle Tempering & Garnish",
        "instruction": "Arrange khandvi rolls on a platter. Heat oil in a tadka pan, crackle mustard seeds, sesame seeds, green chillies, and curry leaves. Pour sizzling tempering over the rolls and sprinkle with more fresh coconut.",
        "timeMinutes": 3,
        "cue": "Silky, delicate rolls with crunchy toasted sesame and coconut"
      }
    ],
    "tips": [
      "You must spread the cooked paste immediately onto plates while it is piping hot; once it cools even slightly, it will set in the pan and tear.",
      "Testing a small smear on a plate is foolproof\u2014if it rolls without sticking, your paste is perfectly cooked."
    ],
    "substitutions": [
      "Use lemon juice mixed with water if sour curd is unavailable."
    ],
    "servingSuggestions": [
      "Serve at room temperature with sweet tamarind date chutney and spicy coriander chutney."
    ],
    "nutrition": {
      "calories": 160,
      "protein": 5,
      "carbs": 18,
      "fat": 8,
      "fiber": 2
    },
    "tags": [
      "khandvi",
      "gujarati",
      "delicate",
      "healthy",
      "steamed",
      "snack",
      "gluten-free",
      "starter"
    ]
  },
  {
    "id": "thepla",
    "name": "Gujarati Methi Thepla",
    "slug": "thepla",
    "description": "Thin, spiced, soft whole wheat flatbreads kneaded with fresh fenugreek leaves, yogurt, sesame seeds, and turmeric. The ultimate travel food with remarkable shelf life.",
    "region": "Gujarati",
    "cuisine": "Gujarati",
    "category": "Bread",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 15,
    "totalTime": 30,
    "servings": 4,
    "spiceLevel": "Mild",
    "rating": 4.9,
    "ratingCount": 1240,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Thepla Dough",
        "items": [
          {
            "name": "whole wheat flour (gehun ka atta)",
            "amount": 250,
            "unit": "g",
            "notes": "fine"
          },
          {
            "name": "besan (gram flour)",
            "amount": 2,
            "unit": "tbsp",
            "notes": "adds softness and nutty taste"
          },
          {
            "name": "fresh fenugreek leaves (methi)",
            "amount": 100,
            "unit": "g",
            "notes": "washed, drained thoroughly, and very finely chopped"
          },
          {
            "name": "fresh curd (yogurt)",
            "amount": 3,
            "unit": "tbsp",
            "notes": "makes dough soft for days"
          },
          {
            "name": "white sesame seeds (til)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "subtle crunch"
          },
          {
            "name": "carom seeds (ajwain)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "ginger-green chilli paste",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fine"
          },
          {
            "name": "turmeric powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "golden"
          },
          {
            "name": "coriander-cumin powder (dhana jeera)",
            "amount": 1,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "mild warmth"
          },
          {
            "name": "cooking oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "kneaded into dough plus extra for roasting"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Knead Spiced Methi Dough",
        "instruction": "In a wide bowl, combine wheat flour, besan, chopped methi leaves, sesame seeds, ajwain, ginger-chilli paste, turmeric, dhana jeera, chilli powder, salt, yogurt, and 2 tbsp oil. Knead into a soft, smooth dough using minimal water. Rest for 10 minutes.",
        "timeMinutes": 8,
        "cue": "A soft, pliable green-flecked golden dough"
      },
      {
        "step": 2,
        "title": "Roll into Thin Disks",
        "instruction": "Divide dough into small lemon-sized balls. Dust lightly with dry flour and roll each into a very thin, uniform 7-inch circle.",
        "timeMinutes": 6,
        "cue": "Thin, even disks with embedded methi leaves and sesame seeds"
      },
      {
        "step": 3,
        "title": "Roast on Hot Tawa",
        "instruction": "Heat a tawa on medium-high heat. Place rolled thepla on tawa. Cook for 30 seconds until tiny bubbles appear. Flip over.",
        "timeMinutes": 2,
        "cue": "Gentle bubbles on the surface"
      },
      {
        "step": 4,
        "title": "Press with Oil to Keep Soft",
        "instruction": "Drizzle 1/2 tsp oil around edges and on top. Press gently with a flat spatula, cooking for 30-45 seconds per side until light golden specks appear. Do not overcook or thepla will become brittle.",
        "timeMinutes": 2,
        "cue": "Soft and pliable with light golden brown dots"
      },
      {
        "step": 5,
        "title": "Stack & Store",
        "instruction": "Stack cooked theplas on top of each other immediately so steam keeps them pillowy soft. Serve warm or pack for travel.",
        "timeMinutes": 1,
        "cue": "Aromatic fenugreek and sesame fragrance"
      }
    ],
    "tips": [
      "Chop the methi leaves very finely and dry thoroughly before kneading; wet leaves make the dough sticky.",
      "Cook thepla quickly on medium-high flame with oil; slow roasting dries them out into hard papads."
    ],
    "substitutions": [
      "Use kasuri methi (crushed dry fenugreek) if fresh leaves are out of season (use 3 tbsp soaked in 2 tbsp water)."
    ],
    "servingSuggestions": [
      "Classic pairing with sweet mango pickle (chundo), spiced curd, or a cup of hot masala chai."
    ],
    "nutrition": {
      "calories": 160,
      "protein": 4,
      "carbs": 24,
      "fat": 6,
      "fiber": 3
    },
    "tags": [
      "thepla",
      "methi thepla",
      "gujarati",
      "bread",
      "travel food",
      "healthy",
      "fenugreek"
    ]
  },
  {
    "id": "dal-baati-churma",
    "name": "Rajasthani Dal Baati Churma",
    "slug": "dal-baati-churma",
    "description": "The quintessential royal feast of Rajasthan: rustic baked whole wheat baati dumplings drenched in desi ghee, served with spicy panchmel dal and sweet cardamon churma.",
    "region": "Rajasthani",
    "cuisine": "Rajasthani",
    "category": "Main Course",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Hard",
    "prepTime": 30,
    "cookTime": 45,
    "totalTime": 75,
    "servings": 4,
    "spiceLevel": "Spicy",
    "rating": 5.0,
    "ratingCount": 1780,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Crisp-Baked Baati",
        "items": [
          {
            "name": "coarse whole wheat flour (motta atta)",
            "amount": 300,
            "unit": "g",
            "notes": "or regular atta mixed with 2 tbsp sooji"
          },
          {
            "name": "semolina (sooji)",
            "amount": 50,
            "unit": "g",
            "notes": "adds crunch"
          },
          {
            "name": "carom seeds (ajwain)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "baking powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "helps baati crack open and cook inside"
          },
          {
            "name": "pure desi ghee (moyen)",
            "amount": 4,
            "unit": "tbsp",
            "notes": "melted, rubbed into dough"
          },
          {
            "name": "lukewarm water or milk",
            "amount": 150,
            "unit": "ml",
            "notes": "to knead a stiff dough"
          },
          {
            "name": "extra desi ghee",
            "amount": 100,
            "unit": "g",
            "notes": "for dipping hot baatis"
          }
        ]
      },
      {
        "name": "For the Panchmel Dal (Five Lentil Stew)",
        "items": [
          {
            "name": "mixed dals (toor, moong, chana, urad, masoor)",
            "amount": 200,
            "unit": "g",
            "notes": "equal parts, soaked 30 mins and boiled"
          },
          {
            "name": "desi ghee",
            "amount": 3,
            "unit": "tbsp",
            "notes": "for rich tadka"
          },
          {
            "name": "cloves & cinnamon",
            "amount": 1,
            "unit": "batch",
            "notes": "whole spices"
          },
          {
            "name": "ginger-garlic paste",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "onions & tomatoes",
            "amount": 1,
            "unit": "each",
            "notes": "finely chopped"
          },
          {
            "name": "Kashmiri red chilli powder & coriander powder",
            "amount": 1,
            "unit": "tbsp",
            "notes": "each"
          },
          {
            "name": "garam masala & amchur",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "each"
          }
        ]
      },
      {
        "name": "For the Sweet Cardamom Churma",
        "items": [
          {
            "name": "crushed fresh hot baatis",
            "amount": 2,
            "unit": "whole",
            "notes": "ground coarsely"
          },
          {
            "name": "powdered sugar or boora",
            "amount": 60,
            "unit": "g",
            "notes": "sweetener"
          },
          {
            "name": "desi ghee",
            "amount": 3,
            "unit": "tbsp",
            "notes": "warm"
          },
          {
            "name": "cardamom powder & chopped nuts",
            "amount": 1,
            "unit": "tbsp",
            "notes": "almonds and pistachios"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Knead Stiff Baati Dough",
        "instruction": "Mix coarse wheat flour, sooji, ajwain, baking powder, and salt. Rub 4 tbsp ghee into the flour until crumbly. Knead into a very stiff, tight dough using lukewarm milk/water. Shape into 8 round balls with a thumb indentation in the center.",
        "timeMinutes": 12,
        "cue": "Firm, dense dough balls with a classic central thumb impression"
      },
      {
        "step": 2,
        "title": "Bake Baatis until Cracked",
        "instruction": "Bake in a preheated gas tandoor or oven at 200\u00b0C (400\u00b0F) for 25-30 minutes, turning every 8 minutes until the outer crust develops deep golden brown cracks and feels hollow when tapped.",
        "timeMinutes": 30,
        "cue": "Deep golden crusted dumplings with pronounced rustic surface cracks"
      },
      {
        "step": 3,
        "title": "The Ghee Drench",
        "instruction": "While the baatis are piping hot, press each gently with a clean cloth to crack open further. Submerge completely into a bowl of warm desi ghee for 1-2 minutes until the ghee is absorbed into the porous interior.",
        "timeMinutes": 5,
        "cue": "Sizzling baatis drink up the aromatic golden ghee"
      },
      {
        "step": 4,
        "title": "Cook Panchmel Dal",
        "instruction": "Heat ghee in a pot. Crackle whole spices and cumin. Saut\u00e9 onions, ginger-garlic paste, and tomatoes. Add coriander powder, chilli, amchur, and boiled mixed lentils. Simmer for 10 minutes until thick and aromatic.",
        "timeMinutes": 12,
        "cue": "Hearty, spicy, thick five-lentil dal"
      },
      {
        "step": 5,
        "title": "Prepare Sweet Churma & Plate",
        "instruction": "Crumble 2 warm baatis into a coarse crumble, mix with melted ghee, powdered sugar, cardamom powder, and nuts. Serve hot ghee-drenched baatis alongside spicy panchmel dal, sweet churma, garlic chutney, and sliced onions.",
        "timeMinutes": 5,
        "cue": "The supreme triumvirate of sweet, spicy, and rich royal flavors"
      }
    ],
    "tips": [
      "The dough for baati must be very stiff; a soft dough produces bread-like rolls rather than authentic crumbly baatis.",
      "Submerging cracked baatis directly into warm melted ghee allows the crumb to soak up the richness to its core."
    ],
    "substitutions": [
      "Can bake in an air fryer at 180\u00b0C (360\u00b0F) for 18-20 minutes with outstanding results."
    ],
    "servingSuggestions": [
      "Assemble on a traditional thali with spicy Rajasthani garlic-chilli chutney, raw onions, and chaas (buttermilk)."
    ],
    "nutrition": {
      "calories": 650,
      "protein": 18,
      "carbs": 82,
      "fat": 28,
      "fiber": 9
    },
    "tags": [
      "dal baati churma",
      "rajasthani",
      "royal",
      "feast",
      "comfort food",
      "vegetarian",
      "ghee"
    ]
  },
  {
    "id": "gatte-ki-sabzi",
    "name": "Rajasthani Gatte Ki Sabzi",
    "slug": "gatte-ki-sabzi",
    "description": "Boiled and pan-fried gram flour (besan) dumplings simmered in a spiced, tangy yogurt-based gravy scented with ajwain, kasuri methi, and hing.",
    "region": "Rajasthani",
    "cuisine": "Rajasthani",
    "category": "Main Course",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 20,
    "cookTime": 25,
    "totalTime": 45,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.8,
    "ratingCount": 940,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Soft Besan Gatte (Dumplings)",
        "items": [
          {
            "name": "besan (gram flour)",
            "amount": 200,
            "unit": "g",
            "notes": "sifted"
          },
          {
            "name": "curd (yogurt)",
            "amount": 2,
            "unit": "tbsp",
            "notes": "makes gatte tender"
          },
          {
            "name": "oil or ghee (moyen)",
            "amount": 2,
            "unit": "tbsp",
            "notes": "essential for melt-in-mouth texture"
          },
          {
            "name": "carom seeds (ajwain)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "coriander seeds",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "turmeric & red chilli powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "each"
          },
          {
            "name": "baking soda",
            "amount": 1,
            "unit": "pinch",
            "notes": "ensures soft dumplings"
          },
          {
            "name": "salt",
            "amount": 0.75,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      },
      {
        "name": "For the Tangy Dahi Gravy",
        "items": [
          {
            "name": "fresh whisked curd (yogurt)",
            "amount": 200,
            "unit": "g",
            "notes": "room temperature"
          },
          {
            "name": "ghee or mustard oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "for tempering"
          },
          {
            "name": "cumin seeds & fennel seeds (saunf)",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "each"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "strong"
          },
          {
            "name": "ginger paste",
            "amount": 1,
            "unit": "tbsp",
            "notes": "fresh"
          },
          {
            "name": "coriander powder",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "ground"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 1,
            "unit": "tbsp",
            "notes": "ruby color"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "gatte cooking water",
            "amount": 1.5,
            "unit": "cups",
            "notes": "starchy reserved water for gravy"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Knead Soft Gatte Dough",
        "instruction": "Mix besan, yogurt, 2 tbsp oil, ajwain, crushed coriander seeds, turmeric, chilli, pinch of baking soda, and salt. Knead into a soft, smooth dough using 2-3 tablespoons of water. Roll into 1/2-inch thick cylindrical logs.",
        "timeMinutes": 8,
        "cue": "Smooth, non-sticky logs of spiced gram flour"
      },
      {
        "step": 2,
        "title": "Boil the Logs",
        "instruction": "Bring 4 cups of water to a rolling boil in a pot. Slide the besan logs in. Boil for 10-12 minutes until logs float to the surface and develop tiny bumps on the skin. Drain and reserve the nutrient-rich starchy cooking water. Slice logs into bite-sized coins.",
        "timeMinutes": 12,
        "cue": "Gatte float and show characteristic white bubbles on the skin"
      },
      {
        "step": 3,
        "title": "Prepare Spiced Yogurt Slurry",
        "instruction": "In a bowl, whisk curd with coriander powder, Kashmiri chilli powder, turmeric, and 1 tsp besan (besan prevents curd from splitting when heated).",
        "timeMinutes": 3,
        "cue": "Smooth, spiced yogurt sauce"
      },
      {
        "step": 4,
        "title": "Saut\u00e9 Aromatics & Whisk in Yogurt",
        "instruction": "Heat ghee in a pan. Crackle cumin, fennel seeds, and hing. Add ginger paste. Lower flame to minimum and slowly pour in the spiced yogurt while whisking vigorously without stopping until it reaches a gentle simmer.",
        "timeMinutes": 5,
        "cue": "Continuous stirring prevents yogurt from curdling; ghee separates"
      },
      {
        "step": 5,
        "title": "Simmer Gatte in Gravy",
        "instruction": "Add the sliced gatte coins and 1.5 cups of the reserved gatte boiling water. Simmer on low heat for 8-10 minutes so the dumplings absorb the tangy gravy. Finish with crushed kasuri methi.",
        "timeMinutes": 10,
        "cue": "Rich golden gravy coating tender dumplings"
      }
    ],
    "tips": [
      "Adding a teaspoon of gram flour (besan) directly into the whisked yogurt prevents it from curdling when hitting the hot pan.",
      "Never discard the gatte boiling water; using it to thin the gravy adds natural body and authentic flavor."
    ],
    "substitutions": [
      "You can lightly pan-fry the boiled gatte pieces in 1 tsp ghee for 2 minutes before adding to gravy for extra firmness."
    ],
    "servingSuggestions": [
      "Serve steaming hot with missi roti, plain phulkas, or steamed basmati rice."
    ],
    "nutrition": {
      "calories": 310,
      "protein": 13,
      "carbs": 28,
      "fat": 16,
      "fiber": 5
    },
    "tags": [
      "gatte ki sabzi",
      "rajasthani",
      "curd gravy",
      "gram flour",
      "vegetarian",
      "traditional"
    ]
  },
  {
    "id": "rogan-josh",
    "name": "Kashmiri Mutton Rogan Josh",
    "slug": "rogan-josh",
    "description": "Aristocratic Kashmiri curry of tender bone-in mutton slow-cooked with fennel powder (saunf), dry ginger (sonth), whole spices, and brilliant red Kashmiri maval (cockscomb flower) or Kashmiri mirch.",
    "region": "Kashmiri",
    "cuisine": "Kashmiri / Wazwan",
    "category": "Main Course",
    "diet": [
      "Non-Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 20,
    "cookTime": 60,
    "totalTime": 80,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 5.0,
    "ratingCount": 1680,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Mutton & Whole Spices",
        "items": [
          {
            "name": "tender bone-in goat meat / mutton",
            "amount": 800,
            "unit": "g",
            "notes": "shoulder pieces cut into chunks"
          },
          {
            "name": "mustard oil",
            "amount": 4,
            "unit": "tbsp",
            "notes": "heated to smoking point, then cooled slightly"
          },
          {
            "name": "black cardamom",
            "amount": 2,
            "unit": "whole",
            "notes": "bruised"
          },
          {
            "name": "green cardamom",
            "amount": 5,
            "unit": "whole",
            "notes": "bruised"
          },
          {
            "name": "cloves",
            "amount": 4,
            "unit": "whole",
            "notes": "whole"
          },
          {
            "name": "cinnamon stick",
            "amount": 2,
            "unit": "inch",
            "notes": "whole"
          },
          {
            "name": "bay leaves",
            "amount": 2,
            "unit": "leaves",
            "notes": "whole"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "dissolved in 1 tbsp water"
          }
        ]
      },
      {
        "name": "For the Authentic Kashmiri Spice Blend",
        "items": [
          {
            "name": "Kashmiri red chilli powder",
            "amount": 2,
            "unit": "tbsp",
            "notes": "mixed with 3 tbsp warm water to prevent burning"
          },
          {
            "name": "fennel seed powder (saunf)",
            "amount": 2,
            "unit": "tbsp",
            "notes": "freshly ground, key Kashmiri flavor"
          },
          {
            "name": "dry ginger powder (sonth)",
            "amount": 1,
            "unit": "tbsp",
            "notes": "pungent warmth"
          },
          {
            "name": "whisked curd (yogurt)",
            "amount": 150,
            "unit": "g",
            "notes": "smooth, room temperature"
          },
          {
            "name": "garam masala",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "shahi blend"
          },
          {
            "name": "warm water",
            "amount": 2,
            "unit": "cups",
            "notes": "for simmering"
          },
          {
            "name": "salt",
            "amount": 1.5,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Smoke Mustard Oil & Sear Mutton",
        "instruction": "Heat mustard oil in a heavy pot to smoking point. Cool slightly, then add whole cardamoms, cloves, cinnamon, bay leaves, and hing water. Add mutton pieces and 1 tsp salt. Fry (bhunao) on high heat for 10-12 minutes until mutton browns and juices evaporate.",
        "timeMinutes": 12,
        "cue": "Mutton pieces turn deep golden-brown with caramelized edges"
      },
      {
        "step": 2,
        "title": "Add Dissolved Kashmiri Red Chilli Paste",
        "instruction": "Lower flame. Pour in Kashmiri chilli powder dissolved in warm water. Fry for 2 minutes, stirring continuously so the rich red color infuses directly into the sizzling mustard oil.",
        "timeMinutes": 3,
        "cue": "Oil turns deep crimson red (rogan)"
      },
      {
        "step": 3,
        "title": "Whisk in Yogurt & Kashmiri Spices",
        "instruction": "Stir in whisked yogurt in two batches, stirring rapidly to avoid curdling. Add fennel seed powder (saunf) and dry ginger powder (sonth). Saut\u00e9 for 6-8 minutes until the gravy is thick and oil separates.",
        "timeMinutes": 8,
        "cue": "Intoxicating aroma of fennel and ginger floating in red oil"
      },
      {
        "step": 4,
        "title": "Slow Simmer to Melt-in-Mouth Tenderness",
        "instruction": "Add 2 cups warm water. Cover tightly and simmer on low heat for 40-45 minutes (or pressure cook for 4-5 whistles) until meat is fork-tender and pulls away from the bone easily.",
        "timeMinutes": 45,
        "cue": "Mutton is succulently soft with thick clinging ruby-red sauce"
      },
      {
        "step": 5,
        "title": "Rest & Serve",
        "instruction": "Sprinkle royal garam masala. Rest covered for 10 minutes to allow the glossy rogan to rise to the top before ladling into bowls.",
        "timeMinutes": 10,
        "cue": "A royal crimson sheen (rogan) floats over velvety spiced mutton"
      }
    ],
    "tips": [
      "Authentic Kashmiri Pandit Rogan Josh contains zero onion, zero garlic, and zero tomatoes; its color comes from Kashmiri chillies and its soul from saunf and sonth.",
      "Dissolving Kashmiri chilli powder in a little water before adding prevents it from scorching in the hot mustard oil."
    ],
    "substitutions": [
      "Can use bone-in lamb chops with equal success."
    ],
    "servingSuggestions": [
      "Serve hot with steamed Kashmiri white basmati rice or hot naan."
    ],
    "nutrition": {
      "calories": 520,
      "protein": 40,
      "carbs": 8,
      "fat": 36,
      "fiber": 2
    },
    "tags": [
      "rogan josh",
      "kashmiri",
      "mutton",
      "wazwan",
      "royal",
      "gluten-free",
      "spicy"
    ]
  },
  {
    "id": "dum-aloo-kashmiri",
    "name": "Authentic Kashmiri Dum Aloo",
    "slug": "dum-aloo-kashmiri",
    "description": "Baby potatoes pricked and deep-fried until golden and crisp, slow-simmered on 'dum' in an aromatic curd gravy infused with fennel, dry ginger, and vibrant Kashmiri chillies.",
    "region": "Kashmiri",
    "cuisine": "Kashmiri",
    "category": "Main Course",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 25,
    "cookTime": 35,
    "totalTime": 60,
    "servings": 4,
    "spiceLevel": "Medium",
    "rating": 4.9,
    "ratingCount": 1150,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Fried Baby Potatoes",
        "items": [
          {
            "name": "baby potatoes",
            "amount": 500,
            "unit": "g",
            "notes": "boiled till 80% done, peeled, and pricked all over with a fork"
          },
          {
            "name": "mustard oil",
            "amount": 300,
            "unit": "ml",
            "notes": "for deep frying"
          }
        ]
      },
      {
        "name": "For the Kashmiri Dahi Gravy",
        "items": [
          {
            "name": "whisked fresh curd (yogurt)",
            "amount": 250,
            "unit": "g",
            "notes": "full cream, room temperature"
          },
          {
            "name": "mustard oil",
            "amount": 2,
            "unit": "tbsp",
            "notes": "reserved from frying"
          },
          {
            "name": "asafoetida (hing)",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "dissolved in 1 tbsp water"
          },
          {
            "name": "green cardamom & black cardamom",
            "amount": 2,
            "unit": "each",
            "notes": "crushed"
          },
          {
            "name": "cloves",
            "amount": 3,
            "unit": "whole",
            "notes": "whole"
          },
          {
            "name": "Kashmiri red chilli powder",
            "amount": 2,
            "unit": "tbsp",
            "notes": "mixed with 3 tbsp warm water"
          },
          {
            "name": "fennel seed powder (saunf)",
            "amount": 1.5,
            "unit": "tbsp",
            "notes": "freshly ground"
          },
          {
            "name": "dry ginger powder (sonth)",
            "amount": 1,
            "unit": "tsp",
            "notes": "ground"
          },
          {
            "name": "shahi jeera",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "caraway"
          },
          {
            "name": "kasuri methi",
            "amount": 1,
            "unit": "tsp",
            "notes": "crushed"
          },
          {
            "name": "salt",
            "amount": 1,
            "unit": "tsp",
            "notes": "to taste"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Prick & Deep Fry Baby Potatoes",
        "instruction": "Boil baby potatoes until 80% tender. Peel and prick thoroughly all over with a fork or toothpick so gravy penetrates the center. Heat mustard oil to smoking, then deep fry potatoes on medium heat for 8-10 minutes until deep golden brown and crisp outside. Drain.",
        "timeMinutes": 15,
        "cue": "Potatoes have a deep golden, crackly crust"
      },
      {
        "step": 2,
        "title": "Bloom Spices in Mustard Oil",
        "instruction": "Heat 2 tbsp of the frying mustard oil in a heavy pot. Add cardamoms, cloves, shahi jeera, and hing water. Lower flame, add Kashmiri chilli paste, and fry for 1 minute.",
        "timeMinutes": 3,
        "cue": "The oil turns a brilliant glowing red"
      },
      {
        "step": 3,
        "title": "Whisk in Curd & Aromatics",
        "instruction": "Add whisked yogurt gradually, stirring continuously in one direction until it comes to a gentle simmer. Add fennel powder, dry ginger powder, and salt. Cook on low heat for 5 minutes.",
        "timeMinutes": 6,
        "cue": "A fragrant, smooth crimson gravy forms"
      },
      {
        "step": 4,
        "title": "Dum Cook (Slow Steam) Potatoes",
        "instruction": "Add the fried baby potatoes and 1 cup warm water. Seal the pot with a tight lid (or seal with dough) and cook on lowest flame for 15-18 minutes so potatoes absorb the spiced curd gravy to their very core.",
        "timeMinutes": 18,
        "cue": "Potatoes swell and soak up the flavorful red broth"
      },
      {
        "step": 5,
        "title": "Finish & Serve",
        "instruction": "Sprinkle crushed kasuri methi and rest covered for 5 minutes before serving.",
        "timeMinutes": 5,
        "cue": "Spicy, tangy, aromatic Kashmiri masterpiece"
      }
    ],
    "tips": [
      "Pricking the potatoes thoroughly with a fork is essential so the deep, spiced yogurt gravy penetrates straight to the core.",
      "Like Rogan Josh, authentic Kashmiri Dum Aloo uses zero onion and zero garlic, relying solely on saunf, sonth, and Kashmiri chilli."
    ],
    "substitutions": [
      "If baby potatoes are unavailable, use regular potatoes cut into large round chunks."
    ],
    "servingSuggestions": [
      "Serve steaming hot with fragrant basmati rice or tandoori roti."
    ],
    "nutrition": {
      "calories": 320,
      "protein": 7,
      "carbs": 38,
      "fat": 16,
      "fiber": 4
    },
    "tags": [
      "dum aloo",
      "kashmiri",
      "vegetarian",
      "potatoes",
      "curd gravy",
      "traditional"
    ]
  },
  {
    "id": "gulab-jamun",
    "name": "Mawa Gulab Jamun",
    "slug": "gulab-jamun",
    "description": "Golden-fried soft milk solid (khoya/mawa) and paneer dumplings soaked in warm rose and cardamom infused saffron sugar syrup.",
    "region": "North Indian",
    "cuisine": "Mughlai / North Indian",
    "category": "Dessert",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Medium",
    "prepTime": 25,
    "cookTime": 25,
    "totalTime": 50,
    "servings": 6,
    "spiceLevel": "Mild",
    "rating": 5.0,
    "ratingCount": 2650,
    "image": "https://images.unsplash.com/photo-1605197144883-9b87f9d0c64b?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Mawa Jamun Dough",
        "items": [
          {
            "name": "fresh unsweetened khoya (mawa)",
            "amount": 250,
            "unit": "g",
            "notes": "soft, grated and mashed smooth"
          },
          {
            "name": "fresh paneer (chenna)",
            "amount": 75,
            "unit": "g",
            "notes": "grated finely and kneaded into mawa"
          },
          {
            "name": "all-purpose flour (maida)",
            "amount": 40,
            "unit": "g",
            "notes": "binding agent"
          },
          {
            "name": "cardamom powder",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "freshly ground"
          },
          {
            "name": "baking powder",
            "amount": 0.25,
            "unit": "tsp",
            "notes": "delicate puff"
          },
          {
            "name": "milk",
            "amount": 2,
            "unit": "tbsp",
            "notes": "only if dough needs moisture to become smooth"
          },
          {
            "name": "desi ghee",
            "amount": 500,
            "unit": "ml",
            "notes": "for slow frying"
          }
        ]
      },
      {
        "name": "For the Saffron-Rose Sugar Syrup (Chashni)",
        "items": [
          {
            "name": "granulated sugar",
            "amount": 400,
            "unit": "g",
            "notes": "pure white sugar"
          },
          {
            "name": "water",
            "amount": 400,
            "unit": "ml",
            "notes": "equal ratio to sugar"
          },
          {
            "name": "green cardamom pods",
            "amount": 4,
            "unit": "whole",
            "notes": "crushed"
          },
          {
            "name": "saffron strands (kesar)",
            "amount": 15,
            "unit": "threads",
            "notes": "aroma and golden color"
          },
          {
            "name": "rose water",
            "amount": 1,
            "unit": "tsp",
            "notes": "subtle floral perfume"
          },
          {
            "name": "lemon juice",
            "amount": 0.5,
            "unit": "tsp",
            "notes": "prevents sugar syrup crystallization"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Prepare Scented Sugar Syrup",
        "instruction": "In a wide pan, combine sugar, water, and crushed cardamom. Boil for 6-8 minutes until syrup is sticky to touch (half-string consistency, not thick). Turn off heat, stir in saffron, rose water, and lemon juice. Keep warm.",
        "timeMinutes": 8,
        "cue": "Clear, fragrant golden syrup that feels sticky between fingertips"
      },
      {
        "step": 2,
        "title": "Knead Khoya & Paneer to Silkiness",
        "instruction": "Grate khoya and paneer. Using the heel of your palm, rub and mash on a flat tray for 6-7 minutes until completely grain-free and silky. Sift in maida, baking powder, and cardamom. Mix gently into a soft, crack-free dough (do not over-knead).",
        "timeMinutes": 10,
        "cue": "Silky smooth dough with zero cracks"
      },
      {
        "step": 3,
        "title": "Roll Crack-Free Balls",
        "instruction": "Pinch small marble-sized portions. Roll between greased palms with gentle pressure into completely smooth balls without any cracks (any crack will burst open during frying).",
        "timeMinutes": 8,
        "cue": "Flawless, shiny, crack-free spheres"
      },
      {
        "step": 4,
        "title": "Slow Fry in Desi Ghee",
        "instruction": "Heat ghee in a kadai over gentle low heat (ghee must be only warm, not hot). Drop balls in batches. Swirl the ghee with a ladle without touching the delicate balls. As they warm, they will expand and float. Fry on low flame for 10-12 minutes until evenly deep mahogany golden.",
        "timeMinutes": 12,
        "cue": "Balls float buoyant and take on an even deep amber-brown glow"
      },
      {
        "step": 5,
        "title": "Soak in Warm Sugar Syrup",
        "instruction": "Remove with a slotted spoon and immediately slide the hot fried jamuns into the warm sugar syrup. Let them soak for at least 2 hours so syrup penetrates to the center, doubling their size.",
        "timeMinutes": 120,
        "cue": "Jamuns swell into melt-in-mouth, syrup-soaked spheres"
      }
    ],
    "tips": [
      "Ghee must be at a gentle low temperature when dropping the balls; high heat cooks the exterior instantly, leaving the center raw and dense.",
      "Kneading the khoya and paneer with the heel of your palm eliminates all graininess for that signature melt-in-mouth texture."
    ],
    "substitutions": [
      "Can prepare using milk powder, maida, and ghee if fresh mawa is unavailable."
    ],
    "servingSuggestions": [
      "Serve warm garnished with slivered pistachios and silver leaf (vark), or paired with cold vanilla bean ice cream."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 5,
      "carbs": 44,
      "fat": 10,
      "fiber": 0
    },
    "tags": [
      "gulab jamun",
      "dessert",
      "sweet",
      "mawa",
      "festive",
      "vegetarian",
      "celebration"
    ]
  },
  {
    "id": "rice-kheer",
    "name": "Royal Shahi Rice Kheer",
    "slug": "rice-kheer",
    "description": "Fragrant Indian rice pudding slow-simmered in whole milk with aromatic basmati rice, saffron, green cardamom, toasted nuts, and golden raisins.",
    "region": "North Indian",
    "cuisine": "North Indian",
    "category": "Dessert",
    "diet": [
      "Vegetarian"
    ],
    "difficulty": "Easy",
    "prepTime": 15,
    "cookTime": 40,
    "totalTime": 55,
    "servings": 6,
    "spiceLevel": "Mild",
    "rating": 4.9,
    "ratingCount": 1890,
    "image": "https://images.unsplash.com/photo-1605197144883-9b87f9d0c64b?auto=format&fit=crop&w=1200&q=80",
    "ingredients": [
      {
        "name": "For the Rice & Milk",
        "items": [
          {
            "name": "aged aromatic Basmati or Gobindobhog rice",
            "amount": 60,
            "unit": "g",
            "notes": "washed, soaked 30 mins, coarsely crushed between fingers"
          },
          {
            "name": "full cream whole milk",
            "amount": 1200,
            "unit": "ml",
            "notes": "rich full fat milk"
          },
          {
            "name": "desi ghee",
            "amount": 1,
            "unit": "tsp",
            "notes": "for tossing soaked rice"
          }
        ]
      },
      {
        "name": "For Sweetener & Royal Aromatics",
        "items": [
          {
            "name": "sugar",
            "amount": 100,
            "unit": "g",
            "notes": "adjust to sweetness preference"
          },
          {
            "name": "green cardamom pods",
            "amount": 5,
            "unit": "whole",
            "notes": "freshly crushed into fine powder"
          },
          {
            "name": "saffron strands",
            "amount": 20,
            "unit": "threads",
            "notes": "steeped in 2 tbsp warm milk"
          },
          {
            "name": "almonds & pistachios",
            "amount": 3,
            "unit": "tbsp",
            "notes": "slivered"
          },
          {
            "name": "golden raisins (kishmish)",
            "amount": 2,
            "unit": "tbsp",
            "notes": "plump"
          },
          {
            "name": "rose water or kewra water",
            "amount": 1,
            "unit": "tsp",
            "notes": "subtle royal essence"
          }
        ]
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Crush Rice & Coat in Ghee",
        "instruction": "Drain soaked basmati rice. Lightly crush grains with fingers to break into smaller bits (this releases rice starch directly into milk for creaminess). Toss with 1 tsp ghee.",
        "timeMinutes": 3,
        "cue": "Broken fragrant rice grains coated in glossy ghee"
      },
      {
        "step": 2,
        "title": "Boil Milk in Heavy Pot",
        "instruction": "Rinse a heavy pot with cold water (prevents milk scorching). Add whole milk and bring to a boil over medium flame.",
        "timeMinutes": 8,
        "cue": "Milk comes to a rolling boil with frothy cream on top"
      },
      {
        "step": 3,
        "title": "Slow Simmer Rice in Milk",
        "instruction": "Add the crushed rice. Reduce flame to low. Simmer for 25-30 minutes, stirring every few minutes and scraping the creamy malai off the pot sides back into the milk.",
        "timeMinutes": 30,
        "cue": "Rice turns velvety soft and milk thickens to creamy consistency"
      },
      {
        "step": 4,
        "title": "Add Saffron, Sugar & Cardamom",
        "instruction": "Once rice is meltingly soft and milk has reduced by 35%, stir in sugar, saffron-infused milk, and cardamom powder. Simmer for 5-6 minutes until sugar dissolves completely.",
        "timeMinutes": 6,
        "cue": "Kheer turns a pale golden saffron hue with sweet cardamom perfume"
      },
      {
        "step": 5,
        "title": "Garnish with Nuts & Cool",
        "instruction": "Stir in slivered almonds, pistachios, raisins, and rose water. Turn off heat. Serve warm or chill in refrigerator for 3 hours.",
        "timeMinutes": 3,
        "cue": "Rich, creamy pudding topped with glowing green pistachios and golden saffron"
      }
    ],
    "tips": [
      "Coarsely crushing the soaked rice grains before simmering allows rice starch to bind with milk fat for a naturally creamy consistency.",
      "Always add sugar only AFTER the rice is completely cooked; adding sugar too early prevents rice from softening."
    ],
    "substitutions": [
      "Can use jaggery (gud) instead of sugar; add jaggery only after kheer cools slightly to prevent milk curdling."
    ],
    "servingSuggestions": [
      "Serve warm in winter, or chilled in summer garnished with edible silver vark and rose petals."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 7,
      "carbs": 38,
      "fat": 9,
      "fiber": 1
    },
    "tags": [
      "rice kheer",
      "kheer",
      "pudding",
      "dessert",
      "festive",
      "gluten-free",
      "north indian",
      "comfort food"
    ]
  }
];

export const REGIONS: Region[] = [
  'North Indian',
  'South Indian',
  'Bengali',
  'Punjabi',
  'Gujarati',
  'Maharashtrian',
  'Hyderabadi',
  'Rajasthani',
  'Kashmiri'
];

export const CATEGORIES: Category[] = [
  'Breakfast',
  'Main Course',
  'Rice',
  'Dal',
  'Snack',
  'Street Food',
  'Dessert',
  'Bread',
  'Side Dish'
];

export const DIETS: DietType[] = [
  'Vegetarian',
  'Non-Vegetarian',
  'Egg',
  'Vegan'
];

export const POPULAR_SLUGS: string[] = [
  'butter-chicken',
  'hyderabadi-chicken-biryani',
  'paneer-tikka',
  'masala-dosa',
  'chole-bhature',
  'dal-makhani'
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return RECIPES.find((r) => r.slug === slug);
}

export function getPopularRecipes(): Recipe[] {
  return POPULAR_SLUGS.map((slug) => getRecipeBySlug(slug)).filter((r): r is Recipe => r !== undefined);
}

export function getRecipesByRegion(region: Region): Recipe[] {
  return RECIPES.filter((r) => r.region === region);
}

export function getQuickAndEasyRecipes(maxTimeMinutes: number = 30): Recipe[] {
  return RECIPES.filter((r) => r.totalTime <= maxTimeMinutes);
}

export function getVegetarianFavorites(): Recipe[] {
  return RECIPES.filter((r) => r.diet.includes('Vegetarian') && r.rating >= 4.8).slice(0, 8);
}

export function getNonVegetarianFavorites(): Recipe[] {
  return RECIPES.filter((r) => r.diet.includes('Non-Vegetarian') && r.rating >= 4.8).slice(0, 8);
}

export function getSimilarRecipes(currentRecipe: Recipe, limit: number = 4): Recipe[] {
  return RECIPES.filter(
    (r) =>
      r.id !== currentRecipe.id &&
      (r.region === currentRecipe.region ||
        r.category === currentRecipe.category ||
        r.cuisine === currentRecipe.cuisine)
  )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
