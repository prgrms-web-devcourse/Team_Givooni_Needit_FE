## 🖐 프로젝트 설명

한국 사회의 연 기부 금액은 14.5조원(2019년 기준)에 달하며 그 중 개인 기부 금액이 65%를 차지하고 있으나 기부 금액 혹은 물품이 적절한 사용처에서 제대로 사용되고 있는지를 개인이 파악하기 어려운 현황 속에서 개인이 직접 기관에서 필요로 하는 기부 물품 혹은 노동력을 GPS 기반으로 제공하고자 할 수 있도록 기관과 개인을 매칭시켜주는 양방향 플랫폼

## 🔍 프로젝트 개요

[프로젝트 개요](https://www.notion.so/backend-devcourse/12-f41327b8ca6b4ec69487af702393c922?p=81006b1f5d364863ae96987d29f04b04)

## 🌈 프로젝트 WireFrame & UI

[프로젝트 WireFrame](https://www.figma.com/file/m9ehXAKxDkuP2nMpe8h3rE/Gibooniz?node-id=0%3A1)

## 📝 Git commit rule

**Branch Convention**

- 기능 / 이슈번호 / 컴포넌트 명 혹은 구현 내용
- ex) feature/28/input-component
- ex) feature/30/login-page
- ex) docs/19/readme

**Commit Message Convention**

- feat : 새로운 기능에 대한 커밋
- fix : 버그 수정에 대한 커밋
- build : 빌드 관련 파일 수정에 대한 커밋
- chore : 그 외 자잘한 수정에 대한 커밋
- ci : CI관련 설정 수정에 대한 커밋
- docs : 문서 수정에 대한 커밋
- style : 코드 스타일 혹은 포맷 등에 관한 커밋
- refactor : 코드 리팩토링에 대한 커밋
- test : 테스트 코드 수정에 대한 커밋

**Gitmoji Rule**

- 🎉: 프로젝트 시작 Begin a project.
- ✨: sparkles: 새 기능 Introduce new features.
- 🐛: 버그 수정 Fix a bug.
- 🔖: 릴리즈/버전 태그 Release / Version tags.
- 🎨: 코드의 구조/형태 개선 Improve structure / format of the code.
- 👷: CI 빌드 시스템 추가/수정 Add or update CI build system.
- 💚: CI 빌드 수정 Fix CI Build.
- ✅: 테스트 추가/수정 Add or update tests.
- ex) ✨ feat: 한글로 구현한 기능에 대한 내용 적기

ref.
[Github Commit Message](https://velog.io/@djh20/Git-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90)
[Gitmoji 사용하기](https://treasurebear.tistory.com/70)

**Pull Request Rule**

- 깃모지 타입: 간단한 기능설명 (뒤에 내용은 한글로 설명)
- ex)✨ feat: 포스트 페이지 렌더링 및 포스트 기본 기능 구현
- [참고 링크](https://www.notion.so/backend-devcourse/12-f41327b8ca6b4ec69487af702393c922?p=66d80d8082994c79926307e527504c37)

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
│  └─page
│      ├─Center
│      ├─Login
│      ├─Member
│      ├─Message
│      ├─Notify
│      ├─Register
│      ├─Schedule
│      ├─Username
│      └─Writes
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
