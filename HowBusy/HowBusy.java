import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Insets;
import java.awt.event.*;
import java.io.*;
import java.util.LinkedList;
import javax.swing.*;
import javax.swing.border.*;

public class HowBusy implements ActionListener {
	// gui
	private JTextField name;
	private JTextField ticker;
	private JTextField source;
	private JButton sourceButton;
	private JFileChooser sourceChooser;
	private JButton goButton;
	private JPanel controls;
	private JPanel gui;
	
	// execution
	private Runnable beaverTester;
	boolean running;
	
	// rules
	private Rule[] rules;
	
	public HowBusy() {
		// --- set up gui --- //
		
		// set up name and output displays
		name = new JTextField();
		name.setEditable(false);
		name.setBorder(new EmptyBorder(10, 10, 10, 10));
		name.setHorizontalAlignment(SwingConstants.CENTER);
		name.setFont(new Font("Sans", Font.PLAIN, 18));
		ticker = new JTextField(12);
		ticker.setEditable(false);
		ticker.setBorder(new EmptyBorder(10, 20, 20, 20));
		ticker.setHorizontalAlignment(SwingConstants.CENTER);
		ticker.setFont(new Font("Sans", Font.PLAIN, 36));
		
		// set up source picker
		source = new JTextField(20);
		source.addActionListener(this);
		sourceButton = new JButton("...");
		sourceButton.addActionListener(this);
		sourceChooser = new JFileChooser();
		
		// put together control panel
		controls = new JPanel();
		controls.add(new JLabel("Source: "));
		controls.add(source);
		controls.add(sourceButton);
		goButton = new JButton("Go");
		goButton.setPreferredSize(new Dimension(80, (int)Math.round(goButton.getPreferredSize().getHeight())));
		goButton.addActionListener(this);
		controls.add(goButton);
		
		// put together gui
		gui = new JPanel();
		gui.setLayout(new BoxLayout(gui, BoxLayout.Y_AXIS));
		gui.add(name);
		gui.add(ticker);
		gui.add(controls);
		
		// --- set up other stuff --- //
		
		// start off with empty rule set
		rules = new Rule [0];
		
		// create beaver tester
		beaverTester = new Runnable() {
			public void run() {
				running = true;
				goButton.setText("Stop");
				
				StringBuilder str = new StringBuilder("*");
				long steps = 0;
				final long tickerDelay = 100000000;
				long lastTickerTime = -tickerDelay;
				long currentTime;
				while (running) {
					// apply rules
					int i;
					for (i = 0; i < rules.length; i++) {
						if (rules[i].apply(str)) {
							++steps;
							break;
						}
					}
					// if no rules were applied, pack up and go home
					if (i == rules.length) {
						break;
					}
					
					// update string length ticker
					currentTime = System.nanoTime();
					if (currentTime - lastTickerTime >=  tickerDelay) {
						ticker.setText(Long.toString(steps));
						lastTickerTime = currentTime;
					}
				}
				ticker.setText(Long.toString(steps));
				
				running = false;
				goButton.setText("Go");
			}
		};
		running = false; // hit the ground not running
	}
	
	public JPanel getGUI() {
		return gui;
	}
	
	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == source) {
			loadRules();
		} else if (e.getSource() == sourceButton) {
			if (sourceChooser.showOpenDialog(gui) == JFileChooser.APPROVE_OPTION) {
				source.setText(sourceChooser.getSelectedFile().getPath());
				loadRules();
			}
		} else { // event came from go button
			if (!running) (new Thread(beaverTester)).start(); else running = false;
		}
	}
	
	private void loadRules() {
		LinkedList<Rule> freshRules = new LinkedList<Rule>();
		File sourceFile = null;
		boolean success = true;
		try {
			sourceFile = new File(source.getText());
			BufferedReader in = new BufferedReader(new FileReader(sourceFile));
			String line;
			int lineNum = 0;
			while (true) {
				line = in.readLine();
				lineNum++;
				if (line == null) {
					break;
				} else if (!line.isEmpty() && !line.matches("\\s\\s.*")) {
					freshRules.add(new Rule(line));
				}
			}
		} catch (FileNotFoundException ex) {
			JOptionPane.showMessageDialog(gui, "Could not open \"" + source.getText() + "\".");
			success = false;
		} catch (IOException ex) {
			JOptionPane.showMessageDialog(gui, "Error reading from \"" + source.getText() + "\".");
			success = false;
		}
		if (success) {
			rules = new Rule [freshRules.size()];
			freshRules.toArray(rules);
			name.setText(sourceFile.getName());
			ticker.setText("0");
		}
	}
	
	private static void createGUI() {
		JFrame frame = new JFrame("How Busy?");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		HowBusy interp = new HowBusy();
		frame.setContentPane(interp.getGUI());
		frame.pack();
		frame.setVisible(true);
	}
	
	public static void main(String[] args) {
		SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				createGUI();
			}
		});
	}
}
