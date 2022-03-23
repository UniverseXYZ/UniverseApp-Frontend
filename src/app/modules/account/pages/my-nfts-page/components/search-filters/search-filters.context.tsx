import { FC, createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useFormik, FormikProps} from 'formik';
import { useInfiniteQuery, useQuery, InfiniteData, useQueryClient } from 'react-query';
import { utils } from 'ethers';
import { useMedia } from 'react-use';

// API Calls & Interfaces
import { getUserNFTsApi, IGetUserNFTsProps } from '../../../../../../api';
import { GetCollectionApi, GetUserCollectionsFromScraperApi, GetActiveSellOrdersApi, GetNFT2Api } from '../../../../../nft/api';
import { IUserOwnedCollection, ISearchBarDropdownCollection, INFT, IERC721AssetType, IERC721BundleAssetType, IOrder } from '../../../../../nft/types';
import { GetCollectionNFTsApi } from '../../../../../nft/api';
import { TokenTicker } from '../../../../../../enums';
import {
	ISaleTypeFilterValue,
	INftTypeFilterValue,
	IPriceRangeFilterValue,
	ISearchBarValue,
	ISortByFilterValue,
	SortOrderOptions,
	ICollectionsValue,
	useCollectionsFilter,
	useSaleTypeFilter,
	useNFTTypeFilter,
	usePriceRangeFilter,
} from '../search-filters';
import { collectionKeys, nftKeys, orderKeys } from '../../../../../../utils/query-keys';

// Constants
const PER_PAGE = 12;
import { getTokenAddressByTicker } from '../../../../../../constants';
import { breakpoints } from '../../../../../../theme/constants';

// Interfaces
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

interface ICollectionFilterFormValue {
	collections: ICollectionsValue[];
}

export interface ISearchFiltersContext {
	// --- STATE ---
	userAddress?: string;
	setUserAddress: (address: string) => void;
	setCollectionAddress: (address: string) => void;
	hasSelectedSaleTypeFilter: () => boolean;
	hasSelectedPriceFilter: () => boolean;
	hasSelectedSortByFilter: () => boolean;
	hasSelectedNftTypeFilter: () => boolean;
	hasSelectedCollectionFilter: () => boolean;
	hasSelectedOrderBookFilters: () => boolean;
	hasSearchBarFilter: () => boolean;
	disabledSortByFilters: boolean;
	setDisabledSortByFilters: (v: boolean) => void;
	getSelectedFiltersCount: () => number;
	setShowResultsMobile: (v: boolean) => void;
	showResultsMobile: boolean;
	// --- FORMS ---
	searchBarForm: FormikProps<ISearchBarValue>;
	collectionFilterForm: FormikProps<ICollectionFilterFormValue>;
	saleTypeForm: FormikProps<ISaleTypeFilterValue>;
	nftTypeForm: FormikProps<INftTypeFilterValue>;
	priceRangeForm: FormikProps<IPriceRangeFilterValue>;
	sortByForm: FormikProps<ISortByFilterValue>;
	clearAllForms: () => void;
	// --- API RETURNED DATA ---
	userCollections: ISearchBarDropdownCollection[];
	userNFTs: InfiniteData<INFTsResult> | undefined;
	fetchNextUserNFTs: any;
	isFetchingUserNFTs: boolean;
	isFethingOrders: boolean;
	isLoadingOrders: boolean;
	isIdleOrders: boolean;
	hasMoreOrders: boolean | undefined;
	hasMoreUserNFTs: boolean | undefined;
	collectionNFTs: InfiniteData<INFTsResult> | undefined;
	// TODO:: UPDATE THE TYPE !
	fetchNextCollectionNFTs: any;
	fetchNextOrders: any;
	hasMoreCollectionNFTs: boolean | undefined;
	isFetchingCollectionNFTs: boolean;
	isLoadingCollectionNFTs: boolean;
	isIdleCollectionNFTs: boolean;
	isLoadingUserNFTs: boolean;
	isIdleUserNFTs: boolean;
	orders: InfiniteData<IOrdersResult> | undefined;
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
	const [disabledSortByFilters, setDisabledSortByFilters] = useState<boolean>(false);
	const [showResultsMobile, setShowResultsMobile] = useState<boolean>(true); // In order for the get user NFTs querry to kick in Mobile on mount, on success set it to false
	const isMobile = useMedia(`(max-width: ${breakpoints.md})`);

