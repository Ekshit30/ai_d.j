song="";

function preload(){
song=loadSound("music.mp3");
}

leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreleftWrist = 0;
scorerightWrist = 0;

function setup(){
canvas=createCanvas(600,350);
canvas.position(350,300);

video=createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video , modeloaded);
poseNet.on('pose', gotPoses);
}

function modeloaded(){
    console.log("PoseNet is Initialized");
    
}


function  gotPoses(results){
    if(results.length > 0){
     console.log(results);
     scorerightWrist = results[0].pose.keypoints[10].score;
     scoreleftWrist = results[0].pose.keypoints[9].score;
     console.log("scorerightWrist =" + scorerightWrist + "scoreleftWrist =" + scoreleftWrist);
     console.log("scoreleftWrist ="+ scoreleftWrist);

     leftWristx=results[0].pose.leftWrist.x;
     leftWristy=results[0].pose.leftWrist.y;
     console.log("leftWristx =" + leftWristx + "leftWristy =" + leftWristy);

    rightWristy=results[0].pose.rightWrist.y;
    rightWristx=results[0].pose.rightWrist.x;
    console.log("rightWristx =" + rightWristx + "rightWristy =" + rightWristy);

    }

}

function draw(){
    image(video,0,0,600,350);
    fill('red');
    stroke('black');

    if(scorerightWrist > 0.2){

    circle(rightWristx,rightWristy,20);
    
    if(rightWristy > 0 && rightWristy <= 100){
        document.getElementById("speed").innerHTML="speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristy > 100 && rightWristy <= 200){
        document.getElementById("speed").innerHTML="speed = 1x";
        song.rate(1);
    }
    else if(rightWristy > 200 && rightWristy <= 300){
        document.getElementById("speed").innerHTML="speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristy > 300 && rightWristy <= 400){
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2);
    }
    else if(rightWristy > 400 && rightWristy <= 500){
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2);
    }
}
    
    if(scoreleftWrist > 0.2){
    circle(leftWristx,leftWristy,20);
    InnumberleftWristy=Number(leftWristy);
    remove_decimels=floor(InnumberleftWristy);
    volume=remove_decimels/500;
    document.getElementById("volume").innerHTML="volume =" + volume;
    song.setVolume(volume);
    }
    }


 function stop(){
      song.stop();
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}







