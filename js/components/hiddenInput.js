export default function createTextInput(name, value="") {
    return /* html */ `
              <input type="hidden" id = "${name}" name = "${name}" value="${value}" />
      `;
  }
  