  // --------- QUERY CLIENT ---------
  const queryClient = useQueryClient();

	// --------- FORMIK ---------
	const searchBarForm = useFormik<ISearchBarValue>({
    initialValues: {
      searchValue: '',
    },
    onSubmit: () => {},
	});

	const sortByForm = useFormik<ISortByFilterValue>({
		initialValues: {
			sortingIndex: 0,
		},
		onSubmit: () => {},
	});

	const { form: saleTypeFilterForm } = useSaleTypeFilter();
	const { form: nftTypeFilterForm } = useNFTTypeFilter();
	const { form: priceRangeFilterForm } = usePriceRangeFilter();
	const { form: collectionFilterForm } = useCollectionsFilter();

	// --------- GETTERS ---------
	const hasSelectedSaleTypeFilter = () => {
		return saleTypeFilterForm.dirty;
	}

	const hasSelectedPriceFilter = () => {
		return priceRangeFilterForm.dirty;
	}

	const hasSelectedSortByFilter = () => {
		return sortByForm.dirty;
	}

	const hasSelectedNftTypeFilter = () => {
		return nftTypeFilterForm.dirty;
	}

	const hasSelectedCollectionFilter = () => {
		return collectionFilterForm.dirty;
	}

	const hasSearchBarFilter = () => {
		return searchBarForm.dirty;
	}

	/**
	 * Gets the selected filters type count
	 * @returns number
	 */
	const getSelectedFiltersCount = (): number => {
		let c = 0;
		[
			hasSelectedSaleTypeFilter(),
			hasSelectedPriceFilter(),
			hasSelectedSortByFilter(),
			hasSelectedNftTypeFilter(),
			hasSelectedCollectionFilter(),
		].forEach((v: boolean) => {
			if (v) c += 1;
		});

		return c;
	}

	/**
	 * @returns Boolean which indicates, if there are any OrderBook Filters selected
	 */
	const hasSelectedOrderBookFilters = (): boolean => {
		return !![
			hasSelectedSaleTypeFilter(),
			hasSelectedPriceFilter(),
			hasSelectedSortByFilter(),
			hasSelectedNftTypeFilter(),
		].filter(Boolean).length;
	}

	// --------- SETTERS ---------
	const clearAllForms = () => {
		isMobile && setShowResultsMobile(true);
		saleTypeFilterForm.resetForm();
    nftTypeFilterForm.resetForm();
    priceRangeFilterForm.resetForm();
    collectionFilterForm.resetForm();
    sortByForm.resetForm();
		searchBarForm.resetForm();
		isMobile && setShowResultsMobile(false);
	}

	// --------- HELPERS ---------
	const _parseSaleTypeFilters = (form: FormikProps<ISaleTypeFilterValue>) => {
		const r: any = {};

    if (form.values.hasOffers) {
      r['hasOffers'] = true;
    }

    if (form.values.buyNow) {
      r['side'] = 1;
    }

    if (form.values.new) {
      r['beforeTimestamp'] = Math.floor((new Date()).getTime() / 1000);
    }

		return r;
	}

	const _parseNftTypeFilterForm = (form: FormikProps<INftTypeFilterValue>) => {
		const r: any = {};

    const assetClassFilters = []
    if (form.values.singleItem) {
      assetClassFilters.push("ERC721");
    }

    if (form.values.bundle) {
      assetClassFilters.push("ERC721_BUNDLE");
    }

    if (assetClassFilters.length) {
      r['assetClass'] = assetClassFilters.join(',');
    }

		return r;
	}

	const _parsePriceRangeFilterForm  = (form: FormikProps<IPriceRangeFilterValue>) => {
		const r: any = {};

    if (form.values.currency.token && form.dirty) {
      const ticker = form.values.currency.token as TokenTicker;
      const tokenAddress = getTokenAddressByTicker(ticker);
      r['token'] = tokenAddress;
    }

    const [minPrice, maxPrice] = form.values.price;

    if (minPrice) {
      r['minPrice'] = minPrice;
    }

    if (maxPrice && priceRangeFilterForm.dirty) {
      r['maxPrice'] = maxPrice;
    }

		return r;
	}

