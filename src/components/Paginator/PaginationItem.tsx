import { Button } from './styles';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  isCurrent = false,
  number,
  onPageChange,
}) => {
  if (isCurrent) {
    return <Button disabled>{number}</Button>;
  }
  return <Button onClick={() => onPageChange(number)}>{number}</Button>;
};

export default PaginationItem;
