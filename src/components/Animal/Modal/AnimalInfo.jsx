import React from "react";
import { useSelector } from "react-redux";
import { Col, Divider, Row, Tag } from "antd";
import { MdPets } from "react-icons/md";
import { TbCake, TbGenderBigender } from "react-icons/tb";
import { FaNeuter } from "react-icons/fa";

const AnimalInfo = () => {
  const itemDetails = useSelector((state) => state.animal.itemDetails);

  return (
    <>
      <div>
        <div className="modal-title">
          <div className="animal-type">{itemDetails.kindCd}</div>
          <div className="notice-number">{itemDetails.noticeNo}</div>
        </div>
        <img
          className="animal-img"
          src={itemDetails.popfile}
          alt={itemDetails.kindCd}
        />
        <h2 className="characteristic">{itemDetails.specialMark}</h2>
      </div>
      <Divider />
      <div>
        <h3 className="details-title">유기동물 정보</h3>
        <Row gutter={24}>
          <Col span={8} className="details-wrap">
            <div className="details-type">
              <MdPets className="details-icon" />
              <span>품종</span>
            </div>
            <Tag className="details-tag" color="purple">
              {itemDetails.kindCd}
            </Tag>
          </Col>
          <Col span={8} className="details-wrap">
            <div className="details-type">
              <TbCake className="details-icon" />
              <span>나이</span>
            </div>
            <Tag className="details-tag" color="red">
              {itemDetails.age}
            </Tag>
          </Col>
          <Col span={8} className="details-wrap">
            <div className="details-type">
              <TbGenderBigender className="details-icon" />
              <span>성별</span>
            </div>
            <Tag className="details-tag" color="orange">
              {itemDetails.sexCd === "F" ? (
                <p>암컷</p>
              ) : itemDetails.sexCd === "M" ? (
                <p>수컷</p>
              ) : (
                <p>성별 알 수 없음</p>
              )}
            </Tag>
          </Col>
          <Col span={8} className="details-wrap">
            <div className="details-type">
              <FaNeuter className="details-icon" />
              <span>중성화</span>
            </div>
            <Tag className="details-tag" color="green">
              {itemDetails.neuterYn === "Y" ? (
                <span>완료</span>
              ) : itemDetails.neuterYn === "N" ? (
                <span>안함</span>
              ) : (
                <span>알 수 없음</span>
              )}
            </Tag>
          </Col>
          <Col span={8} className="details-wrap">
            <div className="details-type">
              <TbCake className="details-icon" />
              <span>색상</span>
            </div>
            <Tag className="details-tag" color="blue">
              {itemDetails.colorCd}
            </Tag>
          </Col>
          <Col span={8} className="details-wrap">
            <div className="details-type">
              <TbCake className="details-icon" />
              <span>무게</span>
            </div>
            <Tag className="details-tag" color="pink">
              {itemDetails.weight}
            </Tag>
          </Col>
        </Row>
      </div>
      <Divider />
    </>
  );
};

export default AnimalInfo;