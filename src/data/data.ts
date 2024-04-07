export const categories: IRecipeCategoryItem[] = [
  {
    id: "rc1",
    name: "Горячее",
    fullName: "Горячие блюда",
    img: "/images/recipes/category-1.jpg",
  },
  {
    id: "rc2",
    name: "Супы",
    fullName: "Супы",
    img: "/images/recipes/category-2.jpg",
  },
  {
    id: "rc3",
    name: "Салаты",
    fullName: "Салаты",
    img: "/images/recipes/category-3.jpg",
  },
  {
    id: "rc4",
    name: "Десерты",
    fullName: "Десерты",
    img: "/images/recipes/category-4.jpg",
  },
  {
    id: "rc5",
    name: "Закуски",
    fullName: "Закуски",
    img: "/images/recipes/category-5.jpg",
  },
  {
    id: "rc6",
    name: "Выпечка",
    fullName: "Выпечка",
    img: "/images/recipes/category-6.jpg",
  },
  {
    id: "rc7",
    name: "Заготовки",
    fullName: "Заготовки",
    img: "/images/recipes/category-7.jpg",
  },
  {
    id: "rc8",
    name: "Напитки",
    fullName: "Напитки",
    img: "/images/recipes/category-8.jpg",
  },
  {
    id: "rc9",
    name: "Соусы",
    fullName: "Соусы",
    img: "/images/recipes/category-9.jpg",
  },
];

export const recipes: IRecipeItem[] = [
  {
    id: "r1",
    name: "Омлет классический с сыром и ветчиной",
    category: "rc1",
    img: "/images/recipes/recipe-1.jpg",
    time: 30,
    difficulty: 2,
  },
  {
    id: "r2",
    name: "Яичница",
    category: "rc1",
    img: "/images/recipes/recipe-2.jpg",
    time: 10,
    difficulty: 1,
  },
  {
    id: "r3",
    name: "Тыквенный суп",
    category: "rc2",
    img: "/images/recipes/recipe-3.jpg",
    time: 60,
    difficulty: 2,
  },
  {
    id: "r4",
    name: "Овощной салат",
    category: "rc3",
    img: "/images/recipes/recipe-4.jpg",
    time: 15,
    difficulty: 1,
  },
  {
    id: "r5",
    name: "Блинчики с малиной и кремом",
    category: "rc4",
    img: "/images/recipes/recipe-5.jpg",
    time: 40,
    difficulty: 2,
  },
  {
    id: "r6",
    name: "Ролл филадельфия",
    category: "rc5",
    img: "/images/recipes/recipe-6.jpg",
    time: 30,
    difficulty: 1,
  },
  {
    id: "r7",
    name: "Вишнёвый пирог",
    category: "rc6",
    img: "/images/recipes/recipe-7.jpg",
    time: 90,
    difficulty: 3,
  },
  {
    id: "r8",
    name: "Абрикосовое варенье",
    category: "rc7",
    img: "/images/recipes/recipe-8.jpg",
    time: 45,
    difficulty: 1,
  },
  {
    id: "r9",
    name: "Мохито",
    category: "rc8",
    img: "/images/recipes/recipe-9.jpg",
    time: 10,
    difficulty: 1,
  },
  {
    id: "r10",
    name: "Томатный соус с базиликом",
    category: "rc9",
    img: "/images/recipes/recipe-10.jpg",
    time: 20,
    difficulty: 2,
  },
];

