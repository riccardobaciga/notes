export default function createDateInput(name, label, value="") {
  return /* html */ `
    <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">${$_(label)}</span>
            <input type="date" class="form-control" id = "${name}" name = "${name}" value="${value}">
    </div>
    `;
}
