import defaultImage from '../../assets/images/big-default-image.png';


const MintNft = ({ onClick }) =>{
return(
    <div className="mintNft-div">
        <h2>Mint NFT</h2>
        <p>Choose “Single NFT” if you want your NFT to be one of a kind or “NFT Collection” if you want to create an ERC-721 with ERC-721 tokens inside</p>
        <div className="ntfs">
            <div className='nft-box' onClick={() => onClick('single')}>
                <div className='image-container'>
                    <img src={defaultImage} alt='Default' />
                </div>
                <h2 className='nft-title'>Single NFT</h2>
                <p className='nft-desc'>ERC-721 non-fungible token</p>
            </div>
            <div className='nft-box' onClick={() => onClick('collection')}>
                <div className='image-container'>
                    <img src={defaultImage} alt='Default' />
                </div>
                <h2 className='nft-title'>NFT Collection</h2>
                <p className='nft-desc'>ERC-721 non-fungible token with built-in ERC-721 tokens</p>
                <div className='nft-box-highlight-one'></div>
                <div className='nft-box-highlight-two'></div>
            </div>
        </div>
    </div>
)
}
export default MintNft