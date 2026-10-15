import React, { useState } from 'react';
import { Wine, Sparkles, Compass, Check, ArrowRight } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';

interface SommelierRecommenderProps {
  onOpenReservationWithNotes: (notes: string) => void;
}

interface Recommendation {
  title: string;
  cocktail: string;
  starter: string;
  main: string;
  dessert: string;
  wine: string;
  tastingNote: string;
  zone: string;
}

export const SommelierRecommender: React.FC<SommelierRecommenderProps> = ({ onOpenReservationWithNotes }) => {
  const [flavorMood, setFlavorMood] = useState<'mineral' | 'braise' | 'or'>('mineral');
  const [occasion, setOccasion] = useState<'romantique' | 'affaires' | 'celebration'>('romantique');

  const recommendations: Record<string, Recommendation> = {
    'mineral-romantique': {
      title: 'Poésie Nacrée & Clarté Cristalline',
      cocktail: 'Pétale d’Or & Cédrat Corse clarifié',
      starter: 'La Corolle de Saint-Jacques & Caviar Impérial',
      main: 'Turbot Sauvage de Ligne & Émulsion au Safran d’Iran',
      dessert: 'Sphère Minérale aux Agrumes Rares & Champagne Rosé',
      wine: 'Chablis Grand Cru Les Clos Domaine Dauvissat 2020',
      tastingNote: 'Une harmonie saline et aérienne, sublimée par les reflets aquatiques du bassin miroir en tête-à-tête.',
      zone: 'Le Parvis & Tables des Fontaines'
    },
    'mineral-affaires': {
      title: 'L’Élégance Pure & Grands Blancs de Bourgogne',
      cocktail: 'Le Bassin Miroir (Cognac XO, fumée de cerisier & or 24k)',
      starter: 'La Corolle de Saint-Jacques & Caviar Impérial',
      main: 'Turbot Sauvage & Mousseline de Céleri Fumé',
      dessert: 'La Rose de Travertin & Chocolat Criollo',
      wine: 'Meursault-Charmes 1er Cru Domaine des Comtes Lafon 2019',
      tastingNote: 'Minéralité incisive et rondeur beurrée pour des échanges stratégiques sous les arches monumentales.',
      zone: 'Le Grand Salon sous les Arches'
    },
    'mineral-celebration': {
      title: 'Fête Impériale & Effervescence Mythique',
      cocktail: 'Pétale d’Or en coupe de cristal & Dom Pérignon',
      starter: 'La Corolle de Saint-Jacques & Caviar pour la table',
      main: 'Turbot Sauvage de Ligne & Homard Bleu en duo',
      dessert: 'Sphère Minérale & Flambage aux Agrumes',
      wine: 'Krug Clos du Mesnil Blanc de Blancs 2008',
      tastingNote: 'L’apogée du raffinement français sous les lustres vénitiens scintillants.',
      zone: 'La Mezzanine Céleste'
    },

    'braise-romantique': {
      title: 'Intimité Incandescente & Nectar de Terre',
      cocktail: 'L’Orbe Incandescent (Mezcal fumé, grenade & piment)',
      starter: 'Artichaut Poivrade en Calcaire de Truffe d’Alba',
      main: 'Filet de Wagyu Kagoshima A5 au Feu de Vigne',
      dessert: 'La Rose de Travertin & Chocolat Criollo 75%',
      wine: 'Chambolle-Musigny 1er Cru Les Amoureuses 2017',
      tastingNote: 'Une étreinte sensuelle entre la chair persillée du Wagyu et les tanins soyeux d’un grand pinot noir.',
      zone: 'Le Sanctuaire du Portail Pétales'
    },
    'braise-affaires': {
      title: 'Puissance & Distinction Bordelaise',
      cocktail: 'Le Bassin Miroir servi sous cloche fumante',
      starter: 'Foie Gras Marbré au Cacao Cru & Cognac XO',
      main: 'Filet de Wagyu Kagoshima A5 & Jus Réduit au Porto',
      dessert: 'La Rose de Travertin & Chocolat Criollo',
      wine: 'Château Cheval Blanc 1er Grand Cru Classé A 2015',
      tastingNote: 'Une assise souveraine qui impressionne les palais les plus exigeants dans un calme feutré.',
      zone: 'Le Grand Salon sous les Arches'
    },
    'braise-celebration': {
      title: 'Le Festin des Arches & Millésimes de Légende',
      cocktail: 'Flamboiement de Spiritueux Rares & Champagne',
      starter: 'Artichaut Poivrade & Truffe Blanche en générosité',
      main: 'Pièce de Wagyu A5 découpée minute en salle',
      dessert: 'La Rose de Travertin géante à partager',
      wine: 'Château Margaux 1er Grand Cru Classé 2010',
      tastingNote: 'Une célébration inoubliable orchestrée par le Chef et le Maître de Chai.',
      zone: 'La Mezzanine Céleste'
    },

    'or-romantique': {
      title: 'Douceur Solaire & Parfums d’Orient',
      cocktail: 'Pétale d’Or & Cédrat de Corse',
      starter: 'La Corolle de Saint-Jacques & Clémentine Corse',
      main: 'Pigeon Royal de Bresse Laqué au Miel de Thym',
      dessert: 'Sphère Minérale aux Agrumes & Champagne Rosé',
      wine: 'Condrieu La Doriane Domaine Guigal 2021',
      tastingNote: 'Arômes d’abricot rôti, fleurs blanches et fraîcheur revigorante sous les orbes dorés.',
      zone: 'Le Parvis & Tables des Fontaines'
    },
    'or-affaires': {
      title: 'Équilibre Lumineux & Rhônes Septentrionaux',
      cocktail: 'Le Bassin Miroir signature',
      starter: 'Foie Gras Marbré & Épices Douces',
      main: 'Pigeon Royal de Bresse en Deux Cuissons',
      dessert: 'La Rose de Travertin & Émulsion Bourbon',
      wine: 'Hermitage Blanc Domaine Jean-Louis Chave 2018',
      tastingNote: 'Complexité aromatique majuscule et longueur soyeuse idéale pour les dîners protocolaires.',
      zone: 'Le Grand Salon sous les Arches'
    },
    'or-celebration': {
      title: 'Éclat Doré & Champagne Millésimé',
      cocktail: 'Champagne Rosé & Feuilles d’Or 24 Carats',
      starter: 'Assortiment de Saint-Jacques & Caviar Osciètre',
      main: 'Pigeon Royal & Turbot Sauvage pour la table',
      dessert: 'Duo Sphère d’Or & Rose de Travertin',
      wine: 'Taittinger Comtes de Champagne Blanc de Blancs 2012',
      tastingNote: 'La féerie absolue d’une table princière au-dessus du bassin illuminé.',
      zone: 'La Mezzanine Céleste'
    }
  };

  const key = `${flavorMood}-${occasion}`;
  const rec = recommendations[key] || recommendations['mineral-romantique'];

  const handleApplyRecommendation = () => {
    const summary = `${rec.title} (${rec.wine} & ${rec.cocktail}) — Espace souhaité : ${rec.zone}`;
    onOpenReservationWithNotes(summary);
  };

  return (
    <section id="sommelier" className="py-20 lg:py-28 bg-[#0D0B0A] border-b border-[#2C241D]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3">
            <span>04. Sommelier &amp; Mixologie</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F7F3EE] [text-wrap:balance]">
            Accords Mets, Vins Rares &amp; Cocktails Signatures
          </h2>
          <p className="mt-4 text-[#A89A8C] text-base leading-relaxed">
            Guidé par notre Chef Sommelier Maximilien de Courcy, découvrez un accord sur mesure adapté à vos affinités de goût et à l’atmosphère choisie.
          </p>
        </div>

        {/* Interactive Selector Controls */}
        <div className="bg-[#14110E] border border-[#2B221A] p-6 lg:p-8 mb-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Step 1: Sensibilité Gustative */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-3">
                1. Votre Sensibilité Gustative
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFlavorMood('mineral')}
                  className={`p-3 text-left border text-xs transition-all ${
                    flavorMood === 'mineral'
                      ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold'
                      : 'bg-[#0D0B0A] text-[#A89A8C] border-[#2A2118] hover:border-[#524133]'
                  }`}
                >
                  <span className="block font-medium">Minéralité</span>
                  <span className="text-[10px] opacity-80">Iode &amp; Nacres</span>
                </button>

                <button
                  onClick={() => setFlavorMood('braise')}
                  className={`p-3 text-left border text-xs transition-all ${
                    flavorMood === 'braise'
                      ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold'
                      : 'bg-[#0D0B0A] text-[#A89A8C] border-[#2A2118] hover:border-[#524133]'
                  }`}
                >
                  <span className="block font-medium">Braises &amp; Bois</span>
                  <span className="text-[10px] opacity-80">Wagyu &amp; Truffe</span>
                </button>

                <button
                  onClick={() => setFlavorMood('or')}
                  className={`p-3 text-left border text-xs transition-all ${
                    flavorMood === 'or'
                      ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold'
                      : 'bg-[#0D0B0A] text-[#A89A8C] border-[#2A2118] hover:border-[#524133]'
                  }`}
                >
                  <span className="block font-medium">Solaire &amp; Or</span>
                  <span className="text-[10px] opacity-80">Agrumes &amp; Miel</span>
                </button>
              </div>
            </div>

            {/* Step 2: Occasion */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-3">
                2. L'Atmosphère Souhaitée
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setOccasion('romantique')}
                  className={`p-3 text-left border text-xs transition-all ${
                    occasion === 'romantique'
                      ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold'
                      : 'bg-[#0D0B0A] text-[#A89A8C] border-[#2A2118] hover:border-[#524133]'
                  }`}
                >
                  <span className="block font-medium">Tête-à-Tête</span>
                  <span className="text-[10px] opacity-80">Romantique</span>
                </button>

                <button
                  onClick={() => setOccasion('affaires')}
                  className={`p-3 text-left border text-xs transition-all ${
                    occasion === 'affaires'
                      ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold'
                      : 'bg-[#0D0B0A] text-[#A89A8C] border-[#2A2118] hover:border-[#524133]'
                  }`}
                >
                  <span className="block font-medium">Dîner d'Affaires</span>
                  <span className="text-[10px] opacity-80">Confidentiel</span>
                </button>

                <button
                  onClick={() => setOccasion('celebration')}
                  className={`p-3 text-left border text-xs transition-all ${
                    occasion === 'celebration'
                      ? 'bg-[#D4AF37] text-[#0D0B0A] border-[#F3DC9B] font-semibold'
                      : 'bg-[#0D0B0A] text-[#A89A8C] border-[#2A2118] hover:border-[#524133]'
                  }`}
                >
                  <span className="block font-medium">Célébration</span>
                  <span className="text-[10px] opacity-80">Grand Faste</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Recommendation Card Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#14110E] border border-[#2B221A] p-6 lg:p-10 shadow-2xl">
          
          {/* Visual Bar & Cocktail Photo */}
          <div className="lg:col-span-5 relative overflow-hidden border border-[#2D241C]">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={RESTAURANT_IMAGES.cocktail}
                alt="Cocktail signature MORRA Le Bassin Miroir sous cloche fumée"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="p-3 bg-[#0D0B0A] border-t border-[#261E17] flex items-center justify-between text-xs text-[#A89A8C]">
              <span className="font-serif text-[#F2ECE4] italic">{rec.cocktail}</span>
              <span className="font-mono-numbers text-[#D4AF37]">26 €</span>
            </div>
          </div>

          {/* Detailed Course Sequence */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Recommandation Personnalisée de Maximilien de Courcy</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F3EE] mb-2">
                {rec.title}
              </h3>
              <p className="text-xs text-[#A89A8C] leading-relaxed italic mb-6">
                "{rec.tastingNote}"
              </p>

              {/* Course Sequence List */}
              <div className="space-y-3 pt-4 border-t border-[#221C16] text-xs">
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] font-semibold uppercase tracking-wider shrink-0 w-20">Ouverture</span>
                  <span className="text-[#EDE5DA]">{rec.cocktail}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] font-semibold uppercase tracking-wider shrink-0 w-20">Entrée</span>
                  <span className="text-[#EDE5DA]">{rec.starter}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] font-semibold uppercase tracking-wider shrink-0 w-20">Plat</span>
                  <span className="text-[#EDE5DA]">{rec.main}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] font-semibold uppercase tracking-wider shrink-0 w-20">Grand Vin</span>
                  <span className="text-[#F3DC9B] font-medium">{rec.wine}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] font-semibold uppercase tracking-wider shrink-0 w-20">Douceur</span>
                  <span className="text-[#EDE5DA]">{rec.dessert}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-[#221C16] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-[#8E8072]">
                <span className="block text-[#EDE5DA] font-medium">Espace recommandé</span>
                <span>{rec.zone}</span>
              </div>

              <button
                onClick={handleApplyRecommendation}
                className="flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0D0B0A] bg-[#D4AF37] hover:bg-[#E5C378] active:scale-[0.98] transition-all border border-[#F3DC9B] shadow-md"
              >
                <span>Réserver cette Formule</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0D0B0A]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
