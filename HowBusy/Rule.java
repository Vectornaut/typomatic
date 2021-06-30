public class Rule {
	private String from;
	private String to;
	
	Rule(String code) {
		String[] tokens = code.split("\\s");
		if (tokens.length >= 1) from = tokens[0]; else from = "";
		if (tokens.length >= 2) to = tokens[1]; else to = "";
	}
	
	// if this rule can be applied to the string in the given StringBuilder, apply it and return
	// true. otherwise, return false.
	public boolean apply(StringBuilder str) {
		// look for a substring matching this rule
		int index = str.indexOf(from);
		if (index == -1) {
			return false;
		} else {
			// if a matching substring is found, apply the rule
			str.replace(index, index + from.length(), to);
			return true;
		}
	}
}
