import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import TimKang from '../../assets/images/team/Tim-Kang.png';
import TylerWard from '../../assets/images/team/Tyler-Ward.png';
import TroyMurray from '../../assets/images/team/Troy-Murray.png';
import MiladMostavi from '../../assets/images/team/Milad-Mostavi.png';
import DragosRizescu from '../../assets/images/team/Dragos-Rizescu.png';
import MarkWard from '../../assets/images/team/Mark-Ward.png';
import RyanShtirmer from '../../assets/images/team/Ryan-Shtirmer.png';
import StanislavTrenev from '../../assets/images/team/Stanislav-Trenev.png';
import PavloBendus from '../../assets/images/team/Pavlo-Bendus.png';
import IliaAndreev from '../../assets/images/team/Ilia-Andreev.png';
import ViacheslavRybak from '../../assets/images/team/Viacheslav-Rybak.png';
import AndonMitev from '../../assets/images/team/Andon-Mitev.png';
import DmytroDmytrychenko from '../../assets/images/team/Dmytro-Dmytrychenko.png';
import DimaDutka from '../../assets/images/team/Dima-Dutka.png';
import AlgernonHolmes from '../../assets/images/team/Alex-Holmes.png';
import NicholasWard from '../../assets/images/team/Nicholas-Ward.png';
import RockoMoran from '../../assets/images/team/Rocko-Moran.png';
import MikeProtsenko from '../../assets/images/team/Mike-Protsenko.png';
import GeorgeSpasov from '../../assets/images/team/George-Spasov.png';
import ZhivkoTodorov from '../../assets/images/team/Zhivko-Todorov.png';
import KateHerbert from '../../assets/images/team/Kate-Herbert.png';
import CezarParaschiv from '../../assets/images/team/Cezar-Paraschiv.png';
import AlexMissivrenko from '../../assets/images/team/Alex-Missivrenko.png';
import MariaMosiy from '../../assets/images/team/Maria-Mosiy.png';
import IvanMykolaiv from '../../assets/images/team/Ivan-Mykolaiv.png';
import VictoriaDutka from '../../assets/images/team/Victoria-Dutka.png';
import SergePiven from '../../assets/images/team/Serge-Piven.png';
import PavloBabenko from '../../assets/images/team/Pavlo-Babenko.png';
import AsenAngelov from '../../assets/images/team/Asen-Angelov.png';
import SteriosTaskudis from '../../assets/images/team/Sterios-Taskudis.png';
import ViktorTodorov from '../../assets/images/team/Viktor-Todorov.png';
import RaduGurau from '../../assets/images/team/Radu-Gurau.png';
import ValeriiaGorenich from '../../assets/images/team/Valeriia-Gorenich.png';
import AzamZafar from '../../assets/images/team/Azam-Zafar.png';

