export function parseDesc(str: string, blackboard: { [x: string]: any; }) {
	return str.replaceAll(/<[@$]([\w.]+)>/g, (match, tag) => {
		return `<span class="${tag.replaceAll(".", " ")}">`;
	}).replaceAll(/\{([^}<]+)\}/g, (match, key) => {
			const [bbKey, format] = key.split(':');
			let value = blackboard[bbKey];

			if (value === undefined) value = bbKey;

			// Handle formatting (like ":0%")
			if (format?.endsWith('%')) {
				const decimals = parseInt(format) || 0;
				value = (value * 100).toFixed(decimals) + '%';
			}
			return value
		}).replaceAll("</>", "</span>")
		.replaceAll("\n", "<br>");
}
