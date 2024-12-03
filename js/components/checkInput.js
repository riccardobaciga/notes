export default function createCheckInput(name, label, value="") {
  return /* html */ `
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id = "${name}" name = "${name}" value="${value}">
      <label class="form-check-label" for="flexCheckDefault">
      ${$_(label)}
      </label>
    </div>
    `;
}
