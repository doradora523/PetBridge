import React from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Selector from "./Selector";
import shelterSlice from "../../redux/slice/shelter";

const List = () => {
  const dispatch = useDispatch();
  const { filteredItems, selectedOption, newLocations } = useSelector(
    (state) => state.shelter
  );

  const focusMarkerHandler = (e) => {
    const focusCenter = newLocations.find(
      (location) => location[0] === e.target.innerHTML
    );
    dispatch(
      shelterSlice.actions.setCenter({
        lat: focusCenter[1],
        lng: focusCenter[2],
      })
    );
  };

  return (
    <div className="listContainer">
      <div className="listTitle">
        <h2>동물보호센터</h2>
        <Selector />
      </div>

      <ul className="listWrap">
        {selectedOption ? (
          <>
            {filteredItems &&
              filteredItems.map((item, index) => (
                <Card
                  key={index}
                  title={item.careNm}
                  className="shelter_name"
                  onClick={focusMarkerHandler}
                >
                  {item.saveTrgtAnimal && (
                    <div>구조대상동물 : {item.saveTrgtAnimal}</div>
                  )}
                  <div>주소 : {item.careAddr}</div>
                  {item.careTel !== "***********" && (
                    <div>전화번호 : {item.careTel}</div>
                  )}
                  <div>
                    {item.weekOprEtime && item.weekOprEtime !== ":" ? (
                      <span>
                        평일 운영시간 : {item.weekOprStime}~{item.weekOprEtime}
                        &nbsp; &nbsp; &nbsp;
                      </span>
                    ) : (
                      <></>
                    )}
                    {item.weekCellEtime && item.weekCellEtime !== ":" ? (
                      <span>
                        평일 분양시간 : {item.weekCellStime}~
                        {item.weekCellEtime}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {item.weekendOprStime && item.weekendOprStime !== ":" ? (
                      <span>
                        주말 운영시간 : {item.weekendOprStime}~
                        {item.weekendOprEtime}
                        &nbsp; &nbsp; &nbsp;
                      </span>
                    ) : (
                      <></>
                    )}
                    {item.weekendCellStime && item.weekendCellStime !== ":" ? (
                      <span>
                        주말 분양시간 : {item.weekendCellStime}~
                        {item.weekendCellEtime}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {item.closeDay !== "" &&
                    item.closeDay !== "0" &&
                    item.closeDay !== "1" &&
                    item.closeDay !== "2" &&
                    item.closeDay ? (
                      <span>휴무일 : {item.closeDay}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {item.vetPersonCnt ? (
                      <span>
                        수의사 인원수 : {item.vetPersonCnt}&nbsp; &nbsp; &nbsp;
                      </span>
                    ) : (
                      <></>
                    )}
                    {item.specsPersonCnt ? (
                      <span>사양관리사 인원수 : {item.specsPersonCnt}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {item.medicalCnt ? (
                      <span>
                        진료실수 : {item.medicalCnt}&nbsp; &nbsp; &nbsp;
                      </span>
                    ) : (
                      <></>
                    )}
                    {item.breedCnt ? (
                      <span>
                        사육실수 : {item.breedCnt}&nbsp; &nbsp; &nbsp;
                      </span>
                    ) : (
                      <></>
                    )}
                    {item.quarabtineCnt ? (
                      <span>
                        격리실수 : {item.quarabtineCnt}&nbsp; &nbsp; &nbsp;
                      </span>
                    ) : (
                      <></>
                    )}
                    {item.transCarCnt ? (
                      <span>구조운반용차량보유대수 : {item.transCarCnt}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                </Card>
              ))}
          </>
        ) : (
          <div>가까운 지역의 센터를 검색해주세요.</div>
        )}
      </ul>
    </div>
  );
};

export default List;
