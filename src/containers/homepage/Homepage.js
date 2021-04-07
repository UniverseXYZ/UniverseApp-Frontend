import About from '../../components/homepage/About';
import BuyUniverseNFTs from '../../components/homepage/BuyUniverseNFTs';
import '../../components/homepage/Homepage.scss';
import NonFungibleUniverse from '../../components/homepage/NonFungibleUniverse';
import Welcome from "../../components/homepage/Welcome"

const Homepage = () => {
    return (
        <div className='homepage'>
            <Welcome />
            <About />
            <NonFungibleUniverse />
            <BuyUniverseNFTs />
        </div>
    )
}

export default Homepage;