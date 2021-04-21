import { Fragment, useEffect, useState } from 'react';
import { processObjectives } from '../../utils';
import Group from '../../components/group';
import ErrorBoundary from '../../components/error-boundaries';
import "./style.css";

const Objectives = () => {
    const [isLoading, setLoading] = useState(true);
    const [originalResult, setOriginalResult] = useState([]);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [displayTotal, setDisplayTotal] = useState(0);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetch('https://okrcentral.github.io/sample-okrs/db.json')
            .then(resp => resp.json())
            .then((resp) => {
                if (Array.isArray(resp.data)) {
                    initValues(processObjectives(resp.data));
                }
            })
            .catch(error => console.error('~~error~~', error))
        . finally(() => {
            setLoading(false);
        });
    }, []);

    const initValues = ({ results, categoryList, total }) => {
        setOriginalResult(results);
        setItems(results);
        setCategoryList(categoryList);
        setTotal(total);
        setDisplayTotal(total);
    };

    const updateCategory = (e) => {
        const val = e.target.value;
        if (val === "-1") {
            setItems(originalResult);
            setDisplayTotal(total);
        } else {
            const filterResult = originalResult.filter(item => item.category === val);
            const _displayTotal = filterResult.reduce((sum, item) => sum + item.grpTotal, 0)
            setItems(filterResult);
            setDisplayTotal(_displayTotal);
        }
    };

    return (
        <ErrorBoundary>
            <main className="objectives-wrapper">
                {
                    isLoading ?
                        <h1>Loading...</h1>
                        :
                        <Fragment>
                            <div className="filter-wrapper">
                                <label htmlFor="category">Display category:: </label>
                                <select
                                    id="category"
                                    onChange={updateCategory}
                                >
                                    <option value="-1">All</option>
                                    {
                                        categoryList.map((category, index) =>
                                            <option key={index} value={category}>{category}</option>
                                        )
                                    }
                                </select>

                                <div>
                                    Display <b>{displayTotal}</b> of <b>{total}</b> objectives
                                </div>
                            </div>
                            {
                                displayTotal === 0 ?
                                    <h2>No result</h2>
                                    :
                                    <Group items={items} isRoot />
                            }
                        </Fragment>
                }

            </main>
        </ErrorBoundary>);
};


export default Objectives;