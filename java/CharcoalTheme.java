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
import javax.swing.plaf.ColorUIResource;

public class CharcoalTheme extends TypoTheme {
	private final ColorUIResource charcoal	= new ColorUIResource(Color.getHSBColor(0f, 0f, 0.125f));
	private final ColorUIResource mist		= new ColorUIResource(Color.getHSBColor(0f, 0f, 0.75f));
	private final ColorUIResource basalt	= new ColorUIResource(Color.getHSBColor(0f, 0f, 0.3f));
	private final ColorUIResource storm		= new ColorUIResource(Color.getHSBColor(0f, 0f, 0.58f));
	
	protected ColorUIResource getWhite() { return charcoal; }
	protected ColorUIResource getBlack() { return mist; }
	
	protected ColorUIResource getPrimary1() { return charcoal; }
	protected ColorUIResource getPrimary2() { return basalt; }
	protected ColorUIResource getPrimary3() { return storm; }
	
	protected ColorUIResource getSecondary1() { return basalt; }
	protected ColorUIResource getSecondary2() { return charcoal; }
	protected ColorUIResource getSecondary3() { return charcoal; }
	
	public String getName() { return "Charcoal & Mist"; }
}
