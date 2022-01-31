import * as styles from "../../styles";
import {Box, Button, Container, Heading, SimpleGrid} from "@chakra-ui/react";
import {useNFTPageData} from "../../NFTPage.context";

export const NftMoreFromCollection = () => {
  const { NFT } = useNFTPageData();
  return NFT && NFT.moreFromCollection && (
    <Box {...styles.MoreNFTsWrapperStyle}>
      <Heading {...styles.MoreNFTsTitleStyle}>More from this collection</Heading>
      <Container {...styles.MoreNFTsContainerStyle}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacingX={'20px'}>
          more NFT
          {/*{NFT.moreFromCollection.map((NFT) => (<NftItem key={NFT.id} nft={NFT} />))}*/}
        </SimpleGrid>
      </Container>
      <Button {...styles.MoreNFTsButtonStyle}>View collection</Button>
    </Box>
  );
};
