import { FC, createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useFormik, FormikProps} from 'formik';
import { useInfiniteQuery, useQuery, InfiniteData } from 'react-query';
import { utils } from 'ethers';

// API Calls & Interfaces
import { getUserNFTsApi, IGetUserNFTsProps } from '../../../../../../api';
import { GetCollectionApi, GetUserCollectionsFromScraperApi, GetActiveSellOrdersApi, GetNFT2Api } from '../../../../../nft/api';
import { IUserOwnedCollection, ISearchBarDropdownCollection, INFT, IERC721AssetType, IERC721BundleAssetType, IOrder } from '../../../../../nft/types';
import { GetCollectionNFTsApi } from '../../../../../nft/api';
import { TokenTicker } from '../../../../../../enums';

// Constants
const PER_PAGE = 12;
import { coins } from '../../../../../../mocks';
import { getTokenAddressByTicker } from '../../../../../../constants';

// Interfaces
import {
	ISaleTypeFilterValue,
	INftTypeFilterValue,
	IPriceRangeFilterValue,
	ISearchBarValue,
	ICollectionFilterValue
} from '../search-filters';

interface INFTsResult {
  page: number,
  size: string,
  total: number,
	data: any[],
};

type OrdersData = {
	order: IOrder;
	NFTs: INFT[];
};
interface IOrdersResult {
	total: number;
	data: OrdersData[];
}
export interface ISearchFiltersContext {
	// --- STATE ---
	userAddress?: string;
	setUserAddress: (address: string) => void;
	setCollectionAddress: (address: string) => void;
	hasSelectedSaleTypeFilter: () => boolean;
	hasSelectedPriceFilter: () => boolean;
	// --- FORMS ---
	searchBarForm: FormikProps<ISearchBarValue>;
	collectionFilterForm: FormikProps<ICollectionFilterValue>;
	saleTypeForm: FormikProps<ISaleTypeFilterValue>;
	nftTypeForm: FormikProps<INftTypeFilterValue>;
	priceRangeForm: FormikProps<IPriceRangeFilterValue>;
	// --- FORMS END ---
	// --- API RETURNED DATA END ---
	userCollections: ISearchBarDropdownCollection[];
	userNFTs: InfiniteData<INFTsResult> | undefined;
	fetchNextUserNFTs: any;
	isFetchingUserNFTs: boolean;
	hasMoreUserNFTs: boolean | undefined;
	collectionNFTs: InfiniteData<INFTsResult> | undefined;
	// TODO:: UPDATE THE TYPE !
	fetchNextCollectionNFTs: any;
	hasMoreCollectionNFTs: boolean | undefined;
	isFetchingCollectionNFTs: boolean;
	isLoadingCollectionNFTs: boolean;
	isIdleCollectionNFTs: boolean;
	orders: InfiniteData<IOrdersResult> | undefined;
	// --- API RETURNED DATA END ---
	// --- FILTERS VISIBILITY ---
	showSaleTypeFilters: boolean;
	showNFTTypeFilters: boolean;
	showPriceRangeFilters: boolean;
	showCollectionFilters: boolean;
	// --- FILTERS VISIBLITY SETTERS ---
	setShowSaleTypeFilters: (v: boolean) => void;
	setShowNFTTypeFilters: (v: boolean) => void;
	setShowPriceRangeFilters: (v: boolean) => void;
	setShowCollectcionFilters: (v: boolean) => void;
	};

export const SearchFiltersContext = createContext<ISearchFiltersContext>({} as ISearchFiltersContext);

export function useFiltersContext(): ISearchFiltersContext {
	return useContext(SearchFiltersContext);
}

interface IFiltersProviderProps {
	children: ReactNode;
}

