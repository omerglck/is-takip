import React, { useRef } from "react";
import { statusOptions, typeOptions, sortOption } from "./../helpers/constants";
import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterBySearch,
  filterByStatus,
  filterByType,
  sortJobs,
} from "../redux/jobSlice";
const Filter = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();
  const typeRef = useRef();
  const statusRef = useRef();
  const sortRef = useRef();

  const handleReset = () => {
    dispatch(clearFilters());

    inputRef.current.value = "";
    typeRef.current.value = "Seçiniz";
    statusRef.current.value = "Seçiniz";
    sortRef.current.value = "Seçiniz";
  };

  return (
    <div className="filter-sec">
      <h2>Filtreleme Formu</h2>

      <form>
        <div>
          <label htmlFor="">Arama</label>
          <input
            ref={inputRef}
            type="text"
            onChange={(e) => dispatch(filterBySearch(e.target.value))}
            placeholder="örn: udemig"
          />
        </div>
        <div>
          <label htmlFor="">Durum</label>
          <select
            ref={statusRef}
            name="status"
            onChange={(e) => dispatch(filterByStatus(e.target.value))}
          >
            <option disabled selected>
              Seçiniz
            </option>
            {statusOptions.map((statu) => (
              <option>{statu}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Tür</label>
          <select
            ref={typeRef}
            name="type"
            onChange={(e) => dispatch(filterByType(e.target.value))}
          >
            <option disabled selected>
              Seçiniz
            </option>
            {typeOptions.map((type) => (
              <option>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Sırala</label>
          <select
            ref={sortRef}
            name=""
            onChange={(e) => dispatch(sortJobs(e.target.value))}
          >
            <option disabled selected>
              Seçiniz
            </option>
            {sortOption.map((sort) => (
              <option>{sort}</option>
            ))}
          </select>
        </div>
        <div>
          <button type="button" onClick={handleReset}>
            Filtreleri Temizle
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
