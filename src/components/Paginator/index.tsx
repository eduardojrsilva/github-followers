import { useState } from 'react';
import Select from 'react-select';
import { convertPixelToRem } from 'css-blocks-styled-components';

import PaginationItem from './PaginationItem';
import { getReactSelectStyle } from '../ReactSelectStyle';

import { Button, HiddenPages, PaginatorContainer } from './styles';
import { theme } from '../../styles/theme';

interface PaginatorProps<Item> {
  items: Item[];
  children: (itemsToDisplay: Item[]) => JSX.Element;
}

type OptionSelect = {
  value: number;
  label: string;
} | null;

const siblingsCount = 1;

const PROJECT_PER_PAGE_OPTIONS = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 25, label: '25' },
];

const [{ value }] = PROJECT_PER_PAGE_OPTIONS;

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

function Paginator<Item>({ items, children }: PaginatorProps<Item>): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [registersPerPage, setRegistersPerPage] = useState(value);

  const totalCountOfRegisters = items.length;
  const [lastPage, setLastPage] = useState(Math.ceil(totalCountOfRegisters / registersPerPage));

  const displayItems = items.slice(
    (currentPage - 1) * registersPerPage,
    currentPage * registersPerPage,
  );

  const summaryStart = registersPerPage * currentPage - registersPerPage + 1;
  const summaryEnd =
    currentPage === lastPage ? totalCountOfRegisters : registersPerPage * currentPage;

  const previousPages =
    currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : [];

  const handlePageDown = (): void => {
    if (currentPage > 1) {
      setCurrentPage((state) => state - 1);
    }
  };

  const handlePageUp = (): void => {
    if (currentPage < lastPage) {
      setCurrentPage((state) => state + 1);
    }
  };

  const onPageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleItemPerPageChange = (option: OptionSelect): void => {
    if (!option) return;

    const newItemsPerPage = Number(option.value);
    const newNumberOfPages = Math.ceil(totalCountOfRegisters / newItemsPerPage);

    if (currentPage > newNumberOfPages) setCurrentPage(newNumberOfPages);

    setLastPage(newNumberOfPages);
    setRegistersPerPage(newItemsPerPage);
  };

  const selectStyle = getReactSelectStyle({
    background: theme['gray-800'],
    borderColor: theme['blue-500'],
    width: convertPixelToRem(75),
    color: theme['blue-300'],
    marginLeft: convertPixelToRem(24),
  });

  return (
    <>
      {children(displayItems)}

      <PaginatorContainer>
        <strong>{`Exibindo ${summaryStart} - ${summaryEnd} de ${totalCountOfRegisters}`}</strong>

        <div>
          <Button onClick={handlePageDown}>&lt;</Button>

          {currentPage > 1 + siblingsCount && (
            <>
              <PaginationItem onPageChange={onPageChange} number={1} />
              {currentPage > 3 + siblingsCount && <HiddenPages>...</HiddenPages>}
              {currentPage - (siblingsCount + 1) === 2 && (
                <PaginationItem onPageChange={onPageChange} number={2} />
              )}
            </>
          )}

          {previousPages.length > 0 &&
            previousPages.map((page) => {
              return <PaginationItem onPageChange={onPageChange} key={page} number={page} />;
            })}

          <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

          {nextPages.length > 0 &&
            nextPages.map((page) => {
              return <PaginationItem onPageChange={onPageChange} key={page} number={page} />;
            })}

          {currentPage + siblingsCount < lastPage && (
            <>
              {currentPage + 2 + siblingsCount < lastPage && <HiddenPages>...</HiddenPages>}
              {lastPage - (currentPage + siblingsCount) === 2 && (
                <PaginationItem onPageChange={onPageChange} number={lastPage - 1} />
              )}
              <PaginationItem onPageChange={onPageChange} number={lastPage} />
            </>
          )}

          <Button onClick={handlePageUp}>&gt;</Button>

          <Select
            options={PROJECT_PER_PAGE_OPTIONS}
            defaultValue={PROJECT_PER_PAGE_OPTIONS[0]}
            onChange={handleItemPerPageChange}
            menuPlacement="auto"
            isSearchable={false}
            styles={selectStyle}
          />
        </div>
      </PaginatorContainer>
    </>
  );
}

export default Paginator;
