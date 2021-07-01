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

import java.awt.Font;
import java.awt.FontFormatException;
import java.io.IOException;
import java.net.URL;
import javax.swing.plaf.FontUIResource;
import javax.swing.plaf.metal.DefaultMetalTheme;

public class TypoTheme extends DefaultMetalTheme {
	private FontUIResource displayFont;
	
	private LoggedException log;
	
	public TypoTheme() {
		log = new LoggedException();
		try {
			URL url = getClass().getResource("fonts/UbuntuMono-R.ttf");
			if (url == null) throw new IOException();
			Font base = Font.createFont(Font.TRUETYPE_FONT, url.openStream());
			displayFont = new FontUIResource(base.deriveFont(42f));
		} catch (IOException ex) {
			displayFont = new FontUIResource(new Font("Monospaced", Font.PLAIN, 42));
			log.append("Custom display font not found.");
		} catch (FontFormatException ex) {
			displayFont = new FontUIResource(new Font("Monospaced", Font.PLAIN, 42));
			log.append("Custom display font not found.");
		}
	}
	
	// this is a brand-new method, not an override
	public FontUIResource getDisplayFont() { return displayFont; }
	
	public LoggedException getLog() { return log; }
}
