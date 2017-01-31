var colors = ["red","blue","yellow","green","orange"];
var colorsName = ["赤","青","黄","緑","橙"];
var colorsNum = [];
var rand = 0;
var randTheme;
var masuCount=0;
var tapCount=10;
var score_1th;
var score_2th;
var score_3th;

function start(){


}


function colorSet() {
  // 色をランダムにセットする
  for (var i=0;i<36;i++) {
    rand = Math.floor(Math.random()*5);
    document.getElementById("color"+i).style.backgroundColor=colors[rand];
    colorsNum.push(rand);
  }
  // 揃える色のテーマを決める
  randTheme=Math.floor(Math.random()*5);
  var ct=document.getElementById("color-theme")
  ct.textContent=colorsName[randTheme];
  ct.style.color=colors[randTheme];

  // 値をとってくる
  score_1th=localStorage.getItem('score-1')=="undefined"||null?0:localStorage.getItem('score-1');
  score_2th=localStorage.getItem('score-2')=="undefined"||null?0:localStorage.getItem('score-2');
  score_3th=localStorage.getItem('score-3')=="undefined"||null?0:localStorage.getItem('score-3');

  // localstorageのデータを表示する
  document.getElementById("1th").textContent=score_1th;
  document.getElementById("2th").textContent=score_2th;
  document.getElementById("3th").textContent=score_3th;

}

function tap(presentNum) {

  // タップした回数を増やす
  tapCount--;

  var upNum=presentNum-6; //上の場所の数字
  var downNum=presentNum+6; //下
  var rightNum=presentNum+1; //右
  var leftNum=presentNum-1; //左
  
  var upMasu=document.getElementById('color'+upNum); // 上の場所
  var downMasu=document.getElementById('color'+downNum) // 下
  var rightMasu=document.getElementById('color'+rightNum)// 右
  var leftMasu=document.getElementById('color'+leftNum) // 左

  var upColorsNum=colorsNum[upNum]==4?0:colorsNum[upNum]+1;
  var downColorsNum=colorsNum[downNum]==4?0:colorsNum[downNum]+1;
  var rightColorsNum=colorsNum[rightNum]==4?0:colorsNum[rightNum]+1;
  var leftColorsNum=colorsNum[leftNum]==4?0:colorsNum[leftNum]+1;

  var isLeft=false; // 左端の列かどうか
  var isRight=false; // 右端の列かどうか
  var isUp=false; // 上段の列かどうか
  var isDown=false; // 下段の列かどうか



  // どのボタンが押されたかの判断

  if(presentNum%6==0){ 
    isLeft=true;
    if(presentNum==0){ // 左上
      isUp=true;
    }
    if(presentNum==30){ // 左下
      isDown=true;
    }
  }else if(presentNum%6==5){
    isRight=true;
    if(presentNum==5){ // 右上
      isUp=true;
    }
    if(presentNum==35){ // 右下
      isDown=true;
    }
  }else if(presentNum%6>0&&presentNum%6<5){
    if(presentNum<6){
      isUp=true;
    }else if(presentNum>29){
      isDown=true;
    }
  }


  // 実際に色を変えるプログラム

  if(isLeft==true){
    // 左上隅と左下隅を除く左端の列
    rightMasu.style.backgroundColor=colors[rightColorsNum];
    if(isUp==false&&isDown==false){
      downMasu.style.backgroundColor=colors[downColorsNum];
      upMasu.style.backgroundColor=colors[upColorsNum];
    }
    if(isUp==true){ 
      // 左上隅
      downMasu.style.backgroundColor=colors[downColorsNum];
    }
    if(isDown==true){
      // 左下隅
      upMasu.style.backgroundColor=colors[upColorsNum];
    }
  }else if(isRight==true){
    // 右上隅と右下隅を除く右端の列
    leftMasu.style.backgroundColor=colors[leftColorsNum];
    if(isUp==false&&isDown==false){
      downMasu.style.backgroundColor=colors[downColorsNum];
      upMasu.style.backgroundColor=colors[upColorsNum];
    }
    if(isUp==true){ 
      // 右上隅
      downMasu.style.backgroundColor=colors[downColorsNum];
    }
    if(isDown==true){
      // 右下隅
      upMasu.style.backgroundColor=colors[upColorsNum];
    }
  }else if(isUp==true&&isLeft==false&&isRight==false){
    // 右上隅と左上隅を除く上段の行
    downMasu.style.backgroundColor=colors[downColorsNum];
    rightMasu.style.backgroundColor=colors[rightColorsNum];
    leftMasu.style.backgroundColor=colors[leftColorsNum];
  }else if(isDown==true&&isLeft==false&&isRight==false){
    // 右下隅と左下隅を除く下段の行
    upMasu.style.backgroundColor=colors[upColorsNum];
    rightMasu.style.backgroundColor=colors[rightColorsNum];
    leftMasu.style.backgroundColor=colors[leftColorsNum];
  }else{
    // 中央の5×5マス
    upMasu.style.backgroundColor=colors[upColorsNum];
    downMasu.style.backgroundColor=colors[downColorsNum];
    rightMasu.style.backgroundColor=colors[rightColorsNum];
    leftMasu.style.backgroundColor=colors[leftColorsNum];
  }

  // colorsNumに入れ直す
  colorsNum[upNum]=upColorsNum;
  colorsNum[downNum]=downColorsNum;
  colorsNum[rightNum]=rightColorsNum;
  colorsNum[leftNum]=leftColorsNum;

  // tapCountを減らす
  document.getElementById('tapCount').textContent=tapCount;

  if(tapCount==0){
    check();
    // tapCountを元に戻す
    tapCount=10;
    document.getElementById('tapCount').textContent=tapCount;
  }

  // masuCountを元に戻す
  masuCount=0;
  
}


// すべて同じ色になったかどうかチェック
// すべて同じ色にするのはほぼ不可能
function check(){
  for(var j=0; j<36; j++){
    if(colorsNum[j]==randTheme){
      masuCount++;
    }
  }
  alert('Fin!'+ masuCount + '点!');
  document.getElementById('score').textContent=masuCount;

  store();


}

function store(){
 
  // 比較
  if (masuCount>score_1th){
    // 1位以上のスコアを取った場合
    score_3th=score_2th;
    score_2th=score_1th;
    score_1th=masuCount;
    alert("1");
  }else if(masuCount>=score_2th){
    score_3th=score_2th;
    score_2th=masuCount;
    alert("2");

  }else if(masuCount>=score_3th){
    score_3th=masuCount;
      alert("3");
  }

  // htmlに表示
  document.getElementById("1th").textContent=score_1th;
  document.getElementById("2th").textContent=score_2th;
  document.getElementById("3th").textContent=score_3th;

  // 入れ直す
  localStorage.setItem('score-1', score_1th);
  localStorage.setItem('score-2', score_2th);
  localStorage.setItem('score-3', score_3th);

}





