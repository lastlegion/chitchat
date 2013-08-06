    var size;
    var TURNS = 1020;
    var donevec = [];
    
    var deliveryRatio, AVG, MEDIAN, MAX, MIN;

    var plotGraph = function(raw_data){
        //console.log("plot"); 
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
        //console.log("here");
    };

 

     
    var shuffle = function(o) {
        for(var j,x,i = o.length; i; j = parseInt(Math.random() * i), x= o[--i],o[i] = o[j], o[j] = x);
        return o;
    };

    var make_move = function(tokens, i, j, x ){

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
        var actual_row = Math.floor(tokens[i][j][x]/size);
        var actual_col = tokens[i][j][x] - (actual_row*size) ;
         
        //try aligning row first
        if(i != actual_row){
            if(i < actual_row){
                bottom_move();
                return;
            } else {
                top_move();
                return;
            }
        }
        if(j != actual_col){
            if(j < actual_col){
                right_move();
                return;
            } else {
                left_move();
                return;
            }
        }
        //console.log("move");
        console.log(actual_row + " " + actual_col + " " + tokens[i][j][x]);
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
                            if(donevec[actual_var] == -1){
                                donevec[actual_var] = turns;
                            }
                            numDone++;
                        }
                    }
                }
            }
            if(numDone == size*size){
                break;
            }
            data.push(numDone);
            turns++;
        }

        //find average, median, max, min
        var sum=0;
        var max = -1;
        var min = 1000000;
        for(var i=0; i<donevec.length; i++){
            if(donevec[i] !=-1){
                sum += donevec[i];
                if(donevec[i] > max){
                    max = donevec[i];
                }
                if(donevec[i] < min){
                    min = donevec[i];
                }
            }    
        }
        donevec.sort();
        var medianI = 0;
        var medianJ = 0;
        for(var i=0; i<donevec.length; i++){
            if(donevec[i] == -1){
                medianJ++;
            } else {
                medianI++;
            }
        }
        MEDIAN = donevec[medianJ + Math.floor(medianI/2)];
        
        deliveryRatio = numDone/(size*size);
        AVG = sum/(size*size);
        MAX = max;
        MIN = min;
        var messages= document.getElementById("messages");
        messages.innerHTML = "";
        messages.innerHTML = "Delivery Ratio "+ numDone + "/"+ (size*size)+ " "+ deliveryRatio + "<br />";
        messages.innerHTML += "Average " + AVG + "<br />";
        messages.innerHTML += "Median "+ MEDIAN + "<br />";
        messages.innerHTML += "Max " + MAX + "<br />";
        messages.innerHTML += "Min " + MIN + "<br />";
        console.log(AVG + " "+ MAX + " "+MIN);
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
        //console.log(main);
    }
    var init = function(){
        size = 10;
        for(var i=0; i<size*size; i++){
            donevec[i] =-1;
            console.log("here");
        }

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
        }
    }

    //init();
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(init);