	const _parseSortByForm = (form: FormikProps<ISortByFilterValue>) => {
		const r: any = {};

    if (form.values.sortingIndex) {
      let sortFilter = 0
      switch (form.values.sortingIndex) {
        case SortOrderOptions.EndingSoon:
          sortFilter = 1
          break;
        case SortOrderOptions.HighestPrice:
          sortFilter = 2
          break;
        case SortOrderOptions.LowestPrice:
          sortFilter = 3
          break;
        case SortOrderOptions.RecentlyListed:
          sortFilter = 4
          break;
        default:
          break;
      }
      r['sortBy'] = sortFilter;
    }

		return r;
	}

	const _parseTokenIds = () => {
		const r: any = {};

		const hasCollectionNFTs = collectionNFTs?.pages?.length && collectionNFTs?.pages[0]?.data?.length;
		const hasUserNFTs = userNFTs?.pages?.length && userNFTs?.pages[0]?.data?.length;

		if (hasSearchBarFilter() && hasCollectionNFTs) {
			const nftIds = collectionNFTs?.pages[0].data.map((nft) => nft.tokenId).join(',');
      r['tokenIds'] = nftIds;
		}

		if (hasSearchBarFilter() && !!hasUserNFTs) {
			const nftIds = userNFTs?.pages[0].data.map((nft) => nft.tokenId).join(',');
      r['tokenIds'] = nftIds;
		}

		return r;
	}

	const _parseSelectedCollection = () => {
		const r: any = {};

		if (collectionAddress) {
			r['collection'] = collectionAddress;
		}

		if (hasSelectedCollectionFilter()) {
			r['collection'] = collectionFilterForm.values.collections[0].address;
		}

		return r;
	}

	const _parseMaker = () => {
		const r: any = {};

		if (userAddress) {
			r['maker'] = userAddress;
		}

		return r;

	}

	/**
	 * @param orders IOrder[]
	 * @param nfts INFT[]
	 * @returns mapped data with Order and the information about the NFTs inside
	 */
	const _mapOrders = (orders: any[], nfts: any[]): OrdersData[] => {
		const nftsMap = nfts.reduce<Record<string, INFT>>((acc, response) => {
      if (response.status !== 'fulfilled') {
        return acc;
      }

      const NFT: INFT = response.value;

      queryClient.setQueryData(nftKeys.nftInfo({collectionAddress: NFT._collectionAddress || "", tokenId: NFT.tokenId}), NFT)

      const key = `${NFT.collection?.address}:${NFT.tokenId}`;

      acc[key] = NFT;

      return acc;
    }, {});

    const result = orders.reduce<OrdersData[]>((acc, order) => {
      const NFTsMapKeys = Object.keys(nftsMap);

      switch (order.make.assetType.assetClass) {
        case 'ERC721':
          const assetType = order.make.assetType as IERC721AssetType;
          if (NFTsMapKeys.includes(`${assetType.contract}:${assetType.tokenId}`)) {
            acc.push({
              order,
              NFTs: nftsMap[`${assetType.contract}:${assetType.tokenId}`]
                ? [nftsMap[`${assetType.contract}:${assetType.tokenId}`]]
                : []
            })
          }
          break;
      }

      return acc;
    }, []);

		return result;
	}

	// --------- FLAGS ---------
	const _getUserNftsEnabled = () => {
		const isMobilePopupSearch = (!!userAddress && isMobile && showResultsMobile);
		const isMobileSearchBar = hasSearchBarFilter() && isMobile && !showResultsMobile;
		const isDekstopSearch = !isMobile && !!userAddress;

		return isMobilePopupSearch || isMobileSearchBar || isDekstopSearch;
	}

	const _getOrdersEnabled = () => {
		const isMobileSearch = isMobile && showResultsMobile && hasSelectedOrderBookFilters();
		const isDekstopSearch = !isMobile && hasSelectedOrderBookFilters();
		const isSearchBarSearchInOrderBook = hasSearchBarFilter() && hasSelectedOrderBookFilters();

		return isMobileSearch || isDekstopSearch || isSearchBarSearchInOrderBook;
	}


