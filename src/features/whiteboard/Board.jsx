import { Tldraw } from '@tldraw/tldraw';

function Board() {
    return (
        <div style={{ position: 'fixed', inset: 0 }}>
            <Tldraw persistenceKey="my-persistence-key" />
        </div>
    );
}

export default Board;
