
var table;
var gray =['#3F5666','#F5E5C0','#F8CA4D','#FF9841'];

//var gray =['#343642','#979C9C','#F2EBC7','#348899'];
var data=[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]
];
var angles=[90,90,90,90];
var content;
var duration=0;
var wrong;
var tem;
var score

function preload() {

  table = loadTable("https://docs.google.com/spreadsheets/d/e/2PACX-1vQQu1Vkxb9PPywV_qWPL6FgEjn8SwDnsbE0u4wmtP-hEGCOC-zD669LxdkjCVE41o9SLS_rLcB40Djo/pub?gid=1443703313&single=true&output=csv", "csv", "header");
}
function setup() {
  for (var r = 1; r < 6; r++)
  for (var c = 0; c < table.getColumnCount(); c++) {
    data[r-1][c]=table.getString(r-1, c);
  }
  createCanvas(windowWidth,windowHeight);
  noStroke();

  for(var i=0;i<4;i++){
    angles[i]=data[i][2]*3.6;
  }duration=data[1][1]*1+data[2][1]*1+data[3][1]*1;
  wrong=duration-data[3][1];
}
  function draw() {
    background('#2F3440');

    pieChart(500, angles);
    textSize(54);
    textFont("Helvetica");
    fill("#FF7E6A");

    text("Posture Report", 50, windowHeight/2-100);
    textSize(18);

  fill(gray[1]);
    content="You have been sitting for "+duration+" minutes and you  \r\nwere in an unhealthy posture for "+wrong+" minutes.\r\n\n";
    tem="table data"+duration+data[0][1]+"    "+data[1][1]+"    "+data[2][1]+"    "+data[3][1]+"    "+angles[0]+"  "+angles[1]+"  "+angles[2]+"  "+angles[3]+"  ";
    score=floor((duration-wrong)/duration*100);

    text(content, 50, windowHeight/2);

    text('SCORE:',50,windowHeight/2+75)
    textSize(72);

    text(score,50,windowHeight/2+150)
    textSize(36);
    text('/100',150,windowHeight/2+150)
    fill(gray[0]);
    rect(50,windowHeight/2+250,25,25);
    fill(gray[1]);
    rect(50,windowHeight/2+290,25,25);
    fill(gray[2]);
    rect(50,windowHeight/2+330,25,25);
    fill(gray[3]);
    rect(50,windowHeight/2+370,25,25);
    textSize(16);
    fill(gray[1]);
    text("Away",100,windowHeight/2+270);
    textSize(16);
    text("Wrong posture",100,windowHeight/2+310);
    textSize(16);
    text("Needs improvement",100,windowHeight/2+350);
    textSize(16);
    text("Right posture ",100,windowHeight/2+390);


  }

  function pieChart(diameter, data) {
    var lastAngle = 0;
    for (var i = 0; i < data.length; i++)
    {

      fill(gray[i]);
      arc(width/2+50, height/2, diameter, diameter, lastAngle, lastAngle+radians(angles[i]));
      lastAngle += radians(angles[i]);

    }
  }
