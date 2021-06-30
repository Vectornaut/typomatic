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

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Insets;
import java.awt.event.*;
import java.io.*;
import java.util.LinkedList;
import java.util.Timer;
import java.util.TimerTask;
import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.plaf.metal.MetalLookAndFeel;
import javax.swing.text.BadLocationException;
import javax.swing.text.StyledDocument;

public class Typomatic implements KeyListener, ActionListener, ChangeListener {
	// gui
	private JTextPane displayPane;
	private JTextArea logArea;
	private JTextField source;
	private JButton sourceButton;
	private JFileChooser sourceChooser;
	private JTextField input;
	private JSpinner tempoPicker;
	private JPanel settings;
	private JPanel gui;
	
	// settings
	private int tempo;
	private boolean soundOn;
	
	// execution
	private Timer timer;
	private StepTask play;
	boolean stepping;
	private StyledDocument display;
	
	// resources
	private ResourceKit resources;
	
	// rules
	private Rule[] rules;
	
	public Typomatic() {
		// --- set up gui --- //
		
		LoggedException log = new LoggedException();
		
		// set look and feel
		TypoTheme theme = new CharcoalTheme();
		log.append(theme.getLog());
		MetalLookAndFeel.setCurrentTheme(theme);
		try {
			UIManager.setLookAndFeel(new MetalLookAndFeel());
		} catch (UnsupportedLookAndFeelException ex) {
			log.append("\"Metal\" look and feel not supported.");
		}
		
		// set up display pane
		displayPane = new JTextPane();
		displayPane.setEditable(false);
		displayPane.setFont(theme.getDisplayFont());
		displayPane.setBorder(BorderFactory.createEmptyBorder(200, 200, 200, 200));
		displayPane.addKeyListener(this);
		
		// set up log area
		logArea = new JTextArea();
		logArea.setEditable(false);
		logArea.setRows(6);
		JScrollPane logScroll = new JScrollPane(logArea);
		logArea.append(log.getLogMessage());
		
		// set up source picker
		source = new JTextField(20);
		source.addActionListener(this);
		sourceButton = new JButton("...");
		sourceButton.setMargin(new Insets(0, 0, 0, 0));
		Dimension dim = new Dimension();
		dim.setSize(sourceButton.getPreferredSize().getWidth(), source.getPreferredSize().getHeight());
		sourceButton.setPreferredSize(dim);
		sourceButton.addActionListener(this);
		sourceChooser = new JFileChooser();
		
		// put together settings panel
		input = new JTextField(40);
		input.addActionListener(this);
		tempoPicker = new JSpinner(new SpinnerNumberModel(240, 60, 480, 60));
		tempoPicker.addChangeListener(this);
		settings = new JPanel();
		settings.add(new JLabel("Source: "));
		settings.add(source);
		settings.add(sourceButton);
		settings.add(new JLabel("Input: "));
		settings.add(input);
		settings.add(new JLabel("Tempo: "));
		settings.add(tempoPicker);
		settings.add(new JLabel("bpm"));
		
		// put together gui
		gui = new JPanel(new BorderLayout());
		gui.add(settings, BorderLayout.PAGE_START);
		gui.add(displayPane, BorderLayout.CENTER);
		gui.add(logScroll, BorderLayout.PAGE_END);
		
		// --- set up other stuff --- //
		
		// initialize settings
		tempo = ((Integer)tempoPicker.getValue()).intValue();
		soundOn = true;
		
		// prepare for execution
		timer = new Timer();
		play = null;
		stepping = false;
		display = displayPane.getStyledDocument();
		
		// create resource kit
		resources = new ResourceKit();
		logArea.append(resources.getLog().getLogMessage());
		
		// start off with empty rule set
		rules = new Rule [0];
	}
	
	public JPanel getGUI() {
		return gui;
	}
	
