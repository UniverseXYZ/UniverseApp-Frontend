import React from 'react';
import closeIcon from '../../assets/images/close-menu.svg';

const BidRankingsPopup = ({ onClose, onBidders }) => {

    return (
        <div className='bid__rankings__popup'>
            <img className='close__popup' onClick={onClose} src={closeIcon} alt='Close' />
            <h1 className='title'>Bid Rankings</h1>
            <div className='reward__tiers'>
                <div className='label'>Reward Tiers:</div>
                <div className='tiers'>
                    <span>Platinum</span>
                    <span>Gold</span>
                    <span>Silver</span>
                </div>
            </div>
            <div className='bids__list'>
                <div className='platinum'>
                    <table>
                        <tbody>
                            {onBidders.map((bidder, index) => {
                                return bidder.rewardTier === 'Platinum' && (
                                    <tr key={bidder.id}>
                                        <td>{index + 1 + '. '}</td>
                                        <td>{bidder.name}<span className={bidder.rewardTier.toLocaleLowerCase()+'__small'}>{bidder.rewardTier}</span></td>
                                        <td>{'Ξ' + bidder.bid}</td>
                                        <td>~$48,580</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='gold'>
                    <table>
                        <tbody>
                            {onBidders.map((bidder, index) => {
                                return bidder.rewardTier === 'Gold' && (
                                    <tr key={bidder.id}>
                                        <td>{index + 1 + '. '}</td>
                                        <td>{bidder.name} <span className={bidder.rewardTier.toLocaleLowerCase()+'__small'}>{bidder.rewardTier}</span></td>
                                        <td>{'Ξ' + bidder.bid}</td>
                                        <td>~$48,580</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='silver'>
                    <table>
                        <tbody>
                            {onBidders.map((bidder, index) => {
                                return bidder.rewardTier === 'Silver' && (
                                    <tr key={bidder.id}>
                                        <td>{index + 1 + '. '}</td>
                                        <td>{bidder.name} <span className={bidder.rewardTier.toLocaleLowerCase()+'__small'}>{bidder.rewardTier}</span></td>
                                        <td>{'Ξ' + bidder.bid}</td>
                                        <td>~$48,580</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BidRankingsPopup;