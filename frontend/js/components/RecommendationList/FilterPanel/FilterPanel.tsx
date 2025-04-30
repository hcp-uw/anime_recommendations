import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";

import { animeStatuses, animeTypes } from "../../../constants";
import { Filters, AnimeStatus, AnimeType, FilterChange } from "../../../types";

import GenreInput from "./GenreInput";
import RangeSlider from "./RangeSlider";
import StaffInput from "./StaffInput";

interface FilterPanelProps {
  onFilter: (filters: FilterChange[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<Filters>({
    includedGenres: [],
    excludedGenres: [],
    staff: [],
    companies: [],
    malScoreMin: -Infinity,
    malScoreMax: Infinity,
    memberMin: -Infinity,
    memberMax: Infinity,
    earliestAiringStart: null,
    latestAiringStart: null,
    status: "All Statuses",
    type: "All Types",
    episodeCountMin: -Infinity,
    episodeCountMax: Infinity,
  });

  const handleChange = (filterChange: FilterChange) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterChange.key]: filterChange.value,
    }));
  };

  const applyFilters = () => {
    // Build the applied filters array by excluding default/invalid values
    const appliedFilters: FilterChange[] = [];

    // Included Genres
    if (filters.includedGenres.length > 0) {
      appliedFilters.push({
        key: "includedGenres",
        value: filters.includedGenres,
      });
    }

    // Excluded Genres
    if (filters.excludedGenres.length > 0) {
      appliedFilters.push({
        key: "excludedGenres",
        value: filters.excludedGenres,
      });
    }

    // Staff
    if (filters.staff.length > 0) {
      appliedFilters.push({ key: "staff", value: filters.staff });
    }

    // Companies
    if (filters.companies.length > 0) {
      appliedFilters.push({ key: "companies", value: filters.companies });
    }

    // MAL Score
    if (filters.malScoreMin !== -Infinity) {
      appliedFilters.push({
        key: "malScoreMin",
        value: filters.malScoreMin,
      });
    }
    if (filters.malScoreMax !== Infinity) {
      appliedFilters.push({
        key: "malScoreMax",
        value: filters.malScoreMax,
      });
    }

    // Member Count
    if (filters.memberMin !== -Infinity) {
      appliedFilters.push({
        key: "memberMin",
        value: filters.memberMin,
      });
    }
    if (filters.memberMax !== Infinity) {
      appliedFilters.push({
        key: "memberMax",
        value: filters.memberMax,
      });
    }

    // Airing Start Date
    if (filters.earliestAiringStart !== null) {
      appliedFilters.push({
        key: "earliestAiringStart",
        value: filters.earliestAiringStart,
      });
    }
    if (filters.latestAiringStart !== null) {
      appliedFilters.push({
        key: "latestAiringStart",
        value: filters.latestAiringStart,
      });
    }

    // Status
    if (filters.status !== "All Statuses") {
      appliedFilters.push({ key: "status", value: filters.status });
    }

    // Type
    if (filters.type !== "All Types") {
      appliedFilters.push({ key: "type", value: filters.type });
    }

    // Episode Count
    if (filters.episodeCountMin !== -Infinity) {
      appliedFilters.push({
        key: "episodeCountMin",
        value: filters.episodeCountMin,
      });
    }
    if (filters.episodeCountMax !== Infinity) {
      appliedFilters.push({
        key: "episodeCountMax",
        value: filters.episodeCountMax,
      });
    }

    console.log("Applied Filters:", appliedFilters); // Log the applied filters for debugging
    onFilter(appliedFilters); // Pass the array of applied filters to onFilter function
  };

  // Clear all filters
  const resetFilters = () => {
    setFilters({
      includedGenres: [],
      excludedGenres: [],
      staff: [],
      companies: [],
      malScoreMin: -Infinity,
      malScoreMax: Infinity,
      memberMin: -Infinity,
      memberMax: Infinity,
      earliestAiringStart: null,
      latestAiringStart: null,
      status: "All Statuses",
      type: "All Types",
      episodeCountMin: -Infinity,
      episodeCountMax: Infinity,
    });

    onFilter([]); // Clear all filters in the parent component as well
  };

  return (
    <div className="filter-panel bg-filter-bg-c border-filter-border-c tz">
      <h5 className="text-offbase-black">Filters</h5>
        {/* Apply Filters Button */}
        <div
        className="d-flex justify-content-center mt-3"
        style={{ gap: "10px" }}
      >
        <Button variant="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="secondary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
      <Accordion>
        {/* Genre, Tags */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Genre</Accordion.Header>
          <Accordion.Body>
            <GenreInput
              excludedGenres={filters.excludedGenres}
              includedGenres={filters.includedGenres}
              onChange={handleChange}
            />
          </Accordion.Body>
        </Accordion.Item>

        {/* Staff */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Staff</Accordion.Header>
          <Accordion.Body>
            <StaffInput staff={filters.staff} onChange={handleChange} />
          </Accordion.Body>
        </Accordion.Item>

        {/* Companies */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Companies</Accordion.Header>
          <Accordion.Body>
            {["Studio Ghibli", "Madhouse", "Bones"].map((company) => (
              <Form.Check
                key={company}
                label={company}
                type="checkbox"
                onChange={(e) =>
                  handleChange({
                    key: "companies",
                    value: e.target.checked
                      ? [...filters.companies, company]
                      : filters.companies.filter((c) => c !== company),
                  })
                }
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* MAL Score */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>MAL Score</Accordion.Header>
          <Accordion.Body>
            <RangeSlider
              initialMax={
                filters.malScoreMax === Infinity ? 10 : filters.malScoreMax
              }
              initialMin={
                filters.malScoreMin === -Infinity ? 1 : filters.malScoreMin
              }
              label="MAL Score Range"
              max={10}
              maxDescription="Maximum Score"
              min={1}
              minDescription="Minimum Score"
              step={0.5}
              onChange={(min, max) => {
                handleChange({ key: "malScoreMin", value: min });
                handleChange({ key: "malScoreMax", value: max });
              }}
            />
          </Accordion.Body>
        </Accordion.Item>

        {/* Members */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>Members</Accordion.Header>
          <Accordion.Body>
            <RangeSlider
              initialMax={
                filters.memberMax === Infinity ? 1000000 : filters.memberMax
              }
              initialMin={
                filters.memberMin === -Infinity ? 0 : filters.memberMin
              }
              label="Number of Members"
              max={1000000} // Adjust this max value as needed
              maxDescription="Maximum Members"
              min={0}
              minDescription="Minimum Members"
              step={1000}
              onChange={(min, max) => {
                handleChange({ key: "memberMin", value: min });
                handleChange({ key: "memberMax", value: max });
              }}
            />
          </Accordion.Body>
        </Accordion.Item>

        {/* Date */}
        <Accordion.Item eventKey="5">
          <Accordion.Header>Date</Accordion.Header>
          <Accordion.Body>
            <Form.Group>
              <Form.Label>Earliest Start Date</Form.Label>
              <Form.Control
                type="date"
                value={
                  filters.earliestAiringStart
                    ? filters.earliestAiringStart.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleChange({
                    key: "earliestAiringStart",
                    value: new Date(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Latest Start Date</Form.Label>
              <Form.Control
                type="date"
                value={
                  filters.latestAiringStart
                    ? filters.latestAiringStart.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleChange({
                    key: "latestAiringStart",
                    value: new Date(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>

        {/* Status */}
        <Accordion.Item eventKey="6">
          <Accordion.Header>Status</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              value={filters.status}
              onChange={(e) =>
                handleChange({
                  key: "status",
                  value: e.target.value as AnimeStatus,
                })
              }
            >
              {animeStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        {/* Type */}
        <Accordion.Item eventKey="7">
          <Accordion.Header>Type</Accordion.Header>
          <Accordion.Body>
            <Form.Select
              value={filters.type}
              onChange={(e) =>
                handleChange({
                  key: "type",
                  value: e.target.value as AnimeType,
                })
              }
            >
              {animeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        {/* Length */}
        <Accordion.Item eventKey="8">
          <Accordion.Header>Length</Accordion.Header>
          <Accordion.Body>
            <Form.Control
              placeholder="Enter minimum number of episodes (inclusive)"
              type="number"
              value={
                filters.episodeCountMin === -Infinity
                  ? ""
                  : filters.episodeCountMin
              }
              onChange={(e) =>
                handleChange({
                  key: "episodeCountMin",
                  value:
                    e.target.value === "" ? -Infinity : Number(e.target.value),
                })
              }
            />
            <Form.Control
              placeholder="Enter maximum number of episodes (inclusive)"
              type="number"
              value={
                filters.episodeCountMax === Infinity
                  ? ""
                  : filters.episodeCountMax
              }
              onChange={(e) =>
                handleChange({
                  key: "episodeCountMax",
                  value:
                    e.target.value === "" ? Infinity : Number(e.target.value),
                })
              }
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FilterPanel;
