https://github.com/doradora523/PetBridge/assets/94670754/9a440b34-c0d3-4883-a1f1-ea01f25a8842

## Description

- 공공 API ([유기동물 정보 조회](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15098931), [동물보호센터](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15098915))에서 데이터를 받아와 유기동물 및 보호소 정보를 제공하는 서비스
- Google Maps API 를 받아와 Geocode를 적용시켜 보호소 위치를 지도에 나타내는 기능 구현
- react-spring 라이브러리를 이용한 인터랙티브 디자인 적용

## **Development Detail**

- **사용자가 선택한 필터 결과에 따른 데이터를 Aixos를 이용하여 가져와 리스트 구현**
- **Google Maps API 를 받아와 GeoCode를 적용시켜 보호소 위치를 지도에 나타내는 기능 구현**
- **사용자가 선택한 보호소를 클릭하면 map에서 결과에 해당하는 pin 위치로 이동 기능 구현**
- **react-spring 을 이용하여 메인페이지의 텍스트 및 체크리스트 카드 인터랙션 구현**
- **ant-design & SCSS 를 사용하여 디자인 구현**

## What I Learned

- Geocode를 사용하여 지역에 따른 보호소의 주소를 좌표로 변환시켜 지도에 Pin으로 그려주고 사용자가 선택한 보호소에 focus 기능을 추가하여 클릭한 좌표로 이동시키는 기능을 구현해보면서 지도를 이용한 기능 구현에 대해 조금 더 자세히 공부할 수 있었습니다.
- Geocode로 받아온 좌표데이터를 newLocationsData State에 update해주는 과정에서 useEffect의 의존성 배열로 상태를 변경하는 action인 dispatch를 넣어주지 않아 비동기함수를 실행하는 과정에서 무한렌더링에 걸려 API사용에 과금이 되는 헤프닝이 있었습니다. 이 경험을 통해 useEffect의 의존성 배열과 이벤트루프에 관해 좀 더 자세히 공부할 수 있었습니다.
