import {useState} from 'react'
import Pagination from '../../../pagination/Pagionation';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown';
import ActiveAuctionsList from './ActiveAuctionsList';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../../../dummyData/ActiveAuctionsDummyData';

const ActiveAuctionsTab = () => {
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(6);

    return (
        <>
            <ActiveAuctionsList data={PLACEHOLDER_ACTIVE_AUCTIONS} perPage={perPage} offset={offset} />
            <div className='pagination__container'>
                <Pagination data={PLACEHOLDER_ACTIVE_AUCTIONS} perPage={perPage} setOffset={setOffset} />
                <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
            </div>
        </>
    )
}

export default ActiveAuctionsTab
