<div align="center">
<img src="https://user-images.githubusercontent.com/76410985/147069122-a98b55f0-3875-4a46-b96a-221da28a283d.png" width="250px" height="250px"/>

[Need It](https://need-it.netlify.app/)
<br/>
</div>
  <div align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-0088CC?style=flat-square&logo=React&logoColor=white"/>

[![Netlify Status](https://api.netlify.com/api/v1/badges/e105da81-f9cc-46d9-998d-c028d52e90f0/deploy-status)](https://app.netlify.com/sites/need-it/deploys)
<img src="https://img.shields.io/badge/MUI-5.2.2-007FFF.svg"/>
<img src="https://img.shields.io/badge/React_Router_Dom-6.0.2-red.svg"/>

</div>
<br/>


## 📌 목차

- [🖐 프로젝트 소개](#-프로젝트-소개)
- [🔍 서비스 소개](#-서비스-소개)
- [✨ 주요 기능](#-주요-기능)
- [🌈 프로젝트 WireFrame & UI](#-프로젝트-wireframe--ui)
- [⚒ 아키텍쳐](#-아키텍쳐)

<br />

## 🖐 프로젝트 소개

- 개인이 직접 봉사기관에서 원하는 기부 물품 혹은 노동력을 제공할 수 있도록 **기관과 개인을 매칭시켜주는 양방향 기부 플랫폼**

![title2](https://user-images.githubusercontent.com/76410985/147069049-b94237f4-6371-4538-b5e1-00c81e981ceb.png)

<br/>

## 📣 배포 링크

[https://need-it.netlify.app/](https://need-it.netlify.app/)
<br/>
<br/>

## 👨‍💻 팀원 소개

| [김태중](https://github.com/te-ing) | [김형욱](https://github.com/khw970421) | [박규란](https://github.com/gyulhana) | [윤상준](https://github.com/alajillo) |

<!-- | ----------------------------------- | -------------------------------------- | ------------------------------------- | ------------------------------------- |
| 사진1                               | 사진2                                  | 사진3                                 | 사진4                                 | -->

<br/>

<br/>

# 🔍 서비스 소개

### 📕 개요

- 기관에서 직접 기부를 받고싶은 물품 및 재능을 업로드하고 기부자들은 GPS를 기반으로 자신의 위치 주변의 기관과 기관에서 올린 게시물을 볼 수 있으며 기부자 역시 자신이 가진 물품과 재능을 업로드하여 기부를 희망하는 기관을 찾을 수 있도록 하는 양방향 기부 플랫폼

<br/>

### 📗 메인 타겟

- 온라인 플랫폼 사용에 익숙하며 기부에 관심이 많은 사용자
- 기부를 검증된 기관에게 하되 양방향 소통을 통해 필요한 자원을 나누고 싶어하는 사용자

<br/>

### 📘 기대 효과

- 일반 사용자가 아닌 검증된 기관에게 기부를 함으로써 재판매 방지 등 안정성 보장
- 공개적인 댓글을 이용해 공개적인 기부 물품/기부자 모집/참여를 통해 기부의 투명성 상승
- GPS를 기반으로 주변에 있는 기부 기관/센터를 볼 수 잇으며 기부 게시물을 태그, 위치 등 다양한 필터링을 통해 볼 수 있게 하여 기부의 편의성 상승

<br/>
<br/>

# ✨ 주요 기능

### 🔑 회원가입

- 이메일 인증을 통한 회원가입
- GPS / 도로명주소 API를 이용한 주소설정 기능
- 봉사기관의 경우 사업자등록정보 인증 후 가입가능

### 📝 게시글

- 이미지를 포함한 게시글 작성/수정 기능
- 게시글 기부진행/기부마감 상태변경 기능
- 기부신청 기능

### 🔎 게시글 탐색

- 태그, 카테고리, 지역을 통한 게시글 필터링
- 게시글명, 작성자명 검색기능

### 🔔 알림/채팅

- 웹소켓을 이용한 알림/채팅 기능
- 채팅 중 약속기능을 통한 기부예약 기능

### 🙋‍♂️ 유저 정보

- 가입정보 수정
- 멤버/센터페이지 열람 기능
- 관심센터(팔로우) 기능
- 내가 작성한 글 보기

<br/>
<br/>


<br/>

## 🌈 프로젝트 WireFrame & UI

[Figma 링크](https://www.figma.com/file/m9ehXAKxDkuP2nMpe8h3rE/Gibooniz?node-id=0%3A1)

<br/>

## ⚒ 아키텍쳐

<img width="620" alt="image" src="https://user-images.githubusercontent.com/59253551/146981957-f2c182e6-b315-4553-97ce-e6c7403203ca.png">

<br />

<br />

## 📁 폴더구조

```
src
│  App.js
│  index.js
│
├─api
│  │  axios.js
│  │
│  └─services
│
├─assets
│
├─components
│      ├─Center
│      ├─Detail
│      ├─Login
│      ├─Message
│      ├─Notify
│      ├─Posts
│      ├─Register
│      ├─Schedule
│      ├─Search
│      ├─User
│      └─Writes
│
├── context
│
├─utils
│  ├─const
│  └─hooks
│
├─pages
│
└─styles
     ├─  GlobalStyle.js
     └─theme.js
```

<br/>

[☝ 맨 위로 가기](#)
