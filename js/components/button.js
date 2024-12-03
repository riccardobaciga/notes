export default function createButton(classTxt, id, icon, name) {
    return /* html */ `
        <button class="btn ${classTxt}" id="${id}">
            <i class="bi ${icon}"></i> 
                ${$_(name)}
        </button>
    `;
}