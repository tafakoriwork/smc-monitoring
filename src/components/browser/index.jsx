import TreeMenu from "../tools/TreeMenu";

function BrowserMenu() {
    const data = [
        {
            id: 'root',
            children: [{id: 'amir'}]
        },
        {
            id: 'root2',
            children: [{id: 'amir2', children: [{id: 'amirchild',children: [{id: 'amirchild2',}]}]}]
        }
    ]
    return (
        <>
            <TreeMenu data={data}/>
        </>
    )
}

export default BrowserMenu;
