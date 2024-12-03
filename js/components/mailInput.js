export default function createTextInput(name, label, placeholder="", value="") {
  return /* html */ `
    <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">
              <i class="bi bi-envelope-at-fill"></i>&nbsp; ${$_(label)}
            </span>
            <input type="mail" class="form-control" id = "${name}" name = "${name}" placeholder="${$_(placeholder)}" value="${value}">
    </div>
    `;
}
