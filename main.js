/*****************************************************************************************
* Part 2
****************************************************************************************/
var employees = [
        {first: "Amanda", last: "Byron", group: "Sales"},
        {first: "Ye", last: "Xia", group: "Receiving", nameOrder: "reverse"},
        {first: "Miltiades", last: "Crescens", group: "Sales"},
    ];

// Part 2 Answer Here

function organizeByGroup( array ) {
	const newObject = {
		receiving: [],
		sales: []
	};
	for( var i = 0; i < employees.length; i++ ) {
		if( employees[i].group === 'Sales' ) {
			if( employees[i].nameOrder ) {
				newObject.sales.push( { name: employees[i].last + ' ' + employees[i].first } );
			} else {
				newObject.sales.push( { name: employees[i].first + ' ' + employees[i].last } );
			}
		} else if( employees[i].group === 'Receiving') {
			if( employees[i].nameOrder ) {
				newObject.receiving.push( { name: employees[i].last + ' ' + employees[i].first } ); 
			} else {
				newObject.receiving.push( { name: employees[i].first + ' ' + employees[i].last } );
			}
		}
	}
	return newObject;
}

console.log( 'function result: ', organizeByGroup( employees ) );

/*****************************************************************************************
* Part 3
****************************************************************************************/

// Part 3 Anwser Here