const FiltersContextProvider = (props: IFiltersProviderProps) => {
	// --------- STATE ---------
	const [userAddress, setUserAddress] = useState<string>('');
	const [collectionAddress, setCollectionAddress] = useState<string>('');
	const [showSaleTypeFilters, setShowSaleTypeFilters]  = useState<boolean>(false);
	const [showNFTTypeFilters, setShowNFTTypeFilters] = useState<boolean>(false);
	const [showPriceRangeFilters, setShowPriceRangeFilters] = useState<boolean>(false);
	const [showCollectionFilters, setShowCollectcionFilters] = useState<boolean>(false);

	// --------- FORMIK ---------
	const searchBarForm = useFormik<ISearchBarValue>({
    initialValues: {
      searchValue: '',
    },
    onSubmit: () => {},
	});

	const collectionFilterForm = useFormik<ICollectionFilterValue>({
    initialValues: {
      contractAddress: '',
    },
    onSubmit: () => {},
	});

	const saleTypeFilterForm = useFormik<ISaleTypeFilterValue>({
		initialValues: {
			buyNow: false,
			onAuction: false,
			new: false,
			hasOffers: false,
		},
		onSubmit: () => {},
	});

	const nftTypeFilterForm = useFormik<INftTypeFilterValue>({
    initialValues: {
      singleItem: false,
      bundle: false,
      composition: false,
      stillImage: false,
      gif: false,
      audio: false,
      video: false,
    },
    onSubmit: () => {},
  });

	const priceRangeFilterForm = useFormik<IPriceRangeFilterValue>({
    initialValues: {
      currency: coins[0],
      price: [0, 0],
    },
    onSubmit: () => {},
  });
	// --------- END FORMIK ---------

	// --------- GETTERS ---------
	const hasSelectedSaleTypeFilter = () => {
		return Object.values(saleTypeFilterForm.values).some((v: boolean) => v);
	}

	const hasSelectedPriceFilter = () => {
		const [ min, max] = priceRangeFilterForm.values.price;

		return min > 0 || max > 0;
	}
	// --------- GETTERS END ---------

	// --------- QUERY HANDLERS ---------
	const handleGetUserCollections = async () => {
		const userCollections = await GetUserCollectionsFromScraperApi(userAddress);

		// The scraper doesn't return off chain info like (images, etc.) so we need to call the Universe Backend App for more info.

		// Fetch collection (off chain) data from the Universe API
		const getOffChainCollectionDataPromises = userCollections.map(async (c: IUserOwnedCollection) => {
			const result = {
				address: c.contractAddress,
				name: c.name,
				id: '',
				image: undefined,
			} as ISearchBarDropdownCollection;

			const { id, coverUrl } = await GetCollectionApi(c.contractAddress);
			result.id = id;
			result.image = coverUrl;

			return result;
		})

		const fullCollectionData = await Promise.all(getOffChainCollectionDataPromises);

		return fullCollectionData;
	};

	const handleGetUserNFTs = async ({ pageParam = 1 }) => {
		const query: IGetUserNFTsProps = {
			address: utils.getAddress(userAddress),
			page: pageParam,
			size: PER_PAGE,
			search: searchBarForm.values.searchValue,
			tokenAddress: collectionFilterForm.values.contractAddress,
		};

			const userNFTs = await getUserNFTsApi(query);
			return userNFTs;
	};
	// --------- END QUERY HANDLERS ---------

	// --------- QUERIES ---------
	/**
   * Query for fetching user Collections
   * This query should only be executed once
   */
	const { data: UserCollections } = useQuery([
		'user-collections',
		userAddress,
		'UserCollections'
	], handleGetUserCollections ,
		{
			enabled: !!userAddress,
			keepPreviousData: true,
			retry: false,
			onError: ({ error, message }) => {
				// TODO:: think about how to handle the errors
			},
		},
	);

	/**
   * Query for fetching user NFTs
   * - supports search by name
   * - supports search by collection address
	*/
	const {
		data: userNFTs,
		fetchNextPage: fetchNextUserNFTs,
		hasNextPage: hasMoreUserNFTs,
		isFetching: isFetchingUserNFTs
	} = useInfiniteQuery([
		'user',
		userAddress,
		searchBarForm.values,
		collectionFilterForm.values,
		'NFTs'
	], handleGetUserNFTs,
		{
			enabled: !!userAddress,
			retry: false,
			getNextPageParam: (lastPage, pages) => {
				return pages.length * PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
			},
			onError: (error) => {
				// TODO:: think how to handle the errors
			},
		},
	);


	/**
	 * Query for fetching Collection NFTs
	 */
	const {
		data: collectionNFTs,
		fetchNextPage: fetchNextCollectionNFTs,
		hasNextPage: hasMoreCollectionNFTs,
		isFetching: isFetchingCollectionNFTs,
		isLoading: isLoadingCollectionNFTs,
		isIdle: isIdleCollectionNFTs
	 } = useInfiniteQuery(
		[
			'collection-nfts',
			collectionAddress,
		],
		({ pageParam = 1 }) => GetCollectionNFTsApi(utils.getAddress(collectionAddress), pageParam, PER_PAGE),
			{
				enabled: !!collectionAddress,
				retry: false,
				getNextPageParam: (lastPage, pages) => {
					return pages.length * PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
				},
				onError: ({ error, message }) => {
					// TODO:: Handle Errors ?
				},
			},
  );


	/**
	 * Query for fetching orders
	 */
	const {
		data: orders,
		fetchNextPage: fetchNextOrders,
		hasNextPage: hasMoreOrders,
		isFetching: isFethingOrders
	} = useInfiniteQuery([
    'orders',
    saleTypeFilterForm.values,
    priceRangeFilterForm.values,
		// TODO:: Implement sort by filters
    // sortBy
  ], async ({ pageParam = 1 }) => {
    const apiFilters: any = { page: pageParam, side: 1 };

    // Sale Filters
    if (saleTypeFilterForm.values.hasOffers) {
      apiFilters['hasOffers'] = true;
    }

    if (saleTypeFilterForm.values.buyNow) {
      apiFilters['side'] = 1;
    }

    if (saleTypeFilterForm.values.new) {
      apiFilters['beforeTimestamp'] = Math.floor((new Date()).getTime() / 1000);
    }

    // Price Filters
    if (priceRangeFilterForm.values.currency.token && priceRangeFilterForm.dirty) {
      const ticker = priceRangeFilterForm.values.currency.token as TokenTicker;
      const tokenAddress = getTokenAddressByTicker(ticker);
      apiFilters['token'] = tokenAddress;
    }

    const [minPrice, maxPrice] = priceRangeFilterForm.values.price;

    if (minPrice) {
      apiFilters['minPrice'] = minPrice;
    }

    if (maxPrice && priceRangeFilterForm.dirty) {
      apiFilters['maxPrice'] = maxPrice;
    }

    // Sorting
    // if (sortBy) {
    //   let sortFilter = 0
    //   switch (sortBy) {
    //     case SortOrderOptionsEnum.EndingSoon:
    //       sortFilter = 1
    //       break;
    //     case SortOrderOptionsEnum.HighestPrice:
    //       sortFilter = 2
    //       break;
    //     case SortOrderOptionsEnum.LowestPrice:
    //       sortFilter = 3
    //       break;
    //     case SortOrderOptionsEnum.RecentlyListed:
    //       sortFilter = 4
    //       break;
    //     default:
    //       break;
    //   }
    //   apiFilters['sortBy'] = sortFilter;
    // }

    const { orders, total } = await GetActiveSellOrdersApi(apiFilters);

    const NFTsRequests: Array<any> = [];

    for (const order of orders) {
      switch (order.make.assetType.assetClass) {
        case 'ERC721':
          const assetType = order.make.assetType as IERC721AssetType;
          NFTsRequests.push(GetNFT2Api(assetType.contract, assetType.tokenId))
          break;
      }
    }

    const NFTsMap = (await (Promise.allSettled(NFTsRequests))).reduce<Record<string, INFT>>((acc, response) => {
      if (response.status !== 'fulfilled') {
        return acc;
      }

      const NFT: INFT = response.value;

      const key = `${NFT.collection?.address}:${NFT.tokenId}`;

      acc[key] = NFT;

      return acc;
    }, {});

    const result = orders.reduce<OrdersData[]>((acc, order) => {
      const NFTsMapKeys = Object.keys(NFTsMap);

      switch (order.make.assetType.assetClass) {
        case 'ERC721':
          const assetType = order.make.assetType as IERC721AssetType;
          if (NFTsMapKeys.includes(`${assetType.contract}:${assetType.tokenId}`)) {
            acc.push({
              order,
              NFTs: NFTsMap[`${assetType.contract}:${assetType.tokenId}`]
                ? [NFTsMap[`${assetType.contract}:${assetType.tokenId}`]]
                : []
            })
          }
          break;
      }

      return acc;
    }, []);

    return { total, data: result };
  }, {
		enabled: !!collectionAddress,
    retry: false,
    getNextPageParam: (lastPage, pages) => {
      return pages.length * PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
    },
    onSuccess: (result) => {
      console.log('onSuccess 5:', result);
    }
  });
	// --------- END QUERIES ---------

	// --------- EXPORT VALUE ---------
  const value: ISearchFiltersContext = {
		// --- STATE ---
		userAddress: userAddress,
		setUserAddress: setUserAddress,
		setCollectionAddress: setCollectionAddress,
		// --- STATE END ---
		// --- GETTERS ---
		hasSelectedSaleTypeFilter,
		hasSelectedPriceFilter,
		// --- GETTERS END ---
		// --- FORMS ---
		searchBarForm: searchBarForm,
		collectionFilterForm: collectionFilterForm,
		nftTypeForm: nftTypeFilterForm,
		saleTypeForm: saleTypeFilterForm,
		priceRangeForm: priceRangeFilterForm,
		// --- FORMS END ---
		// --- API returned Data ---
		userCollections: UserCollections || [],
		userNFTs: userNFTs,
		orders: orders,
		fetchNextUserNFTs: fetchNextUserNFTs,
		isFetchingUserNFTs: isFetchingUserNFTs,
		hasMoreUserNFTs: hasMoreUserNFTs,
		collectionNFTs: collectionNFTs,
		fetchNextCollectionNFTs: fetchNextCollectionNFTs,
		hasMoreCollectionNFTs: hasMoreCollectionNFTs,
		isFetchingCollectionNFTs: isFetchingCollectionNFTs,
		isLoadingCollectionNFTs: isLoadingCollectionNFTs,
		isIdleCollectionNFTs: isIdleCollectionNFTs,
		// --- API returned Data END ---
		// --- FILTERS VISIBLITY ---
		showSaleTypeFilters: showSaleTypeFilters,
		showNFTTypeFilters: showNFTTypeFilters,
		showPriceRangeFilters: showPriceRangeFilters,
		showCollectionFilters: showCollectionFilters,
		// --- FILTERS VISIBLITY END ---
		// --- FILTERS VISIBLITY SETTERS ---
		setShowSaleTypeFilters,
		setShowNFTTypeFilters,
		setShowPriceRangeFilters,
		setShowCollectcionFilters,
		// --- FILTERS VISIBLITY SETTERS END ---
	};

  return (
    <SearchFiltersContext.Provider value={value}>
      {props.children}
    </SearchFiltersContext.Provider>
  );
};


export default FiltersContextProvider;
