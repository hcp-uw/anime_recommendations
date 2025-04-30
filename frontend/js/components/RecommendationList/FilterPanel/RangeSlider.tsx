import Slider from "rc-slider";
import React, { useState, useCallback } from "react";
import "rc-slider/assets/index.css";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  initialMin?: number;
  initialMax?: number;
  label: string;
  minDescription: string;
  maxDescription: string;
  onChange: (min: number, max: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  initialMin = min,
  initialMax = max,
  label,
  minDescription,
  maxDescription,
  onChange,
}) => {
  const [range, setRange] = useState<[number, number]>([
    initialMin,
    initialMax,
  ]);

  const handleRangeChange = useCallback(
    (newRange: number | number[]) => {
      if (Array.isArray(newRange) && newRange.length === 2) {
        const [newMin, newMax] = newRange;
        setRange([newMin, newMax]);
        onChange(newMin, newMax);
      }
    },
    [onChange],
  );

  return (
    <div>
      <label htmlFor="rangeSlider">{label}</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <label htmlFor="minValue">{minDescription}</label>
          <input
            id="minValue"
            max={max}
            min={min}
            step={step}
            style={{ width: "80px", marginRight: "10px" }}
            type="number"
            value={range[0]}
            onChange={(e) =>
              handleRangeChange([Number(e.target.value), range[1]])
            }
          />
        </div>

        <Slider
          allowCross={false}
          id="rangeSlider"
          max={max}
          min={min}
          range
          step={step}
          value={range}
          onChange={handleRangeChange}
        />

        <div>
          <label htmlFor="maxValue">{maxDescription}</label>
          <input
            id="maxValue"
            max={max}
            min={min}
            step={step}
            style={{ width: "80px", marginLeft: "10px" }}
            type="number"
            value={range[1]}
            onChange={(e) =>
              handleRangeChange([range[0], Number(e.target.value)])
            }
          />
        </div>
      </div>
      <div>
        <span>Min: {range[0]}</span>
        <span>Max: {range[1]}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
