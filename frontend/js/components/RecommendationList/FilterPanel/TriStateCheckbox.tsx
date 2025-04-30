import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";

import { MalCategoryId } from "../../../types";

interface TriStateCheckboxProps {
  id: MalCategoryId;
  initialState: boolean | null;
  onChange: (id: MalCategoryId, state: boolean | null) => void;
}

const TriStateCheckbox: React.FC<TriStateCheckboxProps> = ({
  id,
  initialState,
  onChange,
}) => {
  const [state, setState] = useState<boolean | null>(initialState); // null, true, false
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleInteraction = () => {
    const newState = state === null ? true : state === true ? false : null;
    setState(newState);
    onChange(id, newState);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleInteraction();
    }
  };

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = false; // Remove default indeterminate state
    }
  }, [state]);

  const getIcon = () => {
    if (state === true) {
      return <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />;
    }
    if (state === false) {
      return <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />;
    }
    return null; // No icon for null state
  };

  return (
    <div
      aria-checked={state === null ? "mixed" : state}
      role="checkbox"
      style={{
        width: "20px",
        height: "20px",
        border: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      tabIndex={0}
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
    >
      {getIcon()}
    </div>
  );
};

export default TriStateCheckbox;
