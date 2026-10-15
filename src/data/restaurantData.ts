export interface MenuItem {
  id: string;
  category: 'entrees' | 'plats' | 'desserts' | 'cocktails' | 'vins';
  name: string;
  description: string;
  price: number;
  highlight?: string;
  dietary?: string;
  pairing?: string;
  image?: string;
}

export interface DiningZone {
  id: string;
  name: string;
  capacity: string;
  ambiance: string;
  features: string[];
  description: string;
  image: string;
  tag: string;
}

export interface TastingMenu {
  name: string;
  coursesCount: number;
  price: number;
  winePairingPrice: number;
  description: string;
  courses: {
    number: string;
    title: string;
    description: string;
    pairing: string;
  }[];
}

export const RESTAURANT_IMAGES = {
  hero: '/src/assets/images/morra_facade_twilight_1792092241140.jpg',
  interior: '/src/assets/images/morra_interior_grand_salon_1792092243208.jpg',
  dish: '/src/assets/images/morra_dish_signature_sculpture_1792092242680.jpg',
  cocktail: '/src/assets/images/morra_cocktail_reflecting_pool_1792092243573.jpg',
  mezzanine: '/src/assets/images/morra_mezzanine_night_1792092243966.jpg',
};

export const RESTAURANT_INFO = {
  name: 'MORRA',
  subtitle: 'Restaurant & Pavillon Culinaire',
  tagline: 'Haute Gastronomie & Architecture de Travertin',
  address: '42 Esplanade des Cariatides, 75008 Paris',
  phone: '+33 1 47 23 80 00',
  email: 'concierge@restaurant-morra.com',
  metro: 'Franklin D. Roosevelt · George V (Ligne 1)',
  valet: 'Service Voiturier Privé & Cour d’Honneur dédiée',
  chef: 'Alexandre Morra & Éléonore Vance',
  sommelier: 'Maximilien de Courcy (Meilleur Sommelier de France)',
  architect: 'Studio Calacatta & Morra Associés',
  hours: [
    { days: 'Mardi — Samedi', lunch: '12h00 – 14h30', dinner: '19h00 – 23h30' },
    { days: 'Dimanche', lunch: '12h00 – 16h00 (Le Grand Déjeuner des Arches)', dinner: 'Fermé' },
    { days: 'Lundi', lunch: 'Fermé', dinner: 'Fermé' }
  ]
};

