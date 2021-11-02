import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import uuid from 'react-uuid';
import Input from '../input/Input.jsx';
import '../pagination/Pagination.scss';
import Pagination from '../pagination/Pagionation.jsx';
import searchIconGray from '../../assets/images/search-gray.svg';
import { isAfterNow, isBeforeNow } from '../../utils/dates';
import AuctionsCardSkeleton from '../auctionsCard/skeleton/AuctionsCardSkeleton.jsx';
import ActiveAuctionsTabsCard from '../auctionsCard/ActiveAuctionsTabsCard.jsx';
import NoAuctionsFound from './NoAuctionsFound';
import { getActiveAuctions } from '../../utils/api/auctions';
import ActiveAndPastCardSkeleton from './skeleton/ActiveAndPastCardSkeleton';

const ActiveAuctions = () => {
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchByName, setSearchByName] = useState('');

  const filterAuctions = (auctions) => {
    const filteredAuctions = auctions
      .slice(offset, offset + perPage)
      .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
      .filter((item) => item && isBeforeNow(item.startDate) && isAfterNow(item.endDate));

    return filteredAuctions;
  };

  useEffect(async () => {
    try {
      const response = await getActiveAuctions();
      if (!response.auctions?.length) {
        setNotFound(true);
        setLoading(false);
      } else {
        const auctions = filterAuctions(response.auctions);
        setActiveAuctions(auctions);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSearch = (value) => {
    setSearchByName(value);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newAuctions = activeAuctions;
    const draggingAuction = newAuctions.splice(source.index, 1);
    newAuctions.splice(destination.index, 0, draggingAuction[0]);

    setActiveAuctions(newAuctions);
  };

  useEffect(() => {
    window['__react-beautiful-dnd-disable-dev-warnings'] = true;
  }, []);

  return (
    <div className="active-auctions">
      <div className="input-search">
        <div className="input--section">
          <Input
            className="searchInp"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchByName}
            placeholder="Search by name"
            hoverBoxShadowGradient
          />
          <img src={searchIconGray} alt="search" />
        </div>
      </div>
      {!loading ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppableId">
            {(provided) => (
              <div key={uuid()} ref={provided.innerRef} {...provided.droppableProps}>
                {activeAuctions.map((activeAuction, index) => (
                  <ActiveAuctionsTabsCard activeAuction={activeAuction} index={index} />
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <ActiveAndPastCardSkeleton />
      )}
      {notFound && <NoAuctionsFound title="No active auctions found" />}
      <div className="pagination__container">
        <Pagination data={activeAuctions} perPage={perPage} setOffset={setOffset} />
      </div>
    </div>
  );
};

export default ActiveAuctions;
