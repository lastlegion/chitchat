
var shuffle = function(o) {
    for(var j,x,i = o.length; i; j = parseInt(Math.random() * i), x= o[--i],o[i] = o[j], o[j] = x);
    return o;
};
var randomMove = function(){
    var move = Math.floor((Math.random()*4) + 1);
    return move;
}
var make_move = function(tokens, i, j, x ){
    var move = Math.floor((Math.random()*4) + 1);
    //check if valid
 
    if(move == 1){  //top
        //bounds check
        if(i == 0){     //topmost row
            //make bottom move
            tokens[i+1][j].push(tokens[i][j].splice(x,1)*1)
        } else {
            //make top move
            tokens[i-1][j].push(tokens[i][j].splice(x,1)*1)
        }

    } else if(move == 2){   //right
        //bounds check
        if(j==size-1){
            //make left move
            tokens[i][j-1].push(tokens[i][j].splice(x,1)*1);
        } else {
            tokens[i][j+1].push(tokens[i][j].splice(x,1)*1);
        }
    } else if(move == 3){   //bottom
        //bounds check
        if(i == size-1){
            //make top move
            tokens[i-1][j].push(tokens[i][j].splice(x,1)*1);
        } else {
            tokens[i+1][j].push(tokens[i][j].splice(x,1)*1);
        }
    } else if(move == 4){   //left
        //bounds check
        if(j == 0){
            //make right move
            tokens[i][j+1].push(tokens[i][j].splice(x,1)*1);
        } else {
            tokens[i][j-1].push(tokens[i][j].splice(x,1)*1);
        }
    }

}

var chitchat = function(grid) {
    var turns = 0;
    var tokens = grid.slice(0);
    while(turns !=100000){
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
        console.log(numDone);
//        console.log(tokens);

        
        turns++;
    }
    
};
var init = function(){
    size = 10;
    room = size*size;
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
    console.log(grid);
    chitchat(grid);
    
}

init();

