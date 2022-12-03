export const compareFilterArray = (
	array1: any[],
	type1: string,
	array2: any[],
	type2: string,
) => {
	return array1.filter(item1 => {
		
		return !array2.some(item2 => {
	
			return item1[type1].uid === item2[type2];
		});
	});
};
// return array1.filter(item => !array2.includes(item.name));
