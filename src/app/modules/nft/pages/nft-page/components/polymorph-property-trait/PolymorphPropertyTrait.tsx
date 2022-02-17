import { INFTPropertyProps, NFTProperty } from '../nft-property';

interface IPolymorphPropertyTraitProps extends INFTPropertyProps {

}

export const PolymorphPropertyTrait = ({ ...props }: IPolymorphPropertyTraitProps) => {
  return (
    <NFTProperty {...props} />
  );
}
