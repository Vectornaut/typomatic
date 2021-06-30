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

public class LoggedException extends Exception {
	private boolean active;
	private String logMessage;
	
	public LoggedException() {
		active = false;
		logMessage = "";
	}
	
	public LoggedException(String message) {
		active = true;
		logMessage = message + "\n";
	}
	
	public void append(String message) {
		active = true;
		logMessage += message + "\n";
	}
	
	public void append(LoggedException lex) {
		active = true;
		logMessage += lex.logMessage;
	}
	
	public boolean isActive() {
		return active;
	}
	
	public String getLogMessage() {
		return logMessage;
	}
}
