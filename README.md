<div align="center">
<img src="https://user-images.githubusercontent.com/59253551/146976174-ecf103c2-a138-4a32-a371-2f98f43eef7e.png" width="250px" height="250px"/>
</div>
  <div align="center">
<img src="https://img.shields.io/badge/React-17.0.2-blue.svg"/>
<img src="https://img.shields.io/badge/React_Router_Dom-6.0.2-red.svg"/>
<img src="https://img.shields.io/badge/styled_components-5.3.3-dd6f93.svg"/>
<img src="https://img.shields.io/badge/MUI-5.2.2-007FFF.svg"/>
<br/>
  <img src="https://img.shields.io/badge/craco-6.4.2-9a9c9e.svg"/>
<img src="https://img.shields.io/badge/yarn-1.22.10-25799F.svg"/>
  <img src="https://img.shields.io/badge/ESLint-7.32.0-9F94DA.svg"/>
  <img src="https://img.shields.io/badge/Prettier-2.5.0-F7B93E.svg"/>
</div>

## 🖐 프로젝트 소개

- 개인이 직접 기관에서 필요로 하는 기부 물품 혹은 노동력을 GPS 기반으로 제공하고자 할 수 있도록 **기관과 개인을 매칭시켜주는 양방향 플랫폼**

## 👨‍💻 팀원 소개

| [김태중](https://github.com/te-ing) | [김형욱](https://github.com/khw970421) | [박규란](https://github.com/gyulhana) | [윤상준](https://github.com/alajillo) |
| ----------------------------------- | -------------------------------------- | ------------------------------------- | ------------------------------------- |
| 사진1                               | 사진2                                  | 사진3                                 | 사진4                                 |

## 🔍 서비스

### 📕 개요

- 기관에서 직접 기부를 받고싶은 물품 및 재능을 업로드하고 기부자들은 GPS를 기반으로 자신의 위치 주변의 기관과 기관에서 올린 게시물을 볼 수 있으며 기부자 역시 자신이 가진 물품과 재능을 업로드하여 기부를 희망하는 기관을 찾을 수 있도록 하는 양방향 기부 플랫폼

### 📗 메인 타겟

- 온라인 플랫폼 사용에 익숙하며 기부에 관심이 많은 사용자
- 기부를 검증된 기관에게 하되 양방향 소통을 통해 필요한 자원을 나누고 싶어하는 사용자

### 📘 기대 효과

- 일반 사용자가 아닌 검증된 기관에게 기부를 함으로써 재판매 방지 등 안정성 보장
- 공개적인 댓글을 이용해 공개적인 기부 물품/기부자 모집/참여를 통해 기부의 투명성 상승
- GPS를 기반으로 주변에 있는 기부 기관/센터를 볼 수 잇으며 기부 게시물을 태그, 위치 등 다양한 필터링을 통해 볼 수 있게 하여 기부의 편의성 상승

<hr/>

## 🌈 프로젝트 WireFrame & UI

[프로젝트 WireFrame](https://www.figma.com/file/m9ehXAKxDkuP2nMpe8h3rE/Gibooniz?node-id=0%3A1)

## 📣 배포 링크

[배포 링크](https://need-it.netlify.app/)

## ⚒ 아키텍쳐

<img width="620" alt="image" src="https://user-images.githubusercontent.com/59253551/146981957-f2c182e6-b315-4553-97ce-e6c7403203ca.png">

## 📁 폴더 구조

```
src
│  App.js
│  index.js
│
├─api
│  │  axios.js
│  │
│  └─services
│      ├─alarm
│      ├─chatting
│      ├─interest
│      ├─login
│      ├─register
│      ├─search
│      └─write
├─assets
│
├─components
│  ├─base
│  └─domain
│      ├─Center
│      ├─Login
│      ├─Member
│      ├─Message
│      ├─Notify
│      ├─Register
│      ├─Schedule
│      ├─Username
│      └─Writes
├── contexts
│
├─hooks
│      index.js
│
├─pages
│
├─styles
│      GlobalStyle.js
│      theme.js
│
└─utils
```
