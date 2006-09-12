


	/************************************************************************************************************
	(C) www.dhtmlgoodies.com, September 2005
	
	This is a script from www.dhtmlgoodies.com. You will find this and a lot of other scripts at our website.	
	
	Terms of use:
	You are free to use this script as long as the copyright message is kept intact. However, you may not
	redistribute, sell or repost it without our permission.
	
	Thank you!
	
	www.dhtmlgoodies.com
	Alf Magne Kalleland
	
	************************************************************************************************************/	
		
var Sudoku = function() {
    var WID = widget.uuid;
	var squareObjects = new Array();
	var level = 1;	// 1 is lowest level
	var countSquares = [36,36,34,32,31,30];
	var gameFinished = false;
	function shuffleBoard()
	{
		for(var counter=0;counter<30;counter++){
			var number1 = Math.ceil(Math.random()*9);
			var number2 = Math.ceil(Math.random()*9);
			while(number2==number1){
				number2 = Math.ceil(Math.random()*9);
			}	

			var tmpObjects1 = new Array();
			var tmpObjects2 = new Array();
			
			for(var no=0;no<squareObjects.length;no++){					
				var txtObj = squareObjects[no].getElementsByTagName('SPAN')[0];						
				if(txtObj.innerHTML == number1)tmpObjects1.push(txtObj);	
				if(txtObj.innerHTML == number2)tmpObjects2.push(txtObj);
			}
			
			for(var no=0;no<tmpObjects1.length;no++){
				tmpObjects1[no].innerHTML = number2;	
				tmpObjects2[no].innerHTML = number1;	
			}
		}
		resetVisibleNumberArray();
		showColumnsInGroup();
	}
	
	function resetVisibleNumberArray()
	{
		for(var no=0;no<=9;no++){
			visibleNumberArray[no] = 0;
		}		
	}
	
	function newGame()
	{
		var obj = document.getElementById(WID);
		var subObjects = obj.getElementsByTagName('DIV');
		for(var no=0;no<subObjects.length;no++){
			if(subObjects[no].className=='sudokuSquare'){
				subObjects[no].style.backgroundColor='';	
				var spans = subObjects[no].getElementsByTagName('SPAN');
				spans[0].style.display='none';
				spans[1].innerHTML = '';
			}
		}	
		
	}
	
	var visibleNumberArray = new Array();

	function randomizeArray(a,b){
		return Math.random() - Math.random();
	}
		
	function showCell(inputDiv)
	{
		var span = inputDiv.getElementsByTagName('SPAN')[0];
		span.style.display='';
		inputDiv.style.backgroundColor='#DDD';
		span.style.color='#317082';
		var typingSpan = inputDiv.getElementsByTagName('SPAN')[1];
		typingSpan.style.display='none';			
		
	}
	
	function showColumnsInGroup(){		
		var object = document.getElementById(WID);
		var cellsRevealed = new Array();
		var numberArray = new Array();
		var groupCountArray = new Array();
		var maxInGroup=5;
		if(level<=0)level=1;
		if(level==1)maxInGroup=4;
		for(var no=0;no<countSquares[level];no++){			
			do{
				var row = Math.floor(Math.random()*9);
				var col = Math.floor(Math.random()*9);
				var obj = document.getElementById(WID + '_square_' + row + '_' + col);
				var parentID = obj.parentNode.id;
				var span = obj.getElementsByTagName('SPAN')[0];	
				if(!numberArray[span.innerHTML])numberArray[span.innerHTML]=0;
				if(!groupCountArray[parentID])groupCountArray[parentID]=0;
			}while(cellsRevealed[row + '_' + col] || numberArray[span.innerHTML]>(3+Math.ceil(level/2)) || groupCountArray[parentID]>=maxInGroup);
			cellsRevealed[row + '_' + col] = true;
			if(!numberArray[span.innerHTML])numberArray[span.innerHTML]=0;
			numberArray[span.innerHTML]++;
			groupCountArray[parentID]++;
			showCell(obj);
			
		}
	}
	var higlightedCell;
	function highlightSquare(e,inputObj){
		document.getElementById(WID +'_hintDiv').style.display='none';
		if(!inputObj)inputObj = this;	
		if(inputObj.style.backgroundColor)return;
		if(gameFinished)return;
		inputObj.className='sudokuSquareHighlighted';
		if(higlightedCell && higlightedCell!=inputObj)higlightedCell.className='sudokuSquare';
		higlightedCell = inputObj;
		if(document.all)inputObj.focus();
		
	}
	
	
	function isGameFinished()
	{
		var obj = document.getElementById(WID);
		var subDivs = obj.getElementsByTagName('DIV');
		var allOk = true;
		for(var no=0;no<subDivs.length;no++){
			if(subDivs[no].className.indexOf('sudokuSquare')>=0 && !subDivs[no].style.backgroundColor){
				var spans = subDivs[no].getElementsByTagName('SPAN');
				if(spans[0].innerHTML != spans[1].innerHTML){
					allOk=false;
					break;
				}
			}	
		}
		
		if(allOk)alert('Congratulations! You did it');
		
	}
	
	this.initSudoku = function()
	{
		gameFinished = false;
		document.getElementById(WID + '_hintDiv').style.display='none';
		var matrix = new Array();
		for(var rowCounter=0;rowCounter<9;rowCounter++){
			matrix[rowCounter] = new Array();
			for(var colCounter=0;colCounter<9;colCounter++){
				var number = colCounter/1 + 1 + (rowCounter*3) + Math.floor(rowCounter/3)%3;
				if(number>9)number = number % 9;
				if(number==0)number=9;
				matrix[rowCounter][colCounter] = number;				
			}			
		}
		
		// Switching rows
		
		for(var no=0;no<9;no+=3){
			
			for(var no2=0;no2<3;no2++){
				row1 = Math.floor(Math.random()*3);	
				row2 = Math.floor(Math.random()*3);	
				while(row2==row1){
					row2 = Math.floor(Math.random()*3);	
				}
				row1 = row1 + no;
				row2 = row2 + no;			
				var tmpMatrix = new Array();
				tmpMatrix = matrix[row1];
				matrix[row1] = matrix[row2];
				matrix[row2] = tmpMatrix; 				
			}			
		}
		
		// Switching columns
		
		for(var no=0;no<9;no+=3){
			for(var no2=0;no2<3;no2++){
				col1 = Math.floor(Math.random()*3);	
				col2 = Math.floor(Math.random()*3);	
				while(col2==col1){
					col2 = Math.floor(Math.random()*3);	
				}
				col1 = col1 + no;
				col2 = col2 + no;			

				var tmpMatrix = new Array();
				for(var no3=0;no3<matrix.length;no3++){
					tmpMatrixValue = matrix[no3][col1];
					matrix[no3][col1] = matrix[no3][col2];				
					matrix[no3][col2] = tmpMatrixValue;				
				}
			}	
		}
		
		
		for(var no=0;no<matrix.length;no++){
			for(var no2=0;no2<matrix[no].length;no2++){				
				var obj = document.getElementById(WID + '_square_' + no + '_' + no2);
				var spanObjects = obj.getElementsByTagName('SPAN');
				
				var span = spanObjects[0];
				span.innerHTML = matrix[no][no2];		
				span.style.display='none';	
				
				spanObjects[1].innerHTML = '';
				spanObjects[1].style.display = '';
				spanObjects[1].style.color='#000';	

				obj.onclick = highlightSquare;
						
				squareObjects.push(obj);						
			}			
		}
		if(document.all){
			document.body.onkeydown = insertNumber;
		}else{
			document.documentElement.onkeydown = insertNumber;
		}

		newGame();
		shuffleBoard();
	}
	function insertNumber(e)
	{
		document.getElementById(WID + '_hintDiv').style.display='none';

		if(document.all)e = event;
		if(!higlightedCell)return;
		if(gameFinished)return;
		if (e.keyCode) code = e.keyCode; else if (e.which) code = e.which;
		var span = higlightedCell.getElementsByTagName('SPAN')[1];
		
		var numbers = higlightedCell.id.split('_');

		var row = numbers[1]/1;
		var col = numbers[2]/1;
		var nextObject = false;
			
		if(code==39){ // Right arrow
			if(col<8){
				nextObject = document.getElementById(WID + '_square_' + row + '_' + (col/1+1));
				if(nextObject.style.backgroundColor){
					while(col<8 && nextObject.style.backgroundColor){
						col = col+1;
						nextObject = document.getElementById(WID + '_square_' + row + '_' + col);
					}
				}				
			}
		}
		if(code==37){ // Left arrow
			if(col>0){
				nextObject = document.getElementById(WID + '_square_' + row + '_' + (col/1-1));
				if(nextObject.style.backgroundColor){
					while(col>0 && nextObject.style.backgroundColor){
						col = col-1;
						nextObject = document.getElementById(WID + '_square_' + row + '_' + col);
					}
				}
				if(nextObject.style.backgroundColor)nextObject = false;
			}
		}
		if(code==38){
			if(row>0){
				nextObject = document.getElementById(WID + '_square_' + (row-1) + '_' + col);
				if(nextObject.style.backgroundColor){
					while(row>0 && nextObject.style.backgroundColor){
						row = row-1;
						nextObject = document.getElementById(WID + '_square_' + row + '_' + col);
					}
				}				
			}
		}		
		if(code==40){
			if(row<8){
				nextObject = document.getElementById(WID + '_square_' + (row+1) + '_' + col);
				if(nextObject.style.backgroundColor){
					while(row<8 && nextObject.style.backgroundColor){
						row = row+1;
						nextObject = document.getElementById(WID + '_square_' + row + '_' + col);
					}
				}	
			}
		}
		
		if(nextObject){
			highlightSquare(false,nextObject);
		}
		
		if(code==46 || code==8){	// Delete
			span.innerHTML = '';
			if(code==8)return false;
		}
		if(code>96 && code<=105)code-=48;
		if(code>48 && code<=57){				
			var theChar = String.fromCharCode(code);
			span.innerHTML = theChar;
		}		
		
		isGameFinished();
	}	
	
    this.helpMe = function()
	{
		if(gameFinished)return false;
		
		if(confirm('Do you want me to reveal a number for you?')){
			var allreadyRevealed = true;
			var counter = 0;
			do{
				var row = Math.floor(Math.random()*9);
				var col = Math.floor(Math.random()*9);
				
				var el = document.getElementById(WID + '_square_'+row+'_'+col);	
				
				var spans = el.getElementsByTagName('SPAN');
				if(spans[1].innerHTML.length==0){
					spans[1].innerHTML = spans[0].innerHTML;
					spans[1].style.color='#FF0000';
					allreadyRevealed =  false;					
				}	
				if(el.style.backgroundColor)allreadyRevealed=true;
				counter++
			}while(allreadyRevealed && counter<500);		
		}
		
		isGameFinished();
		
	}
		
	function isCorrect(divObj)
	{
		var spans = divObj.getElementsByTagName('SPAN');
		if(spans[0].innerHTML==spans[1].innerHTML || spans[1].innerHTML.length==0)return true;
		return false;		
	}
	
	function getTopPos(inputObj)
	{
		
	  var returnValue = inputObj.offsetTop;
	  while((inputObj = inputObj.offsetParent) != null){
	  	returnValue += inputObj.offsetTop;
	  }
	  return returnValue;
	}
	
	function getLeftPos(inputObj)
	{
	  var returnValue = inputObj.offsetLeft;
	  while((inputObj = inputObj.offsetParent) != null)returnValue += inputObj.offsetLeft;
	  return returnValue;
	}
		
	function getPossibleNumbers(inputObj)
	{
		var noArray = new Array();
		var countNumbers = 0;
		var spans = inputObj.getElementsByTagName('SPAN');
		if(spans[0].innerHTML ==spans[1].innerHTML)return 0;
		
		var parentDiv = inputObj.parentNode;
		var subDivs = parentDiv.getElementsByTagName('DIV');
		for(var no=0;no<subDivs.length;no++){
			if(subDivs[no]!=inputObj){
				var spans = subDivs[no].getElementsByTagName('SPAN');
				if(spans[0].innerHTML == spans[1].innerHTML || subDivs[no].style.backgroundColor.length>1){
					if(!noArray[spans[0].innerHTML]){
						noArray[spans[0].innerHTML] = true;		
						countNumbers++;
					}		
				}
			}	
		}
	
		var numbers = inputObj.id.split('_');
		var row = numbers[2];
		var col = numbers[3];
		
		for(var no=0;no<9;no++){			
			
			var obj = document.getElementById(WID + '_square_' + row + '_' + no);
			if(obj!=inputObj){
				var spans = obj.getElementsByTagName('SPAN');	
				if(spans[0].innerHTML == spans[1].innerHTML || !spans[0].style.display){
					if(!noArray[spans[0].innerHTML]){
						noArray[spans[0].innerHTML] = true;		
						countNumbers++;
					}			
				}
			}
			
			var obj = document.getElementById(WID + '_square_' + no + '_' + col);
			if(obj!=inputObj){
				var spans = obj.getElementsByTagName('SPAN');	
				if(spans[0].innerHTML == spans[1].innerHTML || !spans[0].style.display){
					if(!noArray[spans[0].innerHTML]){
						noArray[spans[0].innerHTML] = true;	
						countNumbers++;
					}				
				}
			}
		}	

		return countNumbers;
	}
	
    this.showHint = function()
	{
		var hintDiv = document.getElementById(WID + '_hintDiv');
		var hintDivInner = hintDiv.getElementsByTagName('DIV')[0];
		var maxExistingNo = 0;	
		var objectToTry =false;	
		for(var row=0;row<9;row++){
			for(var col=0;col<9;col++){
				var obj = document.getElementById(WID + '_square_' + row + '_' + col);
				if(obj.style.backgroundColor)continue;
				if(!isCorrect(obj)){
					hintDivInner.innerHTML = 'This one is wrong';
					hintDiv.style.left = getLeftPos(obj) + 'px';
					hintDiv.style.top = getTopPos(obj) - 50 + 'px';
					hintDiv.style.display='block';		
					return;			
				}	
				
				var existingNumbers = getPossibleNumbers(obj);	
				if(existingNumbers>maxExistingNo){
					maxExistingNo = existingNumbers;
					objectToTry = obj;					
				}	
			}
		}
		
		if(objectToTry){
			hintDivInner.innerHTML = 'Try this one ';
			hintDiv.style.left = getLeftPos(objectToTry) + 'px';
			hintDiv.style.top = getTopPos(objectToTry) - 50 + 'px';
			hintDiv.style.display='block';				
			
		}
	}
	
	
	this.revealAll = function()
	{
		for(var row=0;row<9;row++){
			for(var col=0;col<9;col++){
				var obj =document.getElementById(WID + '_square_'+row+'_'+col);
				var spans = obj.getElementsByTagName('SPAN');
				spans[0].style.display='';
				spans[1].style.display='none';	
				spans[1].style.color='#000000';	
			}
		}
		gameFinished=true;
	}
	
    this.switchLevel = function(initLevel,linkObj)
	{
		var confirmSwitch = gameFinished;
		if(!confirmSwitch)confirmSwitch = confirm('Click OK to finish the current game');
		if(confirmSwitch){
			var parentObj = linkObj.parentNode.parentNode;
			var links = parentObj.getElementsByTagName('A');
			for(var no=0;no<links.length;no++){
				links[no].style.fontWeight='normal';
			}
			linkObj.style.fontWeight = 'bold';
			level = initLevel;
			setTimeout(this.initSudoku,20);		
		}
	}
}
var s = new Sudoku();
s.initSudoku();
// add to the instance map for later refernece
jmaki.attributes.put(widget.uuid, s);
    


