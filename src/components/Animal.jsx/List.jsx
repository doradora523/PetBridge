import { Card, Divider, Space, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import animalSlice from '../../redux/slice/animal';

const List = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.animal.items);
  
  const showDrawer = () => {
    dispatch(animalSlice.actions.setOpenModal(true))
    
  };
  return (
    <ul className="cardWrap">
      {items &&
        items.map((d) => (
          <Card
            key={d.desertionNo}
            hoverable
            onClick={showDrawer}
            style={{
              width: 400,
              minHeight: 550,
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
            <Meta title={d.kindCd} description={d.careAddr} />

            <p className="characteristic">{d.specialMark}</p>
            <Divider></Divider>
            <Space size={[0, 8]} wrap>
              <Tag color="purple">{d.colorCd}</Tag>
              <Tag color="red">
                {d.sexCd === "F" ? <p>암컷</p> : (d.sexCd === 'M' ? <p>수컷</p> : <p>성별모름</p>)}
              </Tag>
              <Tag color="magenta">{d.weight}</Tag>
              <Tag color="blue">중성화 {d.neuterYn === "Y" ? <span>완료</span> : (d.neuterYn === "N" ? <span>안함</span> : <span>모름</span>)}</Tag>
              {/* <Tag color="lime">lime</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="geekblue">geekblue</Tag>
              <Tag color="purple">purple</Tag> */}
            </Space>
          </Card>
          
        ))}
    </ul>
    
  )
}

export default List