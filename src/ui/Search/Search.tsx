import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import styled from "styled-components";
import { SearchGroup, SearchHeader, SearchWrapper } from "components/atoms";

type SearchProps = {
  count?: number;
  onSearch: (searchText: string) => void;
  helpTitle: string | ReactElement;
  placeHolder: string;
};

export const Search = ({ placeHolder, helpTitle, onSearch }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>("");

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSearch(searchText?.trim());
      }
    },
    [searchText],
  );

  const clearSearch = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <SearchWrapper>
      <SearchHeader>{helpTitle}</SearchHeader>

      <SearchGroup className="p-inputgroup">
        <div className="p-inputgroup">
          {searchText && (
            <i className="pi pi-delete-left" onClick={clearSearch} />
          )}
          <InputText
            placeholder={placeHolder}
            onChange={onChange}
            onKeyDown={(e) => handleKeyDown(e as unknown as KeyboardEvent)}
            value={searchText}
          />
        </div>
        <SearchButton
          label="найти"
          onClick={() => onSearch(searchText?.trim())}
        />
      </SearchGroup>
    </SearchWrapper>
  );
};

const SearchButton = styled(Button)`
  border-top-right-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
`;
