import TreeMenu from "../tools/TreeMenu";
import { useDispatch, useSelector } from 'react-redux';
import { currentPanel, setPanel, setPanelTab } from "../redux/routingSlice";

function BrowserMenu() {
    const dispatch = useDispatch();
    const current = useSelector(currentPanel);
    const dispatcher = async (id) => dispatch(setPanel(id));
    const dispatcherTab = async (id) => dispatch(setPanelTab(id));
    const data = [
        {
            id: 'Monitoring',
            children: [{id: 'CPU'}, {id: 'RAM'}]
        },
        {
            id: 'Management',
            children: [{id: 'Setting'}]
        }
    ]
    return (
        <>
            <TreeMenu data={data} selector={dispatcher} selectorTab={dispatcherTab} current={current} />
        </>
    )
}

export default BrowserMenu;
