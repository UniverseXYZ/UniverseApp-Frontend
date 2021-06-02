import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import Justin3LAU from '../../assets/images/team/Justin-3LAU.png';
import DillonFrancis from '../../assets/images/team/Dillon-Francis.png';
import AndréAnjos from '../../assets/images/team/André-Anjos.png';
import WesleyPentz from '../../assets/images/team/Wesley-Pentz.png';
import GuyLawrence from '../../assets/images/team/Guy-Lawrence.png';
import HowardLawrence from '../../assets/images/team/Howard-Lawrence.png';
import AaronMcDonald from '../../assets/images/team/Aaron-McDonald.png';
import KainWarwick from '../../assets/images/team/Kain-Warwick.png';
import StaniKulechov from '../../assets/images/team/Stani-Kulechov.png';
import SantiagoRSantos from '../../assets/images/team/Santiago-R-Santos.png';
import MattHunter from '../../assets/images/team/Matt-Hunter.png';
import AkinSawyerr from '../../assets/images/team/Akin-Sawyer.png';
import QuinnAbraham from '../../assets/images/team/Quinn-Abraham.png';
import BillyLuedtke from '../../assets/images/team/Billy-Luedtke.png';
import TomShaughnessy from '../../assets/images/team/Tom-Shaughnessy.png';
import VitalikCherniak from '../../assets/images/team/Vitalik-Cherniak.png';
import AdamDaugelli from '../../assets/images/team/Adam-Daugelli.png';
import ChainLinkGod from '../../assets/images/team/ChainLinkGod.png';
import NoahJessop from '../../assets/images/team/Noah-Jessop.png';
import JamesTodaro from '../../assets/images/team/James-Todaro.png';
import RobLeshner from '../../assets/images/team/Rob-Leshner.png';
import BenLakoff from '../../assets/images/team/Ben-Lakoff.png';
import BogdanGheorghe from '../../assets/images/team/Bogdan-Gheorghe.png';
import JordanMomtazi from '../../assets/images/team/Jordan-Momtazi.png';
import IgorLilic from '../../assets/images/team/Igor-Lilic.png';
import RyanZurrer from '../../assets/images/team/Ryan-Zurrer.png';
import EJRodgers from '../../assets/images/team/EJ-Rodgers.png';
import KeeganSelby from '../../assets/images/team/Keegan-Selby.png';
import AlokVasudev from '../../assets/images/team/Alok-Vasudev.png';
import KeiranWarwick from '../../assets/images/team/Keiran-Warwick.png';
import KevinXu from '../../assets/images/team/Kevin-Xu.png';
import KevinRose from '../../assets/images/team/Kevin-Rose.png';
import AaronWright from '../../assets/images/team/Aaron-Wright.png';
import ChandlerSong from '../../assets/images/team/Chandler-Song.png';
import VanceSpencer from '../../assets/images/team/Vance-Spencer.png';
import DeFiDad from '../../assets/images/team/DeFi-Dad.png';
import InternetPaul from '../../assets/images/team/Internet-Paul.png';
import MiguelNabais from '../../assets/images/team/Miguel-Nabais.png';
import MarcWeinstein from '../../assets/images/team/Marc-Weinstein.png';
import LesBorsai from '../../assets/images/team/Les-Borsai.png';
import ArtiaMoghbel from '../../assets/images/team/Artia-Moghbel.png';
import HomerShillson from '../../assets/images/team/Homer-Shillson.png';
import AntonBukov from '../../assets/images/team/Anton-Bukov.png';
import RahillaZafar from '../../assets/images/team/Rahilla-Zafar.png';
import TekinSalimi from '../../assets/images/team/Tekin-Salimi.png';
import OlafCarsonWee from '../../assets/images/team/Olaf-Carson-Wee.png';
import WhaleShark from '../../assets/images/team/WhaleShark.png';
import Gmoney from '../../assets/images/team/Gmoney.png';
import RobbieFerguson from '../../assets/images/team/Robbie-Ferguson.png';
import AndréNabais from '../../assets/images/team/André-Nabais.png';
import LukeLombe from '../../assets/images/team/Luke-Lombe.png';
import HarrisonHines from '../../assets/images/team/Harrison-Hines.png';

