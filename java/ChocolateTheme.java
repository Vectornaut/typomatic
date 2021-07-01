import java.awt.Color;
import javax.swing.plaf.ColorUIResource;

public class ChocolateTheme extends TypoTheme {
	private final ColorUIResource chocolate	= new ColorUIResource(Color.getHSBColor(0.05f, 1f, 0.125f));
	private final ColorUIResource coffee	= new ColorUIResource(Color.getHSBColor(0.1f, 0.5f, 0.85f));
	private final ColorUIResource cocoa		= new ColorUIResource(Color.getHSBColor(0.05f, 1f, 0.3f));
	private final ColorUIResource caramel	= new ColorUIResource(Color.getHSBColor(0.086f, 1f, 0.58f));
	
	protected ColorUIResource getWhite() { return chocolate; }
	protected ColorUIResource getBlack() { return coffee; }
	
	protected ColorUIResource getPrimary1() { return chocolate; }
	protected ColorUIResource getPrimary2() { return cocoa; }
	protected ColorUIResource getPrimary3() { return caramel; }
	
	protected ColorUIResource getSecondary1() { return cocoa; }
	protected ColorUIResource getSecondary2() { return chocolate; }
	protected ColorUIResource getSecondary3() { return chocolate; }
	
	public String getName() { return "Chocolate & Coffee"; }
}
