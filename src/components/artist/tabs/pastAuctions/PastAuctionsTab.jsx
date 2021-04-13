import {useState} from 'react'
import Pagination from '../../../pagination/Pagionation';
import ItemsPerPageDropdown from '../../../pagination/ItemsPerPageDropdown';
import PastAuctionsList from './PastAuctionsList';
import { PLACEHOLDER_PAST_AUCTIONS } from '../../../../utils/fixtures/PastAuctionsDummyData';

const PastAuctionsTab = () => {
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(6);

    return (
        <>
            <PastAuctionsList data={PLACEHOLDER_PAST_AUCTIONS} perPage={perPage} offset={offset} />
            <div className='pagination__container'>
                <Pagination data={PLACEHOLDER_PAST_AUCTIONS} perPage={perPage} setOffset={setOffset} />
                <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
            </div>
        </>
    )
}

export default PastAuctionsTab
