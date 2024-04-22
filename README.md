# Todo app 예제

## Tech stacks

- TypeScript
- Next.js
- MongoDB
- sass

## Screenshots

![입력 화면](https://cdn.discordapp.com/attachments/1231934756824809502/1231934766824161300/image.png?ex=6638c3a8&is=66264ea8&hm=860d5c15d1578c7b88b41a85fe192b57691e1799164c52bd8d0ce52fe0fd9e38&)

- zod를 통해 validation을 진행하였습니다.
- Next.js의 actions를 통해 mutation을 진행하였습니다.

1. client-side에서 data validation
2. server-side에서 data validation 이후 database 업데이트
3. `revalidateTag`를 통해 새로운 데이터 조회

위와 같은 순서로 진행됩니다.

시간상 진행하지 못하였으나, form data를 관리하는 hook을 추가하여 보다 가독성 높은 코드를 제작할 수 있을 것으로 보입니다.

![Todo 목록](https://cdn.discordapp.com/attachments/1231934756824809502/1231934805302710343/image.png?ex=6638c3b1&is=66264eb1&hm=aea5f845519b59d5636d83ab94bc330bbc597718f18c8d05732d75c0d3ef7814&)

- 상단의 form에서 추가한 데이터를 `date-fns` 등의 라이브러리를 통해 가공하여 출력합니다.
- 마찬가지로 Next.js의 actions를 통해 mutation을 진행합니다.
- `Edit`을 클릭하면 상단의 Form이 출력되는 새로운 페이지로 이동합니다.
- `Delete`을 클릭하면 해당 Todo를 제거하고 revalidate를 수행합니다.
