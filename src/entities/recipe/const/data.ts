// TODO: удалить этот файл в production

import { Recipe } from '../model/recipe'

export const recipes: Recipe[] = [
  {
    id: 'r1',
    name: 'Омлет классический с сыром и ветчиной',
    category: 'rc1',
    img: '/images/recipes/recipe-1/main.jpg',
    time: 30,
    difficulty: 2,
    hidden: false,
  },
  {
    id: 'r2',
    name: 'Котлеты классические',
    category: 'rc1',
    img: '/images/recipes/recipe-2/main.png',
    time: 60,
    difficulty: 2,
    hidden: false,
  },
  {
    id: 'r3',
    name: 'Тыквенный суп',
    category: 'rc2',
    img: '/images/recipes/recipe-3/main.jpg',
    time: 40,
    difficulty: 2,
    hidden: false,
  },
  {
    id: 'r4',
    name: 'Овощной салат по-итальянски',
    category: 'rc3',
    img: '/images/recipes/recipe-4/main.jpg',
    time: 20,
    difficulty: 1,
    hidden: false,
  },
  {
    id: 'r5',
    name: 'Блинчики со сливочным кремом, малиной и мятой',
    category: 'rc4',
    img: '/images/recipes/recipe-5/main.jpg',
    time: 30,
    difficulty: 2,
    hidden: false,
  },
  {
    id: 'r6',
    name: 'Ролл филадельфия',
    category: 'rc5',
    img: '/images/recipes/recipe-6/main.jpg',
    time: 30,
    difficulty: 1,
    hidden: false,
  },
  {
    id: 'r7',
    name: 'Вишнёвый пирог',
    category: 'rc6',
    img: '/images/recipes/recipe-7/main.jpg',
    time: 240,
    difficulty: 3,
    hidden: false,
  },
  {
    id: 'r8',
    name: 'Абрикосовое варенье с косточками',
    category: 'rc7',
    img: '/images/recipes/recipe-8/main.jpg',
    time: 120,
    difficulty: 2,
    hidden: false,
  },
  {
    id: 'r9',
    name: 'Мохито безалкогольный',
    category: 'rc8',
    img: '/images/recipes/recipe-9/main.jpg',
    time: 5,
    difficulty: 1,
    hidden: false,
  },
  {
    id: 'r10',
    name: 'Томатный соус с базиликом',
    category: 'rc9',
    img: '/images/recipes/recipe-10/main.jpg',
    time: 15,
    difficulty: 2,
    hidden: false,
  },
  {
    id: 'r11',
    name: 'Напиток клюквенный',
    category: 'rc8',
    img: '/images/recipes/recipe-11/main.png',
    time: 10,
    difficulty: 1,
    hidden: false,
  },
  {
    id: 'r12',
    name: 'Яблочный пирог',
    category: 'rc6',
    img: '/images/recipes/recipe-12/main.png',
    time: 30,
    difficulty: 2,
    hidden: false,
  },
  {
    id: 'r13',
    name: 'Закуска с семгой и ветчиной',
    category: 'rc5',
    img: '/images/recipes/recipe-13/main.png',
    time: 15,
    difficulty: 1,
    hidden: false,
  },
  {
    id: 'r14',
    name: 'Каша овсяная с вареньем',
    category: 'rc1',
    img: '/images/recipes/recipe-14/main.png',
    time: 30,
    difficulty: 1,
    hidden: false,
  },
]

