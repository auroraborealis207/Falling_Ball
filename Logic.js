const delay = ms => new Promise(res => setTimeout(res, ms));

var seconds = 0;
var points = 0;
var speed = 1;
var new_object_spawn_dis = 50
var last_object_spawn_dis = 0

var basic_background_objects = [["Floor","Rectangle",0,400,700,100],
                                ["Ceiling","Rectangle",0,0,700,100]]

var obstacles = [["1","Rectangle",400,300,20,120]]

const canvas = document.getElementById('myCanvas');
var height = canvas.height;
var width = canvas.width;


/*drawing / Screen updating functions*/

function drawshapes(obj){
    const ctx = canvas.getContext('2d');
    if (obj[2]+obj[4]<0){
        obj =[]
    }
    if (obj[1] == "Rectangle"){
        var x = obj[2]
        var y = obj[3]
        var lenght_ = obj[4]
        var width_ = obj[5]
        ctx.fillRect(x, y, lenght_, width_);
    }
}

function update_shape(obj){
    if (last_object_spawn_dis > new_object_spawn_dis ){
        console.log("add");
        add_obstacles()
    }
    
    obj[2]-=speed

    //roll_speed

    
}

function iterate_draw_over(obj_holder,dont_move=0){

    for(var i=0 ;i<obj_holder.length;i++){
        
        var obj = obj_holder[i]
        if(dont_move==0){
            update_shape(obj)
        }
        drawshapes(obj)
    }

    clean_up(obstacles)
}

function clear_screen(){
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
}

function clean_up(obj){

    for(var i=obj.lenght;i>0;i--){
        if (obj[i]==[]){
          obj.pop(i)  
          console.log("clean")
        }
    }
}


var Spawn_range = [100,320]
var diff = Spawn_range[1] - Spawn_range[0]

//Game Logic

function add_obstacles(){
    last_object_spawn_dis =0
    var y = Math.floor(Math.random()*diff)+Spawn_range[0]

    var place_holder = ["1","Rectangle",canvas.width,y,20,80]
    obstacles.push(place_holder)
    console.log("one")
}



/* Main Control Functions*/


function draw() {
    
    //console.log("Print");

    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');

      ctx.font = "30px Arial";
      ctx.fillStyle = 'black';
      ctx.stokeStyle = 'black'
      ctx.strokeText("Text", 600, 50);
        
      ctx.fillStyle ='black'

      iterate_draw_over(basic_background_objects,dont_move=1)
      iterate_draw_over(obstacles)
      last_object_spawn_dis += speed

      ctx.font = "30px Arial";
      ctx.fillStyle = 'white';
      ctx.stokeStyle = 'white'
      ctx.fillText(points.toString(), 600, 50);


      
    //   ctx.fillRect(25, 25, 100, 100);
    //   ctx.clearRect(45, 45, 60, 60);
    //   ctx.strokeRect(50, 50, 50, 50);
    }
}


const startFunction = async () => {
    
    while(true){
        await delay(40)
        clear_screen()
        draw()
    }

}






startFunction()