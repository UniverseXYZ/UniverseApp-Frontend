import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { NFTReportPopup } from '../nft-report-popup';
import { MenuItem } from './components';
import * as styles from './styles';

import DotsIcon from '../../../../../assets/images/marketplace/3-dots.svg';
import ShareIcon from '../../../../../assets/images/share-nft.svg';
import ReportIcon from '../../../../../assets/images/report.svg';
import { NFTSharePopup } from '../nft-share-popup';

interface IBundleMenuProps {
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

export const BundleMenu = (
  {
    showShare = true,
    showReport = true,
    onShare,
    onReport,
  }: IBundleMenuProps
) => {
  const router = useHistory();
  const [isReportPopupOpened, setIsReportPopupOpened] = useState(false);
  const [isSharePopupOpened, setIsSharePopupOpened] = useState(false);

  const handleShare = useCallback(() => {
    onShare ? onShare() : setIsSharePopupOpened(true);
  }, [onShare]);

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
          {showShare && (<MenuItem name={'Share'} icon={ShareIcon} onClick={handleShare} />)}
          {showReport && (<MenuItem name={'Report'} icon={ReportIcon} redColor={true} onClick={handleReport} />)}
        </MenuList>
      </Menu>
      <NFTReportPopup isOpen={isReportPopupOpened} onClose={() => setIsReportPopupOpened(false)} />
      <NFTSharePopup isOpen={isSharePopupOpened} onClose={() => setIsSharePopupOpened(false)} />
    </>
  );
}
