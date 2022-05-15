song="";

function preload(){
song= loadSound("music.mp3");
};

left_wrist_x= 0;
left_wrist_y= 0;
right_wrist_x= 0;
right_wrist_y= 0;
score_left_wrist= 0;

function setup(){
canvas= createCanvas(500, 500);
canvas.position(380, 250);
video= createCapture(VIDEO);
video.hide();
posenet= ml5.poseNet(video, modelLoaded);
posenet.on('pose', gotPoses);
};

function modelLoaded(){
console.log("Posenet is Intialized");
};

function gotPoses(results){
if(results.length>0){
console.log(results);
score_left_wrist= results[0].pose.keypoints[9].score;
left_wrist_x= results[0].pose.leftWrist.x;
left_wrist_y= results[0].pose.leftWrist.y;
console.log("The coordinates of the left wrist are x: " + left_wrist_x + "and y: " + left_wrist_y);

right_wrist_x= results[0].pose.rightWrist.x;
right_wrist_y= results[0].pose.rightWrist.y;
console.log("The coordinates of the right wrist are x: " + right_wrist_x + "and y: " + right_wrist_y);
}
};

function draw(){
image(video, 0, 0, 500, 500);
if(score_left_wrist>0){
fill("red");
stroke("red");
circle(left_wrist_x, left_wrist_y, 20);
convert= Number(left_wrist_y);
remove_decimals= floor(convert);
volume= remove_decimals/500;
document.getElementById("volume").innerHTML= "Volume:" + volume;
song.setVolume(volume);
};
};

function play(){
song.play()
song.setVolume(1);
song.rate(1)
}
