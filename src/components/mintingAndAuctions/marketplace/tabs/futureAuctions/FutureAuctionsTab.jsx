import {useState} from 'react'
import ItemsPerPageDropdown from '../../../../pagination/ItemsPerPageDropdown'
import Pagination from '../../../../pagination/Pagionation'
import FutureAuctionsFilters from './Filters'
import { PLACEHOLDER_ACTIVE_AUCTIONS } from './Data'
import FutureAuctionsList from './FutureAuctionsList'

const FutureAuctionsTab = () => {
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(12);

    return (
        <div className='future__auctions__tab'>
            <FutureAuctionsFilters />
            <FutureAuctionsList data={PLACEHOLDER_ACTIVE_AUCTIONS} perPage={perPage} offset={offset} />
            <div className='pagination__container'>
                <Pagination data={PLACEHOLDER_ACTIVE_AUCTIONS} perPage={perPage} setOffset={setOffset} />
                <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
            </div>
        </div>
    )
}

export default FutureAuctionsTab;