export const DINING_ZONES: DiningZone[] = [
  {
    id: 'grand-salon-arches',
    name: 'Le Grand Salon sous les Arches',
    capacity: '2 à 6 convives',
    ambiance: 'Majestueuse & Lumineuse',
    features: ['Arches de travertin de 8 mètres', 'Lustres vénitiens en cristal pur', 'Vue directe sur le bassin miroir illuminé'],
    description: 'Au rez-de-chaussée, sous des voûtes monumentales en pierre calcaire dorée, ce salon baigne dans une clarté féerique entre les reflets du miroir d’eau extérieur et la danse des chandelles.',
    image: RESTAURANT_IMAGES.interior,
    tag: 'Cœur Monumental'
  },
  {
    id: 'portail-sculpte',
    name: 'Le Sanctuaire du Portail Pétales',
    capacity: '2 à 4 convives',
    ambiance: 'Sculpturale & Intimiste',
    features: ['Encadrement en corolle de travertin', 'Éclairage rasant chaleureux 2200K', 'Acoustique feutrée enveloppante'],
    description: 'Niché à l’aplomb de la sculpture organique centrale qui donne son âme à la façade de MORRA. Un écrin confidentiel célébrant l’art de la matière et la haute discrétion.',
    image: RESTAURANT_IMAGES.hero,
    tag: 'Signature Architecturale'
  },
  {
    id: 'mezzanine-panoramique',
    name: 'La Mezzanine Céleste',
    capacity: '2 à 8 convives',
    ambiance: 'Plongeante & Exclusivité',
    features: ['Vue aérienne sur le grand salon', 'Garde-corps en laiton bronzé', 'Service sommelier privé dédié'],
    description: 'En surplomb des arches majestueuses, l’étage offre une vue spectaculaire sur les jeux d’eau du parvis et le ballet feutré de la salle de restaurant.',
    image: RESTAURANT_IMAGES.mezzanine,
    tag: 'Belvédère d’Exception'
  },
  {
    id: 'bassin-fontaines',
    name: 'Le Parvis & Tables des Fontaines',
    capacity: '2 à 6 convives',
    ambiance: 'Extérieure & Scénographique',
    features: ['Bordure du miroir d’eau', 'Orbes lumineux dorés dans les haies', 'Murmure apaisant des jets d’eau'],
    description: 'Aux beaux soirs, installez-vous au bord du bassin réfléchissant. Le spectacle des fontaines dansantes et des globes lumineux crée une féerie nocturne inégalée.',
    image: RESTAURANT_IMAGES.hero,
    tag: 'Féerie Aquatique'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Entrées
  {
    id: 'entree-1',
    category: 'entrees',
    name: 'La Corolle de Saint-Jacques & Caviar Impérial',
    description: 'Pétales de coquilles de plongée dressés en fleur sculptée, gelée de clémentine infusée au safran, émulsion de corail et perles d’Osciètre de Sologne.',
    price: 42,
    highlight: 'Hommage au Portail Pétales',
    dietary: 'Sans gluten',
    pairing: 'Domaine Leflaive Puligny-Montrachet 1er Cru 2020',
    image: RESTAURANT_IMAGES.dish
  },
  {
    id: 'entree-2',
    category: 'entrees',
    name: 'Artichaut Poivrade en Calcaire de Truffe d’Alba',
    description: 'Cœurs fondants confits à l’huile d’olive de Ligurie, sabayon tiède au vin jaune du Jura, voile de parmesan 36 mois et râpée de truffe blanche.',
    price: 36,
    highlight: 'Création Végétale',
    dietary: 'Végétarien',
    pairing: 'Château-Chalon Domaine Macle 2014'
  },
  {
    id: 'entree-3',
    category: 'entrees',
    name: 'Foie Gras de Canard Marbré au Cacao Cru & Cognac XO',
    description: 'Pressé au torchon, gelée translucide de muscat de Rivesaltes, brioche feuilletée tiède à la fleur de sel de Guérande et éclats de fèves torréfiées.',
    price: 38,
    highlight: 'Classique Revisité',
    pairing: 'Château d’Yquem 1er Cru Supérieur Sauternes 2011'
  },

  // Plats
  {
    id: 'plat-1',
    category: 'plats',
    name: 'Turbot Sauvage de Ligne & Émulsion au Safran d’Iran',
    description: 'Nacre délicate saisie sur peau croustillante, mousseline de céleri fumé au bois de sarment, salicornes croquantes et jus marin monté au beurre de baratte.',
    price: 68,
    highlight: 'Poisson Noble',
    dietary: 'Sans gluten',
    pairing: 'Meursault-Charmes 1er Cru Domaine des Comtes Lafon 2019'
  },
  {
    id: 'plat-2',
    category: 'plats',
    name: 'Filet de Wagyu Kagoshima A5 au Feu de Vigne',
    description: 'Saisi minute sur les braises, millefeuille de pomme de terre croustillante au beurre noisette, moelle fumée et réduction intense de Porto vintage.',
    price: 88,
    highlight: 'Bouchée d’Exception',
    pairing: 'Château Cheval Blanc 1er Grand Cru Classé A Saint-Émilion 2015'
  },
  {
    id: 'plat-3',
    category: 'plats',
    name: 'Pigeon Royal de Bresse en Deux Cuissons',
    description: 'Suprême rôti rosé sur carcasse, cuisse confite en croustille de sarrasin, jus perlé aux mûres sauvages et mousserons sautés.',
    price: 62,
    highlight: 'Terroir & Finesse',
    pairing: 'Côte-Rôtie La Landonne E. Guigal 2017'
  },
  {
    id: 'plat-4',
    category: 'plats',
    name: 'Morilles Royales Farcies & Gnocchis de Ricotta Fumée',
    description: 'Farcies d’une étuvée de mousserons et noix de Grenoble, bouillon émulsionné au cerfeuil tubéreux, copeaux de truffe fraîche.',
    price: 52,
    highlight: 'Signature Végétale',
    dietary: 'Végétarien',
    pairing: 'Hermitage Blanc Domaine Jean-Louis Chave 2018'
  },

  // Desserts
  {
    id: 'dessert-1',
    category: 'desserts',
    name: 'La Rose de Travertin & Chocolat Criollo 75%',
    description: 'Sculpture comestible en chocolat blanc soufflé craquant, crémeux grand cru Chuao, praliné feuilleté à la noisette du Piémont et glace fève tonka.',
    price: 26,
    highlight: 'Architecture Sucrée',
    pairing: 'Rivesaltes Ambré Domaine Fontanel 1999'
  },
  {
    id: 'dessert-2',
    category: 'desserts',
    name: 'Sphère Minérale aux Agrumes Rares & Champagne Rosé',
    description: 'Coque de sucre soufflé translucide, confit de cédrat de Corse et main de Bouddha, émulsion fraîche au champagne millésimé et granité de basilic pourpre.',
    price: 24,
    highlight: 'Fraîcheur Cristalline',
    dietary: 'Végétarien',
    pairing: 'Ruinart Rosé Champagne Millésimé'
  },

  // Cocktails
  {
    id: 'cocktail-1',
    category: 'cocktails',
    name: 'Le Bassin Miroir',
    description: 'Cognac XO Grande Champagne, vermouth ambré infusé aux zestes de bergamote, cloche fumée au bois de cerisier et feuille d’or 24 carats en suspension.',
    price: 26,
    highlight: 'Signature Visuelle',
    image: RESTAURANT_IMAGES.cocktail
  },
  {
    id: 'cocktail-2',
    category: 'cocktails',
    name: 'Pétale d’Or & Cédrat',
    description: 'Gin artisanal infusé à la fleur de sureau sauvage, cordial de cédrat corse clarifié, verjus du Périgord, champagne blanc de blancs.',
    price: 24,
    highlight: 'Minéral & Floral'
  },
  {
    id: 'cocktail-3',
    category: 'cocktails',
    name: 'L’Orbe Incandescent',
    description: 'Mezcal artisanal d’Oaxaca aux notes fumées, liqueur de piment ango, sirop de grenade réduit, glace sphérique cristalline illuminée.',
    price: 25,
    highlight: 'Fumé & Épicé'
  },

  // Vins
  {
    id: 'vin-1',
    category: 'vins',
    name: 'Domaine de la Romanée-Conti — Grands Échézeaux 2018',
    description: 'Bourgogne d’une noblesse absolue, arômes de pivoine sauvage, sous-bois automnal et soie minérale.',
    price: 280,
    highlight: 'Au verre au Coravin (10cl)'
  },
  {
    id: 'vin-2',
    category: 'vins',
    name: 'Krug Clos du Mesnil Blanc de Blancs 2008',
    description: 'Champagne mythique d’une parcelle close d’un hectare, tension crayeuse vibrante, agrumes confits et brioche toastée.',
    price: 340,
    highlight: 'Au verre au Coravin (10cl)'
  }
];

export const TASTING_MENUS: TastingMenu[] = [
  {
    name: 'Symphonie Minérale',
    coursesCount: 6,
    price: 195,
    winePairingPrice: 95,
    description: 'Un voyage en six temps qui rend hommage aux éléments fondateurs de MORRA : la pureté de la pierre, la fraîcheur du miroir d’eau et la générosité des terroirs marins.',
    courses: [
      {
        number: 'I',
        title: 'Mise en Bouche des Fontaines',
        description: 'Tartelette croustillante au crabe royal, gelée d’eau de tomate clarifiée au basilic pourpre.',
        pairing: 'Champagne Jacques Selosse Initial Blanc de Blancs'
      },
      {
        number: 'II',
        title: 'La Corolle de Saint-Jacques & Caviar',
        description: 'Pétales nacrés marinés à cru, extraction de cédrat et perles d’Osciètre.',
        pairing: 'Chablis Grand Cru Les Clos Domaine Dauvissat 2020'
      },
      {
        number: 'III',
        title: 'Turbot Sauvage sous l’Arche',
        description: 'Cuit avec précision nacrée, émulsion de coquillages au safran et fenouil braisé.',
        pairing: 'Meursault 1er Cru Genevrières Domaine Bouchard Père & Fils 2019'
      },
      {
        number: 'IV',
        title: 'Pigeon Royal de Bresse Fumé',
        description: 'Poitrine rosée aux sarments, mousseline de panais à la vanille bourbon.',
        pairing: 'Gevrey-Chambertin 1er Cru Clos Saint-Jacques Armand Rousseau 2017'
      },
      {
        number: 'V',
        title: 'L’Entracte Fraîcheur des Bassins',
        description: 'Granité de concombre sauvage, gin infusé et émulsion de citron caviar.',
        pairing: 'Pause digestive'
      },
      {
        number: 'VI',
        title: 'La Sphère d’Or & Agrumes Rares',
        description: 'Coque translucide, cédrat confit, biscuit imbibé de miel de garrigue.',
        pairing: 'Château Suduiraut Grand Cru Classé Sauternes 2010'
      }
    ]
  },
  {
    name: 'Quintessence MORRA',
    coursesCount: 8,
    price: 275,
    winePairingPrice: 140,
    description: 'La plus haute expression gastronomique de notre maison. Huit créations d’orfèvre associant les produits les plus rares du globe et les grands millésimes de notre cave.',
    courses: [
      {
        number: 'I',
        title: 'Prélude de l’Esplanade',
        description: 'Consommé de langoustine infusé au combava, toast d’oursin d’Islande.',
        pairing: 'Champagne Dom Pérignon Vintage 2013'
      },
      {
        number: 'II',
        title: 'La Corolle Sculptée & Caviar Impérial',
        description: 'Saint-Jacques ciselées, crème d’amande amère et caviar français.',
        pairing: 'Bâtard-Montrachet Grand Cru Domaine Marc Colin 2020'
      },
      {
        number: 'III',
        title: 'Homard Bleu en Vapeur d’Algues',
        description: 'Pince laquée à la bisque corsée, gnocchis fondants de céleri truffé.',
        pairing: 'Corton-Charlemagne Grand Cru Domaine Bonneau du Martray 2018'
      },
      {
        number: 'IV',
        title: 'Artichaut Poivrade & Truffe Blanche d’Alba',
        description: 'Cœur tiède étuvé au vin jaune, voile soyeux de parmesan 36 mois.',
        pairing: 'Château Rayas Châteauneuf-du-Pape Blanc 2011'
      },
      {
        number: 'V',
        title: 'Filet de Wagyu Kagoshima A5 & Jus Réduit',
        description: 'Braisé sur charbon Binchotan, déclinaison d’échalotes confites au vieux vinaigre.',
        pairing: 'Château Margaux 1er Grand Cru Classé 2010'
      },
      {
        number: 'VI',
        title: 'Le Chariot des Grands Affinages',
        description: 'Sélection de comtés millésimés de Marcel Petite, roquefort artisanal et miels sauvages.',
        pairing: 'Porto Vintage Quinta do Noval Nacional 2003'
      },
      {
        number: 'VII',
        title: 'Givre de Mandarine Impériale & Verveine',
        description: 'Émulsion légère au champagne et cristaux de glace aromatique.',
        pairing: 'Intermède'
      },
      {
        number: 'VIII',
        title: 'La Rose de Travertin & Chocolat Criollo',
        description: 'Architecture sculptée de chocolat blanc doré, cœur praliné fève de tonka.',
        pairing: 'Rivesaltes Ambré Domaine Fontanel 1985'
      }
    ]
  }
];

export const SOMMELIER_PICKS = [
  {
    profile: 'Minéral & Cristallin',
    description: 'Pour sublimer les poissons nobles, la Saint-Jacques et les textures fraîches de notre cuisine.',
    wine: 'Chablis Grand Cru Les Clos 2020',
    estate: 'Domaine William Fèvre',
    notes: 'Arômes de pierre à fusil, zeste de pamplemousse blanc, allonge saline vertigineuse.',
    idealWith: 'La Corolle de Saint-Jacques & Caviar'
  },
  {
    profile: 'Soyeux & Tellurique',
    description: 'Pour dialoguer avec les braises parfumées, les viandes maturées et la truffe d’Alba.',
    wine: 'Chambolle-Musigny 1er Cru Les Amoureuses 2017',
    estate: 'Domaine Georges Roumier',
    notes: 'Notes de cerise burlat, pétales de rose fanée, tanins de velours et finale infinie.',
    idealWith: 'Filet de Wagyu Kagoshima A5 au Feu de Vigne'
  },
  {
    profile: 'Solaire & Précieux',
    description: 'Une effervescence aristocratique pour ouvrir le repas face au spectacle des fontaines.',
    wine: 'Champagne Comtes de Champagne Blanc de Blancs 2012',
    estate: 'Maison Taittinger',
    notes: 'Brioche tiède, noisette fraîche, bulle caressante et minéralité crayeuse magistrale.',
    idealWith: 'Accueil au Bar & Entrées Signature'
  }
];

export const CRITICAL_REVIEWS = [
  {
    publication: 'Guide Michelin 2026',
    author: 'Inspecteur Principal',
    quote: 'Sous ses arches de travertin baignées d’une lumière dorée surnaturelle, MORRA s’impose comme le manifeste de la grande gastronomie architecturale contemporaine. Une cuisine qui touche au sublime.',
    badge: '3 Étoiles Michelin Espérées'
  },
  {
    publication: 'Architectural Digest International',
    author: 'Elena Rossi',
    quote: 'Le portail organique en corolle de pierre et le miroir d’eau aux orbes lumineux font de MORRA le restaurant le plus cinégénique et spectaculaire inauguré cette décennie en Europe.',
    badge: 'Prix de la Meilleure Scénographie 2026'
  },
  {
    publication: 'Le Figaro Gastronomie',
    author: 'François-Régis Gaudry',
    quote: 'Le travail sur la corolle de Saint-Jacques et le Wagyu cuit sur les braises est d’une justesse foudroyante. L’ambiance au crépuscule face aux fontaines est un enchantement pur.',
    badge: 'Coup de Cœur de la Rédaction'
  }
];