	// --------- QUERY HANDLERS ---------
	/**
	 * Fetches all user collections in which the user has NFTs from the Scraper API
	 */
	const _handleGetUserCollections = async (): Promise<ISearchBarDropdownCollection[]> => {
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

	/**
	 * Fetches user NFTs based on applied query params
	 * @param param number
	 * @returns Object cointaining pagination info and INFT[];
	 */
	const _handleGetUserNFTs = async ({ pageParam = 1 }) => {
		const query: IGetUserNFTsProps = {
			address: utils.getAddress(userAddress),
			page: pageParam,
			size: PER_PAGE,
			search: searchBarForm.values.searchValue,
			tokenAddress: collectionFilterForm.values.collections.length
				? collectionFilterForm.values.collections[0].address
				: '',
		};

			return await getUserNFTsApi(query);
	};

	/**
	 * Gets the orders from the OrderBook API based on the applied filters
	 * @param param number
	 * @returns Object with OrdersData[] and total orders count
	 */
	const _handleGetOrders = async ({ pageParam = 1 }) => {
		let apiFilters: any = { page: pageParam, side: 1 };

		// Parse the filters
		apiFilters = {...apiFilters, ..._parseSaleTypeFilters(saleTypeFilterForm)};
		apiFilters = {...apiFilters, ..._parseNftTypeFilterForm(nftTypeFilterForm)};
		apiFilters = {...apiFilters, ..._parsePriceRangeFilterForm(priceRangeFilterForm)};
		apiFilters = {...apiFilters, ..._parseSortByForm(sortByForm)};
		apiFilters = {...apiFilters, ..._parseTokenIds()};
		apiFilters = {...apiFilters, ..._parseSelectedCollection()};
		apiFilters = {...apiFilters, ..._parseMaker()};

		// Get the orders
		const { orders, total } = await GetActiveSellOrdersApi(apiFilters);

		// Get the orders NFTs
		const NFTsRequests: Array<any> = [];

		for (const order of orders) {
			switch (order.make.assetType.assetClass) {
				case 'ERC721':
					const assetType = order.make.assetType as IERC721AssetType;
          queryClient.setQueryData(orderKeys.listing({collectionAddress: assetType.contract, tokenId: assetType.tokenId.toString()}), order)
					NFTsRequests.push(GetNFT2Api(assetType.contract, assetType.tokenId))
					break;
			}
		}

		const nfts = await Promise.allSettled(NFTsRequests);

		// Map the results
		const result = _mapOrders(orders, nfts);

		return { total, data: result };
	}

	/**
	 * Gets the collection NFTs from the Scraper based on the applied Filters
	 * @param param
	 * @returns ICollectionNFTsResponse
	 */
	const _handleGetCollectionNFTs = async ({ pageParam = 1 }) => {
		const searchQuery = searchBarForm.values.searchValue;

		const collectionNFTs = await GetCollectionNFTsApi(utils.getAddress(collectionAddress), pageParam, PER_PAGE, searchQuery);
		return collectionNFTs;
	};

	// --------- QUERIES ---------
	/**
   * Query for fetching user Collections
   * This query should only be executed once
   */
	const { data: UserCollections } = useQuery(
    collectionKeys.userCollections(userAddress),
    _handleGetUserCollections,
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
		isFetching: isFetchingUserNFTs,
		isLoading: isLoadingUserNFTs,
		isIdle: isIdleUserNFTs
	} = useInfiniteQuery([
		nftKeys.userNfts(userAddress),
		userAddress,
		searchBarForm.values,
		collectionFilterForm.values,
		'NFTs'
	], _handleGetUserNFTs,
		{
			enabled: _getUserNftsEnabled(),
			retry: false,
			getNextPageParam: (lastPage, pages) => {
				return pages.length * PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
			},
			onSuccess: () => {
				isMobile && setShowResultsMobile(false);
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
			searchBarForm.values,
		], _handleGetCollectionNFTs,
		{
			enabled: !!collectionAddress,
			retry: false,
			getNextPageParam: (lastPage, pages) => {
				return pages.length * PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
			},
			onError: () => {
				// TODO:: Handle Errors ?
			},
		},
  );

		const waitForUserNFTs = () => {
			if (!userAddress) return false;

			// if there is user address we should check if we are fetching user nfts
			if (isFetchingUserNFTs) return true;

			const hasUserNFTs = userNFTs?.pages?.length && userNFTs?.pages[0]?.data?.length;

			// if there is an user address and we are not fetching user nfts we should check the userNFTs length, if we don't have user nfts we should disable the order book query, else kick the query with the user nfts data
			if (!!hasUserNFTs) return false;
			else return true;
		}

	/**
	 * Query for fetching orders
	 */
	const {
		data: orders,
		fetchNextPage: fetchNextOrders,
		hasNextPage: hasMoreOrders,
		isFetching: isFethingOrders,
		isLoading: isLoadingOrders,
		isIdle: isIdleOrders,
	} = useInfiniteQuery(
		[
    	'orders',
    	saleTypeFilterForm.values,
    	priceRangeFilterForm.values,
			nftTypeFilterForm.values,
			sortByForm.values,
			userNFTs,
			{
				searchValue: searchBarForm.values.searchValue,
				collectionNFTs: collectionNFTs,
			},
  	], _handleGetOrders,
		{
			enabled: _getOrdersEnabled() && !waitForUserNFTs(),
			retry: false,
			getNextPageParam: (lastPage, pages) => {
				return pages.length * PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
			},
			onSuccess: (result) => {
				isMobile && setShowResultsMobile(false);
			}
  	}
	);

	// --------- EXPORT VALUE ---------
  const value: ISearchFiltersContext = {
		// --- STATE ---
		userAddress: userAddress,
		setUserAddress: setUserAddress,
		setCollectionAddress: setCollectionAddress,
		disabledSortByFilters,
		setShowResultsMobile,
		showResultsMobile,
		// --- GETTERS ---
		hasSelectedSaleTypeFilter,
		hasSelectedPriceFilter,
		hasSelectedSortByFilter,
		hasSelectedNftTypeFilter,
		hasSelectedCollectionFilter,
		hasSelectedOrderBookFilters,
		hasSearchBarFilter,
		getSelectedFiltersCount,
		// --- SETTERS ---
		clearAllForms,
		setDisabledSortByFilters,
		// --- FORMS ---
		searchBarForm: searchBarForm,
		collectionFilterForm: collectionFilterForm,
		nftTypeForm: nftTypeFilterForm,
		saleTypeForm: saleTypeFilterForm,
		priceRangeForm: priceRangeFilterForm,
		sortByForm: sortByForm,
		// --- API returned Data ---
		userCollections: UserCollections || [],
		userNFTs: userNFTs,
		orders: orders,
		fetchNextOrders,
		isFethingOrders,
		isLoadingOrders,
		isIdleOrders,
		hasMoreOrders,
		fetchNextUserNFTs: fetchNextUserNFTs,
		isFetchingUserNFTs: isFetchingUserNFTs,
		isLoadingUserNFTs,
		isIdleUserNFTs,
		hasMoreUserNFTs: hasMoreUserNFTs,
		collectionNFTs: collectionNFTs,
		fetchNextCollectionNFTs: fetchNextCollectionNFTs,
		hasMoreCollectionNFTs: hasMoreCollectionNFTs,
		isFetchingCollectionNFTs: isFetchingCollectionNFTs,
		isLoadingCollectionNFTs: isLoadingCollectionNFTs,
		isIdleCollectionNFTs: isIdleCollectionNFTs,
		// --- FILTERS VISIBLITY ---
		showSaleTypeFilters: showSaleTypeFilters,
		showNFTTypeFilters: showNFTTypeFilters,
		showPriceRangeFilters: showPriceRangeFilters,
		showCollectionFilters: showCollectionFilters,
		// --- FILTERS VISIBLITY SETTERS ---
		setShowSaleTypeFilters,
		setShowNFTTypeFilters,
		setShowPriceRangeFilters,
		setShowCollectcionFilters,
	};

  return (
    <SearchFiltersContext.Provider value={value}>
      {props.children}
    </SearchFiltersContext.Provider>
  );
};


export default FiltersContextProvider;
