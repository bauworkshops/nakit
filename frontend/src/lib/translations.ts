import { Language } from '@/contexts/LanguageContext';

export const translations = {
  // Navigation
  nav: {
    catalogue: {
      eng: 'Catalogue',
      rus: 'Каталог',
      srb: 'Katalog',
    },
    collections: {
      eng: 'Collections',
      rus: 'Коллекции',
      srb: 'Kolekcije',
    },
    packaging: {
      eng: 'Packaging',
      rus: 'Упаковка',
      srb: 'Pakovanje',
    },
    shops: {
      eng: 'Shops',
      rus: 'Магазины',
      srb: 'Prodavnice',
    },
    contacts: {
      eng: 'Contacts',
      rus: 'Контакты',
      srb: 'Kontakti',
    },
    toggleMenu: {
      eng: 'Toggle menu',
      rus: 'Открыть меню',
      srb: 'Otvori meni',
    },
    closeMenu: {
      eng: 'Close menu',
      rus: 'Закрыть меню',
      srb: 'Zatvori meni',
    },
  },

  // Common
  common: {
    loading: {
      eng: 'Loading...',
      rus: 'Загрузка...',
      srb: 'Učitavanje...',
    },
    error: {
      eng: 'Error',
      rus: 'Ошибка',
      srb: 'Greška',
    },
    tryAgain: {
      eng: 'Try again',
      rus: 'Попробовать снова',
      srb: 'Pokušaj ponovo',
    },
    notFound: {
      eng: 'Page not found',
      rus: 'Страница не найдена',
      srb: 'Stranica nije pronađena',
    },
    backToHome: {
      eng: '← Return to home',
      rus: '← Вернуться на главную',
      srb: '← Nazad na početnu',
    },
    errorDefault: {
      eng: 'Something went wrong',
      rus: 'Что-то пошло не так',
      srb: 'Nešto nije u redu',
    },
  },

  // Home page
  home: {
    title: {
      eng: 'Bau designs - Product Catalog',
      rus: 'Bau designs - Каталог продукции',
      srb: 'Bau designs - Katalog proizvoda',
    },
    description: {
      eng: 'Jewelry Catalog',
      rus: 'Каталог украшений',
      srb: 'Katalog nakita',
    },
    noProducts: {
      eng: 'No products found',
      rus: 'Продукты не найдены',
      srb: 'Proizvodi nisu pronađeni',
    },
    addProducts: {
      eng: 'Add products through Pocketbase admin panel',
      rus: 'Добавьте продукты через панель администратора Pocketbase',
      srb: 'Dodajte proizvode preko Pocketbase admin panela',
    },
  },

  // Catalogue page
  catalogue: {
    title: {
      eng: 'Catalogue',
      rus: 'Каталог',
      srb: 'Katalog',
    },
    loadingProducts: {
      eng: 'Loading products...',
      rus: 'Загрузка продуктов...',
      srb: 'Učitavanje proizvoda...',
    },
    noProducts: {
      eng: 'No products found',
      rus: 'Продукты не найдены',
      srb: 'Proizvodi nisu pronađeni',
    },
    resultsCount: {
      eng: 'products found',
      rus: 'продуктов найдено',
      srb: 'proizvoda pronađeno',
    },
  },

  // Collections page
  collections: {
    title: {
      eng: 'Collections',
      rus: 'Коллекции',
      srb: 'Kolekcije',
    },
    noCollections: {
      eng: 'No collections found',
      rus: 'Коллекции не найдены',
      srb: 'Kolekcije nisu pronađene',
    },
  },

  // Packaging page
  packaging: {
    title: {
      eng: 'Packaging',
      rus: 'Упаковка',
      srb: 'Pakovanje',
    },
    noItems: {
      eng: 'No packaging info',
      rus: 'Нет информации об упаковке',
      srb: 'Nema informacija o pakovanju',
    },
  },

  // Shops page
  shops: {
    title: {
      eng: 'Shops',
      rus: 'Магазины',
      srb: 'Prodavnice',
    },
    noShops: {
      eng: 'No shops found',
      rus: 'Магазины не найдены',
      srb: 'Prodavnice nisu pronađene',
    },
  },

  // Contacts page
  contacts: {
    title: {
      eng: 'Contacts',
      rus: 'Контакты',
      srb: 'Kontakti',
    },
    sectionTitle: {
      eng: 'Get in Touch',
      rus: 'Связаться с нами',
      srb: 'Kontaktirajte nas',
    },
    subtitle: {
      eng: 'We\'d love to hear from you. Here\'s how you can reach us.',
      rus: 'Мы будем рады услышать от вас. Вот как вы можете связаться с нами.',
      srb: 'Rado ćemo čuti od vas. Evo kako možete da nas kontaktirate.',
    },
    address: {
      eng: 'Address',
      rus: 'Адрес',
      srb: 'Adresa',
    },
    phone: {
      eng: 'Phone',
      rus: 'Телефон',
      srb: 'Telefon',
    },
    email: {
      eng: 'Email',
      rus: 'Эл. почта',
      srb: 'Email',
    },
    hours: {
      eng: 'Working Hours',
      rus: 'Часы работы',
      srb: 'Radno vreme',
    },
  },

  // Product details
  product: {
    backToCatalogue: {
      eng: '← To catalogue',
      rus: '← В каталог',
      srb: '← Nazad u katalog',
    },
    collection: {
      eng: 'Collection:',
      rus: 'Коллекция:',
      srb: 'Kolekcija:',
    },
    type: {
      eng: 'Type:',
      rus: 'Тип:',
      srb: 'Tip:',
    },
    color: {
      eng: 'Color:',
      rus: 'Цвет:',
      srb: 'Boja:',
    },
    features: {
      eng: 'Features:',
      rus: 'Особенности:',
      srb: 'Karakteristike:',
    },
    transformable: {
      eng: 'Transformable',
      rus: 'Трансформируемый',
      srb: 'Transformabilno',
    },
    stores: {
      eng: 'Stores:',
      rus: 'Магазины:',
      srb: 'Prodavnice:',
    },
    viewDetails: {
      eng: 'View Details',
      rus: 'Подробнее',
      srb: 'Pogledaj detalje',
    },
  },

  // Shop details
  shop: {
    backToShops: {
      eng: '← To shops',
      rus: '← К магазинам',
      srb: '← Nazad na prodavnice',
    },
    address: {
      eng: 'Address',
      rus: 'Адрес',
      srb: 'Adresa',
    },
    phone: {
      eng: 'Phone',
      rus: 'Телефон',
      srb: 'Telefon',
    },
    email: {
      eng: 'Email',
      rus: 'Эл. почта',
      srb: 'Email',
    },
    hours: {
      eng: 'Working Hours',
      rus: 'Часы работы',
      srb: 'Radno vreme',
    },
    noAddress: {
      eng: 'No address provided',
      rus: 'Адрес не указан',
      srb: 'Adresa nije navedena',
    },
    noPhone: {
      eng: 'No phone provided',
      rus: 'Телефон не указан',
      srb: 'Telefon nije naveden',
    },
    imageAlt: {
      eng: 'Shop preview',
      rus: 'Превью магазина',
      srb: 'Pregled prodavnice',
    },
  },

  // Filters
  filter: {
    title: {
      eng: 'Filter Products',
      rus: 'Фильтр продуктов',
      srb: 'Filtriraj proizvode',
    },
    collection: {
      eng: 'Collection',
      rus: 'Коллекция',
      srb: 'Kolekcija',
    },
    type: {
      eng: 'Type',
      rus: 'Тип',
      srb: 'Tip',
    },
    color: {
      eng: 'Color',
      rus: 'Цвет',
      srb: 'Boja',
    },
    priceRange: {
      eng: 'Price Range',
      rus: 'Диапазон цен',
      srb: 'Cenovni opseg',
    },
    transformable: {
      eng: 'Transformable',
      rus: 'Трансформируемый',
      srb: 'Transformabilno',
    },
    all: {
      eng: 'All',
      rus: 'Все',
      srb: 'Sve',
    },
    yes: {
      eng: 'Yes',
      rus: 'Да',
      srb: 'Da',
    },
    no: {
      eng: 'No',
      rus: 'Нет',
      srb: 'Ne',
    },
    minPrice: {
      eng: 'Min',
      rus: 'Мин',
      srb: 'Min',
    },
    maxPrice: {
      eng: 'Max',
      rus: 'Макс',
      srb: 'Maks',
    },
    resetFilters: {
      eng: 'Reset Filters',
      rus: 'Сбросить фильтры',
      srb: 'Resetuj filtere',
    },
    sortBy: {
      eng: 'Sort By',
      rus: 'Сортировать',
      srb: 'Sortiraj po',
    },
    sortNewest: {
      eng: 'Newest First',
      rus: 'Сначала новые',
      srb: 'Najnovije prvo',
    },
    sortOldest: {
      eng: 'Oldest First',
      rus: 'Сначала старые',
      srb: 'Najstarije prvo',
    },
    sortPriceAsc: {
      eng: 'Price: Low to High',
      rus: 'Цена: от низкой к высокой',
      srb: 'Cena: od niske ka visokoj',
    },
    sortPriceDesc: {
      eng: 'Price: High to Low',
      rus: 'Цена: от высокой к низкой',
      srb: 'Cena: od visoke ka niskoj',
    },
    sortTitleAsc: {
      eng: 'Name: A-Z',
      rus: 'Название: А-Я',
      srb: 'Ime: A-Z',
    },
    sortTitleDesc: {
      eng: 'Name: Z-A',
      rus: 'Название: Я-А',
      srb: 'Ime: Z-A',
    },
  },

  // Language switcher
  language: {
    eng: 'ENG',
    rus: 'РУС',
    srb: 'СРБ',
  },
};

export function useTranslation() {
  // This is a placeholder that will be replaced with actual hook usage in components
  // For now, return a function that takes a path and returns translations
  return (path: string): Record<Language, string> => {
    const keys = path.split('.');
    let current: any = translations;
    for (const key of keys) {
      current = current[key];
      if (!current) return { eng: '', rus: '', srb: '' };
    }
    return current;
  };
}

