
export default function createAccordation(name, elements){
    return `
            <div class="accordion accordion-flush" id="${name}">
                ${ elements.map((item, index) => {
                    console.log(item);
                return `
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordation_${index}" aria-expanded="false" aria-controls="accordation_${index}">
                            ${item.title}
                        </button>
                        </h2>
                        <div id="accordation_${index}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            ${item.body}
                        </div>
                    </div>`}).join("")
                }
            </div>
        `;
}