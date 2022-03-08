import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import FloorPriceIcon from '../../../../../../../../../components/svgs/FloorPriceIcon';
import FolderIcon from '../../../../../../../../../components/svgs/FolderIcon';
import UserIcon from '../../../../../../../../../components/svgs/UserIcon';
import VolumeTraded from '../../../../../../../../../components/svgs/VolumeTraded';
import currencyIcon from '../../../../../../../../../assets/images/eth-icon-new.svg';
import * as styles from './styles';

export const CollectionStatistics = ({ nftsCount, ownersCount, floorPrice, volumeTraded }: any) => {
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'1px'} borderRadius={"12px"}>
        <Flex {...styles.StatisticsContainerStyle}>
            <Box {...styles.LabelStyle}>
                <Box sx={{
                    mr: '6px'
                }}>
                    <FolderIcon />
                </Box>
                Items
            </Box>
            <Box {...styles.ValueStyle}>
                {nftsCount}
            </Box>
        </Flex>
        <Flex {...styles.StatisticsContainerStyle}>
            <Box {...styles.LabelStyle}>
                <Box sx={{
                        mr: '6px'
                    }}>
                    <UserIcon />
                </Box>
                Owners
            </Box> 
            <Box {...styles.ValueStyle}>
                {ownersCount}
            </Box>
        </Flex>
        <Flex {...styles.StatisticsContainerStyle}>
            <Box {...styles.LabelStyle}>
                <Box sx={{
                    mr: '6px'
                }}>
                    <FloorPriceIcon />
                </Box>
                Floor price
            </Box>
            <Box {...styles.ValueStyle}>
                {floorPrice ? (
                    <>
                        <img src={currencyIcon} alt="Currency" /> {floorPrice}
                    </>
                ) : (
                    '-'
                )}
            </Box>
        </Flex>
        <Flex {...styles.StatisticsContainerStyle}>
            <Box {...styles.LabelStyle}>
                <Box sx={{
                        mr: '6px'
                }}>
                    <VolumeTraded />
                </Box>
                Volume traded
            </Box>
            <Box {...styles.ValueStyle}>
                {volumeTraded ? (
                    <>
                        <img src={currencyIcon} alt="Currency" /> {volumeTraded}
                    </>
                ) : (
                    '-'
                )}
            </Box>
        </Flex>
      </SimpleGrid>
  </>

  )
}
