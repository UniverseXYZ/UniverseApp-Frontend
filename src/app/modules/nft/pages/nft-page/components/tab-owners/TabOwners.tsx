import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Owners } from '../../mocks';
import { useNFTPageData } from '../../NFTPage.context';

export const TabOwners = () => {
  const { NFT } = useNFTPageData();

  const [owners] = useState([...Owners].sort((a, b) => {
    return (a.price || Infinity) > (b.price || Infinity) ? 1 : -1;
  }));

  return (
    <Box>
      {owners.map((owner, i) => (
        <Box key={i} sx={{
          bg: (i === 0 && owner.price)
            ? 'linear-gradient(90deg, rgba(42,208,202,1) 0%, rgba(225,246,100,1) 20%, rgba(254,176,254,1) 40%, rgba(171,179,252,1) 60%, rgba(93,247,164,1) 80%, rgba(88,196,246,1) 100%)'
            : 'white',
          border: '1px solid',
          borderColor: (i === 0 && owner.price) ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          mb: '12px',
          padding: '1px',
          position: 'relative',
          _last: {
            mb: 0,
          },
        }}>
          {(i === 0 && owner.price) && (
            <Box sx={{
              bg: 'linear-gradient(90deg, rgba(42,208,202,1) 0%, rgba(225,246,100,1) 20%, rgba(254,176,254,1) 40%, rgba(171,179,252,1) 60%, rgba(93,247,164,1) 80%, rgba(88,196,246,1) 100%)',
              borderRadius: '100px',
              display: 'inline-block',
              fontFamily: 'Sharp Grotesk',
              fontSize: '8px',
              fontWeight: 600,
              textTransform: 'uppercase',
              p: '2px',
              position: 'absolute',
              top: '-10px',
              left: '18px',
            }}>
              <Box sx={{
                bg: 'white',
                borderRadius: 'inherit',
                p: '2px 10px',
              }}>
                <Text
                  sx={{
                    bgGradient: 'linear-gradient(90deg, rgba(254,176,254,1) 0%, rgba(171,179,252,1) 50%, rgba(88,196,246,1) 100%)',
                    bgClip: 'text',
                  }}
                >
                  Lowest ask
                </Text>
              </Box>
            </Box>
          )}
          <Flex key={i} sx={{
            bg: 'white',
            borderRadius: '10px',
            justifyContent: 'space-between',
            padding: '20px 18px',
          }}>
            <Flex>
              <Image src={owner.user.photo} sx={{
                borderRadius: '50%',
                h: '42px',
                mr: '16px',
                w: '42px',
              }} />
              <Box>
                <Text sx={{
                  fontSize: '14px',
                  fontWeight: 700,
                }}>{owner.user.name}</Text>
                <Text sx={{
                  color: 'rgba(0, 0, 0, 0.4)',
                  fontSize: '12px',
                  fontWeight: 500,
                }}>
                  {owner.edition}/{NFT.tokenIds.length}
                  {!owner.price
                    ? (<> editions<Box as={'strong'} color={'black'}> not for sale</Box></>)
                    : (<> on sale for <Box as={'strong'} color={'black'}> {owner.price.toString()} ETH</Box> each</>)
                  }
                </Text>
              </Box>
            </Flex>
            {owner.price && (<Button boxShadow={'lg'}>Buy</Button>)}
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
