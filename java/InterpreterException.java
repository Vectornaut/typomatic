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

public class InterpreterException extends Exception {
	public static final int BAD_SOUND = 0;
	public static final int BAD_COLOR = 1;
	public static final int BAD_STOP = 2;
	
	private int errorCode;
	private String badInput;
	
	public InterpreterException(int errorCode, String badInput) {
		this.errorCode = errorCode;
		this.badInput = badInput;
	}
	
	public int getErrorCode() {
		return errorCode;
	}
	
	public String getBadInput() {
		return badInput;
	}
}
