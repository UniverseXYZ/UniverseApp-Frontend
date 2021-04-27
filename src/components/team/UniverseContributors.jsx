import React from 'react';
import KateHerbert from '../../assets/images/team/Kate-Herbert.png';

const UniverseContributors = () => {
  const contributors = [
    {
      id: 1,
      name: 'Justin 3LAU',
      avatar: KateHerbert,
    },
    {
      id: 2,
      name: 'Dillon Francis',
      avatar: KateHerbert,
    },
    {
      id: 3,
      name: 'André Anjos - RAC',
      avatar: KateHerbert,
    },
    {
      id: 4,
      name: 'Wesley Pentz - Diplo',
      avatar: KateHerbert,
    },
    {
      id: 5,
      name: 'Guy Lawrence - Disclosure',
      avatar: KateHerbert,
    },
    {
      id: 6,
      name: 'Howard Lawrence - Disclosure',
      avatar: KateHerbert,
    },
    {
      id: 7,
      name: 'Aaron McDonald',
      avatar: KateHerbert,
    },
    {
      id: 8,
      name: 'Kain Warwick',
      avatar: KateHerbert,
    },
    {
      id: 9,
      name: 'Stani Kulechov',
      avatar: KateHerbert,
    },
    {
      id: 10,
      name: 'Santiago Santos',
      avatar: KateHerbert,
    },
    {
      id: 11,
      name: 'Matt Hunter',
      avatar: KateHerbert,
    },
    {
      id: 12,
      name: 'Akin Sawyer',
      avatar: KateHerbert,
    },
    {
      id: 13,
      name: 'Quinn Abraham',
      avatar: KateHerbert,
    },
    {
      id: 14,
      name: 'Billy Luedtke',
      avatar: KateHerbert,
    },
    {
      id: 15,
      name: 'Tom Shaughnessy',
      avatar: KateHerbert,
    },
    {
      id: 16,
      name: 'Vitalik Cherniak',
      avatar: KateHerbert,
    },
    {
      id: 17,
      name: 'Adam D’augelli',
      avatar: KateHerbert,
    },
    {
      id: 18,
      name: 'ChainLinkGod',
      avatar: KateHerbert,
    },
    {
      id: 19,
      name: 'Noah Jessop',
      avatar: KateHerbert,
    },
    {
      id: 20,
      name: 'Dr. James Todaro',
      avatar: KateHerbert,
    },
    {
      id: 21,
      name: 'Rob Leshner',
      avatar: KateHerbert,
    },
    {
      id: 22,
      name: 'Ben Lakoff',
      avatar: KateHerbert,
    },
    {
      id: 23,
      name: 'Bogdan Gheorghe',
      avatar: KateHerbert,
    },
    {
      id: 24,
      name: 'Jordan Momtazi',
      avatar: KateHerbert,
    },
    {
      id: 25,
      name: 'Igor Lilic',
      avatar: KateHerbert,
    },
    {
      id: 26,
      name: 'Ryan Zurrer',
      avatar: KateHerbert,
    },
    {
      id: 27,
      name: 'EJ Rodgers',
      avatar: KateHerbert,
    },
    {
      id: 28,
      name: 'Keegan Selby',
      avatar: KateHerbert,
    },
    {
      id: 29,
      name: 'Alok Vasudev',
      avatar: KateHerbert,
    },
    {
      id: 30,
      name: 'Keiran Warwick',
      avatar: KateHerbert,
    },
    {
      id: 31,
      name: 'Kevin Xu',
      avatar: KateHerbert,
    },
    {
      id: 32,
      name: 'Kevin Rose',
      avatar: KateHerbert,
    },
    {
      id: 33,
      name: 'Aaron Wright',
      avatar: KateHerbert,
    },
    {
      id: 34,
      name: 'Chandler Song',
      avatar: KateHerbert,
    },
    {
      id: 35,
      name: 'Vance Spencer',
      avatar: KateHerbert,
    },
    {
      id: 36,
      name: 'DeFi Dad',
      avatar: KateHerbert,
    },
    {
      id: 37,
      name: 'Internet Paul',
      avatar: KateHerbert,
    },
    {
      id: 38,
      name: 'Miguel Nabais',
      avatar: KateHerbert,
    },
    {
      id: 39,
      name: 'Marc Weinstein',
      avatar: KateHerbert,
    },
    {
      id: 40,
      name: 'Les Borsai',
      avatar: KateHerbert,
    },
    {
      id: 41,
      name: 'Spencer Noon',
      avatar: KateHerbert,
    },
    {
      id: 42,
      name: 'Homer Shillson',
      avatar: KateHerbert,
    },
    {
      id: 43,
      name: 'Anton Bukov',
      avatar: KateHerbert,
    },
    {
      id: 44,
      name: 'Rahilla Zafar',
      avatar: KateHerbert,
    },
    {
      id: 45,
      name: 'Tekin Salimi',
      avatar: KateHerbert,
    },
    {
      id: 46,
      name: 'Jake Brukhman',
      avatar: KateHerbert,
    },
    {
      id: 47,
      name: 'WhaleShark',
      avatar: KateHerbert,
    },
    {
      id: 48,
      name: 'Gmoney',
      avatar: KateHerbert,
    },
    {
      id: 49,
      name: 'Robbie Ferguson',
      avatar: KateHerbert,
    },
    {
      id: 50,
      name: 'André Nabais',
      avatar: KateHerbert,
    },
    {
      id: 51,
      name: 'Luke Lombe',
      avatar: KateHerbert,
    },
  ];
  return (
    <div className="contributors__section">
      <h1 className="title">Universe Contributors</h1>
      <div className="contributors">
        {contributors.map((contributor) => (
          <div className="contributor" key={contributor.id}>
            <img src={contributor.avatar} alt={contributor.name} />
            <h2>{contributor.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniverseContributors;
