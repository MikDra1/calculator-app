const buttons = Array.from(document.querySelectorAll(".toggle__button"));
const container = document.querySelector(".container");
const totalView = document.querySelector(".total__view");
const btnDefault = Array.from(
  document.querySelectorAll(".calculator__default__key")
);
const btnReset = document.querySelector(".calculator__reset__key");
const btnEqual = document.querySelector(".calculator__equal__key");
const btnDel = document.querySelector(".calculator__del__key");
const triStateToggle = document.querySelector(".tri-state-toggle");
const calculator = document.querySelector(".calculator");
const body = document.querySelector("body");
const panel = document.querySelector(".panel");

function removeAllClasses() {
  btnDefault.map((btn) => {
    btn.classList.remove(
      "theme2__calculator__default__key",
      "theme3__calculator__default__key"
    );
  });
  btnReset.classList.remove(
    "theme2__calculator__reset__key",
    "theme3__calculator__reset__key"
  );
  btnDel.classList.remove(
    "theme2__calculator__del__key",
    "theme3__calculator__del__key"
  );
  btnEqual.classList.remove(
    "theme2__calculator__equal__key",
    "theme3__calculator__equal__key"
  );
  panel.classList.remove("theme2__panel", "theme3__panel");
}




buttons.forEach((element, index) => {
  element.addEventListener("click", () => {
    element.style.opacity = "1";
    if (index === 0) {
      container.style.backgroundColor = "hsl(222, 26%, 31%)";
      body.style.color = "white";
      triStateToggle.style.backgroundColor = calculator.style.backgroundColor =
        "hsl(223, 31%, 20%)";
      element.classList.remove(
        "theme2__toggle__button",
        "theme3__toggle__button"
      );

      removeAllClasses();
    } else if (index === 1) {
      container.style.backgroundColor = "hsl(0, 0%, 90%)";
      btnDefault.map((btn) => {
        btn.classList.add("theme2__calculator__default__key");
        btn.classList.remove("theme3__calculator__default__key");
      });
      btnReset.classList.add("theme2__calculator__reset__key");
      btnReset.classList.remove("theme3__calculator__reset__key");
      btnDel.classList.add("theme2__calculator__del__key");
      btnDel.classList.remove("theme3__calculator__del__key");
      btnEqual.classList.add("theme2__calculator__equal__key");
      btnEqual.classList.remove("theme3__calculator__equal__key");
      panel.classList.add("theme2__panel");
      panel.classList.remove("theme3__panel");

      triStateToggle.style.backgroundColor = calculator.style.backgroundColor =
        "hsl(0, 5%, 81%)";
      body.style.color = "hsl(60, 10%, 19%)";
      element.classList.add("theme2__toggle__button");
    } else {
      container.style.backgroundColor = "hsl(268, 75%, 9%)";
      btnDefault.map((btn) => {
        btn.classList.add("theme3__calculator__default__key");
        btn.classList.remove("theme2__calculator__default__key");
      });
      btnReset.classList.add("theme3__calculator__reset__key");
      btnDel.classList.add("theme3__calculator__del__key");
      btnEqual.classList.add("theme3__calculator__equal__key");
      triStateToggle.style.backgroundColor = calculator.style.backgroundColor =
        "hsl(268, 71%, 12%)";
      body.style.color = "white";
      element.classList.add("theme3__toggle__button");

      panel.classList.add("theme3__panel");
    }
    buttons
      .filter(function (item) {
        return item != element;
      })
      .forEach((item) => {
        item.style.opacity = "0";
      });
  });
});

let total = "";
totalView.textContent = total;

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("calculator__key")) return;

  if (e.target.classList.contains("calculator__key__action")) {
    if (
      total.includes("-") ||
      total.includes("+") ||
      total.includes("/") ||
      total.includes("x") ||
      total.length === 0
    )
      return;
    total = total + ` ${e.target.textContent} `;
  } else if (e.target.classList.contains("calculator__equal__key")) {
    total = eval(total.replaceAll("x", "*").replaceAll(",", ""));
  } else if (e.target.classList.contains("calculator__reset__key")) {
    total = "";
  } else if (e.target.classList.contains("calculator__del__key")) {
    total = total.replaceAll(" ", "").slice(0, -1);
  } else {
    if (
      String(total)
        .split(" ")
        [String(total).split(" ").length - 1].includes(".") &&
      e.target.textContent === "."
    )
      return;

    if (
      total
        .replaceAll(" ", "")
        .replaceAll(",", "")
        .replaceAll(".", "")
        .split(
          total.includes("+")
            ? "+"
            : total.includes("-")
            ? "-"
            : total.includes("x")
            ? "x"
            : total.includes("/")
            ? "/"
            : "+"
        )
        .at(-1).length %
        3 ===
        0 &&
      !total
        .replaceAll(" ", "")
        .replaceAll(",", "")
        .split(
          total.includes("+")
            ? "+"
            : total.includes("-")
            ? "-"
            : total.includes("x")
            ? "x"
            : total.includes("/")
            ? "/"
            : "+"
        )
        .at(-1)
        .includes(".") &&
      !e.target.classList.contains("calculator__dot__key")
    ) {
      total += ",";
    }

    console.log(total.includes("+"));

    total = total + e.target.textContent;
    total = total
      .split(" ")
      .map((v) =>
        v.split("").at(0) === "," ? v.split("").slice(1).join("") : v
      )
      .filter((v) => v !== "")
      .join(" ");
  }
  totalView.textContent = String(total);
  total = String(total);
});