	public void keyPressed(KeyEvent e) {
		if (e.getKeyCode() == KeyEvent.VK_RIGHT) {
			timer.schedule(new StepTask(), 0);
		} else if (e.getKeyCode() == KeyEvent.VK_DOWN) {
			if (play == null) {
				play = new StepTask();
				timer.schedule(play, 0, Math.round(60000.0/tempo));
			} else {
				play.cancel();
				play = null;
			}
		}
	}
	
	public void keyReleased(KeyEvent e) {
	}
	
	public void keyTyped(KeyEvent e) {
	}
	
	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == source) {
			loadRules();
		} else if (e.getSource() == sourceButton) {
			if (sourceChooser.showOpenDialog(gui) == JFileChooser.APPROVE_OPTION) {
				source.setText(sourceChooser.getSelectedFile().getPath());
				loadRules();
			}
		} else { // event came from input field
			setInput();
		}
		displayPane.requestFocusInWindow();
	}
	
	public void stateChanged(ChangeEvent e) {
		tempo = ((Integer)tempoPicker.getValue()).intValue();
		displayPane.requestFocusInWindow();
	}
	
	private void dispatchLog(final LoggedException ex) {
		if (play != null) play.cancel();
		SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				logArea.append(ex.getLogMessage());
			}
		});
	}
	
	private void loadRules() {
		LinkedList<Rule> freshRules = new LinkedList<Rule>();
		boolean success = true;
		try {
			BufferedReader in = new BufferedReader(new FileReader(source.getText()));
			String line;
			int lineNum = 0;
			while (true) {
				line = in.readLine();
				lineNum++;
				if (line == null) {
					break;
				} else {
					try {
						if (!line.isEmpty() && !line.matches("\\s\\s.*")) {
							freshRules.add(new Rule(line, resources));
						}
					} catch (InterpreterException ex) {
						if (ex.getErrorCode() == InterpreterException.BAD_SOUND) {
							logArea.append("Line " + lineNum + ": \"" + ex.getBadInput() + "\" is not a valid sound name.\n");
						} else if (ex.getErrorCode() == InterpreterException.BAD_COLOR) {
							logArea.append("Line " + lineNum + ": \"" + ex.getBadInput() + "\" is not a valid color name.\n");
						}  else if (ex.getErrorCode() == InterpreterException.BAD_STOP) {
							logArea.append("Line " + lineNum + ": \"" + ex.getBadInput() + "\" is not the stop symbol, \"%\".\n");
						}
						success = false;
					}
				}
			}
		} catch (FileNotFoundException ex) {
			logArea.append("Could not open \"" + source.getText() + "\".\n");
			success = false;
		} catch (IOException ex) {
			logArea.append("Error reading from \"" + source.getText() + "\".\n");
			success = false;
		}
		if (success) {
			rules = new Rule [freshRules.size()];
			freshRules.toArray(rules);
			logArea.append("New rules loaded.\n");
		} else {
			logArea.append("Could not load new rules.\n");
		}
	}
	
	private void setInput() {
		try {
			display.remove(0, display.getLength());
			display.insertString(0, input.getText(), null);
		} catch (BadLocationException ex) {
			logArea.append("Could not place input in display.\n");
		}
	}
	
	private class StepTask extends TimerTask {
		public void run() {
			if (stepping) return; // if a step is running, don't interfere
			stepping = true; // now it's our turn
			try {
				int i;
				for (i = 0; i < rules.length; i++) {
					if (rules[i].apply(display, tempo, soundOn)) break;
				}
				// if no rule was applied, or a stopping rule was applied, pack up and go home
				if (i == rules.length || rules[i].isStopping()) {
					cancel();
					play = null;
				}
			} catch (LoggedException ex) {
				dispatchLog(ex);
			} finally {
				stepping = false; // we're done
			}
		}
	}
	
	private static void createGUI() {
		JFrame frame = new JFrame("Typomatic");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		Typomatic interp = new Typomatic();
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
