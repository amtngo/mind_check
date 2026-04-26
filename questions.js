const questionSets = {

A: [
{question:"Q1. 요즘 내 상황이 어떤 느낌에 가까운가요?",options:[
{text:"거의 신경 쓰이지 않는 편이다",score:0},
{text:"가끔 신경 쓰이는 부분이 있다",score:1},
{text:"자주 신경 쓰이고 마음이 불편하다",score:2},
{text:"계속 신경 쓰여서 버겁게 느껴진다",score:3}]},
{question:"Q2. 지금 고민은 어느 정도로 머릿속에 남아 있나요?",options:[
{text:"거의 떠올리지 않는다",score:0},
{text:"가끔 생각나는 정도다",score:1},
{text:"자주 떠오른다",score:2},
{text:"계속 머릿속에서 떠나지 않는다",score:3}]},
{question:"Q3. 지금 이 상황에 대한 답을 얼마나 빨리 알고 싶나요?",options:[
{text:"천천히 알아도 괜찮은 상태다",score:0},
{text:"조금 궁금한 정도다",score:1},
{text:"가능하면 빨리 알고 싶다",score:2},
{text:"지금 당장 확인하고 싶다",score:3}]},
{question:"Q4. 이번에 결과를 통해 어느 정도까지 알고 싶나요?",options:[
{text:"전체 흐름만 가볍게 알고 싶다",score:0},
{text:"현재 상황의 이유까지 이해하고 싶다",score:1},
{text:"앞으로의 흐름까지 알고 싶다",score:2},
{text:"결론을 확실하게 알고 싶다",score:3}]},
{question:"Q5. 어떤 수준의 설명이 가장 필요하다고 느끼나요?",options:[
{text:"전체 흐름을 간단히 설명해주면 충분하다",score:0},
{text:"현재 상황을 중심으로 설명해주면 좋겠다",score:1},
{text:"선택 기준까지 함께 알려주면 좋겠다",score:2},
{text:"결론을 분명하게 바로 알려주는 설명이 필요하다",score:3}]},
{question:"Q6. 결과를 보고 나서 어떤 상태가 되길 바라나요?",options:[
{text:"참고만 할 수 있으면 충분하다",score:0},
{text:"상황이 어느 정도 이해되면 좋겠다",score:1},
{text:"앞으로의 방향이 잡히면 좋겠다",score:2},
{text:"바로 어떻게 해야 할지 알 수 있으면 좋겠다",score:3}]},
{question:"Q7. 지금 내 상황을 얼마나 정리해서 설명할 수 있나요?",options:[
{text:"바로 정리해서 말할 수 있다",score:0},
{text:"생각하면 어느 정도 설명할 수 있다",score:1},
{text:"정리가 잘 안 되어 있는 상태다",score:2},
{text:"어디서부터 말해야 할지 모를 정도로 혼란스럽다",score:3}]},
{question:"Q8. 현재 상황에 대해 스스로 얼마나 알고 있다고 느끼나요?",options:[
{text:"상황을 꽤 명확하게 알고 있다",score:0},
{text:"어느 정도는 이해하고 있다",score:1},
{text:"애매하게 알고 있는 느낌이다",score:2},
{text:"거의 파악하지 못하고 있다",score:3}]},
{question:"Q9. 질문을 받으면 어떤 반응에 가까운가요?",options:[
{text:"바로 답할 수 있는 상태다",score:0},
{text:"생각하면 답할 수 있다",score:1},
{text:"답하기가 쉽지 않은 편이다",score:2},
{text:"질문 자체가 부담스럽게 느껴진다",score:3}]},
{question:"Q10. 이번에 어느 범위까지 보고 싶다고 느끼나요?",options:[
{text:"지금 상황 하나만 간단히 보고 싶다",score:0},
{text:"관련된 몇 가지 문제까지 함께 보고 싶다",score:1},
{text:"여러 가지 상황을 함께 연결해서 보고 싶다",score:2},
{text:"전체 흐름을 전반적으로 파악하고 싶다",score:3}]},
{question:"Q11. 지금 고민을 얼마나 넓게 보고 있나요?",options:[
{text:"현재 상황 하나에 집중되어 있다",score:0},
{text:"비슷한 문제가 반복되고 있다고 느낀다",score:1},
{text:"여러 요소가 함께 얽혀 있다고 느낀다",score:2},
{text:"전체적인 인생 흐름으로 이어진다고 느낀다",score:3}]},
{question:"Q12. 지금 알고 싶은 범위는 어느 정도인가요?",options:[
{text:"현재 상태만 확인하면 충분하다",score:0},
{text:"이 일이 왜 생겼는지 알고 싶다",score:1},
{text:"앞으로 어떻게 흘러갈지 알고 싶다",score:2},
{text:"결국 어떻게 될지까지 알고 싶다",score:3}]}
]

};

// ✔ 완전 고정 함수 (랜덤 제거)
function getQuestionSet() {
  return questionSets.A;
}

// ✔ window 연결 (필수)
window.getQuestionSet = getQuestionSet;