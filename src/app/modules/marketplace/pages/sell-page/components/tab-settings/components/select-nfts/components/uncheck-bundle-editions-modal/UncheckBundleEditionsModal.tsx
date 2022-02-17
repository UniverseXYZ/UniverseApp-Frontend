import {
  Box, Button,
  Checkbox,
  Heading, Image, Input, InputGroup, InputLeftElement, InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { InputShadow } from '../../../../../../../../../../components';
import searchIcon from '../../../../../../../../../../../assets/images/search-gray.svg';
import clearIcon from '../../../../../../../../../../../assets/images/closehistory.svg';

interface IUncheckBundleEditionsModalProps {
  isOpened: boolean;
  editions: string[];
  onRemove: (editionsForRemove: string[]) => void;
  onClose: () => void;
}

export const UncheckBundleEditionsModal = (
  {
    isOpened,
    editions,
    onRemove,
    onClose
  }: IUncheckBundleEditionsModalProps
) => {
  const [editionsForRemove, setEditionsForRemove] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');

  const handleCheckAll = useCallback((e) => {
    setEditionsForRemove(
      e.target.checked
        ? [...editions]
        : []
    );
  }, [editions]);

  const handleToggleEdition = useCallback((e, edition: string) => {
    setEditionsForRemove(
      e.target.checked
        ? [...editionsForRemove, edition]
        : editionsForRemove.filter(_edition => _edition !== edition)
    );
  }, [editionsForRemove]);

  const handleRemove = useCallback(() => {
    onRemove(editionsForRemove);
    onClose();
  }, [editionsForRemove, onRemove, onClose]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const filteredEditions = useMemo(() => {
    return editions.filter(q => !q.indexOf(search))
  }, [editions, search]);

  useEffect(() => {
    setEditionsForRemove([]);
  }, [isOpened])

  return (
    <Modal isOpen={isOpened} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width={'270px'}>
        <ModalCloseButton />
        <ModalBody p={'30px 20px'}>
          <Heading
            as={'h5'}
            fontFamily={'Sharp Grotesk'}
            fontSize={'20px'}
            fontWeight={600}
            mb={'20px'}
            pr={'20px'}
          >
            Select editions to remove
          </Heading>

          <InputGroup mb={'8px'}>
            <InputShadow display={'contents'}>
              <InputLeftElement pointerEvents="none" height={'42px'} children={<Image src={searchIcon} />} />
              {search && (
                <InputRightElement
                  height={'42px'}
                  cursor={'pointer'}
                  children={<Image src={clearIcon} />}
                  onClick={() => setSearch('')}
                />
              )}
              <Input
                placeholder={'Search'}
                size={'sm'}
                sx={{
                  height: '42px',
                  pl: '42px',
                }}
                value={search}
                onChange={handleSearch}
              />
            </InputShadow>
          </InputGroup>

          <Box>
            {!search && (
              <Checkbox
                size={'lg'}
                sx={{
                  borderRadius: '6px',
                  display: 'flex',
                  padding: '9px',
                  fontWeight: 500,
                  'span': {
                    fontSize: '14px',
                  },
                  _hover: {
                    bg: 'rgba(0, 0, 0, 0.05)',
                  },
                }}
                isChecked={editionsForRemove.length === editions.length}
                onChange={handleCheckAll}
              >Select all</Checkbox>
            )}
            {filteredEditions.map((edition, i) => (
              <Checkbox
                key={i}
                size={'lg'}
                sx={{
                  borderRadius: '6px',
                  display: 'flex',
                  padding: '9px',
                  fontWeight: 500,
                  'span': {
                    fontSize: '14px',
                  },
                  _hover: {
                    bg: 'rgba(0, 0, 0, 0.05)',
                  },
                }}
                isChecked={editionsForRemove.includes(edition)}
                onChange={(e) => handleToggleEdition(e, edition)}
              >#{edition}</Checkbox>
            ))}
          </Box>
          <Button
            mt={'20px'}
            isFullWidth
            variant={'simpleOutline'}
            sx={{
              border: '1px solid #FF4949',
              borderRadius: '8px',
              color: '#FF4949',
              _hover: {
                bg: 'rgba(255, 73, 73, 0.05)',
              }
            }}
            onClick={handleRemove}
          >Remove</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
