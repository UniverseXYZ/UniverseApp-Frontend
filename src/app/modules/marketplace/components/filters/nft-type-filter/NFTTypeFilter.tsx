import { Box, Checkbox, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React  from 'react';

import { Dropdown, DropdownFilterContainer } from '../../../../../components';
import nftTypeIcon from '../../../../../../assets/images/select-type-icon.svg';

interface IFormValues {
  singleItem: boolean;
  bundle: boolean;
  composition: boolean;
  stillImage: boolean;
  gif: boolean;
  audio: boolean;
  video: boolean;
}


interface INFTTypeFilterProps {
  onChange: (values: IFormValues) => void;
}

export const NFTTypeFilter = ({ onChange }: INFTTypeFilterProps) => {
  const form = useFormik<IFormValues>({
    initialValues: {
      singleItem: false,
      bundle: false,
      composition: false,
      stillImage: false,
      gif: false,
      audio: false,
      video: false,
    },
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <Dropdown
      label={'NFT type'}
      buttonProps={{ leftIcon: <Image src={nftTypeIcon} /> }}
    >
      <DropdownFilterContainer
        onSave={() => form.submitForm()}
        onClear={() => form.resetForm()}
      >
        <Text fontSize={'14px'} color={'rgba(0, 0, 0, 0.4)'} mb={'20px'}>NFT type</Text>
        <SimpleGrid columns={2} spacingY={'20px'} mb={'40px'}>
          <Box>
            <Checkbox size={'lg'} name={'singleItem'} isChecked={form.values.singleItem} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>Single item</Text>
            </Checkbox>
          </Box>
          <Box>
            <Checkbox size={'lg'} name={'bundle'} isChecked={form.values.bundle} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>Bundle</Text>
            </Checkbox>
          </Box>
          <Box>
            <Checkbox size={'lg'} name={'composition'} isChecked={form.values.composition} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>Composition</Text>
            </Checkbox>
          </Box>
        </SimpleGrid>


        <Text fontSize={'14px'} color={'rgba(0, 0, 0, 0.4)'} mb={'20px'}>File format</Text>
        <SimpleGrid columns={2} spacingY={'20px'}>
          <Box>
            <Checkbox size={'lg'} name={'stillImage'} isChecked={form.values.stillImage} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>Still image</Text>
            </Checkbox>
          </Box>
          <Box>
            <Checkbox size={'lg'} name={'gif'} isChecked={form.values.gif} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>GIF</Text>
            </Checkbox>
          </Box>
          <Box>
            <Checkbox size={'lg'} name={'audio'} isChecked={form.values.audio} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>Audio</Text>
            </Checkbox>
          </Box>
          <Box>
            <Checkbox size={'lg'} name={'video'} isChecked={form.values.video} onChange={form.handleChange}>
              <Text fontSize={'14px'} fontWeight={500}>Video</Text>
            </Checkbox>
          </Box>
        </SimpleGrid>
      </DropdownFilterContainer>
    </Dropdown>
  );
};