const UniverseCreators = () => {
  const [creators, setCreators] = useState([
    {
      id: 1,
      name: 'Tim Kang',
      avatar: TimKang,
      loaded: false,
    },
    {
      id: 2,
      name: 'Tyler Ward',
      avatar: TylerWard,
      loaded: false,
    },
    {
      id: 3,
      name: 'Troy Murray',
      avatar: TroyMurray,
      loaded: false,
    },
    {
      id: 4,
      name: 'Milad Mostavi',
      avatar: MiladMostavi,
      loaded: false,
    },
    {
      id: 5,
      name: 'Dragos Rizescu',
      avatar: DragosRizescu,
      loaded: false,
    },
    {
      id: 6,
      name: 'Mark Ward',
      avatar: MarkWard,
      loaded: false,
    },
    {
      id: 7,
      name: 'Ryan Shtirmer',
      avatar: RyanShtirmer,
      loaded: false,
    },
    {
      id: 8,
      name: 'Stanislav Trenev',
      avatar: StanislavTrenev,
      loaded: false,
    },
    {
      id: 9,
      name: 'Pavlo Bendus',
      avatar: PavloBendus,
      loaded: false,
    },
    {
      id: 10,
      name: 'Ilia Andreev',
      avatar: IliaAndreev,
      loaded: false,
    },
    {
      id: 11,
      name: 'Viacheslav Rybak',
      avatar: ViacheslavRybak,
      loaded: false,
    },
    {
      id: 12,
      name: 'Andon Mitev',
      avatar: AndonMitev,
      loaded: false,
    },
    {
      id: 13,
      name: 'Dmytro Dmytrychenko',
      avatar: DmytroDmytrychenko,
      loaded: false,
    },
    {
      id: 14,
      name: 'Dima Dutka',
      avatar: DimaDutka,
      loaded: false,
    },
    {
      id: 15,
      name: 'Algernon Holmes',
      avatar: AlgernonHolmes,
      loaded: false,
    },
    {
      id: 16,
      name: 'Nicholas Ward',
      avatar: NicholasWard,
      loaded: false,
    },
    {
      id: 17,
      name: 'Rocko Moran',
      avatar: RockoMoran,
      loaded: false,
    },
    {
      id: 18,
      name: 'Mike Protsenko',
      avatar: MikeProtsenko,
      loaded: false,
    },
    {
      id: 19,
      name: 'George Spasov',
      avatar: GeorgeSpasov,
      loaded: false,
    },
    {
      id: 20,
      name: 'Zhivko Todorov',
      avatar: ZhivkoTodorov,
      loaded: false,
    },
    {
      id: 21,
      name: 'Kate Herbert',
      avatar: KateHerbert,
      loaded: false,
    },
    {
      id: 22,
      name: 'Cezar Paraschiv',
      avatar: CezarParaschiv,
      loaded: false,
    },
    {
      id: 23,
      name: 'Alex Missivrenko',
      avatar: AlexMissivrenko,
      loaded: false,
    },
    {
      id: 24,
      name: 'Maria Mosiy',
      avatar: MariaMosiy,
      loaded: false,
    },
    {
      id: 25,
      name: 'Ivan Mykolaiv',
      avatar: IvanMykolaiv,
      loaded: false,
    },
    {
      id: 26,
      name: 'Victoria Dutka',
      avatar: VictoriaDutka,
      loaded: false,
    },
    {
      id: 27,
      name: 'Serge Piven',
      avatar: SergePiven,
      loaded: false,
    },
    {
      id: 28,
      name: 'Pavlo Babenko',
      avatar: PavloBabenko,
      loaded: false,
    },
    {
      id: 29,
      name: 'Asen Angelov',
      avatar: AsenAngelov,
      loaded: false,
    },
    {
      id: 30,
      name: 'Sterios Taskudis',
      avatar: SteriosTaskudis,
      loaded: false,
    },
    {
      id: 31,
      name: 'Viktor Todorov',
      avatar: ViktorTodorov,
      loaded: false,
    },
    {
      id: 32,
      name: 'Radu Gurău',
      avatar: RaduGurau,
      loaded: false,
    },
    {
      id: 33,
      name: 'Valeriia Gorenich',
      avatar: ValeriiaGorenich,
      loaded: false,
    },
    {
      id: 34,
      name: 'Azam Zafar',
      avatar: AzamZafar,
      loaded: false,
    },
  ]);

  const handleLoaded = (idx) => {
    const newCreators = [...creators];
    newCreators[idx].loaded = true;
    setCreators(newCreators);
  };

  return (
    <div className="creators__section">
      <h1 className="title">Universe Creators</h1>
      <div className="creators">
        {creators.map((creator, index) => (
          <AnimatedOnScroll animationIn="fadeIn" key={creator.id}>
            <div className="creator">
              {!creator.loaded && (
                <Skeleton
                  height={255}
                  style={{ width: window.innerWidth < 576 ? '255px' : '100%' }}
                />
              )}
              <img
                src={creator.avatar}
                alt={creator.name}
                title={creator.name}
                onLoad={() => handleLoaded(index)}
                style={{ display: creator.loaded ? 'block' : 'none' }}
              />
              <h2>{creator.name}</h2>
            </div>
          </AnimatedOnScroll>
        ))}
      </div>
    </div>
  );
};

export default UniverseCreators;
