# Todo app 예제

[Marshall Ku](https://github.com/marshallku)님께서 개발하신 Todo app 예제입니다.

원본 링크: [https://gitlab.marshallku.dev/marshallku/todo-app](https://gitlab.marshallku.dev/marshallku/todo-app) (현재 사용 불가)

## Tech stacks

- TypeScript
- Next.js
- MongoDB
- sass
- playwright
- Docker

## 프로젝트 실행

```bash
bun install
```

package manager로 [`bun`](https://bun.sh/)을 사용합니다.\
만약 설치되어 있지 않다면 설치 후, `bun install`로 의존성을 설치해 주세요.

```bash
cp .env.example .env
```

다음 위 명령어를 통해 `.env.example` 파일을 `.env` 파일로 복사하거나, 해당 파일의 내용을 참고하여 `.env` 파일을 작성합니다.

```bash
docker compose up -d
```

위 명령어를 통해 MongoDB 컨테이너를 실행시킵니다.

```bash
bun dev
```

마지막으로 위 명령어를 통해 개발 서버를 기동시킬 수 있습니다.

## Screenshots

![입력 화면](https://cdn.discordapp.com/attachments/1231934756824809502/1231934766824161300/image.png?ex=6638c3a8&is=66264ea8&hm=860d5c15d1578c7b88b41a85fe192b57691e1799164c52bd8d0ce52fe0fd9e38&)

- zod를 통해 validation을 진행하였습니다.
- Next.js의 actions를 통해 mutation을 진행하였습니다.

1. client-side에서 data validation
2. server-side에서 data validation 이후 database 업데이트
3. `revalidateTag`를 통해 새로운 데이터 조회

위와 같은 순서로 진행됩니다.

![Todo 목록](https://cdn.discordapp.com/attachments/1231934756824809502/1231934805302710343/image.png?ex=6638c3b1&is=66264eb1&hm=aea5f845519b59d5636d83ab94bc330bbc597718f18c8d05732d75c0d3ef7814&)

- 상단의 form에서 추가한 데이터를 `date-fns` 등의 라이브러리를 통해 가공하여 출력합니다.
- 마찬가지로 Next.js의 actions를 통해 mutation을 진행합니다.
- `Edit`을 클릭하면 상단의 Form이 출력되는 새로운 페이지로 이동합니다.
- `Delete`을 클릭하면 해당 Todo를 제거하고 revalidate를 수행합니다.

## 테스트 코드 실행

[`playwright`](https://playwright.dev/)을 통한 테스트 코드가 작성되어 있습니다.

```bash
bunx playwright install
```

위 명령어를 통해 `playwright`을 설치한 뒤, `bun test:e2e`를 입력하면 e2e 테스트를 수행할 수 있습니다.