const UniverseContributors = () => {
  const [contributors, setContributors] = useState([
    {
      id: 1,
      name: 'Justin 3LAU',
      avatar: Justin3LAU,
      loaded: false,
    },
    {
      id: 2,
      name: 'Dillon Francis',
      avatar: DillonFrancis,
      loaded: false,
    },
    {
      id: 3,
      name: 'André Anjos - RAC',
      avatar: AndréAnjos,
      loaded: false,
    },
    {
      id: 4,
      name: 'Wesley Pentz - Diplo',
      avatar: WesleyPentz,
      loaded: false,
    },
    {
      id: 5,
      name: 'Guy Lawrence - Disclosure',
      avatar: GuyLawrence,
      loaded: false,
    },
    {
      id: 6,
      name: 'Howard Lawrence - Disclosure',
      avatar: HowardLawrence,
      loaded: false,
    },
    {
      id: 7,
      name: 'Aaron McDonald',
      avatar: AaronMcDonald,
      loaded: false,
    },
    {
      id: 8,
      name: 'Kain Warwick',
      avatar: KainWarwick,
      loaded: false,
    },
    {
      id: 9,
      name: 'Stani Kulechov',
      avatar: StaniKulechov,
      loaded: false,
    },
    {
      id: 10,
      name: 'Santiago R Santos',
      avatar: SantiagoRSantos,
      loaded: false,
    },
    {
      id: 11,
      name: 'Matt Hunter',
      avatar: MattHunter,
      loaded: false,
    },
    {
      id: 12,
      name: 'Rob Leshner',
      avatar: RobLeshner,
      loaded: false,
    },
    {
      id: 13,
      name: 'Quinn Abraham',
      avatar: QuinnAbraham,
      loaded: false,
    },
    {
      id: 14,
      name: 'Billy Luedtke',
      avatar: BillyLuedtke,
      loaded: false,
    },
    {
      id: 15,
      name: 'Tom Shaughnessy',
      avatar: TomShaughnessy,
      loaded: false,
    },
    {
      id: 16,
      name: 'Vitalik Cherniak',
      avatar: VitalikCherniak,
      loaded: false,
    },
    {
      id: 17,
      name: 'Adam D’augelli',
      avatar: AdamDaugelli,
      loaded: false,
    },
    {
      id: 18,
      name: 'ChainLinkGod',
      avatar: ChainLinkGod,
      loaded: false,
    },
    {
      id: 19,
      name: 'Noah Jessop',
      avatar: NoahJessop,
      loaded: false,
    },
    {
      id: 20,
      name: 'Dr. James Todaro',
      avatar: JamesTodaro,
      loaded: false,
    },
    {
      id: 21,
      name: 'Akin Sawyerr',
      avatar: AkinSawyerr,
      loaded: false,
    },
    {
      id: 22,
      name: 'Ben Lakoff',
      avatar: BenLakoff,
      loaded: false,
    },
    {
      id: 23,
      name: 'Bogdan Gheorghe',
      avatar: BogdanGheorghe,
      loaded: false,
    },
    {
      id: 24,
      name: 'Jordan Momtazi',
      avatar: JordanMomtazi,
      loaded: false,
    },
    {
      id: 25,
      name: 'Igor Lilic',
      avatar: IgorLilic,
      loaded: false,
    },
    {
      id: 26,
      name: 'Ryan Zurrer',
      avatar: RyanZurrer,
      loaded: false,
    },
    {
      id: 27,
      name: 'EJ Rodgers',
      avatar: EJRodgers,
      loaded: false,
    },
    {
      id: 28,
      name: 'Keegan Selby',
      avatar: KeeganSelby,
      loaded: false,
    },
    {
      id: 29,
      name: 'Alok Vasudev',
      avatar: AlokVasudev,
      loaded: false,
    },
    {
      id: 30,
      name: 'Keiran Warwick',
      avatar: KeiranWarwick,
      loaded: false,
    },
    {
      id: 31,
      name: 'Fully Allocated',
      avatar: KevinXu,
      loaded: false,
    },
    {
      id: 32,
      name: 'Kevin Rose',
      avatar: KevinRose,
      loaded: false,
    },
    {
      id: 33,
      name: 'Aaron Wright',
      avatar: AaronWright,
      loaded: false,
    },
    {
      id: 34,
      name: 'Chandler Song',
      avatar: ChandlerSong,
      loaded: false,
    },
    {
      id: 35,
      name: 'Vance Spencer',
      avatar: VanceSpencer,
      loaded: false,
    },
    {
      id: 36,
      name: 'DeFi Dad',
      avatar: DeFiDad,
      loaded: false,
    },
    {
      id: 37,
      name: 'Internet Paul',
      avatar: InternetPaul,
      loaded: false,
    },
    {
      id: 38,
      name: 'Miguel Nabais',
      avatar: MiguelNabais,
      loaded: false,
    },
    {
      id: 39,
      name: 'Marc Weinstein',
      avatar: MarcWeinstein,
      loaded: false,
    },
    {
      id: 40,
      name: 'Les Borsai',
      avatar: LesBorsai,
      loaded: false,
    },
    {
      id: 41,
      name: 'Artia Moghbel - Dfinity',
      avatar: ArtiaMoghbel,
      loaded: false,
    },
    {
      id: 42,
      name: 'Homer Shillson',
      avatar: HomerShillson,
      loaded: false,
    },
    {
      id: 43,
      name: 'Anton Bukov',
      avatar: AntonBukov,
      loaded: false,
    },
    {
      id: 44,
      name: 'Rahilla Zafar',
      avatar: RahillaZafar,
      loaded: false,
    },
    {
      id: 45,
      name: 'Tekin Salimi',
      avatar: TekinSalimi,
      loaded: false,
    },
    {
      id: 46,
      name: 'Olaf Carson-Wee – Polychain',
      avatar: OlafCarsonWee,
      loaded: false,
    },
    {
      id: 47,
      name: 'WhaleShark',
      avatar: WhaleShark,
      loaded: false,
    },
    {
      id: 48,
      name: 'Gmoney',
      avatar: Gmoney,
      loaded: false,
    },
    {
      id: 49,
      name: 'Robbie Ferguson',
      avatar: RobbieFerguson,
      loaded: false,
    },
    {
      id: 50,
      name: 'André Nabais',
      avatar: AndréNabais,
      loaded: false,
    },
    {
      id: 51,
      name: 'Luke Lombe',
      avatar: LukeLombe,
      loaded: false,
    },
    {
      id: 52,
      name: 'Harrison Hines',
      avatar: HarrisonHines,
      loaded: false,
    },
  ]);

  const handleLoaded = (idx) => {
    const newContributors = [...contributors];
    newContributors[idx].loaded = true;
    setContributors(newContributors);
  };

  return (
    <div className="contributors__section">
      <h1 className="title">Universe Contributors</h1>
      <div className="contributors">
        {contributors.map((contributor, index) => (
          <AnimatedOnScroll animationIn="fadeIn" key={contributor.id}>
            <div className="contributor">
              {!contributor.loaded && (
                <Skeleton
                  height={160}
                  style={{ width: window.innerWidth < 576 ? '160px' : '100%' }}
                />
              )}
              <img
                src={contributor.avatar}
                alt={contributor.name}
                title={contributor.name}
                onLoad={() => handleLoaded(index)}
                style={{ display: contributor.loaded ? 'block' : 'none' }}
              />
              <h2>{contributor.name}</h2>
            </div>
          </AnimatedOnScroll>
        ))}
      </div>
    </div>
  );
};

export default UniverseContributors;
