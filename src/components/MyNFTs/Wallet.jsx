import { useState } from 'react';
import testCollectionAvatar from '../../assets/images/test-collection-avatar.svg';

const Wallet = () => {
    const [isCollectionDropdownOpened, setIsCollectionDropdownOpened] = useState(false);

    return (
        <div className='tab__wallet'>
            <div className='filtration'>
                <div className='filter__by__collection'>
                    <div className='filter__by__collection__label'>
                        <label>Filter by collection</label>
                        <button>Clear all</button>
                    </div>
                    <div className='filter__by__collection__input'>
                        <input
                            type='text'
                            placeholder='Browse collections...'
                            onFocus={() => setIsCollectionDropdownOpened(true)}
                            onBlur={() => setIsCollectionDropdownOpened(false)}
                        />
                    </div>
                </div>
                <div className='search__by__name'>
                    <div className='search__by__name__label'>
                        <label>Seach by name</label>
                    </div>
                    <div className='search__by__name__input'>
                        <input type='text' placeholder='Start typing' />
                    </div>
                </div>
                {isCollectionDropdownOpened &&
                    <div className='collections__dropdown'>
                        <button>
                            <img src={testCollectionAvatar} alt='Test Collection Avatar' />
                            <span>Crazy Collection</span>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Wallet;