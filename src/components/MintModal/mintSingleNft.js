import arrow from '../../assets/images/Arrow.png'
const MintSingleNft = ({onClick}) => {
    return (
    <div className="mintNftCollection-div">
    <div className="back-nft" onClick={() => onClick(null)}><img src={arrow} alt="back"/><span>MINT NFT</span></div>
    <h2>Mint Single NFT</h2>
</div>
)
}

export default MintSingleNft;