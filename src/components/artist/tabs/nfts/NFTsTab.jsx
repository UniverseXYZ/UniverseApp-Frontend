import {useState} from 'react'
import NFTsList from './NFTsList'
import { PLACEHOLDER_NFTS } from '../../../../utils/fixtures/NFTsDummyData';
import NFTsFilters from './Filters';
import Pagination from '../../../pagination/Pagionation';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown';

const NFTsTab = () => {
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(12);

    return (
        <>
            <NFTsFilters />
            <NFTsList data={PLACEHOLDER_NFTS} perPage={perPage} offset={offset} />
            <div className='pagination__container'>
                <Pagination data={PLACEHOLDER_NFTS} perPage={perPage} setOffset={setOffset} />
                <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
            </div>
        </>
    )
}

export default NFTsTab
