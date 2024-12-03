export default function createCard(title, body, name=""){
    return `
    <div class="card">
        <div class="card-header" id="cardHeader${name}">
            ${title}
        </div>
        <div class="card-body" style="height:calc(100vh - 180px); overflow: auto;" id="cardBody${name}">
            ${body}
        </div>
    </div> `;

}