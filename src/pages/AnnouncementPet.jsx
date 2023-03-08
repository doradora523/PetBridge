import { Card, Divider, Space, Tag } from 'antd'
import Meta from 'antd/es/card/Meta'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import animalSlice from '../redux/slice/animal'
import { getAnimalData } from './api/animalAPI'

const AnnouncementPet = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.animal.data);

  useEffect(() => {
    getAnimalData().then((data) => {
      dispatch(animalSlice.actions.getData(data));
      console.log(data);
      
    })
  },[])


  return (
    <div className='announcement'>
      <div className="center">
        <ul className="cardWrap">
          {
            data && data.map((d) => (
              <Card
                key={d.desertionNo}
                hoverable
                style={{
                  width: 400,
                  height: 500
                }}
                cover={<img alt="animal" src={d.popfile} style={{width: "100%", height: 250, objectFit:"scale-down"}}/>}
              >
                <Meta title={d.kindCd} description={d.careAddr} />
                
                <p className='characteristic'>{d.specialMark}</p>
                <Divider></Divider>
                <Space size={[0, 8]} wrap>
                  
                  <Tag color="purple">{d.colorCd}</Tag>
                  <Tag color="red">
                    {

                      (d.sexCd==="F")? (<p>암컷</p>) : (<p>수컷</p>)
                    }
                    </Tag>
                  <Tag color="magenta">{d.weight}</Tag>
                  <Tag color="blue">중성화 {
                    d.neuterYn
                  }</Tag>
                  <Tag color="lime">lime</Tag>
                  <Tag color="green">green</Tag>
                  <Tag color="cyan">cyan</Tag>
                  <Tag color="geekblue">geekblue</Tag>
                  <Tag color="purple">purple</Tag>
                </Space>
              </Card>
              ))
          }
        </ul>
      </div>
    </div>
  )
}

export default AnnouncementPet