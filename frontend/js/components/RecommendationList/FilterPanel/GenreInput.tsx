import React from "react";
import { Form } from "react-bootstrap";

import { malCategories } from "../../../constants";
import { MalCategoryId, FilterChange } from "../../../types";

import TriStateCheckbox from "./TriStateCheckbox";

interface GenreInputProps {
  includedGenres: MalCategoryId[];
  excludedGenres: MalCategoryId[];
  onChange: (filterChange: FilterChange) => void;
}

const GenreInput: React.FC<GenreInputProps> = ({
  includedGenres,
  excludedGenres,
  onChange,
}) => {
  const getCheckboxValue = (id: MalCategoryId): boolean | null => {
    if (includedGenres.includes(id)) return true;
    if (excludedGenres.includes(id)) return false;
    return null;
  };

  const handleCheckboxChange = (id: MalCategoryId, value: boolean | null) => {
    let newIncluded = [...includedGenres];
    let newExcluded = [...excludedGenres];

    if (value === true) {
      newIncluded.push(id);
      newExcluded = newExcluded.filter((g) => g !== id);
    } else if (value === false) {
      newExcluded.push(id);
      newIncluded = newIncluded.filter((g) => g !== id);
    } else {
      newIncluded = newIncluded.filter((g) => g !== id);
      newExcluded = newExcluded.filter((g) => g !== id);
    }

    onChange({ key: "includedGenres", value: newIncluded });
    onChange({ key: "excludedGenres", value: newExcluded });
  };

  return (
    <>
      {Object.entries(malCategories).map(([idStr, name]) => {
        const id = Number(idStr) as MalCategoryId; // Type assertion here
        return (
          <div key={id} className="mb-3 d-flex align-items-center">
            <TriStateCheckbox
              id={id}
              initialState={getCheckboxValue(id)} // Use the initial state
              onChange={handleCheckboxChange}
            />
            <Form.Label className="ms-2 mb-0">{name}</Form.Label>
          </div>
        );
      })}
    </>
  );
};

export default GenreInput;
