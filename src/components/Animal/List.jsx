import React from "react";
import { Card, Divider, Space, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import animalSlice from "../../redux/slice/animal";
import Geocode from "react-geocode";
import Pagination from "./Pagination";
import Loader from "../Loader/Loader.jsx";
const List = () => {
  const dispatch = useDispatch();
  const { items, pageCount, loading } = useSelector((state) => state.animal);
  console.log({ pageCount });
  const getLocationHandler = (careAddr) => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
    Geocode.setLanguage("kr");
    Geocode.setRegion("ko");
    Geocode.enableDebug();

    try {
      Geocode.fromAddress(careAddr).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        dispatch(animalSlice.actions.getLocation({ lat, lng }));
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getItemDetailsHandler = (d) => {
    dispatch(animalSlice.actions.getItemDetails(d));
  };
  const showDrawer = () => {
    dispatch(animalSlice.actions.setOpenModal(true));
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <ul className="cardWrap">
        {items &&
          items.map((d) => (
            <Card
              key={d.desertionNo}
              hoverable
              onClick={() => {
                showDrawer();
                getItemDetailsHandler(d);
                getLocationHandler(d.careAddr);
              }}
              style={{
                width: 350,
                height: 550,
                borderRadius: 20,
              }}
              cover={
                <img
                  alt="animal"
                  src={d.popfile}
                  style={{
                    width: "100%",
                    height: 250,
                    objectFit: "scale-down",
                  }}
                />
              }
            >
              <Meta
                title={d.kindCd}
                description={`구조 : (${d.happenDt.slice(
                  2,
                  4
                )}년 ${d.happenDt.slice(4, 6)}월 ${d.happenDt.slice(6, 8)}일) ${
                  d.happenPlace
                } \n 보호 센터 : ${d.careNm}`}
                style={{ whiteSpace: "pre-line" }}
              />

              <p className="characteristic">{d.specialMark}</p>
              <Divider></Divider>
              <Space size={[0, 8]} wrap>
                <Tag color="purple">{d.colorCd}</Tag>
                <Tag color="red">
                  {d.sexCd === "F" ? (
                    <p>암컷</p>
                  ) : d.sexCd === "M" ? (
                    <p>수컷</p>
                  ) : (
                    <p>성별 알 수 없음</p>
                  )}
                </Tag>
                <Tag color="magenta">{d.weight}</Tag>
                <Tag color="blue">
                  중성화{" "}
                  {d.neuterYn === "Y" ? (
                    <span>완료</span>
                  ) : d.neuterYn === "N" ? (
                    <span>안함</span>
                  ) : (
                    <span>알 수 없음</span>
                  )}
                </Tag>
              </Space>
            </Card>
          ))}
      </ul>
      <Pagination />
    </>
  );
};

export default List;
