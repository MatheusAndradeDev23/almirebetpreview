
"use strict";

/*
 * ALMIR E BETE — CONFIGURAÇÕES
 *
 * Atualize os serviços e o telefone antes de publicar.
 * O telefone deve conter DDI + DDD + número, somente dígitos.
 */

const CONFIG = {
  whatsapp: "",

  services: [
    { name: "Corte masculino", price: 40 },
    { name: "Escova a partir de", price: 60 },
    { name: "Coloração", price: 60 },
    { name: "Luzes", price: 110 },
    { name: "Progressiva", price: 100 },
    { name: "Hidratação NB e Lowell a partir de", price: 70 },
    {name: "E muito mais! A partir de", price: 30}
  ]
};

/* SERVIÇOS */

const serviceList = document.querySelector("#service-list");

function renderServices() {
  if (!serviceList) return;

  serviceList.replaceChildren();

  CONFIG.services.forEach((service, index) => {
    const row = document.createElement("article");
    row.className = "service-row";

    const number = document.createElement("span");
    number.className = "service-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const name = document.createElement("span");
    name.className = "service-name";
    name.textContent = service.name;

    const price = document.createElement("span");
    price.className = "service-price";
    price.textContent = Number(service.price).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0
    });

    row.append(number, name, price);
    serviceList.appendChild(row);
  });
}

renderServices();

/* MENU MOBILE */

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

function setMenuOpen(isOpen) {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );

  navigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuToggle?.addEventListener("click", () => {
  const isOpen =
    menuToggle.getAttribute("aria-expanded") === "true";

  setMenuOpen(!isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 650) {
    setMenuOpen(false);
  }
});

/* AGENDAMENTO VIA WHATSAPP */

const bookingLink = document.querySelector("#booking-link");

function configureBooking() {
  if (!bookingLink) return;

  const phone = CONFIG.whatsapp.replace(/\D/g, "");

  if (!phone) {
    bookingLink.href = "mailto:";
    bookingLink.removeAttribute("target");
    bookingLink.removeAttribute("rel");

    bookingLink.addEventListener("click", (event) => {
      event.preventDefault();

      alert(
        "O agendamento ainda não foi configurado. " +
        "Adicione o número do WhatsApp no arquivo script.js."
      );
    });

    return;
  }

  const message = encodeURIComponent(
    "Olá, Almir e Bete! Gostaria de consultar os horários disponíveis."
  );

  bookingLink.href =
    `https://wa.me/${phone}?text=${message}`;

  bookingLink.target = "_blank";
  bookingLink.rel = "noopener noreferrer";
}

configureBooking();

/* ANIMAÇÕES DE ENTRADA */

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

/* ANO AUTOMÁTICO */

const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
