/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Copyright 2012 Aaron Fenyes

This file is part of Typomatic.

Typomatic is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Typomatic is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Typomatic.  If not, see <http://www.gnu.org/licenses/>.

 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import java.awt.Color;
import java.util.HashMap;
import javax.swing.text.*;

public class ResourceKit {
	private HashMap<String, Sound> sounds;
	private HashMap<String, AttributeSet> colors;
	
	private LoggedException log;
	
	public ResourceKit() {
		// load sounds
		sounds = new HashMap<String, Sound>();
		String[][] soundNames = {
			{".", "bip"},
			{"+", "bleep"},
			{"/", "boing"},
			{"$", "bling"},
			{"#", "scratch"},
			{"*", "sparkle"}
		};
		log = new LoggedException();
		sounds.put("", null);
		for (int i = 0; i < soundNames.length; i++) {
			try {
				Sound curr = new Sound(soundNames[i][1] + ".wav");
				sounds.put(soundNames[i][0], curr);
			} catch (LoggedException ex) {
				log.append(ex);
				sounds.put(soundNames[i][0], null);
			}
		}
		
		// initialize colors
		colors = new HashMap<String, AttributeSet>();
		StyleContext context = StyleContext.getDefaultStyleContext();
		colors.put("", makeAttr(context, Color.white));
		colors.put("p", makeAttr(context, Color.getHSBColor(0.90f, 1f, 1f)));
		colors.put("o", makeAttr(context, Color.getHSBColor(0.10f, 1f, 1f)));
		colors.put("y", makeAttr(context, Color.getHSBColor(1f/6, 1f, 1f)));
		colors.put("g", makeAttr(context, Color.getHSBColor(1f/3, 1f, 1f)));
		colors.put("b", makeAttr(context, Color.getHSBColor(0.52f, 1f, 1f)));
		colors.put("v", makeAttr(context, Color.getHSBColor(0.80f, 0.83f, 1f)));
	}
	
	private AttributeSet makeAttr(StyleContext context, Color color) {
		return context.addAttribute(SimpleAttributeSet.EMPTY, StyleConstants.Foreground, color);
	}
	
	public LoggedException getLog() {
		return log;
	}
	
	public boolean containsSound(String name) {
		return sounds.containsKey(name);
	}
	
	public boolean containsColor(String name) {
		return colors.containsKey(name);
	}
	
	public Sound getSound(String name) {
		return sounds.get(name);
	}
	
	public AttributeSet getColor(String name) {
		return colors.get(name);
	}
}
