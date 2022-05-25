import { Box, BoxProps } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';

import * as s from './Fees.styles';

export interface IFeesProps extends BoxProps {
  price: number;
  ticker: string;
  onTotalFee?: (totalFee: number) => void;
}

export const Fees: React.FC<IFeesProps> = (props) => {
  const { price, ticker, children, onTotalFee, ...rest } = props;

  const priceValuesFrom = useMemo(() => {
    const childrenArray = React.Children.toArray(children) as Array<React.ReactElement<IFeeProp>>;

    const totals: number[] = [price];

    for (const i in childrenArray) {
      const child = childrenArray[i];
      if (+i === 0) {
        totals.push(price - price * (child.props.percent / 100));
        continue;
      }

      totals.push(totals[totals.length - 1] - totals[totals.length - 1] * (child.props.percent / 100));
    }

    return totals;
  }, [children]);

  const totalFee = useMemo(() => {
    return price - priceValuesFrom[priceValuesFrom.length - 1];
  }, [price, priceValuesFrom]);

  useEffect(() => {
    if (onTotalFee) {
      onTotalFee(totalFee);
    }
  }, [totalFee, onTotalFee])

  return (
    <Box layerStyle={'Grey'} {...s.Wrapper} {...rest}>
      {React.Children.map(children, (c, i) => {
        if (!React.isValidElement<IFeeProp>(c)) {
          return null;
        }

        const child: React.ReactElement<IFeeProp> = c;
        return (
          <Box key={i} {...s.Item}>
            <Box>{child.props.name}</Box>
            <Box {...s.Dots} />
            <Box>{child.props.percent}% from {parseFloat(priceValuesFrom[i].toFixed(4))} {ticker}</Box>
          </Box>
        )
      })}

      {React.Children.count(children) > 0 && (
        <Box {...s.Item}>
          <Box>Total Fees</Box>
          <Box {...s.Dots} />
          <Box>{parseFloat(totalFee.toFixed(4))} {ticker}</Box>
        </Box>
      )}
    </Box>
  );
}

export interface IFeeProp {
  name: string;
  percent: number;
}

export const FeeItem: React.FC<IFeeProp> = () => null;
