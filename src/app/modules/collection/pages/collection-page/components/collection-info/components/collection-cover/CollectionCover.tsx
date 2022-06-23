import { Box, Image, useToast } from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';
import { useMutation } from 'react-query';

import { editCollectionBanner } from '@legacy/api/mintNFT';
import { useAuthStore } from '../../../../../../../../../stores/authStore';
import { useMyNftsStore } from '../../../../../../../../../stores/myNftsStore';

import { Icon } from '@app/components';
import { getStrGradient } from '@app/helpers';
import { ICollection } from '@app/modules/collection/types';

import * as s from './CollectionCover.styles';

interface ICollectionCoverProps {
  collectionAddress: string;
  collection: ICollection;
  isOwner?: boolean;
}

export const CollectionCover: React.FC<ICollectionCoverProps> = (props) => {
  const { collectionAddress, collection, isOwner = false } = props;

  const ref = useRef<HTMLInputElement>(null);

  const toast = useToast();

  const { isAuthenticated } = useAuthStore();
  const { setMyMintableCollections, myMintableCollections } = useMyNftsStore();

  const [bgImage, setBgImage] = useState(collection.bannerUrl);

  const uploadMutation = useMutation((file) => editCollectionBanner(file, collectionAddress));

  const onInputChange = useCallback(async (e) => {
    if (e.target.files[0]) {
      const res = await uploadMutation.mutateAsync(e.target.files[0]);

      if (!res.message) {
        setBgImage(URL.createObjectURL(e.target.files[0]));

        const updatedCollections = (myMintableCollections || []).map((item: { id: number }) =>
          item.id === collection.id
            ? { ...res }
            : item
        );

        setMyMintableCollections(updatedCollections);
      } else {
        toast({
          title: res?.message,
          status: 'error',
          isClosable: true,
        });
      }
    }
  }, [collectionAddress]);

  const [color1, color2] = getStrGradient(collectionAddress);

  return (
    <Box {...s.Wrapper}>
      {(isAuthenticated && isOwner) && (
        <>
          <Box
            {...s.Upload}
            onClick={() => ref?.current?.click()}
            aria-hidden="true"
          >
            <Icon name={'upload'} />
            <input ref={ref} type="file" onChange={onInputChange} style={{ display: 'none' }} />
          </Box>
        </>
      )}
      {bgImage ? (
        <Image
          src={bgImage}
          alt={collection.name}
          {...s.BGImage}
        />
      ) : (
        <Box bgGradient={`linear(to-br, ${color1}, ${color2})`} boxSize={'100%'} />
      )}
    </Box>
  );
}
