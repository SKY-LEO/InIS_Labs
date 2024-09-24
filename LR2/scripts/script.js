function renderShirts(shirtArray) {
    const container = document.getElementById('shirtDisplay');

    shirtArray.forEach(shirt => {
        const shirtDiv = document.createElement('div');
        shirtDiv.className = 'shirt';

        const image = document.createElement('img');
        image.src = shirt.colors?.white?.front || shirt.default?.front || '';
        image.alt = shirt.name || 'No name available';

        const title = document.createElement('h3');
        title.textContent = shirt.name || 'No name available';

        const colors = document.createElement('p');
        let i = Object.keys(shirt.colors).length;
        if (i > 1){
            colors.textContent = `Available in ${i} colors`;
        } else {
            colors.textContent = `Available in ${i} color`;
        }

        const quickViewButton = document.createElement('button');
        quickViewButton.textContent = 'Quick view';
        quickViewButton.onclick = function() {
            showpopup(shirt);
        };

        const seePageButton = document.createElement('button');
        seePageButton.textContent = 'See page';
        seePageButton.onclick = function () {
            localStorage.setItem('selectedShirt', JSON.stringify(shirt));
            window.location.href = 'details.html';
        }

        shirtDiv.appendChild(image);
        shirtDiv.appendChild(title);
        shirtDiv.appendChild(colors);
        shirtDiv.appendChild(quickViewButton);
        shirtDiv.appendChild(seePageButton);

        container.appendChild(shirtDiv);
    });
}

function showpopup(shirt) {
    const popup = document.getElementById('mypopup');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const popupPrice = document.getElementById('popupPrice');

    popupImage.src = shirt.colors?.white?.front || shirt.default?.front || '';
    popupTitle.textContent = shirt.name || 'No name available';
    popupDescription.textContent = shirt.description || 'No description available';
    popupPrice.textContent = `Price: ${shirt.price || 'N/A'}`;

    popup.style.display = 'block';

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        popup.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    }
}

renderShirts(shirts);