export const fullRecipes: IFullRecipeItem[] = [
  {
    id: "r1",
    name: "Омлет классический с сыром и ветчиной",
    category: "rc1",
    img: "/images/recipes/recipe-1.jpg",
    time: 30,
    difficulty: 2,
    description:
      "Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.",
    totalIngredients: [
      { name: "Куриное яйцо", amount: 5, unit: "шт." },
      { name: "Молоко", amount: 100, unit: "мл" },
      { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
      { name: "Соль", amount: 0.5, unit: "ч.л." },
      { name: "Масло растительное", amount: 2, unit: "ст.л." },
    ],
    steps: [
      {
        description:
          "Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.",
        ingredients: [],
        img: "/images/recipes/recipe-1/step-1.jpg",
      },
      {
        description: "Перемешайте в миске, молоко, яйца и соль по вкусу.",
        ingredients: [
          { name: "Куриное яйцо", amount: 5, unit: "шт." },
          { name: "Молоко", amount: 100, unit: "мл" },
          { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
          { name: "Соль", amount: 0.5, unit: "ч.л." },
        ],
        img: "/images/recipes/recipe-1/step-2.jpg",
      },
      {
        description: "Вылейте в форму, предварительно смазанную маслом.",
        ingredients: [{ name: "Масло растительное", amount: 2, unit: "ст.л." }],
        img: "/images/recipes/recipe-1/step-3.jpg",
      },
    ],
  },
  {
    id: "r2",
    name: "Яичница",
    category: "rc1",
    img: "/images/recipes/recipe-2.jpg",
    time: 10,
    difficulty: 1,
    description:
      "Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.",
    totalIngredients: [
      { name: "Куриное яйцо", amount: 5, unit: "шт." },
      { name: "Молоко", amount: 100, unit: "мл" },
      { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
      { name: "Соль", amount: 0.5, unit: "ч.л." },
      { name: "Масло растительное", amount: 2, unit: "ст.л." },
    ],
    steps: [
      {
        description:
          "Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.",
        ingredients: [],
        img: "/images/recipes/recipe-1/step-1.jpg",
      },
      {
        description: "Перемешайте в миске, молоко, яйца и соль по вкусу.",
        ingredients: [
          { name: "Куриное яйцо", amount: 5, unit: "шт." },
          { name: "Молоко", amount: 100, unit: "мл" },
          { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
          { name: "Соль", amount: 0.5, unit: "ч.л." },
        ],
        img: "/images/recipes/recipe-1/step-2.jpg",
      },
      {
        description: "Вылейте в форму, предварительно смазанную маслом.",
        ingredients: [{ name: "Масло растительное", amount: 2, unit: "ст.л." }],
        img: "/images/recipes/recipe-1/step-3.jpg",
      },
    ],
  },
  {
    id: "r3",
    name: "Тыквенный суп",
    category: "rc2",
    img: "/images/recipes/recipe-3.jpg",
    time: 60,
    difficulty: 2,
    description:
      "Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.",
    totalIngredients: [
      { name: "Куриное яйцо", amount: 5, unit: "шт." },
      { name: "Молоко", amount: 100, unit: "мл" },
      { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
      { name: "Соль", amount: 0.5, unit: "ч.л." },
      { name: "Масло растительное", amount: 2, unit: "ст.л." },
    ],
    steps: [
      {
        description:
          "Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.",
        ingredients: [],
        img: "/images/recipes/recipe-1/step-1.jpg",
      },
      {
        description: "Перемешайте в миске, молоко, яйца и соль по вкусу.",
        ingredients: [
          { name: "Куриное яйцо", amount: 5, unit: "шт." },
          { name: "Молоко", amount: 100, unit: "мл" },
          { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
          { name: "Соль", amount: 0.5, unit: "ч.л." },
        ],
        img: "/images/recipes/recipe-1/step-2.jpg",
      },
      {
        description: "Вылейте в форму, предварительно смазанную маслом.",
        ingredients: [{ name: "Масло растительное", amount: 2, unit: "ст.л." }],
        img: "/images/recipes/recipe-1/step-3.jpg",
      },
    ],
  },
  {
    id: "r4",
    name: "Овощной салат",
    category: "rc3",
    img: "/images/recipes/recipe-4.jpg",
    time: 15,
    difficulty: 1,
    description:
      "Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.",
    totalIngredients: [
      { name: "Куриное яйцо", amount: 5, unit: "шт." },
      { name: "Молоко", amount: 100, unit: "мл" },
      { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
      { name: "Соль", amount: 0.5, unit: "ч.л." },
      { name: "Масло растительное", amount: 2, unit: "ст.л." },
    ],
    steps: [
      {
        description:
          "Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.",
        ingredients: [],
        img: "/images/recipes/recipe-1/step-1.jpg",
      },
      {
        description: "Перемешайте в миске, молоко, яйца и соль по вкусу.",
        ingredients: [
          { name: "Куриное яйцо", amount: 5, unit: "шт." },
          { name: "Молоко", amount: 100, unit: "мл" },
          { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
          { name: "Соль", amount: 0.5, unit: "ч.л." },
        ],
        img: "/images/recipes/recipe-1/step-2.jpg",
      },
      {
        description: "Вылейте в форму, предварительно смазанную маслом.",
        ingredients: [{ name: "Масло растительное", amount: 2, unit: "ст.л." }],
        img: "/images/recipes/recipe-1/step-3.jpg",
      },
    ],
  },
  {
    id: "r5",
    name: "Блинчики с малиной и кремом",
    category: "rc4",
    img: "/images/recipes/recipe-5.jpg",
    time: 40,
    difficulty: 2,
    description:
      "Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.",
    totalIngredients: [
      { name: "Куриное яйцо", amount: 5, unit: "шт." },
      { name: "Молоко", amount: 100, unit: "мл" },
      { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
      { name: "Соль", amount: 0.5, unit: "ч.л." },
      { name: "Масло растительное", amount: 2, unit: "ст.л." },
    ],
    steps: [
      {
        description:
          "Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.",
        ingredients: [],
        img: "/images/recipes/recipe-1/step-1.jpg",
      },
      {
        description: "Перемешайте в миске, молоко, яйца и соль по вкусу.",
        ingredients: [
          { name: "Куриное яйцо", amount: 5, unit: "шт." },
          { name: "Молоко", amount: 100, unit: "мл" },
          { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
          { name: "Соль", amount: 0.5, unit: "ч.л." },
        ],
        img: "/images/recipes/recipe-1/step-2.jpg",
      },
      {
        description: "Вылейте в форму, предварительно смазанную маслом.",
        ingredients: [{ name: "Масло растительное", amount: 2, unit: "ст.л." }],
        img: "/images/recipes/recipe-1/step-3.jpg",
      },
    ],
  },
  {
    id: "r6",
    name: "Ролл филадельфия",
    category: "rc5",
    img: "/images/recipes/recipe-6.jpg",
    time: 30,
    difficulty: 1,
    description:
      "Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.",
    totalIngredients: [
      { name: "Куриное яйцо", amount: 5, unit: "шт." },
      { name: "Молоко", amount: 100, unit: "мл" },
      { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
      { name: "Соль", amount: 0.5, unit: "ч.л." },
      { name: "Масло растительное", amount: 2, unit: "ст.л." },
    ],
    steps: [
      {
        description:
          "Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.",
        ingredients: [],
        img: "/images/recipes/recipe-1/step-1.jpg",
      },
      {
        description: "Перемешайте в миске, молоко, яйца и соль по вкусу.",
        ingredients: [
          { name: "Куриное яйцо", amount: 5, unit: "шт." },
          { name: "Молоко", amount: 100, unit: "мл" },
          { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
          { name: "Соль", amount: 0.5, unit: "ч.л." },
        ],
        img: "/images/recipes/recipe-1/step-2.jpg",
      },
      {
        description: "Вылейте в форму, предварительно смазанную маслом.",
        ingredients: [{ name: "Масло растительное", amount: 2, unit: "ст.л." }],
        img: "/images/recipes/recipe-1/step-3.jpg",
      },
    ],
  },
  {
    id: "r7",
    name: "Вишнёвый пирог",
    category: "rc6",
    img: "/images/recipes/recipe-7.jpg",
    time: 90,
    difficulty: 3,
    description:
      "Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.",
    totalIngredients: [
      { name: "Куриное яйцо", amount: 5, unit: "шт." },
      { name: "Молоко", amount: 100, unit: "мл" },
      { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
      { name: "Соль", amount: 0.5, unit: "ч.л." },
      { name: "Масло растительное", amount: 2, unit: "ст.л." },
    ],
    steps: [
      {
        description:
          "Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.",
        ingredients: [],
        img: "/images/recipes/recipe-1/step-1.jpg",
      },
      {
        description: "Перемешайте в миске, молоко, яйца и соль по вкусу.",
        ingredients: [
          { name: "Куриное яйцо", amount: 5, unit: "шт." },
          { name: "Молоко", amount: 100, unit: "мл" },
          { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
          { name: "Соль", amount: 0.5, unit: "ч.л." },
        ],
        img: "/images/recipes/recipe-1/step-2.jpg",
      },
      {
        description: "Вылейте в форму, предварительно смазанную маслом.",
        ingredients: [{ name: "Масло растительное", amount: 2, unit: "ст.л." }],
        img: "/images/recipes/recipe-1/step-3.jpg",
      },
    ],
  },
  {
    id: "r8",
    name: "Абрикосовое варенье",
    category: "rc7",
    img: "/images/recipes/recipe-8.jpg",
    time: 45,
    difficulty: 1,
    description:
      "Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.",
    totalIngredients: [
      { name: "Куриное яйцо", amount: 5, unit: "шт." },
      { name: "Молоко", amount: 100, unit: "мл" },
      { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
      { name: "Соль", amount: 0.5, unit: "ч.л." },
      { name: "Масло растительное", amount: 2, unit: "ст.л." },
    ],
    steps: [
      {
        description:
          "Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.",
        ingredients: [],
        img: "/images/recipes/recipe-1/step-1.jpg",
      },
      {
        description: "Перемешайте в миске, молоко, яйца и соль по вкусу.",
        ingredients: [
          { name: "Куриное яйцо", amount: 5, unit: "шт." },
          { name: "Молоко", amount: 100, unit: "мл" },
          { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
          { name: "Соль", amount: 0.5, unit: "ч.л." },
        ],
        img: "/images/recipes/recipe-1/step-2.jpg",
      },
      {
        description: "Вылейте в форму, предварительно смазанную маслом.",
        ingredients: [{ name: "Масло растительное", amount: 2, unit: "ст.л." }],
        img: "/images/recipes/recipe-1/step-3.jpg",
      },
    ],
  },
  {
    id: "r9",
    name: "Мохито",
    category: "rc8",
    img: "/images/recipes/recipe-9.jpg",
    time: 10,
    difficulty: 1,
    description:
      "Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.",
    totalIngredients: [
      { name: "Куриное яйцо", amount: 5, unit: "шт." },
      { name: "Молоко", amount: 100, unit: "мл" },
      { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
      { name: "Соль", amount: 0.5, unit: "ч.л." },
      { name: "Масло растительное", amount: 2, unit: "ст.л." },
    ],
    steps: [
      {
        description:
          "Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.",
        ingredients: [],
        img: "/images/recipes/recipe-1/step-1.jpg",
      },
      {
        description: "Перемешайте в миске, молоко, яйца и соль по вкусу.",
        ingredients: [
          { name: "Куриное яйцо", amount: 5, unit: "шт." },
          { name: "Молоко", amount: 100, unit: "мл" },
          { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
          { name: "Соль", amount: 0.5, unit: "ч.л." },
        ],
        img: "/images/recipes/recipe-1/step-2.jpg",
      },
      {
        description: "Вылейте в форму, предварительно смазанную маслом.",
        ingredients: [{ name: "Масло растительное", amount: 2, unit: "ст.л." }],
        img: "/images/recipes/recipe-1/step-3.jpg",
      },
    ],
  },
  {
    id: "r10",
    name: "Томатный соус с базиликом",
    category: "rc9",
    img: "/images/recipes/recipe-10.jpg",
    time: 20,
    difficulty: 2,
    description:
      "Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.",
    totalIngredients: [
      { name: "Куриное яйцо", amount: 5, unit: "шт." },
      { name: "Молоко", amount: 100, unit: "мл" },
      { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
      { name: "Соль", amount: 0.5, unit: "ч.л." },
      { name: "Масло растительное", amount: 2, unit: "ст.л." },
    ],
    steps: [
      {
        description:
          "Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.",
        ingredients: [],
        img: "/images/recipes/recipe-1/step-1.jpg",
      },
      {
        description: "Перемешайте в миске, молоко, яйца и соль по вкусу.",
        ingredients: [
          { name: "Куриное яйцо", amount: 5, unit: "шт." },
          { name: "Молоко", amount: 100, unit: "мл" },
          { name: "Мука пшеничная", amount: 5, unit: "ст.л." },
          { name: "Соль", amount: 0.5, unit: "ч.л." },
        ],
        img: "/images/recipes/recipe-1/step-2.jpg",
      },
      {
        description: "Вылейте в форму, предварительно смазанную маслом.",
        ingredients: [{ name: "Масло растительное", amount: 2, unit: "ст.л." }],
        img: "/images/recipes/recipe-1/step-3.jpg",
      },
    ],
  },
];
