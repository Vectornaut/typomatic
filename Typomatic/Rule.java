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
import javax.sound.sampled.LineUnavailableException;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.StyledDocument;

public class Rule {
	private String from;
	private String to;
	
	private Sound sound;
	private AttributeSet color;
	
	Rule(String code, ResourceKit resources) throws InterpreterException {
		String[] tokens = code.split("\\s");
		if (tokens.length >= 1) from = tokens[0]; else from = "";
		if (tokens.length >= 2) to = tokens[1]; else to = "";
		if (tokens.length >= 3) {
			if (resources.containsSound(tokens[2])) sound = resources.getSound(tokens[2]);
			else throw new InterpreterException(InterpreterException.BAD_SOUND, tokens[2]);
		} else {
			sound = resources.getSound("");
		}
		if (tokens.length >= 4) {
			if (resources.containsColor(tokens[3])) color = resources.getColor(tokens[3]);
			else throw new InterpreterException(InterpreterException.BAD_COLOR, tokens[3]);
		} else {
			color = resources.getColor("");
		}
	}
	
	// if this rule can be applied to the string in the given document, apply it and return true.
	// otherwise, return false.
	public boolean apply(StyledDocument display, int tempo, boolean soundOn) throws LoggedException {
		// look for a substring matching this rule
		String str;
		try {
			str = display.getText(0, display.getLength());
		} catch (BadLocationException ex) {
			throw new LoggedException("Could not grab string from display");
		}
		int index = str.indexOf(from);
		if (index == -1) return false;
		
		// if a matching substring is found, apply the rule
		LoggedException log = new LoggedException();
		try {
			if (soundOn && sound != null) sound.play();
		} catch (LineUnavailableException ex) {
			log.append("Audio line unavailable.");
		}
		display.setCharacterAttributes(index, from.length(), color, true);
		try {
			Thread.sleep(Math.round(30000.0/tempo)); // sleep for half a beat
		} catch (InterruptedException ex) {
			log.append("Rewrite thread interrupted.");
		}
		try {
			display.remove(index, from.length());
			display.insertString(index, to, null);
		} catch (BadLocationException ex) {
			log.append("String location " + ex.offsetRequested() + " does not exist.");
		}
		
		if (log.isActive()) throw log;
		return true;
	}
}