export const fullRecipes: FullRecipe[] = [
  {
    id: 'r1',
    name: 'Омлет классический с сыром и ветчиной',
    category: 'rc1',
    img: '/images/recipes/recipe-1/main.jpg',
    time: 30,
    difficulty: 2,
    description:
      'Омлет - это нежное яичное блюдо, которое прекрасно подходит на завтрак. Добавлять в него можно по желанию бекон, ветчину, сладкий перец, кукурузу, зелень, помидоры. Но сейчас мы приготовим базовый рецепт - классический омлет.',
    totalIngredients: [
      { name: 'Куриное яйцо', amount: 5, unit: 'шт.' },
      { name: 'Молоко', amount: 100, unit: 'мл' },
      { name: 'Мука пшеничная', amount: 5, unit: 'ст.л.' },
      { name: 'Соль', amount: 0.5, unit: 'ч.л.' },
      { name: 'Масло растительное', amount: 2, unit: 'ст.л.' },
    ],
    steps: [
      {
        description:
          'Подготавливаем все ингредиенты. Чтобы омлет получился вкусный, нужно брать из расчёта 1 яйцо - 50 миллилитров молока.',
        ingredients: [],
        img: '/images/recipes/recipe-1/step-1.jpg',
      },
      {
        description: 'Перемешайте в миске, молоко, яйца и соль по вкусу.',
        ingredients: [
          { name: 'Куриное яйцо', amount: 5, unit: 'шт.' },
          { name: 'Молоко', amount: 100, unit: 'мл' },
          { name: 'Мука пшеничная', amount: 5, unit: 'ст.л.' },
          { name: 'Соль', amount: 0.5, unit: 'ч.л.' },
        ],
        img: '/images/recipes/recipe-1/step-2.jpg',
      },
      {
        description: 'Вылейте в форму, предварительно смазанную маслом.',
        ingredients: [{ name: 'Масло растительное', amount: 2, unit: 'ст.л.' }],
        img: '/images/recipes/recipe-1/step-3.jpg',
      },
    ],
    hidden: false,
  },
  {
    id: 'r2',
    name: 'Котлеты классические',
    category: 'rc1',
    img: '/images/recipes/recipe-2/main.png',
    time: 60,
    difficulty: 2,
    description:
      'Котлеты классические - это одно из самых популярных и полюбившихся блюд в русской кухне. Их история уходит корнями в далекое прошлое, когда мясо было самым доступным и распространенным продуктом питания. Котлеты были простым и недорогим способом приготовления мяса, который позволял сохранить его питательные свойства и вкус.',
    totalIngredients: [
      { name: 'Фарш мясной', amount: 700, unit: 'г' },
      { name: 'Хлеб белый', amount: 300, unit: 'г' },
      { name: 'Молоко', amount: 1, unit: 'стакан' },
      { name: 'Лук репчатый', amount: 3, unit: 'шт.' },
      { name: 'Панировочные сухари', amount: 150, unit: 'г' },
      { name: 'Масло растительное', amount: 50, unit: 'г' },
    ],
    steps: [
      {
        description:
          'Как пожарить классические сочные котлеты из фарша на сковороде? Подготовьте необходимые ингредиенты. Фарш можно использовать из любого мяса или смешать несколько видов. Я использую фарш из свинины. Выложите фарш в глубокую миску.',
        ingredients: [{ name: 'Фарш мясной', amount: 700, unit: 'г' }],
        img: '/images/recipes/recipe-2/step-1.png',
      },
      {
        description:
          'Лук очистите от шелухи и промойте в холодной воде. Чтобы лук не щипал глаза при нарезке, обмойте его и нож холодной водой. Разрежьте лук на несколько частей так, чтобы они с легкостью прошли в мясорубку. Пропустите очищенный лук через мясорубку и добавьте его в миску к фаршу.',
        ingredients: [{ name: 'Лук репчатый', amount: 3, unit: 'шт.' }],
        img: '/images/recipes/recipe-2/step-2.png',
      },
      {
        description:
          'Батон залейте молоком и оставьте его пропитываться. Затем отожмите хлеб от молока и тоже пропустите через мясорубку.',
        ingredients: [
          { name: 'Хлеб белый', amount: 300, unit: 'г' },
          { name: 'Молоко', amount: 1, unit: 'стакан' },
        ],
        img: '/images/recipes/recipe-2/step-3.png',
      },
      {
        description:
          'Добавьте измельченный батон в миску к фаршу. Добавьте соль и специи по вкусу. Всю массу хорошо перемешайте. Удобно это делать руками. Масса должна стать однородной.',
        ingredients: [],
        img: '/images/recipes/recipe-2/step-4.png',
      },
      {
        description:
          "Готовую котлетную массу отбейте. Для этого поднимайте немного массы и кидайте в чашу. Котлетная масса не должна быть слишком жидкой, при отбивании она станет более однородной и вязкой. Эта нехитрая процедура сделает готовые котлеты мягкими и нежными, при этом они будут достаточно плотными, чтобы не разваливаться при жарке. При желании можно добавить яйцо, но на мой вкус, это делает котлеты 'резиновыми'.",
        ingredients: [],
        img: '/images/recipes/recipe-2/step-5.png',
      },
      {
        description:
          'В отдельную тарелку насыпьте немного панировочных сухарей. Руками возьмите немного котлетной массы, сформируйте котлету и обваляйте её в панировочных сухарях.',
        ingredients: [{ name: 'Панировочные сухари', amount: 150, unit: 'г' }],
        img: '/images/recipes/recipe-2/step-6.jpg',
      },
      {
        description:
          'В антипригарную сковороду налейте немного растительного масла и разогрейте её до горячего состояния. Выложите сформированные котлеты и обжаривайте их на среднем огне 2-3 минуты до золотистого цвета. Как правильно выбрать сковороду и масло для жарки вы узнаете из статей. Ссылки есть в конце этого рецепта.',
        ingredients: [{ name: 'Масло растительное', amount: 50, unit: 'г' }],
        img: '/images/recipes/recipe-2/step-7.png',
      },
      {
        description:
          'Затем котлеты переверните и обжарьте также с другой стороны. Готовые котлеты снимите со сковороды. Подавайте их с любым гарниром. Приятного аппетита!',
        ingredients: [],
        img: '/images/recipes/recipe-2/step-8.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r3',
    name: 'Тыквенный суп',
    category: 'rc2',
    img: '/images/recipes/recipe-3/main.jpg',
    time: 40,
    difficulty: 2,
    description:
      'Бесконечное поле для экспериментов, в любом тыквенном супе используется, прежде всего, природная сладость рыжей мякоти тыквы, ее пластичность и бесконечная восприимчивость. Тыква легко впитывает новые ароматы, запросто притирается к другим продуктам и заигрывает со специями, неожиданно меняя свой вкус. Перед вами базовый рецепт, где рыжая тыква расцвечена пряничными ароматами имбиря и кардамона. Дальше можете менять его по своему усмотрению. Например, приготовить суп с мелко рубленными грецкими орехами (вегетарианский вариант), усилить при помощи куриной печенки или добавить азиатскую нотку, заменив обычные сливки на кокосовые, петрушку на кинзу, а сверху в тарелку кинув горсть обжаренных креветок.',
    totalIngredients: [
      { name: 'Тыква', amount: 1.5, unit: 'кг' },
      { name: 'Лук репчатый', amount: 1, unit: 'шт.' },
      { name: 'Чеснок', amount: 2, unit: 'зубчика' },
      { name: 'Бульон', amount: 1, unit: 'л' },
      { name: 'Сливки 30%', amount: 200, unit: 'мл' },
      { name: 'Петрушка', amount: 10, unit: 'г' },
      { name: 'Соль', amount: 0.5, unit: 'ч.л.' },
      { name: 'Перец', amount: 0.2, unit: 'ч.л.' },
    ],
    steps: [
      {
        description:
          'Тыкву очистить от кожуры и семян, нарезать крупными кубиками со стороной 3–4 см.',
        ingredients: [{ name: 'Тыква', amount: 1.5, unit: 'кг' }],
        img: '/images/recipes/recipe-3/step-1.png',
      },
      {
        description: 'Лук нарезать полукольцами.',
        ingredients: [{ name: 'Лук репчатый', amount: 1, unit: 'шт.' }],
        img: '/images/recipes/recipe-3/step-2.png',
      },
      {
        description:
          'Поместить тыкву, лук и целые зубчики чеснока в кастрюлю, залить куриным или овощным бульоном.',
        ingredients: [
          { name: 'Чеснок', amount: 2, unit: 'зубчика' },
          { name: 'Бульон', amount: 1, unit: 'л' },
        ],
        img: '/images/recipes/recipe-3/step-3.png',
      },
      {
        description:
          'Довести до кипения и варить на среднем огне до готовности тыквы — около 10 минут.',
        ingredients: [],
        img: '/images/recipes/recipe-3/step-4.png',
      },
      {
        description:
          'Выключить огонь и пробить суп погружным блендером до однородной консистенции.',
        ingredients: [],
        img: '/images/recipes/recipe-3/step-5.png',
      },
      {
        description:
          'Приправить суп солью, перцем и специями. Вмешать сливки, оставив немного для подачи.',
        ingredients: [
          { name: 'Сливки 30%', amount: 200, unit: 'мл' },
          { name: 'Соль', amount: 0.5, unit: 'ч.л.' },
          { name: 'Перец', amount: 0.2, unit: 'ч.л.' },
        ],
        img: '/images/recipes/recipe-3/step-6.png',
      },
      {
        description: 'Петрушку мелко порубить.',
        ingredients: [{ name: 'Петрушка', amount: 10, unit: 'г' }],
        img: '/images/recipes/recipe-3/step-7.png',
      },
      {
        description: 'Разлить суп по тарелкам, украсить сливками и петрушкой.',
        ingredients: [],
        img: '/images/recipes/recipe-3/step-8.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r4',
    name: 'Овощной салат по-итальянски',
    category: 'rc3',
    img: '/images/recipes/recipe-4/main.jpg',
    time: 20,
    difficulty: 1,
    description:
      'Салат — холодное блюдо, состоящее из одного вида или смеси разных видов сочетающихся между собой нарезанных продуктов в заправке.',
    totalIngredients: [
      { name: 'Цукини', amount: 800, unit: 'г' },
      { name: 'Репчатый лук', amount: 2, unit: 'шт.' },
      { name: 'Чеснок', amount: 2, unit: 'зубчика' },
      { name: 'Масло сливочное', amount: 2, unit: 'ст.л.' },
      { name: 'Помидоры черри', amount: 250, unit: 'г' },
      { name: 'Овощной бульон', amount: 250, unit: 'мл' },
      { name: 'Лимонный сок', amount: 30, unit: 'мл' },
      { name: 'Зелень', amount: 150, unit: 'г' },
      { name: 'Зелёный салат', amount: 1, unit: 'стебель' },
    ],
    steps: [
      {
        description:
          'Цукини вымыть, обсушить, разрезать сначала вдоль на 4 части, затем нарезать поперек небольшими кусочками. Лук нарезать тонкими кольцами, чеснок пропустить через пресс. Помидоры вымыть, обсушить, нарезать на половинки.',
        ingredients: [
          { name: 'Цукини', amount: 800, unit: 'г' },
          { name: 'Репчатый лук', amount: 2, unit: 'шт.' },
          { name: 'Чеснок', amount: 2, unit: 'зубчика' },
          { name: 'Помидоры черри', amount: 250, unit: 'г' },
        ],
        img: '/images/recipes/recipe-4/step-1.png',
      },
      {
        description:
          'Лук с чесноком пассеровать в сливочном масле минут 8. Добавить кусочки цукини и половинки помидоров, влить бульон и варить на среднем огне минут 6–8. Посолить, поперчить, приправить сахаром и лимонным соком.',
        ingredients: [
          { name: 'Масло сливочное', amount: 2, unit: 'ст.л.' },
          { name: 'Овощной бульон', amount: 250, unit: 'мл' },
          { name: 'Лимонный сок', amount: 30, unit: 'мл' },
        ],
        img: '/images/recipes/recipe-4/step-2.png',
      },
      {
        description:
          'Свежую зелень и салатные листья перебрать, вымыть, обсушить. Зелень мелко нарезать и подмешать к теплым овощам. Салатные листья разложить на тарелках и выложить горками салат. Подавать как теплым, так и холодным.',
        ingredients: [
          { name: 'Зелень', amount: 150, unit: 'г' },
          { name: 'Зелёный салат', amount: 1, unit: 'стебель' },
        ],
        img: '/images/recipes/recipe-4/step-3.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r5',
    name: 'Блинчики со сливочным кремом, малиной и мятой',
    category: 'rc4',
    img: '/images/recipes/recipe-5/main.jpg',
    time: 30,
    difficulty: 2,
    description:
      'Обычные блины станут гораздо вкуснее, если добавить в состав малину. При желании эту ягоду можно заменить любой другой. Рецепт универсален, следуя ему, можно приготовить клубничные, черничные или смородиновые блинчики. Также можно использовать фрукты, но их необходимо измельчить в блендере, а не промять через сито, чтобы получить мягкое пюре.',
    totalIngredients: [
      { name: 'Молоко', amount: 2, unit: 'стакана' },
      { name: 'Мука пшеничная', amount: 2, unit: 'стакана' },
      { name: 'Куриное яйцо', amount: 1, unit: 'шт.' },
      { name: 'Сахар', amount: 3, unit: 'ст.л.' },
      { name: 'Соль', amount: 0.5, unit: 'ч.л.' },
      { name: 'Масло растительное', amount: 4, unit: 'ст.л.' },
      { name: 'Сода', amount: 1, unit: 'ст.л.' },
      { name: 'Сливочный крем', amount: 150, unit: 'г' },
      { name: 'Сахарная пудра', amount: 0.5, unit: 'стакана' },
      { name: 'Малина', amount: 200, unit: 'г' },
      { name: 'Свежая мята', amount: 20, unit: 'г' },
    ],
    steps: [
      {
        description:
          'В глубокую миску добавить яйцо, сахар, соль (последнюю можно добавить позднее, на этапе добавления муки). Взбить венчиком.',
        ingredients: [
          { name: 'Куриное яйцо', amount: 1, unit: 'шт.' },
          { name: 'Сахар', amount: 3, unit: 'ст.л.' },
          { name: 'Соль', amount: 0.5, unit: 'ч.л.' },
        ],
        img: '/images/recipes/recipe-5/step-1.png',
      },
      {
        description: 'Вылить молоко, взбить.',
        ingredients: [{ name: 'Молоко', amount: 2, unit: 'стакана' }],
        img: '/images/recipes/recipe-5/step-2.png',
      },
      {
        description: 'Постепенно засыпать муку. Взбить до однородности, чтобы не было комочков.',
        ingredients: [{ name: 'Мука пшеничная', amount: 2, unit: 'стакана' }],
        img: '/images/recipes/recipe-5/step-3.png',
      },
      {
        description:
          'Добавить растительное масло, перемешать. Если делать блины с гашеной содой, добавить ее на этом этапе и перемешать.',
        ingredients: [
          { name: 'Масло растительное', amount: 4, unit: 'ст.л.' },
          { name: 'Сода', amount: 1, unit: 'ст.л.' },
        ],
        img: '/images/recipes/recipe-5/step-4.png',
      },
      {
        description:
          'Жарить блинчики на разогретой сковороде на медленном огне. Вылить блинную смесь половником, небольшое количество. Жарить до образования мелких пузырьков по всей поверхности блина, переворачивать и жарить 10 секунд. Повторять.',
        ingredients: [],
        img: '/images/recipes/recipe-5/step-5.png',
      },
      {
        description:
          'Для сливочного крема смешать крем, пудру и молоко (можно заменить сливками). Молока на глаз, должна получиться консистенция густого крема.',
        ingredients: [
          { name: 'Сливочный крем', amount: 150, unit: 'г' },
          { name: 'Сахарная пудра', amount: 0.5, unit: 'стакана' },
        ],
        img: '/images/recipes/recipe-5/step-6.png',
      },
      {
        description: 'Подавать блины, украшая кремом, малиной и мятой.',
        ingredients: [
          { name: 'Малина', amount: 200, unit: 'г' },
          { name: 'Свежая мята', amount: 20, unit: 'г' },
        ],
        img: '/images/recipes/recipe-5/step-7.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r6',
    name: 'Ролл филадельфия',
    category: 'rc5',
    img: '/images/recipes/recipe-6/main.jpg',
    time: 30,
    difficulty: 1,
    description:
      'Ролл «Филадельфия» — разновидность суши, обычно сделанные из копченого лосося, сливочного сыра и огурца. Они также могут включать в себя другие ингредиенты, такие как другие виды рыбы, авокадо, зелёный лук и семена кунжута.',
    totalIngredients: [
      { name: 'Рис для суши', amount: 120, unit: 'г' },
      { name: 'Сухие водоросли нори', amount: 1, unit: 'г' },
      { name: 'Авокадо', amount: 1, unit: 'шт.' },
      { name: 'Лосось', amount: 60, unit: 'г' },
      { name: 'Огурец', amount: 1, unit: 'шт.' },
      { name: 'Сыр филадельфия', amount: 35, unit: 'г' },
    ],
    steps: [
      {
        description: 'Положите водоросли нори блестящей стороной вниз на макисо.',
        ingredients: [{ name: 'Сухие водоросли нори', amount: 1, unit: 'г' }],
        img: '/images/recipes/recipe-6/step-1.png',
      },
      {
        description:
          'Выложите ровным слоем рис на прессованные водоросли нори, смочив руки в тэдзу, оставляя дальний от вас край на 1 см без риса. Переверните лист таким образом, чтобы рис оказался на поверхности бамбуковой циновки.',
        ingredients: [{ name: 'Рис для суши', amount: 120, unit: 'г' }],
        img: '/images/recipes/recipe-6/step-2.png',
      },
      {
        description: 'Посередине водорослей нори нанесите васаби, затем сыр «Филадельфия».',
        ingredients: [{ name: 'Сыр филадельфия', amount: 35, unit: 'г' }],
        img: '/images/recipes/recipe-6/step-3.png',
      },
      {
        description:
          'Очищенные от кожуры огурец и авокадо нарежьте на полоски и выложите на середину нори.',
        ingredients: [
          { name: 'Авокадо', amount: 1, unit: 'шт.' },
          { name: 'Огурец', amount: 1, unit: 'шт.' },
        ],
        img: '/images/recipes/recipe-6/step-4.png',
      },
      {
        description:
          'После наполнения ролла начните его аккуратно скручивать, затем несильно надавите на циновку. Прижмите на середине и сделайте брусочек из ролла.',
        ingredients: [{ name: 'Сыр филадельфия', amount: 35, unit: 'г' }],
        img: '/images/recipes/recipe-6/step-5.png',
      },
      {
        description:
          'Нарежьте лосось тонкими кусочками и положите на ролл, слегка прижимая к нему.',
        ingredients: [{ name: 'Лосось', amount: 60, unit: 'г' }],
        img: '/images/recipes/recipe-6/step-6.png',
      },
      {
        description:
          'Нарежьте ролл «Филадельфия» на 6 равных кусков и подавайте к столу с маринованным имбирем, васаби, соевым соусом.',
        ingredients: [],
        img: '/images/recipes/recipe-6/step-7.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r7',
    name: 'Вишнёвый пирог',
    category: 'rc6',
    img: '/images/recipes/recipe-7/main.jpg',
    time: 240,
    difficulty: 3,
    description:
      'Чистый незамутненный вкус вишни. Ягодный сок сдерживается крахмалом, и он тут обязательный ингредиент, иначе тесто промокнет.',
    totalIngredients: [
      { name: 'Мука пшеничная', amount: 240, unit: 'г' },
      { name: 'Соль', amount: 0.5, unit: 'ч.л.' },
      { name: 'Маргарин', amount: 250, unit: 'г' },
      { name: 'Вода', amount: 6, unit: 'ст.л.' },
      { name: 'Сахар', amount: 200, unit: 'г' },
      { name: 'Крахмал', amount: 30, unit: 'г' },
      { name: 'Замороженная вишня', amount: 900, unit: 'г' },
    ],
    steps: [
      {
        description:
          'Замороженную вишню смешать с сахаром в сотейнике и на небольшом огне довести до кипения. Процедить сироп и дать остыть.',
        ingredients: [
          { name: 'Замороженная вишня', amount: 900, unit: 'г' },
          { name: 'Сахар', amount: 200, unit: 'г' },
        ],
        img: '/images/recipes/recipe-7/step-1.png',
      },
      {
        description:
          'Добавить крахмал в остывший сироп, перемешать венчиком до однородной консистенции, поставить на средний огонь и, помешивая венчиком, довести до густоты. Смешать с вишней.',
        ingredients: [{ name: 'Крахмал', amount: 30, unit: 'г' }],
        img: '/images/recipes/recipe-7/step-2.png',
      },
      {
        description:
          'Смешать муку с солью, руками вмешать маргарин до состояния крошки. Добавлять по ложке ледяной воды и перемешивать тесто до тех пор, пока оно не будет собираться в шар. Разделить тесто на две равные части, обернуть их пленкой и убрать в холодильник на 45 минут.',
        ingredients: [
          { name: 'Мука пшеничная', amount: 240, unit: 'г' },
          { name: 'Маргарин', amount: 250, unit: 'г' },
          { name: 'Соль', amount: 0.5, unit: 'ч.л.' },
          { name: 'Вода', amount: 6, unit: 'ст.л.' },
        ],
        img: '/images/recipes/recipe-7/step-3.png',
      },
      {
        description:
          'Раскатать половину теста на подпыленной мукой поверхности в круг, который поместится в форму диаметром 20 см. Переложить тесто в форму при помощи скалки, прижать его ко дну и краям формы.',
        ingredients: [],
        img: '/images/recipes/recipe-7/step-4.png',
      },
      {
        description:
          'Выложить вишневую начинку, накрыть второй частью теста, фигурно залепить края и прорезать ножом несколько отверстий для выхода пара. Закрыть края пирога фольгой, чтобы они не подгорели. Отправить пирог в духовку, разогретую до 220 градусов, на 35–45 минут. В последние 15 минут выпекания снять фольгу. Готовый пирог охладить в течение 2 часов или дольше.',
        ingredients: [],
        img: '/images/recipes/recipe-7/step-5.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r8',
    name: 'Абрикосовое варенье с косточками',
    category: 'rc7',
    img: '/images/recipes/recipe-8/main.jpg',
    time: 120,
    difficulty: 2,
    description:
      'Варенье абрикосовое — десерт из абрикосов, получаемый путем варки плода с сахаром. Для варенья подойдут крупные и плотные абрикосы со сладкой косточкой. Иногда из косточек вытаскивают зернышки и добавляют несколько штук в банку для вкуса. Технологии приготовления могут быть разные, как и дополнительные ингредиенты.',
    totalIngredients: [
      { name: 'Абрикосы', amount: 2, unit: 'кг' },
      { name: 'Сахар', amount: 2, unit: 'кг' },
      { name: 'Абрикосовые косточки', amount: 500, unit: 'г' },
      { name: 'Лимонная цедра', amount: 1, unit: 'ст.л.' },
      { name: 'Мускатный орех', amount: 1, unit: 'г' },
    ],
    steps: [
      {
        description:
          'Абрикосы вымыть, высушить, разрезать пополам, косточки выбросить. Чистые половинки взвесить, засыпать в тазу сахаром, потрясти его.',
        ingredients: [
          { name: 'Абрикосы', amount: 2, unit: 'кг' },
          { name: 'Сахар', amount: 2, unit: 'кг' },
        ],
        img: '/images/recipes/recipe-8/step-1.png',
      },
      {
        description:
          'Когда абрикосовый сок наконец растопит сахар (зависит от сорта и спелости фруктов), отправить таз на первую варку. Огонь маленький, внимание высокое. Если плоды сочные, сироп начнет прибавляться буквально на глазах. Отличный знак! Потрясти таз и закрутить его так, чтобы пеночка собралась к центру — снять ее всю без остатка, выключить огонь и дать варенью отдохнуть. Час-два или до утра, вам решать.',
        ingredients: [],
        img: '/images/recipes/recipe-8/step-2.png',
      },
      {
        description:
          'Абрикосточки залить кипятком и оставить на два часа. Ядра после будут легко выскакивать из своих шкурок — достаточно просто сжать их пальцами с боков.',
        ingredients: [{ name: 'Абрикосовые косточки', amount: 500, unit: 'г' }],
        img: '/images/recipes/recipe-8/step-3.png',
      },
      {
        description:
          'Вторая варка. Пока ждем появления пузырьков, несколько раз кружим таз. Сироп постепенно густеет, становится янтарно-терракотовым, аромат — медовым, с островатой нотой. Собрать всю пенку, забросить ядра абрикосточек, столовую ложку тонко нарезанной цедры лимона и натертый на мелкой терке мускатный орех. Проверить сироп на каплю. Получилась идеальная линзочка? Выключить огонь.',
        ingredients: [
          { name: 'Лимонная цедра', amount: 1, unit: 'ст.л.' },
          { name: 'Мускатный орех', amount: 1, unit: 'г' },
        ],
        img: '/images/recipes/recipe-8/step-4.png',
      },
      {
        description:
          'К абрикосовому варенью заварить терпкий иван-чай или сенчу, подавать творожные мини-ватрушки, безе с миндальным кремом или черемуховый торт.',
        ingredients: [],
        img: '/images/recipes/recipe-8/step-5.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r9',
    name: 'Мохито безалкогольный',
    category: 'rc8',
    img: '/images/recipes/recipe-9/main.jpg',
    time: 5,
    difficulty: 1,
    description:
      'Мохито — освежающий напиток родом с Кубы и один из самых популярных коктейлей по версии Международной ассоциации барменов. В его вкусе сочетаются свежесть мяты, кислинка лайма и лёгкая сладость, поэтому напиток хорошо утоляет жажду, да и просто очень вкусный.',
    totalIngredients: [
      { name: 'Свежая мята', amount: 10, unit: 'г' },
      { name: 'Лайм', amount: 0.5, unit: 'шт.' },
      { name: 'Спрайт', amount: 150, unit: 'мл' },
      { name: 'Лёд', amount: 8, unit: 'кусков' },
      { name: 'Тростниковый сахар', amount: 1, unit: 'ч.л.' },
    ],
    steps: [
      {
        description: 'Нарезаем лайм и кладем в бокал.',
        ingredients: [{ name: 'Лайм', amount: 0.5, unit: 'шт.' }],
        img: '/images/recipes/recipe-9/step-1.png',
      },
      {
        description: 'Добавляем мяту, тростниковый сахар и разминаем.',
        ingredients: [
          { name: 'Свежая мята', amount: 10, unit: 'г' },
          { name: 'Тростниковый сахар', amount: 1, unit: 'ч.л.' },
        ],
        img: '/images/recipes/recipe-9/step-2.png',
      },
      {
        description: 'Добавляем ледяную крошку и перекладываем смесь в шейкер. Взбиваем.',
        ingredients: [{ name: 'Лёд', amount: 8, unit: 'кусков' }],
        img: '/images/recipes/recipe-9/step-3.png',
      },
      {
        description: 'Перекладываем в бокал и заливаем спрайтом.',
        ingredients: [{ name: 'Спрайт', amount: 150, unit: 'мл' }],
        img: '/images/recipes/recipe-9/step-4.png',
      },
      {
        description: 'Декорируем коктейль листиком мяты и лаймом — напиток готов.',
        ingredients: [],
        img: '/images/recipes/recipe-9/step-5.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r10',
    name: 'Томатный соус с базиликом',
    category: 'rc9',
    img: '/images/recipes/recipe-10/main.jpg',
    time: 15,
    difficulty: 2,
    description:
      'Томатный соус — это густой соус из перетертых со специями помидоров. Существует множество видов томатного соуса с разным составом и различной технологией приготовления. Он может быть острым, пряным, сладковатым, с кислинкой. Практически в каждой национальной кухне можно встретить одну из вариаций томатного соуса.',
    totalIngredients: [
      { name: 'Лук репчатый', amount: 1, unit: 'шт.' },
      { name: 'Масло растительное', amount: 3, unit: 'ст.л.' },
      { name: 'Томатный соус', amount: 4, unit: 'ст.л.' },
      { name: 'Сушеный базилик', amount: 0.5, unit: 'ч.л.' },
      { name: 'Сушеный орегано', amount: 1, unit: 'ч.л.' },
      { name: 'Лавровый лист', amount: 1, unit: 'шт.' },
    ],
    steps: [
      {
        description: 'Мелко нарезать лук, пожарить на растительном масле и посолить.',
        ingredients: [
          { name: 'Лук репчатый', amount: 1, unit: 'шт.' },
          { name: 'Масло растительное', amount: 3, unit: 'ст.л.' },
        ],
        img: '/images/recipes/recipe-10/step-1.png',
      },
      {
        description: 'Убрать лук со скоровороды, отжав масло.',
        ingredients: [],
        img: '/images/recipes/recipe-10/step-2.png',
      },
      {
        description: 'В масло добавить перец, базилик, орегано, соус.',
        ingredients: [
          { name: 'Томатный соус', amount: 4, unit: 'ст.л.' },
          { name: 'Сушеный базилик', amount: 0.5, unit: 'ч.л.' },
          { name: 'Сушеный орегано', amount: 1, unit: 'ч.л.' },
        ],
        img: '/images/recipes/recipe-10/step-3.png',
      },
      {
        description: 'Все тушить 5-10 минут, постоянно помешивая.',
        ingredients: [],
        img: '/images/recipes/recipe-10/step-4.png',
      },
      {
        description: 'Выключить огонь, положить лавровый лист, закрыть крышкой и дать настояться.',
        ingredients: [{ name: 'Лавровый лист', amount: 1, unit: 'шт.' }],
        img: '/images/recipes/recipe-10/step-5.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r11',
    name: 'Напиток клюквенный',
    category: 'rc8',
    img: '/images/recipes/recipe-11/main.png',
    time: 10,
    difficulty: 1,
    description:
      'Напиток клюквенный - это традиционное русское блюдо, которое известно уже несколько столетий. Клюква, или брусника, является основным ингредиентом этого напитка. Он обладает освежающим кислым вкусом и имеет множество полезных свойств.',
    totalIngredients: [
      { name: 'Свежая клюква', amount: 500, unit: 'г' },
      { name: 'Свекла', amount: 1, unit: 'шт.' },
      { name: 'Яблоко', amount: 2.5, unit: 'кг' },
      { name: 'Сельдерей', amount: 1, unit: 'стебель' },
      { name: 'Лимон', amount: 0.5, unit: 'шт.' },
    ],
    steps: [
      {
        description: 'Выжмите сок из всех ингредиентов.',
        ingredients: [
          { name: 'Свежая клюква', amount: 500, unit: 'г' },
          { name: 'Свекла', amount: 1, unit: 'шт.' },
          { name: 'Яблоко', amount: 2.5, unit: 'кг' },
          { name: 'Сельдерей', amount: 1, unit: 'стебель' },
          { name: 'Лимон', amount: 0.5, unit: 'шт.' },
        ],
        img: '/images/recipes/recipe-11/step-1.png',
      },
      {
        description: 'Хорошо перемешайте и подавайте в большом кувшине.',
        ingredients: [],
        img: '/images/recipes/recipe-11/step-2.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r12',
    name: 'Яблочный пирог',
    category: 'rc6',
    img: '/images/recipes/recipe-12/main.png',
    time: 30,
    difficulty: 2,
    description:
      'Яблочный пирог — одна из самых распространённых разновидностей пирога, для начинки которого используются яблоки. Яблочный пирог является одним из основных десертных блюд кулинарии разных европейских народов, в том числе и русских. Для приготовления яблочного пирога можно использовать несколько видов теста: дрожжевое, песочное, слоёное, вытяжное. В ингредиенты обязательно входят яйца, сливочное масло и мука. Самые нежные и пышные яблочные пироги обычно получаются из дрожжевого теста.',
    totalIngredients: [
      { name: 'Сливочное масло', amount: 150, unit: 'г' },
      { name: 'Яблоко', amount: 5, unit: 'шт.' },
      { name: 'Мука пшеничная', amount: 300, unit: 'г' },
      { name: 'Сахар', amount: 4, unit: 'ст. л.' },
      { name: 'Тростниковый сахар', amount: 3, unit: 'ст. л.' },
      { name: 'Кальвадос', amount: 4, unit: 'ст. л.' },
    ],
    steps: [
      {
        description: 'Яблоки очистить, крупно нарезать.',
        ingredients: [{ name: 'Яблоко', amount: 5, unit: 'шт.' }],
        img: '/images/recipes/recipe-12/step-1.png',
      },
      {
        description:
          'На сковородке растопить 3 столовые ложки масла и тростниковый сахар. В эту карамель кинуть яблоки, потушить, добавить кальвадос.',
        ingredients: [
          { name: 'Сливочное масло', amount: 150, unit: 'г' },
          { name: 'Тростниковый сахар', amount: 3, unit: 'ст. л.' },
          { name: 'Кальвадос', amount: 4, unit: 'ст. л.' },
        ],
        img: '/images/recipes/recipe-12/step-2.png',
      },
      {
        description:
          'Масло натереть на терке, смешать с мукой и сахаром. Посыпать этой смесью яблоки.',
        ingredients: [
          { name: 'Мука пшеничная', amount: 300, unit: 'г' },
          { name: 'Сахар', amount: 4, unit: 'ст. л.' },
        ],
        img: '/images/recipes/recipe-12/step-3.png',
      },
      {
        description: 'Отправить в духовку на 30 минут.',
        ingredients: [],
        img: '/images/recipes/recipe-12/step-4.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r13',
    name: 'Закуска с семгой и ветчиной',
    category: 'rc5',
    img: '/images/recipes/recipe-13/main.png',
    time: 15,
    difficulty: 1,
    description:
      'Если вам хочется приготовить что-то необычное на закуску и порадовать своих близких, то предлагаю приготовить сендвич-рулет с семгой.',
    totalIngredients: [
      { name: 'Армянский лаваш', amount: 2, unit: 'шт.' },
      { name: 'Слабосоленая семга', amount: 300, unit: 'г' },
      { name: 'Ветчина', amount: 300, unit: 'г' },
      { name: 'Зелень', amount: 10, unit: 'г' },
      { name: 'Плавленый сыр', amount: 300, unit: 'г' },
    ],
    steps: [
      {
        description: 'Лаваш смазать тонким слоем плавленного сыра.',
        ingredients: [
          { name: 'Армянский лаваш', amount: 2, unit: 'шт.' },
          { name: 'Плавленый сыр', amount: 300, unit: 'г' },
        ],
        img: '/images/recipes/recipe-13/step-1.png',
      },
      {
        description: 'Семгу нарезать тонкими пластинками.',
        ingredients: [{ name: 'Слабосоленая семга', amount: 300, unit: 'г' }],
        img: '/images/recipes/recipe-13/step-2.png',
      },
      {
        description: 'Выложить семгу на лаваш.',
        ingredients: [],
        img: '/images/recipes/recipe-13/step-3.png',
      },
      {
        description: 'Посыпать резаной зеленью.',
        ingredients: [{ name: 'Зелень', amount: 10, unit: 'г' }],
        img: '/images/recipes/recipe-13/step-4.png',
      },
      {
        description:
          'Лаваш с семгой свернуть в рулет и положить на 10-15 мин в морозилку. Достать и нарезать кусочками по 2-3 см.',
        ingredients: [],
        img: '/images/recipes/recipe-13/step-5.png',
      },
      {
        description: 'Так же сделать рулеты с ветчиной.',
        ingredients: [{ name: 'Ветчина', amount: 300, unit: 'г' }],
        img: '/images/recipes/recipe-13/step-6.png',
      },
    ],
    hidden: false,
  },
  {
    id: 'r14',
    name: 'Каша овсяная с вареньем',
    category: 'rc1',
    img: '/images/recipes/recipe-14/main.png',
    time: 30,
    difficulty: 1,
    description:
      'Каша овсяная с вареньем - это классическое русское блюдо, которое имеет давние корни и является одним из символов русской кухни. Овсяная каша в России была очень популярна и широко употреблялась на протяжении веков. Она служила основным пищевым продуктом для многих слоев населения, особенно для крестьян и бедных людей.',
    totalIngredients: [
      { name: 'Сахар', amount: 5, unit: 'г' },
      { name: 'Геркулес', amount: 75, unit: 'г' },
      { name: 'Молоко', amount: 150, unit: 'мл' },
      { name: 'Масло сливочное', amount: 5, unit: 'г' },
      { name: 'Варенье', amount: 30, unit: 'г' },
      { name: 'Вода', amount: 100, unit: 'мл' },
    ],
    steps: [
      {
        description:
          'В кипящее молоко с водой всыпать крупу, добавить сахар и соль, накрыть крышкой и при слабом кипении варить 1,5–2 часа, изредка помешивая.',
        ingredients: [
          { name: 'Сахар', amount: 5, unit: 'г' },
          { name: 'Геркулес', amount: 75, unit: 'г' },
          { name: 'Молоко', amount: 150, unit: 'мл' },
          { name: 'Вода', amount: 100, unit: 'мл' },
        ],
        img: '/images/recipes/recipe-14/step-1.png',
      },
      {
        description:
          'Перед подачей к столу в кашу положить масло, вымешать и полить сверху вареньем.',
        ingredients: [
          { name: 'Масло сливочное', amount: 5, unit: 'г' },
          { name: 'Варенье', amount: 30, unit: 'г' },
        ],
        img: '/images/recipes/recipe-14/step-2.png',
      },
    ],
    hidden: false,
  },
]
