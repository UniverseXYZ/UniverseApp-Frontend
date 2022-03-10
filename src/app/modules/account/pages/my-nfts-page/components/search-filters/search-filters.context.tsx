import { FC, createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useFormik, FormikProps} from 'formik';
import { useInfiniteQuery, useQuery, InfiniteData } from 'react-query';
import { utils } from 'ethers';

// API Calls & Interfaces
import { getUserNFTsApi, IGetUserNFTsProps } from '../../../../../../api';
import { GetCollectionApi, GetUserCollectionsFromScraperApi } from '../../../../../nft/api';
import { IUserOwnedCollection, ISearchBarDropdownCollection, INFT } from '../../../../../nft/types';

// Constants
const PER_PAGE = 12;
import { coins } from '../../../../../../mocks';

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

export interface ISearchFiltersContext {
	userAddress?: string;
	setUserAddress: (address: string) => void;
	// --- FORMS ---
	searchBarForm: FormikProps<ISearchBarValue>;
	collectionFilterForm: FormikProps<ICollectionFilterValue>;
	saleTypeForm: FormikProps<ISaleTypeFilterValue>;
	nftTypeForm: FormikProps<INftTypeFilterValue>;
	priceRangeForm: FormikProps<IPriceRangeFilterValue>;
	// --- FORMS END ---
	userCollections: ISearchBarDropdownCollection[];
	userNFTs: InfiniteData<INFTsResult> | undefined;
	fetchNextUserNFTs: any;
	isFetchingUserNFTs: boolean;
	hasMoreNFTs: boolean | undefined;
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
		hasNextPage: hasMoreNFTs,
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
	// --------- END QUERIES ---------

	// --------- EXPORT VALUE ---------
  const value: ISearchFiltersContext = {
		userAddress: userAddress,
		setUserAddress: setUserAddress,
		userCollections: UserCollections || [],
		searchBarForm: searchBarForm,
		collectionFilterForm: collectionFilterForm,
		userNFTs: userNFTs,
		fetchNextUserNFTs: fetchNextUserNFTs,
		isFetchingUserNFTs: isFetchingUserNFTs,
		hasMoreNFTs: hasMoreNFTs,
		saleTypeForm: saleTypeFilterForm,
		nftTypeForm: nftTypeFilterForm,
		priceRangeForm: priceRangeFilterForm,
		// FILTERS VISIBLITY
		showSaleTypeFilters: showSaleTypeFilters,
		showNFTTypeFilters: showNFTTypeFilters,
		showPriceRangeFilters: showPriceRangeFilters,
		showCollectionFilters: showCollectionFilters,
		// FILTERS VISIBLITY SETTERS
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
