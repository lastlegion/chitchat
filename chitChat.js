    //init();


    var size;
    var TURNS = 1020;

 
    var plotGraph = function(raw_data){
        console.log("plot"); 
        var proc_data = [];
        for(var i=0; i<TURNS; i++){
        proc_data[i] = [];
        proc_data[i][0] = (i);
        proc_data[i][1] = (raw_data[i]);
        }
        function drawChart() {
            var data = google.visualization.arrayToDataTable(proc_data);

            var options = {
              title: 'Performance',
              vAxis: {
                maxValue: size*size
              }
            };

            var chart = new google.visualization.LineChart(document.getElementById('plot'));
            chart.draw(data, options);
        };
        drawChart();
        console.log("here");
    };

     
    var shuffle = function(o) {
        for(var j,x,i = o.length; i; j = parseInt(Math.random() * i), x= o[--i],o[i] = o[j], o[j] = x);
        return o;
    };
    var randomn = function(n){
        var move = Math.floor((Math.random()*n) + 1);
        return move;
    }
    var make_move = function(tokens, i, j, x ){
        var move = Math.floor((Math.random()*4) + 1);
        //check if valid

        var top_move = function(){
            tokens[i-1][j].push(tokens[i][j].splice(x,1)*1)
        };
        var right_move = function(){
             tokens[i][j+1].push(tokens[i][j].splice(x,1)*1);
        };
        var left_move = function(){
             tokens[i][j-1].push(tokens[i][j].splice(x,1)*1);
        };
        var bottom_move = function(){
            tokens[i+1][j].push(tokens[i][j].splice(x,1)*1);
        };
        
        if(move == 1){  //top
            //bounds check
            if(i == 0){     //topmost row
                move = randomn(3);
                console.log(move);
                if(j==0){ //topleft corner
                    move = Math.floor((Math.random()*2)+1);
                    if(move == 1)
                        right_move();
                    else
                        bottom_move();
                } else if(j==size-1){   //topright corner
                    move = Math.floor((Math.random()*2)+1);
                    if(move == 1)
                        left_move();
                    else
                        bottom_move();
                } else {
                    if(move == 1)
                        bottom_move();
                    else if (move == 2)
                        left_move();
                    else if (move == 3)
                        right_move();
                }
            } else 
                top_move();

        } else if(move == 2){   //right
            //bounds check

            if(j==size-1){  
                move = randomn(3);
                if(i==0){   //topright corner
                    move = randomn(2);
                    if(move == 1)
                        left_move();
                    else
                        bottom_move();
                } else if(i==size-1){   //bottomright
                    move = randomn(2);
                    if(move == 1)
                        left_move();
                    else
                        top_move();
                } else{     //rightmost
                    if(move == 1)
                        top_move();  
                    else if (move == 2)
                        left_move();
                    else if (move == 3)
                        bottom_move();           
                }
            } else 
                right_move();
        } else if(move == 3){   //bottom
            //bounds check
            if(i == size-1){
                move = randomn(3);
                if(j == 0){ //bottom left
                    move = randomn(2);
                    if(move == 1)
                        right_move();
                    else 
                        top_move();
                } else if(j == size -1){    //bottom right
                    move = randomn(2);
                    if(move == 1)
                        left_move();
                    else
                        top_move();
                } else {          
                    if(move == 1){
                        top_move();
                    } else if (move == 2){
                        left_move();
                    } else if (move == 3){
                        right_move();
                    }
                }   
            } else {
                bottom_move();
            }
        } else if(move == 4){   //left
            //bounds check
            if(j == 0){
                move = randomn(3);
                if(i == 0){ //topleft
                    move  = randomn(2);
                    if(move == 1)
                        right_move();
                    else
                        bottom_move();
                } else if(i == size-1){ //bottomleft
                    move = randomn(2);
                    if(move == 1)
                        right_move();
                    else
                        top_move();
                } else {
                    if(move == 1)
                        top_move();   
                    else if (move == 2)
                        bottom_move();
                     else if (move == 3)
                        right_move();
                }
            } else {
                tokens[i][j-1].push(tokens[i][j].splice(x,1)*1);
            }
        }

    }

    var chitchat = function(grid, numturns) {
        var turns = 0;
        var data = [];
        var tokens = grid.slice(0);
        while(turns != numturns){
            for(var i=0; i<size; i++){
                for(var j=0; j<size; j++){
                    thisbox = tokens[i][j];
                    for(var x=0; x< thisbox.length; x++){
                        var actual_var = i*size + j;
                        if(tokens[i][j][x] == actual_var){
                            //do nothing
                        } else {
                            make_move(tokens,i,j,x);
                        }                    
                    }

                }
            }
            //find how many are done
            var numDone = 0;
            for(var i=0; i<size; i++){
                for(var j=0; j<size; j++){
                    for(var x=0; x<tokens[i][j].length; x++){
                        var actual_var = i*size + j;
                        if(tokens[i][j][x] == actual_var){
                            numDone++;
                        }
                    }
                }
            }
            if(numDone == 100){
                console.log(turns);
                break;
            }
            //console.log(numDone);
    //        console.log(tokens);
            messages = document.getElementById("messages");
            //messages.innerHTML += numDone + "<br />";
            data.push(numDone);
            turns++;
        }
        //console.log(data);
        
        drawBoard(tokens); 
        plotGraph(data);
    };
    var drawBoard = function(grid) {
        var table = document.createElement("table");
        var main = document.getElementById("main");
        //console.log(main);
        table.style.border="1px solid #333"; 
        for(var i=0; i< size; i++) {
            var tr = document.createElement("tr");
            table.appendChild(tr)
            for(var j=0; j< size; j++) {

                var td = document.createElement("td");
                var x=0;
                //var sp = document.createElement("div");
                if(grid[i][j].length >= size/5){
                    td.className="danger";
                }
                for(var x=0; x<grid[i][j].length; x++){
                    
                    var actual_var = i*size + j;
                    if(grid[i][j][x] == actual_var){
                        td.className="safe";
                    }                   
                    
                    td.innerHTML += grid[i][j][x] ;
                    if(x != grid[i][j].length - 1){
                        td.innerHTML += ",";
                    }

                }
                tr.appendChild(td);
            }
        }
        //document.appendChild(table);
        //console.log(table);
        main.appendChild(table);
        console.log(main);
    }
    var init = function(){
        size = 10;
        room = size*size;

        var button = document.getElementById("run");
        run.onclick = function(e){
            main.innerHTML = "";
            TURNS = document.getElementById("inTurns").value;
            size = document.getElementById("inSize").value;
            grid = [];
            var seq = [];
            
            for(var i=0; i<size*size; i++){
                seq[i] = i;
            }

            shuffle(seq);
            for(var i=0; i<size; i++){
                grid[i] = []
                for(var j=0; j<size; j++){
                    grid[i][j] = []            
                    grid[i][j][0] =seq[i*size + j];
                }
            }
            drawBoard(grid);
            
            
            chitchat(grid, TURNS);      
        //     console.log("yo");
        }
//        console.log(grid);
        console.log("here"); 
    }

    //init();
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(init);

