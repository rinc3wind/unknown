$(document).ready(function() {
//text next to cursor for using inventory items
  $(document).mousemove(function(e){
    var cpos={top:e.pageY-6, left:e.pageX+20};
    $('#besideMouse').offset(cpos);
  });
  $("#besideMouse").hide();
  document.body.onmousedown = function(e) { 
    if (e.button === 1) {
//if holding an item, cancel it with middle click
      if (player.state=="using_item") {
        player.state="normal";
        $("#besideMouse").hide();
      }
    return false;
    }
  }

  var intro={
    name:"intro",
    title:"Antarctica, December 10th, 1912",
    type:"room",
    header:"base",
    description:["\"Just have one more try - it's dead easy to die,<br>It's the keeping-on-living that's hard.\"<br> - Robert W Service<br><br><span id='start'>continue</span>"],
    start: {
      name:"start",
      type:"exit",
      look:null,
      interact:"base"
    },
  };

  var mertz={
    name:"mertz",
    type:"character",
    room:"base",
    look:"I know this man, he's Xavier Mertz. One of the two guys that will accompany me on the expedition.",
    initial_dialogue: ["As you approach the man he looks at you.<br>\"Hey Doug, do you have a lighter by any chance?\"<br><br>","Mertz exhales dense cigarette smoke mixed with vapor.<br><br>\"Howdy Mertz. Is everything in order?\"<br>\"Hey Doug, yea if it wasn't for this goddamn wind which knocked some boxes over, everything would be fine.\"<br><br>"],
    questions:["<span id='dialogue_end'>Sure I do.</span>"],
    dialogue: [
    "\"Rested and fed. They don't mind the cold and wind so much, Ginger seems to enjoy it even.\"<br><br>",
    "\"No, but knowing him, he's probably doing the work for three and joking with the guys at the same time.\"<br><br>","\"As much as anyone who is going to venture in a territory noone has ever been to.\"<br><br>"
    ]
  };

  var base={
    name:"base",
    title:"Commonwealth Bay - Main base",
    type:"room",
    header:"base",
    description:["You find yourself standing in front of a <span id='hut'>wooden hut</span>. ", "All of your posessions are in a <span id='leather_bag'>large leather bag</span> with a <span id='name_tag'>name tag</span>. ","On the shore is a boat <span id='aurora'>Aurora</span> and few men are unloading rest of the cargo which mostly consists of large wooden boxes. Other men are taking the goods from the ship to the hut. ","<span id='mertz' dialogue='0'>One of them</span> just dropped a box near the base of the hut and started to look for something in his pockets."],
    name_tag: {
      name:"name_tag",
      type:"object",
      look:"Name tag reads: Douglas Mawson.",
      interact:"I better leave it as it is, wouldn't be too hard to lose it in this chaos."
    },
    aurora: {
      name:"aurora",
      type:"object",
      look:"Aurora is a supply ship. It leaves tomorrow and next time I'll see it will take me home. But that will be no sooner than in 10 months.",
      interact:"There is not much unloading left to do and the ship crew has it covered quite well.",
    },
    leather_bag: {
      name:"leather bag",
      type:"item",
      look:"This bag contains everything I packed for the journey to this god forsaken land.",
      inv_look:"This bag contains everything I packed for the journey to this god forsaken land. Name tag on it reads: Douglas Mawson.",
      interact:"You picked up the bag.",
      room_description_position: 1,
      table:function(){
        player.inventory.splice(player.inventory.indexOf(base.leather_bag),1);
      	bunk.description[1]="Between beds is a narrow table. On the <span id='table'>table</span> is a <span id='photo'>photo</span> and some <span id='documents'>documents</span>. ";
      	player.refresh("You unpacked a few things and put them on the table.<br><br>");
      }
    },
    mertz:mertz,
    hut: {
      name:"hut",
      type:"exit",
      look:"This was my home for the past few days. From one side it's completely covered in snow.",
      interact:"hut"
    }
  };

  var hut={
    name:"hut",
    title:"Inside the hut - hallway",
    type:"room",
    header:"base",
    description:["You see a hallway. On the far end is an entrance to your <span id='bunk'>bunk</span>. Behind you is <span id='base'>door</span> leading outside."],
    bunk: {
      name:"bunk",
      type:"exit",
      look:"Maybe I should lie down for a bit.",
      interact:"bunk"
    },
    base: {
      name:"base",
      type:"exit",
      look:"It's not really warmer here, but at least there's no wind.",
      interact:"base"
    }
  };

  var bunk={
    name:"bunk",
    title:"Your bunk",
    type:"room",
    header:"base",
    description:["You are in a tiny room with two beds and two chests near the base of each bed. ","Between beds is a narrow <span id='table'>table</span>. ","This room is for function only and the function is sleeping. Behind you is entrance to the <span id='hallway'>hallway</span>."],
    hallway: {
      name:"hallway",
      type:"exit",
      look:"",
      interact:"hut"
    },
    table: {
      name:"table",
      type:"object",
      look:"Table is small, but sturdy.",
      interact:"It's lodged between the beds."
    },
    photo: {
      name:"photo",
      type:"object",
      look:"Me and my girlfriend in front of our house in Australia.",
      interact:"I can just look at it."
    },
    documents: {
      name:"documents",
      type:"object",
      look:"Bunch of papers with expedition plans and other informations.",
      interact:function() {
      	bunk.description[3]=" Ninnis is sitting on his bed. He looks calm and relaxed.";
      	player.refresh("Suddenly Ninnis walked in the room and sat on his bed.<br><br>");
      	bunk.documents.interact="blah blah who gives a shit";
      }
    }
  };

  var player={
    state:"normal",
    item:null,
    room:base,
    inventory:[
      {name:"lighter", inv_look:"Metallic zippo lighter I got for my 30th birthday from my girlfriend.", leather_bag:"I better leave it in my pocket, lighter may come in handy anytime.", aurora:"Even if I wanted to put the ship on fire, this lighter wouldn't be enough.",
        mertz:function() {
    	  player.room.description[3]="<span id='mertz' dialogue='1'>Mertz</span> is puffing on his cigarette.";
    	  player.refresh("You gave your lighter to Mertz. He quickly takes one cigarette from his pocket, lights it and returns the lighter.<br><br>\"Thank you man.\"<br><br>");
    	  mertz.questions=["<span id='mertz.dialogue[0]'>How are the dogs?</span><br>","<span id='mertz.dialogue[1]'>Have you seen Ninnis?</span><br>","<span id='mertz.dialogue[2]'>Are you ready for tomorrow?</span><br>","<span id='dialogue_end'>Ok, see you later Xavier.</span>"];
    	  player.inventory[0].mertz="He doesn't need my lighter anymore.";
    	}
      }
    ],
    refresh:function(before) {
      $("#inventory").empty();
      $("#inventory").append('<h3>inventory</h3><br>');
      for (i=0; i<=player.inventory.length-1; i++) {
        $("#inventory").append("<span id="+i+">"+player.inventory[i].name+"</span><br>");
      }
      $("#main").empty();
      $("#main").append('<h3>'+player.room.title+'</h3><br>');
      $("#main").append(before);
      for (i=0; i<=player.room.description.length-1; i++) {
      	$("#main").append(player.room.description[i]);
      }
      $('#header').css("background-image", "url(header/"+player.room.header+".png)"); 
    },
    look:function(clicked){
      if (clicked.look!=null) {
        $("#main").append('<br><br>'+clicked.look);
      }
    },
    start_dialogue:function(clicked, dialogue){
      $("#main").empty();
      $("#main").append(clicked.initial_dialogue[dialogue]);
      for (var i = 0; i <= clicked.questions.length - 1; i++) {
      	$("#main").append(clicked.questions[i]);
      };
      player.state="dialogue";
    },
    interaction:function(clicked){
      if (typeof clicked.interact=='function') {
        clicked.interact();
      } else $("#main").append("<br><br>"+clicked.interact);
    },
    pick_item:function(clicked){
      player.room.description[clicked.room_description_position]="";
      player.inventory[player.inventory.length]=clicked;
      player.refresh(clicked.interact+"<br><br>");
    },
    exit_room:function(clicked){
      player.room=eval(clicked.interact);
      $("#main").append("<br>");
      player.refresh();
    }
  };

  player.refresh();

  $("#help_button").on("mousedown", function(event) {
  	if ($("#help_content").is(":visible")) $("#help_content").hide()
  		else $("#help_content").show();
  });
  $("#help_content").hide();

//inventory clicks
  $("#inventory").on("mousedown", "span", function(event) {
    clicked=eval($(this).attr('id'));
    switch (event.which) {
    case 1:
			if (event.ctrlKey || event.metaKey) {
	      if (player.state=="normal") $("#main").append("<br><br>"+player.inventory[clicked].inv_look);
	      break;
			}
//using inventory item on another inventory item
      if (player.state=="using_item") {
        player.state="normal";
	    	$("#besideMouse").hide();
				if (player.item[player.inventory[clicked].name]!=null) {
				  $("#main").append("<br><br>"+player.item[player.inventory[clicked].name]);
				} else $("#main").append("<br><br>That won't work.");
    	break;
      } 
//picking up item from inventory
      if (player.state=="normal") {
        player.state="using_item";
        player.item=player.inventory[clicked];
        $("#besideMouse").html(player.item.name);
        $("#besideMouse").show();
        break;
      }
//inventory item look
    case 2:
      if (player.state=="normal") $("#main").append("<br><br>"+player.inventory[clicked].inv_look);
      break;
    }
  });

//main area clicks
  $("#main").on("mousedown", "span", function(event) {
    clicked=eval(player.room.name+'.'+$(this).attr('id'));
    switch (event.which) {
    case 1:

			if (event.ctrlKey || event.metaKey) {
			  if (player.state=="normal") {
			    player.look(clicked);
			    break;
			  }    
			}

      if (player.state=='normal') {
        if (clicked.type=='character') player.start_dialogue(clicked,$(this).attr('dialogue'));
        if (clicked.type=='exit') player.exit_room(clicked);
        if (clicked.type=='object') player.interaction(clicked);
        if (clicked.type=='item') player.pick_item(clicked);
        break;
      }

//using inventory item on anything in the main screen
      if (player.state=="using_item") {
        if (player.item[clicked.name]!=null) {
          if (typeof player.item[clicked.name]!='function') {
            $("#main").append("<br><br>"+player.item[clicked.name]);
          } else {
            player.item[clicked.name]();
	      }
	    } else $("#main").append("<br><br>That won't work.");
        $("#besideMouse").hide();
        player.state="normal";
        break;
      }

      if (player.state=="dialogue") {
        if ($(this).attr('id')=='dialogue_end') {
          player.state="normal";
          player.refresh();
        } else {
          $("#main").empty();
          $("#main").append(clicked);
          for (var i = 0; i <= mertz.questions.length - 1; i++) {
            $("#main").append(mertz.questions[i]);
	      };
        }
        break;
      }

    case 2:
      if (player.state=="normal") {
        player.look(clicked);
        break;
      }
    }
  });
});
