import { Col, Divider, Drawer, Row } from 'antd'
import DescriptionsItem from 'antd/es/descriptions/Item'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import animalSlice from '../../redux/slice/animal';

const Modal = () => {
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.animal.openModal);
  const items = useSelector((state) => state.animal.items);
  const onClose = () => {
    dispatch(animalSlice.actions.setOpenModal(false))
  };

  // const item = items.find(item => item.desertionNo === 

  return (

    <Drawer width={640} placement="right" closable={false} onClose={onClose} open={openModal}>
      <p
        className="site-description-item-profile-p"
        style={{
          marginBottom: 24,
        }}
      >
        Profile
      </p>
      <p className="site-description-item-profile-p">Personal</p>
      <Row>
        <Col span={12}>
          <DescriptionsItem title="Full Name" content="Lily" />
        </Col>
        <Col span={12}>
          <DescriptionsItem title="Account" content="AntDesign@example.com" />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionsItem title="City" content="HangZhou" />
        </Col>
        <Col span={12}>
          <DescriptionsItem title="Country" content="China🇨🇳" />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionsItem title="Birthday" content="February 2,1900" />
        </Col>
        <Col span={12}>
          <DescriptionsItem title="Website" content="-" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionsItem
            title="Message"
            content="Make things as simple as possible but no simpler."
          />
        </Col>
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">Company</p>
      <Row>
        <Col span={12}>
          <DescriptionsItem title="Position" content="Programmer" />
        </Col>
        <Col span={12}>
          <DescriptionsItem title="Responsibilities" content="Coding" />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionsItem title="Department" content="XTech" />
        </Col>
        <Col span={12}>
          <DescriptionsItem title="Supervisor" content={<a>Lin</a>} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionsItem
            title="Skills"
            content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
          />
        </Col>
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">Contacts</p>
      <Row>
        <Col span={12}>
          <DescriptionsItem title="Email" content="AntDesign@example.com" />
        </Col>
        <Col span={12}>
          <DescriptionsItem title="Phone Number" content="+86 181 0000 0000" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionsItem
            title="Github"
            content={
              <a href="http://github.com/ant-design/ant-design/">
                github.com/ant-design/ant-design/
              </a>
            }
          />
        </Col>
      </Row>
    </Drawer>
  )
}

export default Modal