import { useEffect } from 'react';
import { useLocation } from 'react-router';
import './Artist.scss';
import ArtistDetails from '../../components/artist/ArtistDetails';
import ArtistPageTabs from '../../components/artist/tabs/Tabs';
import { PLACEHOLDER_ARTISTS } from '../../utils/fixtures/ArtistDummyData';

const ArtistContainer = () => {
    const location = useLocation();
    const artist = PLACEHOLDER_ARTISTS.filter(artist => artist.id === location.state.id)[0];
    
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Universe Minting - Artist - ' + artist.name;
        return () => { document.title = 'Universe Minting' };
    }, [])

    return (
        <div className='artist__page'>
            <ArtistDetails artist={artist} />
            <ArtistPageTabs />
        </div>
    )
}

export default ArtistContainer;