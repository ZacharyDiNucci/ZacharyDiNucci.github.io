package lib.shoot
//pulls from lib and shoot
{
	import flash.display.MovieClip;
	import lib.shoot.Particle;
	import flash.events.Event;
	
	public class Rock extends Particle
	{
		public var sinMeter:Number;
		//sin wave
		public var bobValue:Number;
		//rate of bobbing of sin wave
		public var status:String;

		public function Rock()
		{
			status = "OK";
			bobValue = 0.1;
			sinMeter = 0;
			xVel = 0;
			yVel = 0;
			airResistance = 1;
			gravity = .4;
			gotoAndStop(1);
		}
		
		public function destroy():void
		{
			gotoAndPlay(2);
			status = "Dead";
		}
		
		public override function update():void
		{
			if (status != "Dead")
			{
				xVel = Math.sin(sinMeter) * bobValue;
			}
			
			sinMeter += 0.1;
			super.update();
			
			if (y > 1000)
			{
				trace("Dispatching Rock Escaped!");
				dispatchEvent(new Event(Particle.PURGE_EVENT, true, false));
				// makes if status is dead purge, while if not we bob
			}
		}
	}
}