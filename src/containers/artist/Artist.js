import { useEffect } from 'react';
import '../../components/artist/Artist.scss';
import ArtistDetails from '../../components/artist/ArtistDetails';
import ArtistPageTabs from '../../components/artist/tabs/Tabs';

const Artist = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Universe Minting - Artist'
        return () => { document.title = 'Universe Minting' };
    }, [])

    return (
        <div className='artist__page'>
            <ArtistDetails />
            <ArtistPageTabs />
        </div>
    )
}

export default Artist;