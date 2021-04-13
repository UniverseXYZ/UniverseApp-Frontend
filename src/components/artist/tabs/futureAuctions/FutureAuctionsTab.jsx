import {useState} from 'react'
import Pagination from '../../../pagination/Pagionation';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown';
import FutureAuctionsList from './FutureAuctionsList';
import { PLACEHOLDER_FUTURE_AUCTIONS } from '../../../../utils/fixtures/FutureAuctionsDummyData';

const FutureAuctionsTab = () => {
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(6);

    return (
        <>
            <FutureAuctionsList data={PLACEHOLDER_FUTURE_AUCTIONS} perPage={perPage} offset={offset} />
            <div className='pagination__container'>
                <Pagination data={PLACEHOLDER_FUTURE_AUCTIONS} perPage={perPage} setOffset={setOffset} />
                <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
            </div>
        </>
    )
}

export default FutureAuctionsTab
