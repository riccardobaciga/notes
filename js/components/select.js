
export default function createSelect(name, elements, valueLabel="value", textLabel = "text", defaultValue = "Open this select menu"){
    return `
            <select id = "${name}" name = "${name}" class="form-select" aria-label="Default select example">
                <option selected disabled>${defaultValue}</option>
                ${ elements.map((item, index) => {
                return `
                    <option value="${item[valueLabel]}">${item[textLabel]}</option>
                `}).join("")}
                </select>
        `;
}