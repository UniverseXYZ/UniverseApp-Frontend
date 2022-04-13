export interface ISearchBarProps {
  value: string | undefined;
  onChange: (itemAddress: string) => void;
  onClear: () => void;
}
