export enum SortBy {
  EndingSoon = 1,
  HighestPrice = 2,
  LowestPrice = 3,
  RecentlyListed = 4,
}

export const SortByOptions: SortBy[] = [
  SortBy.EndingSoon,
  SortBy.HighestPrice,
  SortBy.LowestPrice,
  SortBy.RecentlyListed,
];

export const SortByNames: Record<SortBy, string> = {
  [SortBy.EndingSoon]: 'Ending soon',
  [SortBy.HighestPrice]: 'Lowest price first',
  [SortBy.LowestPrice]: 'Highest price first',
  [SortBy.RecentlyListed]: 'Recently listed',
};
