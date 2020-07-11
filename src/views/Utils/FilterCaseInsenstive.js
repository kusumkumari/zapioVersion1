export function filterCaseInsensitive(filter, row) {
	const id = filter.pivotId || filter.id;
	if (row[id] !== null && typeof row[id] === "string") {
		return (row[id] !== undefined
		  ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
		  : true);
	  }
	  if (row[id] !== null && typeof row[id] === "number") {
		return (row[id] !== undefined
		  ? String(row[id]).includes(filter.value)
		  : true);
	  }
	};