export function processObjectives  (input = [])  {
    const {groupItems, categoryList} = seprateObjectives(input);
    let total = 0;
    const results = [];
    groupItems.root.forEach(item => {
        let grpTotal = 1;
        if(item.id in groupItems) {
            // groupItems[item.id].forEach(val => {
            //     val.show = true;
            // });
            item.subObj = groupItems[item.id];
            grpTotal +=  groupItems[item.id].length;
            total += groupItems[item.id].length;
        }
        item.grpTotal = grpTotal;

        results.push(item);
        total += 1;
    });
    
    // console.log('items not show because parent_objective_id not found', input.length - count , input.filter(item => !item.subObj && item.show === false));
    return {results, categoryList, total};
}

function seprateObjectives(input = []) {
    const obj = {
        root: []
    };
    const catList=[];
    input.forEach(item => {
        if(!catList.includes(item.category)) {
            catList.push(item.category);
        }
        if(!item.parent_objective_id) { //Assume: all root items have empty parent_objective_id
            item.subObj = [];
            obj.root.push(item);
        } else {
            if(!(item.parent_objective_id in obj)) {
                obj[item.parent_objective_id] = [];
            }
            // item.show = false;
            obj[item.parent_objective_id].push(item);
        }
    });
    return {groupItems: obj, categoryList :catList};
} 