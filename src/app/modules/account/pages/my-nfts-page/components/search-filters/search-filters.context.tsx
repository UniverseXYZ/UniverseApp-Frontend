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

// Interfaces
import { SearchFilters, ISearchBarValue, ICollectionFilterValue } from '../search-filters';

interface INFTsResult {
  page: number,
  size: string,
  total: number,
	data: any[],
};

export interface ISearchFiltersContext {
	userAddress?: string;
	setUserAddress: (address: string) => void;
	searchBarForm: FormikProps<ISearchBarValue>;
	userCollections: ISearchBarDropdownCollection[];
	collectionFilterForm: FormikProps<ICollectionFilterValue>;
	userNFTs: InfiniteData<INFTsResult> | undefined;
	fetchNextUserNFTs: any;
	isFetchingUserNFTs: boolean;
	hasMoreNFTs: boolean | undefined;
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
	};

  return (
    <SearchFiltersContext.Provider value={value}>
      {props.children}
    </SearchFiltersContext.Provider>
  );
};


export default FiltersContextProvider;
