document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.target');
    let selectedElement = null;
    let offsetX = 0;
    let offsetY = 0;
    let isSticky = false;

    const initialPositions = new Map();
    let arr = ['blue', 'green', 'yellow', 'black', 'orange'];

    function getRandomColor() {
        return arr[Math.floor(Math.random() * (arr.length))];
    }

    targets.forEach(target => {
        initialPositions.set(target, {
            top: target.style.top,
            left: target.style.left
        });
    });

    function onMouseDown(event) {
        if (isSticky) return;
        selectedElement = event.target;
        offsetX = event.clientX - selectedElement.getBoundingClientRect().left;
        offsetY = event.clientY - selectedElement.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(event) {
        if (selectedElement) {
            selectedElement.style.top = `${event.clientY - offsetY}px`;
            selectedElement.style.left = `${event.clientX - offsetX}px`;
        }
    }

    function onMouseUp() {
        selectedElement = null;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function onDoubleClick(event) {
        if (isSticky) {
            selectedElement.style.backgroundColor = 'red';
            isSticky = false;
            selectedElement = null;
        } else {
            selectedElement = event.target;
            selectedElement.style.backgroundColor = getRandomColor();
            isSticky = true;
        }
    }

    function onMouseMoveSticky(event) {
        if (isSticky && selectedElement) {
            selectedElement.style.top = `${event.clientY}px`;
            selectedElement.style.left = `${event.clientX}px`;
        }
    }

    function onEscPress(event) {
        if (event.key === 'Escape' && selectedElement) {
            const initialPosition = initialPositions.get(selectedElement);
            selectedElement.style.top = initialPosition.top;
            selectedElement.style.left = initialPosition.left;

            if (isSticky) {
                isSticky = false;
            }

            selectedElement = null;
        }
    }

    targets.forEach(target => {
        target.addEventListener('mousedown', onMouseDown);
        target.addEventListener('dblclick', onDoubleClick);
    });

    document.addEventListener('mousemove', onMouseMoveSticky);

    document.addEventListener('keydown', onEscPress);
});
