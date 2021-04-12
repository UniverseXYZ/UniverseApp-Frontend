import uuid from "react-uuid";
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';

const Lists = ({ data, perPage, offset }) => {
    const sliceData = data.slice(offset, offset + perPage);

    return (
        <div className='nfts__lists'>
            {sliceData.map(nft => {
                return (
                    <div className='nft__box' key={uuid()}>
                        <div className='nft__box__image'>
                            {nft.previewImage.type === 'video/mp4' &&
                                <video onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()}>
                                    <source src={URL.createObjectURL(nft.previewImage)} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            }
                            {nft.previewImage.type === 'audio/mpeg' &&
                                <img className="preview-image" src={mp3Icon} alt={nft.name} />
                            }
                            {nft.previewImage.type !== 'audio/mpeg' && nft.previewImage.type !== 'video/mp4' &&
                                <img className="preview-image" src={URL.createObjectURL(nft.previewImage)} alt={nft.name} />
                            }
                            {nft.previewImage.type === 'video/mp4' &&
                                <img className='video__icon' src={videoIcon} alt='Video Icon' />
                            }
                        </div>
                        <div className='nft__box__name'>
                            <h3>{nft.name}</h3>
                            {nft.type === 'single' ?
                                nft.generatedEditions.length > 1 ?
                                    <div className='collection__count'>
                                        {`x${nft.generatedEditions.length}`}
                                        <div className='generatedEditions' style={{ gridTemplateColumns: `repeat(${Math.ceil(nft.generatedEditions.length/10)}, auto)` }}>
                                            {nft.generatedEditions.map(edition => {
                                                return (
                                                    <div key={edition}>{`#${edition}`}</div>
                                                )
                                            })}
                                        </div>
                                    </div> :
                                <p className='collection__count'>{`#${nft.generatedEditions[0]}`}</p> : <></>
                            }
                        </div>
                        <div className='nft__box__footer'>
                            <div className='collection__details'>
                                {nft.type === 'collection' &&
                                    <>
                                        {typeof nft.collectionAvatar === 'string' && nft.collectionAvatar.startsWith('#') ? 
                                            <div className='random__bg__color' style={{ backgroundColor: nft.collectionAvatar }}>{nft.collectionName.charAt(0)}</div> :
                                            <img src={URL.createObjectURL(nft.collectionAvatar)} alt={nft.collectionName} />
                                        }
                                        <span>{nft.collectionName}</span>
                                    </>
                                }
                            </div>
                            {nft.type === 'collection' ?
                                nft.generatedEditions.length > 1 ?
                                    <div className='collection__count'>
                                        {`x${nft.generatedEditions.length}`}
                                        <div className='generatedEditions' style={{ gridTemplateColumns: `repeat(${Math.ceil(nft.generatedEditions.length/10)}, auto)` }}>
                                            {nft.generatedEditions.map(edition => {
                                                return (
                                                    <div key={edition}>{`#${edition}`}</div>
                                                )
                                            })}
                                        </div>
                                    </div> :
                                <p className='collection__count'>{`#${nft.generatedEditions[0]}`}</p> : <></>
                            }
                        </div>
                        {nft.generatedEditions.length > 1 &&
                            <>
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