package lib.shoot
{
	import flash.display.MovieClip;
	import flash.events.Event;
	
	public class Particle extends MovieClip
	{
		public static const PURGE_EVENT:String = "PURGE";
		
		public var xVel:Number;
		public var yVel:Number;
		public var airResistance:Number;
		public var gravity:Number;
		
		//the variables which are important
		
		public function Particle()
		{
			xVel = 0;
			yVel = 0;
			airResistance = 0.99;
			//friction of the arrows
			gravity = 0.54;
			//the curve of the shot
		}
		
		public function update():void {
			yVel += gravity;
			
			yVel *= airResistance;
			xVel *= airResistance;
			
			rotation = Math.atan2(yVel, xVel) * 180 / Math.PI;
			//rotation rate
			
			x += xVel;
			y += yVel;
			
			if (y > 950)
			{
				trace("Dispatching Particle Fell!");
				dispatchEvent(new Event(Particle.PURGE_EVENT, true, false));
				//confirmation of death
			}
			if (y <-150) {
				trace("Particle To High!");
				dispatchEvent(new Event(Particle.PURGE_EVENT, true, false));
			}
		}
	}
}