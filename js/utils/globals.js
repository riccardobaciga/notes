const myAppObj = {};

const myApp = new Proxy(myAppObj, {
  set(target, property, value) {
    target[property] = value;
    if (typeof value === "string") {
      const tempValue = myApp.labels[property] || value; // Assign translation or key if not found
      const list = document.querySelectorAll('[valueOf="' + property + '"]');
      if (list.length > 0) {
        list.forEach((element) => {
          if (element.nodeName === "INPUT") {
            element.value = tempValue;
          } else {
            element.innerHTML = tempValue;
          }
        });
      }
      const list2 = document.querySelectorAll('[classOf="' + property + '"]');
      if (list2.length > 0) {
        list2.forEach((element) => {
          element.className = tempValue;
        });
      }
    }
    return true;
  },
  deleteProperty(target, property) {
    delete target[property];
    console.log("delete target[property]");
    return true;
  },
});

function $_(property) {
  if (! myApp.labels[property]){
    addTerm(property, property);
    loadTranslation();
  }
  return myApp.labels[property] || property;
}

function $$(value, defaultValue = "") {
  return (value) ? value : defaultValue;
}

var _ = function (selector) {
  const found = document.querySelectorAll(selector);
  var element = found.length == 1 ? found[0] : found;
  element.hide = function () {
    if ((element instanceof Element)) {
      element.classList.remove("visble");
      element.classList.add("invisible");
    } else if (element.length > 1) {
      element.forEach(function (item) {
        item.classList.remove("visble");
        item.classList.add("invisible");
      });
    }
  };
  element.show = function () {
    if ((element instanceof Element)) {
      element.classList.add("visble");
      element.classList.remove("invisible");
    } else if (element.length > 1) {
      element.forEach(function (item) {
        item.classList.add("visble");
        item.classList.remove("invisible");
      });
    }
  };

  element.onEventDo = function (eventName, nomeFun, param = null) {
    if ((element instanceof Element)) {
      element.addEventListener(eventName, function (param) {
        (param === null)?nomeFun():nomeFun(param);
      });
    } else if (element.length > 1) {
      element.forEach(function (item) {
        item.addEventListener(eventName, function (param) {
          (param === null)?nomeFun():nomeFun(param);
        });
      });
    }
  };

  return element;
};

dateFromDB = function (dateString) {
  // Check if the input is a valid date string
  if (typeof dateString !== 'string' || dateString.length !== 8) {
    dateString += "";
  }

  // Extract year, month, and day from the input string
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  // Return the formatted date
  return `${year}-${month}-${day}`;
}
msgModal = function (id) {
  // type = 'alert' spinner = 'border', classMsg = "bg-info"
  var element = new bootstrap.Modal('#' + id);

  this.modal = function (title, msg, buttons) {
    show("bg-success", title, msg, buttons)
  };

  this.confirm = function (title, msg, buttons) {
    show("text-bg-primary", title, msg, buttons)
  };

  this.login = function (title, msg, buttons) {
    show("bg-success", title, msg, buttons)
  };

  this.alert = function (title, msg) {
    show("bg-info", title, msg)
  };

  this.error = function (title, msg) {
    show("bg-danger", title, msg)
  };

  this.waiting = function (title) {
    const spinner = `
    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
    </div>`;
    show("bg-warning", title, spinner)
  };

  this.show = function (classTitle, title, msg, buttons = []) {
    _("#msgBar").className = 'modal-header ' + classTitle;
    _("#msgTitle").innerHTML = title;
    _("#msgTxt").innerHTML = msg;

    
      var buttonHtml = `
        <button class="btn btn-secondary" id="closeMsgModal">
            <i class="bi bi-x-square"></i> 
                Annulla
        </button>`;

      buttonHtml += buttons.map(bottone => {
        return bottone;
      }).join("");

      _("#msgBtn").innerHTML = buttonHtml;

    _("#closeMsgModal").onEventDo("click", function () { myApp.myModal.hide(); })
    element.show();
  }

  this.hide = function () {
    element.hide();
  }
  return this;
}


managePasswordFields = function () {
  const el = _(".passwordInput");
  if (el) {
    if ((el.length > 1)) {
      _(".passwordInput").forEach(function (item) {
        tooglePasswordField(item);
      });
    }else if (el){
      tooglePasswordField(el);
    }
  }
};

tooglePasswordField = function (item) {
  item.addEventListener("click", function () {
    const element = _("#" + item.getAttribute("passwordInput"));
    const iconElement = _("#" + item.getAttribute("paswordIcon"));
    if (element.type === "password") {
      element.type = "text";
      iconElement.classList.remove("bi-eye-fill");
      iconElement.classList.add("bi-eye-slash-fill");
    } else {
      element.type = "password";
      iconElement.classList.add("bi-eye-fill");
      iconElement.classList.remove("bi-eye-slash-fill");
    }
  });
};


var breadcrumb = function () {
  var element = [];

  element.add = function (target) {
    const tmp = { label: $_(target), target: target };
    element.push(tmp);
    element.show();
  };

  element.remove = function (labelToRemove) {
    element = element.filter(item => item.target !== labelToRemove);
    element.show();
  }

  element.changeLast = function (target) {
    if (target.indexOf("home") !== -1) {
      element.goHome();
    } else {
      if (element.length > 1) {
        const tmp = { label: $_(target), target: target };
        element[element.length - 1] = tmp;
      } else {
        element.add(target);
      }
      element.show();
    }
  }

  element.goHome = function () {
    element.splice(0, element.length);
    element.add("home");
    element.show();
  }

  element.show = function () {
    // console.log(element);
    myApp.breadcrumbTXT = `<ol class="breadcrumb">
    ${element.map((item, index) => {
      return (index === element.length - 1) ?/* html */ `
              <li class="breadcrumb-item active">${item.label}</li>
            `:/* html */ `
              <li class="breadcrumb-item"><a href="#${item.target}">${item.label}</a></li>
            `;
    }).join("")
      }
    </ol>`;
  }

  return element;
};
function N_(num) {
  if (typeof num !== 'number') {
    num = num * 1;
  }
  return num.toFixed(2);
}
getServerUrl = function () {
  const currentUrl = window.location.href;
  const urlWithoutFileName = currentUrl.substring(0, currentUrl.lastIndexOf('/')+1);
  return urlWithoutFileName;
}

function goHome () {
  document.location.href = "#home";
}

function hideCanvas(which){
  var offcanvasElement = document.getElementById(which);
  var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement); // Get the offcanvas instance
  if (offcanvas) {
      offcanvas.hide(); // Hide the offcanvas
  }
}

function hideEditor(which = '#textDiv'){
  $(which).summernote('destroy'); 
  $(which).hide(); 
}

function clearEditor(){
  _("#idNota").value = "";
  _("#titoloEdit").value = "";
  $("#textDiv").summernote('code','');
}