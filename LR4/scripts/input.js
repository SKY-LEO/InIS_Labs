document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.target');
    let selectedElement = null;
    let offsetX = 0;
    let offsetY = 0;
    let isSticky = false;
    let isTouchDragging = false;
    let initialTouch = null;
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
        if (isSticky || isTouchDragging) return;
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

    function onTouchStart(event) {
        if (isSticky) return;
        if (event.touches.length > 1) {
            cancelDragging();
            return;
        }
        const touch = event.touches[0];
        selectedElement = event.target;
        offsetX = touch.clientX - selectedElement.getBoundingClientRect().left;
        offsetY = touch.clientY - selectedElement.getBoundingClientRect().top;
        initialTouch = { top: selectedElement.style.top, left: selectedElement.style.left };
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    }

    function onTouchMove(event) {
        if (selectedElement) {
            const touch = event.touches[0];
            selectedElement.style.top = `${touch.clientY - offsetY}px`;
            selectedElement.style.left = `${touch.clientX - offsetX}px`;
            isTouchDragging = true;
        }
    }

    function onTouchEnd() {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        isTouchDragging = false;
    }

    function onTouchDoubleTap(event) {
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

    function onTouchMoveSticky(event) {
        if (isSticky && selectedElement && event.touches.length === 1) {
            const touch = event.touches[0];
            selectedElement.style.top = `${touch.clientY}px`;
            selectedElement.style.left = `${touch.clientX}px`;
        }
    }

    function cancelDragging() {
        if (selectedElement) {
            const initialPosition = initialPositions.get(selectedElement);
            selectedElement.style.top = initialPosition.top;
            selectedElement.style.left = initialPosition.left;
            selectedElement = null;
            isSticky = false;
        }
    }

    targets.forEach(target => {
        target.addEventListener('mousedown', onMouseDown);
        target.addEventListener('dblclick', onDoubleClick);
        target.addEventListener('touchstart', onTouchStart);
        target.addEventListener('touchend', onTouchEnd);
        target.addEventListener('touchstart', (e) => {
            if (e.detail === 2) {
                onTouchDoubleTap(e);
            }
        });
    });

    document.addEventListener('mousemove', onMouseMoveSticky);
    document.addEventListener('touchmove', onTouchMoveSticky);
    document.addEventListener('keydown', onEscPress);
});
