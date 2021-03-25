const Lists = ({ data, perPage, offset }) => {
    const sliceData = data.slice(offset, offset + perPage);

    return (
        <div className='nfts__lists'>
            {sliceData.map(nft => {
                return (
                    <div className='nft__box' key={nft.id}>
                        <div className='nft__box__image'>
                            <img src={nft.bgImage} alt={nft.name} />
                        </div>
                        <div className='nft__box__name'>
                            <h3>{nft.name}</h3>
                            {nft.type === 'single' &&
                                <span>#01111</span>
                            }
                        </div>
                        {nft.type === 'collection' &&
                            <>
                                <div className='nft__box__footer'>
                                    <div className='collection__details'>
                                        <img src={nft.collectionAvatar} alt={nft.collectionName} />
                                        <span>{nft.collectionName}</span>
                                    </div>
                                    <div className='collection__count'>{`x${nft.collectionCount}`}</div>
                                </div>
                                <div className='nft__box__highlight__one'></div>
                                <div className='nft__box__highlight__two'></div>
                            </>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Lists;