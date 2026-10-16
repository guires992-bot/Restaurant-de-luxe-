import heroCampaign from '../assets/images/hero_couture_campaign_1792184725517.jpg';
import productOvercoat from '../assets/images/product_cashmere_overcoat_1792184726426.jpg';
import productGown from '../assets/images/product_silk_evening_gown_1792184727274.jpg';
import productTote from '../assets/images/product_leather_tote_1792184728199.jpg';
import atelierImage from '../assets/images/atelier_savoir_faire_1792184728846.jpg';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'manteaux' | 'robes' | 'maroquinerie' | 'soie-cachemire';
  categoryLabel: string;
  priceEUR: number;
  reference: string;
  image: string;
  secondaryImage?: string;
  limitedEdition?: string;
  composition: string;
  provenance: string;
  craftsmanshipTime: string;
  description: string;
  cutDetails: string[];
  careInstructions: string;
  availableSizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  featured?: boolean;
}

export interface LookbookItem {
  id: string;
  silhouetteNumber: string;
  title: string;
  season: string;
  image: string;
  quote: string;
  garments: {
    productId: string;
    label: string;
    price: number;
  }[];
}

export interface SalonLocation {
  city: string;
  name: string;
  address: string;
  postalCode: string;
  phone: string;
  hours: string;
  privilege: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'manteau-auguste-cachemire',
    name: 'Manteau Auguste Double-Boutonnage',
    subtitle: 'Cachemire Loro Piana & Laine Vierge',
    category: 'manteaux',
    categoryLabel: 'Manteaux & Tailleurs',
    priceEUR: 4200,
    reference: 'REF-DO-26-081',
    image: productOvercoat,
    limitedEdition: 'Édition numérotée · 50 exemplaires',
    composition: '85% Cachemire Loro Piana double-face, 15% Laine vierge peignée',
    provenance: 'Tissé à Biella (Italie), façonné à la main à l’Atelier Vendôme (Paris)',
    craftsmanshipTime: '38 heures d’entoilage artisanal traditionnel',
    description: 'Une pièce maîtresse à l’architecture épurée. Le manteau Auguste revisite le vestiaire tailleur classique avec un patronage d’une rigueur absolue : revers en pointe piqués à la main, emmanchures souples sans rigidité et boutons en corne de buffle véritable gravés du monogramme Maison D’Orsay.',
    cutDetails: [
      'Coupe droite sculpturale légèrement cintrée au dos',
      'Entoilage traditionnel en crin de cheval naturel garantissant un tombé impérial',
      'Doublure intégrale en sergé de soie pure jacquard',
      'Poches à rabat passepoilées et fente d’aisance dorsale'
    ],
    careInstructions: 'Nettoyage à sec spécialisé chez un maître teinturier. Repassage doux à la vapeur.',
    availableSizes: ['36', '38', '40', '42', '44'],
    colors: [
      { name: 'Camel Impérial', hex: '#C29B72' },
      { name: 'Noir Carbone', hex: '#1C1B1A' },
      { name: 'Gris Cendre Vénitien', hex: '#63605C' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'robe-nocturne-charmeuse',
    name: 'Robe du Soir Charmeuse Drapée',
    subtitle: 'Soie Pure de Lyon & Coupe en Biais',
    category: 'robes',
    categoryLabel: 'Robes & Soirée',
    priceEUR: 3850,
    reference: 'REF-DO-26-044',
    image: productGown,
    limitedEdition: 'Atelier Sur-Mesure & Petite Série',
    composition: '100% Crêpe charmeuse de soie lourde 42 mommes',
    provenance: 'Soie filée et teinte dans la région lyonnaise, confection à Paris',
    craftsmanshipTime: '26 heures de drapé sculptural sur mannequin de bois',
    description: 'Conçue pour capter chaque reflet de lumière nocturne, cette robe du soir adopte une coupe en biais fluide qui épouse la démarche avec une élégance naturelle. Le corsage drapé asymétrique s’achève sur une traîne discrète, rappelant les lignes architecturales de la haute couture française des années 1930.',
    cutDetails: [
      'Coupe fluide en biais offrant une liberté de mouvement aérienne',
      'Décolleté croisé en V et dos plongeant sculptural',
      'Finitions intérieures roulottées à la main',
      'Fermeture invisible rehaussée de 18 boutons recouverts de soie'
    ],
    careInstructions: 'Nettoyage à sec exclusivement. Conserver sous housse de coton bio aérée.',
    availableSizes: ['34', '36', '38', '40', '42'],
    colors: [
      { name: 'Noir Onyx Profond', hex: '#0F0E0E' },
      { name: 'Bleu Minuit Céleste', hex: '#111827' },
      { name: 'Émeraude Sombre', hex: '#0B2019' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'sac-cabas-vendome-cuir',
    name: 'Le Grand Cabas Vendôme',
    subtitle: 'Veau Barénia Pleine Fleur & Laiton Brossé',
    category: 'maroquinerie',
    categoryLabel: 'Maroquinerie d’Art',
    priceEUR: 2900,
    reference: 'REF-DO-26-902',
    image: productTote,
    limitedEdition: 'Série millésimée 2026 · Certificat d’authenticité',
    composition: '100% Cuir de veau Barénia pleine fleur tannage végétal naturel',
    provenance: 'Peausserie d’Alsace, assemblé au point sellier à Angers',
    craftsmanshipTime: '32 heures de travail d’artisan sellier',
    description: 'Un hommage à la maroquinerie de transmission. Taillé dans un cuir de veau d’une douceur sensorielle remarquable, Le Cabas Vendôme développe avec les années une patine ambrée unique. Ses tranches teintées et polies à la cire d’abeille chaude témoignent d’un niveau d’exigence sans compromis.',
    cutDetails: [
      'Coutures sellier réalisées à la main au fil de lin ciré',
      'Fermoir bijou exclusif en laiton massif brossé finition palladium mat',
      'Compartiment intérieur matelassé pour carnet d’atelier ou tablette',
      'Pieds de fond protecteurs en métal tourné'
    ],
    careInstructions: 'Nourrir délicatement avec le baume incolore Maison D’Orsay fourni.',
    availableSizes: ['Taille Unique (42 x 30 x 16 cm)'],
    colors: [
      { name: 'Cognac Ébène', hex: '#7A3E20' },
      { name: 'Noir Caviar', hex: '#141416' },
      { name: 'Havane Chaud', hex: '#58311B' }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'ensemble-pantalon-palazzo-soie',
    name: 'Pantalon Palazzo en Soie et Laine',
    subtitle: 'Tombé Flou & Ceinture Smoking',
    category: 'soie-cachemire',
    categoryLabel: 'Soie & Cachemire',
    priceEUR: 1650,
    reference: 'REF-DO-26-118',
    image: heroCampaign,
    limitedEdition: 'Collection Permanente Vendôme',
    composition: '60% Soie de mûrier, 40% Laine peignée superfine 160’s',
    provenance: 'Tissage florentin, confection atelier Saint-Honoré',
    craftsmanshipTime: '18 heures de façonnage',
    description: 'Le pantalon Palazzo Maison D’Orsay offre une démarche souveraine. Sa coupe ample aux plis profonds crée un tombé d’une fluidité remarquable, tandis que la ceinture structurée façon smoking dessine la taille avec subtilité.',
    cutDetails: [
      'Plis piqués verticaux allongeant la silhouette',
      'Ceinture intérieure gansée de satin duchesse',
      'Poches passepoilées discrètes dans la couture',
      'Ourlet à revers généreux de 5 cm pour un lestage impeccable'
    ],
    careInstructions: 'Nettoyage à sec doux.',
    availableSizes: ['36', '38', '40', '42'],
    colors: [
      { name: 'Moka Glacé', hex: '#473C35' },
      { name: 'Craie Albâtre', hex: '#EBE7DE' },
      { name: 'Noir Intense', hex: '#151413' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'veste-croisee-architecture',
    name: 'Veste Croisée Sculpturale',
    subtitle: 'Drap de Laine Vierge & Épaules Anglaises',
    category: 'manteaux',
    categoryLabel: 'Manteaux & Tailleurs',
    priceEUR: 2800,
    reference: 'REF-DO-26-092',
    image: productOvercoat,
    limitedEdition: 'Série limitée',
    composition: '100% Laine vierge d’Écosse grainée',
    provenance: 'Confectionné à Paris 8e',
    craftsmanshipTime: '24 heures de montage artisanal',
    description: 'Une réinterprétation architecturale du vestiaire de pouvoir parisien. Sa ligne d’épaules définie et son boutonnage asymétrique confèrent une stature magnétique, aussi magistrale de jour avec un pantalon fluide que de nuit sur une robe en soie.',
    cutDetails: [
      'Revers cranté surdimensionné tracé au compas',
      'Boutons gravés en nacre noire véritable',
      'Doublure amovible en pongé de soie'
    ],
    careInstructions: 'Nettoyage à sec uniquement.',
    availableSizes: ['36', '38', '40', '42'],
    colors: [
      { name: 'Noir Onyx', hex: '#111010' },
      { name: 'Camel Végétal', hex: '#B8946E' }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'etole-vigogne-cachemire',
    name: 'Étole d’Exception en Vigogne & Cachemire',
    subtitle: 'Fibre d’Or des Andes & Finitions Frangées Main',
    category: 'soie-cachemire',
    categoryLabel: 'Soie & Cachemire',
    priceEUR: 2100,
    reference: 'REF-DO-26-309',
    image: atelierImage,
    limitedEdition: 'Édition rare · Certificat CITES',
    composition: '50% Vigogne royale traçable, 50% Duvet de cachemire peigné',
    provenance: 'Filature alpine, peigné à la main',
    craftsmanshipTime: '15 heures de tissage lent sur métier traditionnel',
    description: 'Considérée comme la toison la plus précieuse au monde, la vigogne procure une chaleur et une caresse sans équivalent. Cette étole généreuse (200 x 90 cm) s’enroule comme un cocon d’une légèreté presque immatérielle.',
    cutDetails: [
      'Franges torsadées à la main une à une',
      'Lisières naturelles sans coutures visibles',
      'Livrée dans son coffret en bois de cèdre naturel estampé'
    ],
    careInstructions: 'Lavage délicat à la main à l’eau de source froide ou pressing spécialisé.',
    availableSizes: ['Format Généreux (200 x 90 cm)'],
    colors: [
      { name: 'Vigogne Naturelle Ambrée', hex: '#9C6F44' },
      { name: 'Ivoire Brut', hex: '#EBE5D8' }
    ],
    inStock: true,
    featured: false
  }
];

export const LOOKBOOK_SILHOUETTES: LookbookItem[] = [
  {
    id: 'silhouette-01',
    silhouetteNumber: '01',
    title: 'L’Allure Sculpturale de Jour',
    season: 'Automne-Hiver 2026',
    image: heroCampaign,
    quote: '« La silhouette ne cherche pas à contraindre le corps, elle lui confère une architecture où le mouvement devient majesté. »',
    garments: [
      { productId: 'manteau-auguste-cachemire', label: 'Manteau Auguste en Cachemire Double-Face', price: 4200 },
      { productId: 'ensemble-pantalon-palazzo-soie', label: 'Pantalon Palazzo en Soie et Laine', price: 1650 }
    ]
  },
  {
    id: 'silhouette-02',
    silhouetteNumber: '02',
    title: 'La Nuit Noire & L’Or Pur',
    season: 'Automne-Hiver 2026',
    image: productGown,
    quote: '« Le noir n’est pas une absence de couleur, c’est le révélateur absolu de la ligne et du silence. »',
    garments: [
      { productId: 'robe-nocturne-charmeuse', label: 'Robe du Soir Charmeuse Drapée', price: 3850 }
    ]
  },
  {
    id: 'silhouette-03',
    silhouetteNumber: '03',
    title: 'Le Geste & La Matière Brute',
    season: 'Automne-Hiver 2026',
    image: productTote,
    quote: '« Un sac de haute maroquinerie ne se consomme pas : il s’adopte pour les décennies à venir. »',
    garments: [
      { productId: 'sac-cabas-vendome-cuir', label: 'Le Grand Cabas Vendôme en Veau Barénia', price: 2900 }
    ]
  }
];

export const SALONS_LOCATIONS: SalonLocation[] = [
  {
    city: 'Paris',
    name: 'Salon Historique Vendôme',
    address: '12, Place Vendôme',
    postalCode: '75001 Paris',
    phone: '+33 (0)1 42 68 00 24',
    hours: 'Du Mardi au Samedi · 10h30 – 19h00 (Sur Rendez-vous Privé)',
    privilege: 'Salons privés avec vue sur la colonne Vendôme & atelier de retouches d’urgence'
  },
  {
    city: 'Monaco',
    name: 'Pavillon Monte-Carlo',
    address: 'Avenue de Monte-Carlo',
    postalCode: '98000 Monaco',
    phone: '+377 93 50 18 20',
    hours: 'Du Lundi au Samedi · 11h00 – 19h30',
    privilege: 'Service VIP chauffeur privé & présentation des pièces exclusives de haute joaillerie associée'
  },
  {
    city: 'Genève',
    name: 'Hôtel Particulier du Rhône',
    address: 'Rue du Rhône 42',
    postalCode: '1204 Genève',
    phone: '+41 22 819 04 00',
    hours: 'Du Mardi au Samedi · 10h00 – 18h30',
    privilege: 'Garde-robe de voyage sur-mesure & conciergerie vestimentaire alpine'
  }
];

export const CURRENCIES = [
  { code: 'EUR', symbol: '€', rate: 1.0, label: 'EUR (€)' },
  { code: 'USD', symbol: '$', rate: 1.08, label: 'USD ($)' },
  { code: 'GBP', symbol: '£', rate: 0.85, label: 'GBP (£)' },
  { code: 'CHF', symbol: 'CHF', rate: 0.96, label: 'CHF' }
];
