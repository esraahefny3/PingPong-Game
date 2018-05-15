		maxScore=1500;
		document.getElementById("maxScore").innerHTML=maxScore;
		document.getElementById("border").style.backgroundColor="transparent";
		document.getElementById("border").style.borderColor="white";
		
	
		speed=8;
		var x=100;
		var y=30;
		scoreStep=90;
		increaseSpeedVar=400;
		scoreUnitMax=120;
		


		function ballObj(ballElement,positionInfo)
		{
			this.ballElement=ballElement;
			this.positionInfo = positionInfo;
		    this.ballHeight = parseInt(this.positionInfo.height);
			this.ballWidth = parseInt(this.positionInfo.width);
			this.ballTop=this.ballElement.offsetTop;
			this.ballBottom=this.ballElement.offsetTop+this.ballElement.ballHeight;
			this.setStyleTop=function (ballStyleTop)
			{
				this.ballElement.style.top=ballStyleTop;
			}
			this.setStyleLeft=function (ballStyleLeft)
			{
				this.ballElement.style.left=ballStyleLeft;
			}
		}

		ballElement=document.getElementById("ball");
		positionInfo=ballElement.getBoundingClientRect();
		ball=new ballObj(ballElement,positionInfo);
		console.log("bh"+ball.ballHeight);
		
		function playerObj(playerElement,positionInfo)
		{
			this.playerElement=playerElement;
			this.positionInfo = positionInfo;
			this.playerHeight = parseInt(this.positionInfo.height);
			this.playerWidth = this.positionInfo.width; 
			this.playerTop=this.playerElement.offsetTop;
			this.playerBottom=this.playerTop+this.playerHeight;
			this.playerStyleLeft=function (playerStyleLeft)
			{
				this.playerElement.style.left=playerStyleLeft;
			}
			this.playerStyleTop=function (playerStyleTop)
			{
				this.playerElement.style.top=playerStyleTop;
			}
		}

		playerElement=document.getElementById("player1");
		positionInfo=playerElement.getBoundingClientRect();
		player1=new playerObj(playerElement,positionInfo);

		playerElement=document.getElementById("player2");
		positionInfo=playerElement.getBoundingClientRect();
		player2=new playerObj(playerElement,positionInfo);

		
		function borderObj(borderElement,positionInfo)
		{
			this.borderElement=borderElement;
			this.positionInfo =positionInfo;
			this.borderHeight = parseInt(this.positionInfo.height);
			this._borderWidth = parseInt(this.positionInfo.width);
			this._style = window.getComputedStyle(this.borderElement);
			this.borderMarginTop=parseInt(this._style.marginTop);
			this.borderTop=this.borderElement.offsetTop;
			this.borderBottom= this.borderTop+this.borderHeight;
		}
		borderElement=document.getElementById("border");
		positionInfo=borderElement.getBoundingClientRect();
		border=new borderObj(borderElement,positionInfo);

		var timer=document.getElementById("timer");
		var timerVar=0;
		var score=document.getElementById("score");
		var scoreVar=0;
		score.innerHTML=scoreVar;


		var max=border.borderHeight;
		var min=0;
		
		
		var ballMoveVar=setInterval( function(){ballMove()}, 10); 
		var timer_scoreVar=setInterval( function(){timerFunc()}, 30); 
	

		
		var ballHitSound;
        var congratsSound;
        var gameOverSound;
	    ballHitSound = new sound("./sounds/ballHit.mp3");
        congratsSound = new sound("./sounds/clup.mp3");
	    gameOverSound = new sound("./sounds/gameOver.mp3");
		backgroundSound=new sound("./sounds/level2.mp3");


		backgroundSound.play();

	
		function timerFunc()
		{
			timerVar++;
			timer.innerHTML=timerVar;
			if((timerVar%scoreUnitMax)==0)
			{
				scoreVar+=scoreStep;
				score.innerHTML=scoreVar;
			}
			if((timerVar%increaseSpeedVar)==0)
			{
				speed+=2;
			}
		}
		

		var flagDircX=speed;
		var flagDircY=0;
		function ballMove()
		{
			if(scoreVar<maxScore)
			{
			
				x+=flagDircX;
				y+=flagDircY;
				ball.setStyleLeft(x+'px');
				ball.setStyleTop(y+'px');
			    ball.ballTop=ball.ballElement.offsetTop;
				ball.ballBottom=ball.ballElement.offsetTop+ball.ballHeight;
				player1.playerTop=player1.playerElement.offsetTop;
				player1.playerBottom=player1.playerTop+player1.playerHeight;
				player2.playerTop=player2.playerElement.offsetTop;
				player2.playerBottom=player2.playerTop+player2.playerHeight;
				
			
				checkHorizontalBorders();
				checkPlayer2();
				movePlayer1();
				checkPlayer1();

			}
			else
			{
				document.getElementById("winningButton").click();
				document.getElementById("playerScoreWinning").innerHTML=scoreVar;
				backgroundSound.stop();
				congratsSound.play();
			    clearInterval(ballMoveVar);
				clearInterval(timer_scoreVar);
			}
			
					
		}

 		function moveMouse(e) {
		   var y = e.clientY;

		   var check=(border.borderHeight+border.borderMarginTop)-player2.playerHeight;
		   if(y<check)
		    {
		     player2.playerStyleTop((y-(border.borderMarginTop))+'px');

		    }
		    	
		   
		}


		function randY()
		{
			r=Math.random();
			if(r<.4)
			{
				flagDircY=-1*speed;
			}
			else if((r>=.4)&&(r<=.6))
			{
				flagDircY=0;
			}
			else if(r>.6)
			{
				flagDircY=speed;
			}
		}

		function movePlayer1()
		{

			r=Math.random();
			if(r<.85)
			{
				moveTop1=y-(.5*player1.playerHeight);
				if((moveTop1>=0)&&(moveTop1<=(border.borderHeight-player1.playerHeight)))
				{
					player1.playerStyleTop(moveTop1+'px');
				}
				else
				{
					if(moveTop1<0)
					{
						player1.playerStyleTop(0+'px');
					}
					else if(moveTop1>(border.borderHeight-player1.playerHeight))
					{
						player1.playerStyleTop(border.borderHeight-player1.playerHeight+'px');
					}
				}

			}

		}

		function checkPlayer2()
		{
			
			if((x+ball.ballWidth)<(border._borderWidth-player2.playerWidth))//lsa mwslt4
				{
					
			    }
				else  //wslt check mkan l player2
				{
					if(((ball.ballBottom>player2.playerTop)&&(ball.ballTop<player2.playerBottom))&&((x+ball.ballWidth)>=(border._borderWidth-player2.playerWidth)))//l72haaa
						{
							ballHitSound.play();
							flagDircX=flagDircX*-1;
							randY();
							
						}
						else 
						{
							if((x+ball.ballWidth)>=border._borderWidth)
							{
							document.getElementById("gameOverButton").click();
							document.getElementById("playerScore").innerHTML=scoreVar;
							backgroundSound.stop();
							gameOverSound.play();
							clearInterval(ballMoveVar);
						    clearInterval(timer_scoreVar);
						   }
						  

						}		
				}
		}

		function checkPlayer1()
		{
			
			if(x>player1.playerWidth)//lsa mwslt4
				{
					
			    }
				else  //wslt check mkan l player2
				{
					if((ball.ballBottom>player1.playerTop)&&(ball.ballTop<player1.playerBottom))//l72haaa
						{
							ballHitSound.play();
							flagDircX=flagDircX*-1;
							randY();
						}
						else
						{
							 if (x<=0)
							{
								document.getElementById("winningButton").click();
								document.getElementById("playerScoreWinning").innerHTML=scoreVar;
								backgroundSound.stop();
								congratsSound.play();
								clearInterval(ballMoveVar);
								clearInterval(timer_scoreVar);
							}
						}		
				}
		}

		function checkHorizontalBorders()
		{
			if(((ball.ballTop+border.borderTop)<=border.borderTop)||((ball.ballBottom+border.borderTop)>=border.borderBottom))
				{
					flagDircY=flagDircY*-1;
				}
		}


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}



	