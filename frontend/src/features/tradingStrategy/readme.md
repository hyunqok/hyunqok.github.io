## 목표

**사용자가 입력한 총 매수 예산을 바탕으로 피보나치 수열을 반영해 분할 계획을 제시함**

### 코드 작성 규칙

1. tailwind 를 이용하여 스타일 한다
2. 모든 UI는 [shardcn (https://ui.shadcn.com/)](https://ui.shadcn.com/) component를 최우선 사용하고 필요시 추가 제작한다.
3. container_presenter 패턴을 사용한다. **container 는 useContext provider 역할을 한다.**
4. 비즈니스 로직 Container에, UI 렌더링은 Presenter에 위치하여 패턴이 항상 올바르게 유지되어야 한다.
5. 모든 기능은 단계별로 진행 한다.

### 사용자 입력 예

총 매수 금액: 1000만원
1000만원의 피보다치 수열 구함
