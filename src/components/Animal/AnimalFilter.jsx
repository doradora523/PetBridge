import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Selector from '../public/Selector'
import animalSlice from '../../redux/slice/animal';

const AnimalFilter = () => {
  const dispatch = useDispatch();
  const { region, type, items, selectedRegion, selectedType,filteredItems } = useSelector(
    (state) => state.animal
  );


  const handleSelectChange = useCallback(
    (value, type) => {
      if(type === 'region') {
        dispatch(animalSlice.actions.setSelectedRegion(value));
        if (value) {
          const filteredItems = items.filter(
            (item) => item.orgNm.split(" ")[0] === value
          );
          dispatch(animalSlice.actions.setFilteredItems(filteredItems));
        }
      }
      if(type === 'type') {
        dispatch(animalSlice.actions.setSelectedType(value));
        if (value) {
          const filteredItems = items.filter(
            (item) => item.kindCd === value
          );
          dispatch(animalSlice.actions.setFilteredItems(filteredItems));
        }
      }
    },
    [dispatch, items,filteredItems]
  );
  console.log({filteredItems})
  return (
    <div>
      <Selector 
         placeholder="지역"
         options={region}
         value={selectedRegion}
         onChange={(value) => handleSelectChange(value, 'region')}
      />
      <Selector 
         placeholder="종류"
         options={type}
         value={selectedType}
         onChange={(value) => handleSelectChange(value, 'type')}
      />
    </div>
  )
}

export default AnimalFilter