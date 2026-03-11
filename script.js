addURLInput = () => {
    const inputUrl = document.getElementById("urlContainer");
    const newInput = document.createElement("input");
    
    newInput.type = "text";
    newInput.className = "youtubeURL";
    newInput.size = "50";
    newInput.placeholder = "youtube short url";
    inputUrl.appendChild(newInput);

    const buttons = document.getElementById("newResultElements");
    
    // Crear contenedor flex
    const containerFlex = document.createElement("div");
    containerFlex.className = "input-container-flex";
    
    // Crear input resultado
    const resultInput = document.createElement("input");
    resultInput.type = "text";
    resultInput.className = "resultURL";
    resultInput.size = "40";
    resultInput.placeholder = "converted url will appear here";
    resultInput.readOnly = true;
    resultInput.disabled = true;
    
    // Crear botón copy
    const copyButton = document.createElement("button");
    copyButton.className = "buttonCopy";
    copyButton.textContent = "Copy";
    copyButton.onclick = function() { copyURL(this); };
    
    // Crear botón go to
    const goToButton = document.createElement("button");
    goToButton.className = "buttonGoto";
    goToButton.textContent = "Go to URL";
    goToButton.onclick = function() { goToURL(this); };
    
    // Crear botón delete
    const deleteButton = document.createElement("button");
    deleteButton.className = "buttonDelete";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() { deleteURLInput(this); };
    
    // Agregar elementos al contenedor
    containerFlex.appendChild(resultInput);
    containerFlex.appendChild(copyButton);
    containerFlex.appendChild(goToButton);
    containerFlex.appendChild(deleteButton);
    
    // Agregar al DOM
    buttons.appendChild(containerFlex);
}

urlTransform = () => {
    const inputs = document.querySelectorAll(".youtubeURL");
    const resultInputs = document.querySelectorAll(".resultURL");
    const shortURL = '/shorts/';
    const browserURL = '/watch?v=';
    
    inputs.forEach((input, index) => {
        if (input.value.trim() !== '') {
            let finishedURL = input.value.replace(shortURL, browserURL);
            resultInputs[index].value = finishedURL;
        } else {
            resultInputs[index].value = '';
        }
    });
    
    console.log('Thanks for using this application :)');
}

copyURL = (button) => {
    const resultInput = button.parentElement.querySelector(".resultURL");
    
    if (resultInput.value.trim() !== '') {
        navigator.clipboard.writeText(resultInput.value).then(() => {
            button.textContent = "Copied!";
            
            // Limpiar timeout anterior si existe
            if (button.dataset.timeoutId) {
                clearTimeout(button.dataset.timeoutId);
            }
            
            // Guardar nuevo timeout
            button.dataset.timeoutId = setTimeout(() => {
                button.textContent = "Copy";
                delete button.dataset.timeoutId;
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    }
}

goToURL = (button) => {
    const resultInput = button.parentElement.querySelector(".resultURL");
    
    if (resultInput.value.trim() !== '') {
        window.open(resultInput.value, '_blank');
    }
}

deleteURLInput = (button) => {
    const containerFlex = button.parentElement;
    const resultContainers = document.querySelectorAll(".input-container-flex");
    const inputContainers = document.querySelectorAll(".youtubeURL");
    
    // Encontrar el índice del contenedor a eliminar
    let index = -1;
    for (let i = 0; i < resultContainers.length; i++) {
        if (resultContainers[i] === containerFlex) {
            index = i;
            break;
        }
    }
    
    // Eliminar el input correspondiente y el resultado
    if (index !== -1 && inputContainers[index]) {
        inputContainers[index].remove();
    }
    containerFlex.remove();
}
