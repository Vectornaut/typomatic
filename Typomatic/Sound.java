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

import java.io.*;
import java.net.URL;
import javax.sound.sampled.*;

public class Sound {
	private AudioFormat format;
	private byte[] data;
	
	public Sound(String filename) throws LoggedException {
		// find and open audio file
		URL url = getClass().getResource("sounds/" + filename);
		if (url == null) throw new LoggedException("Could not find \"" + filename + "\".");
		AudioInputStream in;
		try {
			in = AudioSystem.getAudioInputStream(url);
		} catch (UnsupportedAudioFileException ex) {
			throw new LoggedException("Format of \"" + filename + "\" not supported.");
		} catch (IOException ex) {
			throw new LoggedException("Could not open \"" + filename + "\".");
		}
		
		// read audio file
		format = in.getFormat();
		byte[] buffer = new byte [4096];
		ByteArrayOutputStream out = new ByteArrayOutputStream(buffer.length);
		int bytesRead;
		try {
			while ((bytesRead = in.read(buffer)) != -1) out.write(buffer, 0, bytesRead);
			in.close();
			out.close();
		} catch (IOException ex) {
			throw new LoggedException("Error reading from \"" + filename + "\".");
		}
		data = out.toByteArray();
	}
	
	public void play() throws LineUnavailableException {
		final Clip clip = (Clip)AudioSystem.getLine(new DataLine.Info(Clip.class, format));
		clip.open(format, data, 0, data.length);
		new Thread() {
			public void run() {
				clip.start();
				try {
					Thread.sleep(300); // all sounds are less than 300 ms long
				} catch (InterruptedException ex) {}
				clip.close();
			}
		}.start();
	}
}
