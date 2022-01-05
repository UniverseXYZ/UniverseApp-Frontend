import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

import { NFTReportPopup } from '../nft-report-popup';
import { MenuItem } from './components';
import * as styles from './styles';

import DotsIcon from '../../../../../assets/images/marketplace/3-dots.svg';
import SellIcon from '../../../../../assets/images/sell-nft.svg';
import TransferIcon from '../../../../../assets/images/transfer-nft.svg';
import ShareIcon from '../../../../../assets/images/share-nft.svg';
import HideIcon from '../../../../../assets/images/hide-nft.svg';
import UnhideIcon from '../../../../../assets/images/unhide-nft.svg';
import EditIcon from '../../../../../assets/images/edit.svg';
import BurnIcon from '../../../../../assets/images/burn-nft.svg';
import RemoveIcon from '../../../../../assets/images/remove.svg';
import ReportIcon from '../../../../../assets/images/report.svg';
import { NFTSharePopup } from '../nft-share-popup';

interface INFTMenuProps {
  showSell?: boolean;
  showTransfer?: boolean;
  showShare?: boolean;
  showHideUnhide?: boolean;
  showEdit?: boolean;
  showBurn?: boolean;
  showRemove?: boolean;
  showReport?: boolean;
  onSell?: () => void;
  onTransfer?: () => void;
  onShare?: () => void;
  onHideUnhide?: () => void;
  onEdit?: () => void;
  onBurn?: () => void;
  onRemove?: () => void;
  onReport?: () => void;
}

export const NFTMenu = (
  {
    showSell = true,
    showTransfer = true,
    showShare = true,
    showHideUnhide = true,
    showEdit = true,
    showBurn = true,
    showRemove = true,
    showReport = true,
    onSell,
    onTransfer,
    onShare,
    onHideUnhide,
    onEdit,
    onBurn,
    onRemove,
    onReport,
  }: INFTMenuProps
) => {
  const [isReportPopupOpened, setIsReportPopupOpened] = useState(false);
  const [isSharePopupOpened, setIsSharePopupOpened] = useState(false);

  const handleSell = useCallback(() => {
    if (onSell) {
      onSell();
    } else {

    }
  }, [onSell]);

  const handleTransfer = useCallback(() => {
    if (onTransfer) {
      onTransfer();
    } else {

    }
  }, [onTransfer]);

  const handleShare = useCallback(() => {
    onShare ? onShare() : setIsSharePopupOpened(true);
  }, [onShare]);

  const handleHideUnhide = useCallback(() => {
    if (onHideUnhide) {
      onHideUnhide();
    } else {

    }
  }, [onHideUnhide]);

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit();
    } else {

    }
  }, [onEdit]);

  const handleBurn = useCallback(() => {
    if (onBurn) {
      onBurn();
    } else {

    }
  }, [onBurn]);

  const handleRemove = useCallback(() => {
    if (onRemove) {
      onRemove();
    } else {

    }
  }, [onRemove]);

  const handleReport = useCallback(() => {
    onReport ? onReport() : setIsReportPopupOpened(true);
  }, [onReport]);

  return (
    <>
      <Menu>
        <MenuButton as={Button} variant={'simpleOutline'} {...styles.ButtonStyle}>
          <Image src={DotsIcon} />
        </MenuButton>
        <MenuList {...styles.ListStyle}>
          {showSell && (<MenuItem name={'Sell'} icon={SellIcon} onClick={handleSell} />)}
          {showTransfer && (<MenuItem name={'Transfer'} icon={TransferIcon} onClick={handleTransfer} />)}
          {showShare && (<MenuItem name={'Share'} icon={ShareIcon} onClick={handleShare} />)}
          {showHideUnhide && (<MenuItem name={'Hide'} icon={HideIcon} onClick={handleHideUnhide} />)}
          {showHideUnhide && (<MenuItem name={'Unhide'} icon={UnhideIcon} onClick={handleHideUnhide} />)}
          {showEdit && (<MenuItem name={'Edit'} icon={EditIcon} onClick={handleEdit} />)}
          {showBurn && (<MenuItem name={'Burn'} icon={BurnIcon} redColor={true} onClick={handleBurn} />)}
          {showRemove && (<MenuItem name={'Remove'} icon={RemoveIcon} redColor={true} onClick={handleRemove} />)}
          {showReport && (<MenuItem name={'Report'} icon={ReportIcon} redColor={true} onClick={handleReport} />)}
        </MenuList>
      </Menu>
      <NFTReportPopup isOpen={isReportPopupOpened} onClose={() => setIsReportPopupOpened(false)} />
      <NFTSharePopup isOpen={isSharePopupOpened} onClose={() => setIsSharePopupOpened(false)} />
    </>
  );
}
