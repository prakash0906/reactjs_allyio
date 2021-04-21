import Single from '../single';
import ErrorBoundary from '../error-boundaries';

const Group = ({ items = [], isRoot = false }) => (
    <ErrorBoundary><ol type={isRoot ? "1" : "a"}>
        {
            items.map((item, index) =>
                <Single key={index} item={item} />
            )
        }
    </ol>
    </ErrorBoundary>
);

export default Group;