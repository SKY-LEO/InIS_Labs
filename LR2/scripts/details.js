document.addEventListener('DOMContentLoaded', function() {
    const shirt = JSON.parse(localStorage.getItem('selectedShirt'));
    let current_color = 'white';
    let current_side = 'front';

    if (shirt) {
        document.getElementById('shirtTitle').textContent = shirt.name || 'No name available';
        document.getElementById('shirtImage').src = shirt.colors?.white?.front || shirt.default?.front || '';
        document.getElementById('shirtPrice').textContent = `${shirt.price || 'N/A'}`;
        document.getElementById('shirtDescription').textContent = shirt.description || 'No description available';

        const colorButtonsContainer = document.getElementById('colorButtons');
        Object.keys(shirt.colors).forEach(color => {
            const button = document.createElement('button');
            button.className = 'color-button';
            button.style.backgroundColor = color;
            button.textContent = color;
            button.onclick = function() {
                current_color = color;
                if (current_side === 'front') {
                    front_side_button.onclick();
                } else {
                    back_side_button.onclick();
                }
            };
            colorButtonsContainer.appendChild(button);
        });

        const sideButtonsContainer = document.getElementById('sideButtons');
        const front_side_button = document.createElement('button');
        front_side_button.className = 'side-button';
        front_side_button.textContent = 'Front';
        front_side_button.onclick = function() {
            current_side = 'front';
            document.getElementById('shirtImage').src = shirt.colors[current_color].front;
        };
        sideButtonsContainer.appendChild(front_side_button);

        const back_side_button = document.createElement('button');
        back_side_button.className = 'side-button';
        back_side_button.textContent = 'Back';
        back_side_button.onclick = function() {
            current_side = 'back';
            document.getElementById('shirtImage').src = shirt.colors[current_color].back;
        };
        sideButtonsContainer.appendChild(back_side_button);
    } else {
        document.getElementById('shirtTitle').textContent = 'No shirt selected';
    }
});
