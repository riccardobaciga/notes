export default function createTextInput(name, label, placeholder="", value="") {
  return /* html */ `
    <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">${$_(label)}</span>
            <input type="text" class="form-control" id = "${name}" name = "${name}" placeholder="${$_(placeholder)}" value="${value}">
    </div>
    `;
}
