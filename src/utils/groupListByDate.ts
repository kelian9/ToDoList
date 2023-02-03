const groupListByDate = (list: any[]) => {
	const groups = list
		.sort((a, b) => +new Date(a.date as string) - +new Date(b.date as string))
		.reduce((groups: any, elem) => {
			const date: string = (elem.date as string).split('T')[0];
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(elem);
			return groups;
		}, {});

	return Object.keys(groups as Object).map((date) => {
		return {
			date,
			list: groups[date],
		};
	});
};

export default groupListByDate;
