package lib.shoot {
	import flash.display.MovieClip
	import lib.shoot.Particle;
	//pull info from the Particle doc
	import flash.geom.Point;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.display.Sprite;
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	import com.greensock.*;
	import flash.text.*;

	public class ShootGame extends MovieClip {
		
		private var background:MovieClip;
		private var vx: Number;
		private var movieclip: MovieClip;
		private var wizardwalk: MovieClip;

		private var wizarddeath: MovieClip;
		private var wall: MovieClip;
		private var arrows: Array;
		private var rocks: Array;
		private var nockedArrow: Particle;
		//particles are items with physics/gravity used for motion
		private var bowLocation: Point;
		private var bowAngle: Number;

		private var wallLayer: Sprite;
		private var arrowsLayer: Sprite;
		private var rocksLayer: Sprite;
		private var touchLayer: Sprite;
		
		private var scoreboard: MovieClip;
		private var scoreText:TextField;
		private var score:uint;
		
		private var healthboard: MovieClip;
		private var healthbar:MovieClip;
		
		private var rockSpawnDelay: Number;
		private var rockSpawnCounter: Number;

		private var difficulty: Number;
		private var difficultyRate: Number;
		//as game goes on we have more enemies

		private var barrageCount: Number;
		private var barrageSpacing: Number;
		public var friction:Number;
		private var lose:MovieClip;
		private var win:MovieClip;

		public function ShootGame() {
		
			background = new Background()
			addChild(background);
			
			barrageCount = 3;
			// amount of arrows
			barrageSpacing = 5;
			// 5 pixels between arrows
			
			difficultyRate = 0.3;
			difficulty = 1;
			rockSpawnDelay = rockSpawnCounter = 112;
			//game becomes more difficult as time goes on

			arrows = new Array();
			rocks = new Array();

			wizardwalk = new wizard_walk();
			nockedArrow = new staff();
			//produces the objects (the bow)

			bowLocation = new Point(350,700);
			//bowLocation.x += vx;
			//bowAngle = 0;
			wizardwalk.x = bowLocation.x;
			wizardwalk.y = bowLocation.y;
			
			bowAngle = 0;
			vx = 0;

			wall = new Wall();

			wall.x = 350;
			wall.y = 700;
			
			healthbar = new HealthBar();
			healthboard= new HealthBoard();
			scoreboard = new ScoreBoard();
			
			healthboard.x = 550;
			healthboard.y = 760;
			
			healthbar.x = 550;
			healthbar.y = 760;
			healthbar.width = 120;
			
			scoreboard.x = 150;
			scoreboard.y = 760;
			
			scoreText = new TextField();
			scoreText.x = 148;
			scoreText.y = 760;
			scoreText.width = 200;
			

			nockedArrow.x = wizardwalk.x;
			nockedArrow.y = wizardwalk.y;

			nockedArrow.rotation = bowAngle;
			//using rotation methods in order to connect the parts and put them where they need to go 
			addChild(wall);
			addChild(healthboard);
			addChild(healthbar);
			addChild(scoreboard);
			addChild(scoreText);
			addChild(wizardwalk);
			addChild(nockedArrow);
			lose = new Lose();
			
			//produces a new function
			arrowsLayer = new Sprite();
			rocksLayer = new Sprite();
			touchLayer = new Sprite();
			//creates new layers for the different layers in order to make sure they can interact

			addChild(arrowsLayer);
			addChild(rocksLayer);
			addChild(touchLayer);
			addEventListener(Event.ADDED_TO_STAGE, setupTouchLayer);
			touchLayer.addEventListener(MouseEvent.CLICK, shootArrow);
			addEventListener(Event.ENTER_FRAME, update);
			touchLayer.addEventListener(MouseEvent.CLICK, shootArrow);
			//this makes it so that wherever/whenever the mouse is clicked this will start the shootArrow function
		}
			public function onDown(event: KeyboardEvent): void {
				

				if (event.keyCode == Keyboard.LEFT) {
					vx = -5;
				} else if (event.keyCode == Keyboard.RIGHT) {
					vx = 5;
				}
			}
			public function onUp(event: KeyboardEvent): void {
				if (event.keyCode == Keyboard.LEFT || event.keyCode == Keyboard.RIGHT) {
					vx = 0;
			}
		}

		private function setupTouchLayer(evt: Event): void {
			touchLayer.graphics.beginFill(0x000000, 0);
			touchLayer.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
			touchLayer.graphics.endFill();
			stage.addEventListener(KeyboardEvent.KEY_DOWN, shootArrowBarrage);
			stage.addEventListener(KeyboardEvent.KEY_DOWN, onDown);
			stage.addEventListener(KeyboardEvent.KEY_UP, onUp);
			// starts the shoot arrow by setting up layer and setting the color of the arrows
		}

		private function shootArrow(evt: MouseEvent): void {
			makeArrow(bowAngle);
			//makes the arrow
		}

		private function shootArrowBarrage(evt: KeyboardEvent): void {
			if (evt.keyCode == Keyboard.SPACE) {
				var i: int;
				for (i = 0; i < barrageCount; i++) {
					makeArrow(bowAngle - ((barrageCount - i - (barrageCount / 2)) * barrageSpacing));
				}
				// this makes the arrow and makes it appearand sets the ability for a later count
			}

		}

		private function makeArrow(angle: Number): void {
			var newArrow: Particle = new Bolt();
			//spawns the arrow and makes it an arrow

			newArrow.x = wizardwalk.x;
			newArrow.y = wizardwalk.y;
			newArrow.rotation = angle;
			//spawns arrow at the same spot and rotation of the bow

			var xDiff: Number = wizardwalk.x - touchLayer.mouseX;
			var yDiff: Number = wizardwalk.y - touchLayer.mouseY;
			//uses the bow location and the touch location in order to make distance and produce angle
			//helps with the gravity and distanc eof shot

			var distance: Number = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));


			var power: Number = distance / 12;
			//provides the power of the shot/adds gravity

			newArrow.xVel = power * Math.cos(newArrow.rotation / 180 * Math.PI);
			newArrow.yVel = power * Math.sin(newArrow.rotation / 180 * Math.PI);
			//using trig to find the velocity of the shot

			newArrow.addEventListener(Particle.PURGE_EVENT, purgeArrowHandler);
			// adds the event to get rid of the arrow

			arrowsLayer.addChild(newArrow);
			arrows.push(newArrow);
			//adds for the arrow array

			TweenLite.to(newArrow, 5, {
				rotation: 5400
			});
		}

		private function makeRocks(): void {
			rockSpawnCounter++;

			if (rockSpawnCounter > rockSpawnDelay) {
				rockSpawnCounter = 0;
				rockSpawnDelay -= difficultyRate;
				difficulty += difficultyRate;
				makeRock();
				//enemy spawn function
				//creates the enemies and the dificulty/spawn rate
			}
		}

		private function makeRock(): void {
			var i: int;
			for (i = 0; i < Math.floor(difficulty); i++) {
				var newRock: Rock = new RockFall();

				newRock.x = Math.random() * 650 + 50;
				newRock.y = -100;

				newRock.xVel = (-Math.random() * difficulty) - 5;
				newRock.sinMeter = Math.random() * 12;
				newRock.bobValue = Math.random() * difficulty;

				newRock.addEventListener(Particle.PURGE_EVENT, purgeRockHandler);

				rocksLayer.addChild(newRock);
				rocks.push(newRock);
				//based on the difficulty spawns a new particle which spawns in as well as set the spawn stuff and how many

			}
		}

		private function purgeArrowHandler(evt: Event): void {
			var targetArrow: Particle = Particle(evt.target);
			purgeArrow(targetArrow);
		}
		private function purgeRockHandler(evt: Event): void {
			var targetRock: Particle = Particle(evt.target);
			purgeRock(targetRock);
			
		}

		private function purgeRock(targetRock: Particle): void {
			targetRock.removeEventListener(Particle.PURGE_EVENT, purgeRockHandler);
			try {
				var i: int;
				for (i = 0; i < rocks.length; i++) {
					if (rocks[i].name == targetRock.name) {
						rocks.splice(i, 1);
						rocksLayer.removeChild(targetRock);
						i = rocks.length;
					}
				} // array to delete the arrow in order to make sure performance is fine
				// if arrows or rocks are to far off the stage they are erased
			} catch (e: Error) {
				trace("Failed to delete rock!", e);
				// if error  display error
			}
		}

		private function purgeArrow(targetArrow: Particle): void {
			targetArrow.removeEventListener(Particle.PURGE_EVENT, purgeArrowHandler);
			try {
				var i: int;
				for (i = 0; i < arrows.length; i++) {
					if (arrows[i].name == targetArrow.name) {
						arrows.splice(i, 1);
						arrowsLayer.removeChild(targetArrow);
						i = arrows.length;
					}
				}
			} catch (e: Error) {
				trace("Failed to delete arrow!", e);
			}
		}

		private function hitTest(arrow: Particle): void {
			for each(var rock: Rock in rocks)
				if (rock.status != "Dead" && rock.hitTestPoint(arrow.x, arrow.y)) {
					rock.destroy();
					purgeArrow(arrow);
					score += 5 * difficulty;
					scoreText.text = String(score);
					purgeRock(rock)
			}
		}

		private function update(event: Event): void {
			wizardwalk.x += vx;
			background.update()
			
			var target: Point = new Point(stage.mouseX, stage.mouseY);
			//uses trig to fing the angle of the bow

			var angleRad: Number = Math.atan2(target.y - wizardwalk.y, target.x - wizardwalk.x);

			bowAngle = angleRad * 180 / Math.PI;
			//finds exact angle of math

			nockedArrow.rotation = bowAngle;
			//rotates the bow

			trace(rocks.length, arrows.length);
			
			for each(var rock: Particle in rocks) {
				rock.update();
			}

			for each(var arrow: Particle in arrows) {
				arrow.update();
				hitTest(arrow);
				//test to see if the arrow hit rock
			}

			makeRocks();
			if (rock.y >= 750) {
				healthbar.width --;
			} 
			if (wizardwalk.x + wizardwalk.width > stage.stageWidth) {
				wizardwalk.x = wizardwalk.stage.stageWidth - wizardwalk.width;
				wizardwalk.vx *= 0;
			} else if (wizardwalk.x - wizardwalk.height < 0) {
				wizardwalk.x = wizardwalk.height;
				wizardwalk.vx *= 0;
			}
			if (wizardwalk.y + wizardwalk.height > stage.stageHeight) {
				wizardwalk.y = stage.stageHeight - wizardwalk.height;
				wizardwalk.vy *= 0;
			} else if (wizardwalk.y - wizardwalk.height < 0) {
				wizardwalk.y = wizardwalk.height;
				wizardwalk.vy *= 0;
			}
			if (healthbar.width <= 5) {
				if (score >= 100) {
					winscreen();
				}
				if (score <=100) {
					losescreen();
				}
			}
		}
		private function winscreen(): void {
			removeEventListener(Event.ENTER_FRAME, update);
			var i:int = stage.numChildren;
			while(i--)
			{
				removeChildAt(i);
			}
			win = new Win();
			addChild(win);
		}
		function losescreen(): void {
			removeEventListener(Event.ENTER_FRAME, update);
			var i:int = stage.numChildren;
			while(i--)
			{
				removeChildAt(i);
			}
			lose = new Lose();
			addChild(lose);
		}
	} 
}