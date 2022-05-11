import { Box, BoxProps, Image } from '@chakra-ui/react';
import React  from 'react';
import ReactPaginate from 'react-paginate';

import ArrowIcon from '@assets/images/arrow-3.svg';

import * as styles from './Pagination.styles';

interface IPaginationProps extends BoxProps {
  pageCount: number;
  pageRangeDisplayed: number;
  onPageChange: () => void;
}

export const Pagination = (props: IPaginationProps) => {
  const {
    pageCount,
    pageRangeDisplayed,
    onPageChange,
    ...rest
  } = props;

  return (
    <Box {...rest}>
      <Box {...styles.Wrapper}>
        {/*@ts-ignore*/}
        <ReactPaginate
          breakLabel="..."
          previousLabel={<Image src={ArrowIcon} alt={'Prev'} />}
          nextLabel={<Image src={ArrowIcon} alt={'Next'} transform={'rotate(180deg)'} />}
          pageCount={pageCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={onPageChange}
        />
      </Box>
    </Box>
  );
}
