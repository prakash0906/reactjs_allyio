import { useState, Fragment } from 'react';
import "./style.css";
import ErrorBoundary from '../error-boundaries';
import Group from '../group';

const Single = ({ item }) => {
    const [hasSubgroup] = useState(Array.isArray(item.subObj) && item.subObj.length > 0);
    const [show, setShow] = useState(hasSubgroup);

    const toggleExpandCollapse = (e) => {
        e.stopPropagation();
        hasSubgroup && setShow(!show);
    }

    return (
        <ErrorBoundary>
            <li className={hasSubgroup && !show ? 'hide-group' : ''} >

                {!item.subObj && <div className="horizontal" />}

                <div
                    className={`title ${hasSubgroup ? 'clickable' : ''}`}
                    onClick={toggleExpandCollapse}
                >
                    {item.title}
                </div>

                {
                    hasSubgroup &&
                    <Fragment>

                        <div
                            className={`clickable button ${show && 'show'}`}
                            onClick={toggleExpandCollapse} />
                        <div className="group">
                            <div className="vertical" />
                            <Group items={item.subObj} collapse={!show} />
                        </div>
                    </Fragment>

                }
            </li>
        </ErrorBoundary>
    );
};


export default Single;