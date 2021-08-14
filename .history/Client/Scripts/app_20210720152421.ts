//IIFE -- Immediately Invoked Function Expression
"use strict";

(function () {

  function confirmDelete() {
    // confirm deletion
    $("a.delete").on("click", function (event) {
      if (!confirm("Are you sure?")) {
        event.preventDefault();
        location.href = '/flights/ticket-list';
      }
    });
  }

    function clearPaxInfo() {
    // confirm deletion
    $("a.add").on("click", function (event) {
      document.getElementById("paxForm").reset();
    });
  }

  function Start(): void {
    console.log("App Started");

    confirmDelete();
  }

  window.addEventListener("load", Start);

})();

