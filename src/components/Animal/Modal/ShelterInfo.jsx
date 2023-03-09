import React from "react";
import { Divider, Tag } from "antd";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import Map from "../../Shelter/Map";
import { useSelector } from "react-redux";

const ShelterInfo = () => {
  const itemDetails = useSelector((state) => state.animal.itemDetails);
  const Date = (data) => {
    if (data) {
      return (
        data.slice(0, 4) +
        `년 ` +
        data.slice(4, 6) +
        `월 ` +
        data.slice(6, 8) +
        `일`
      );
    }
  };
  
  return (
    <>
      <div>
        <h3 className="details-title">구조 정보</h3>
        <p
          className="rescue-info"
          style={{ whiteSpace: "pre-line", marginBottom: 50 }}
        >
          {`구조 일자 : ${Date(itemDetails.happenDt)}
          구조 위치 : ${itemDetails.happenPlace}`}
        </p>
      </div>
      <Divider />
      <div>
        <h3 className="details-title">보호센터 정보</h3>
        <div className="details-type">
          <div className="shelter-info">
            <div className="details-date-wrap">
              <Tag className="details-tag" color="deeppink">
                {itemDetails.processState}
              </Tag>
              <p className="details-date">
                {`${Date(itemDetails.noticeSdt)} ~ ${Date(
                  itemDetails.noticeEdt
                )}`}
              </p>
            </div>
            <div className="shelter-number">
              <a className="call-button" href={"tel:" + itemDetails.careTel}>
                <BsFillTelephoneOutboundFill className="button-icon" />
              </a>
              <span>{itemDetails.careNm}</span>
              <a
                href={"tel:" + itemDetails.careTel}
              >{`(${itemDetails.careTel})`}</a>
            </div>
          </div>
        </div>
        <div>
          <Map />
        </div>
      </div>
    </>
  );
};

export default ShelterInfo;
