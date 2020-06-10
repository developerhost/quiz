'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  // quizのデータをオブジェクトの配列として持っておく
  const quizSet = [
    {q: '中国語で「手紙」と書くと何を意味する?', c: ['トイレットペーパー', '計算用紙', 'はがき']},
    {q: 'まな板の「まな」とは何を指している?', c: ['魚', '平らなこと', '真っ白なこと']},
    {q: '次のうち住所として存在しない地名は?', c: ['原宿', '代々木', '恵比寿']},
  ];

  // 難問目を解いているか、変数で持っておく
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  // ここから問題と選択肢を埋め込む作業
  
  

  // フィッシャーイエーツのシャッフル 引数に配列を私たら、その配列をシャッフルしてくれるという関数
  function shuffle(arr) {

    // 配列の中から、ランダムな要素を選んで、それを最後の要素と入れ替える
    //iを1ずつずらしながらループ処理
    for (let i = arr.length - 1; i > 0; i--){

      // iはランダムに選ぶ範囲の終点　iは最後の要素のインデックス
    const j = Math.floor(Math.random() * (i + 1));

    //iとjを入れ替える、分割代入
    [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    // if(isAnswered === true) {
    if(isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;
    // ↑つまりWhat is Aが埋め込まれる

    // m前の問題を消してくれる
    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
  
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    console.log(quizSet[currentNum].c);
    shuffledChoices.forEach(choice => {
      // forEachを使ってli要素を作成　一つ一つの要素をchoiceという名前で受け取る
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      })
      // appendChildでliを追加
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }

  }

  setQuiz();//呼び出し

  btn.addEventListener('click', () => {

    if (btn.classList.contains('disabled')) {
      return; //回答していなかったら次へ行けない
    }
    btn.classList.add('disabled'); //次の問題へいくとまた灰色に

    if (currentNum === quizSet.length - 1) {
      // console.log(`Score: ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();

    }
    
  });
}
