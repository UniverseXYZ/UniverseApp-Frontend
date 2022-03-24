import { Button, ButtonProps, Image } from '@chakra-ui/react';
import arrowIcon from '../../../../../assets/images/arrow.svg';

interface IHeaderArrowButtonProps extends ButtonProps {
  isReverse?: boolean;
}

export const HeaderArrowButton = ({ isReverse = false, ...props }: IHeaderArrowButtonProps) => {
  return (
    <Button
      sx={{
        background: 'white',
        _hover: {
          background: 'white',
        },
        _focus: {
          background: 'white',
        },
        _active: {
          background: 'white',
        }
      }}
      {...props}
    >
      <Image src={arrowIcon} transform={isReverse ? '' : 'rotate(180deg)'} />
    </Button>
  );
};
