import Collection from '../../assets/images/Collection.svg';
import Collection1 from '../../assets/images/Collection1.svg';


const MintNft = ({ onClick }) =>{
return(
    <div className="mintNft-div">
        <h2>Mint NFT</h2>
        <p>Choose “Single NFT” if you want your NFT to be one of a kind or “NFT Collection” if you want to create an ERC-721 with ERC-721 tokens inside</p>
        <div className="ntfs">
            <img alt="" src={Collection1} onClick={() => onClick('single')} />
            <img alt="" src={Collection} onClick={() => onClick('collection')} />
        </div>
    </div>
)
}
export default MintNft