import { Box, Image, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

interface ITabNFTsProps {
  NFTs: any[];
}

export const TabNFTs = ({ NFTs }: ITabNFTsProps) => {
  const router = useHistory();

  const handleNFTClick = useCallback((address, tokenId) => {
    router.push(`/v2/nft/${address}/${tokenId}`);
  }, []);

  return (
    <Box>
      {NFTs.map((NFT, i) => (
        <Box
          key={i}
          sx={{
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.1)',
            backgroundOrigin: 'border-box !important',
            boxShadow: 'inset 2px 1000px 1px #fff',
            border: '1px solid',
            borderColor: 'transparent',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            mb: '12px',
            padding: '11px 20px 11px 11px',

            _last: {
              mb: 0,
            },

            _hover: {
              backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
              boxShadow: 'inset 2px 1000px 1px #fff, 0px 10px 36px rgba(136, 120, 172, 0.14)',
            },

            img: {
              borderRadius: '8px',
              objectFit: 'cover',
              mr: '16px',
              h: '70px',
              w: '70px',
            },
            div: {
              _first: {
                flex: 1,
                fontSize: '14px',
                fontWeight: 700,

                img: {
                  borderRadius: '50%',
                  display: 'inline-block',
                  mr: '4px',
                  position: 'relative',
                  top: '-2px',
                  h: '16px',
                  w: '16px',
                },

                p: {
                  _last: {
                    color: 'rgba(0, 0, 0, 0.4)',
                    fontSize: '12px',
                  }
                }
              },
              _last: {
                color: 'rgba(0, 0, 0, 0.4)',
                fontSize: '14px',
                fontWeight: 700,
              },
            },
          }}
          onClick={() => handleNFTClick(NFT.collection.address, NFT.nft.tokenId)}
        >
          <Image src={NFT.nft.thumbnail_url} />
          <Box>
            <Text>{NFT.nft.name}</Text>
            <Text>
              <Image src={NFT.owner.profileImageUrl} />
              {NFT.owner.displayName}
            </Text>
          </Box>
          <Box>x1</Box>
        </Box>
      ))}
    </Box>
  );
}
